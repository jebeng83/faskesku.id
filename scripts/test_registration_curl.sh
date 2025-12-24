#!/bin/bash

# Script untuk test registrasi via curl
# Usage: ./scripts/test_registration_curl.sh

BASE_URL="${BASE_URL:-http://localhost:8000}"

echo "=== TEST REGISTRASI PASIEN VIA CURL ==="
echo "Base URL: $BASE_URL"
echo ""

# Ambil data sample dari database via artisan tinker
echo "1. Mengambil data sample dari database..."

PATIENT_DATA=$(php artisan tinker --execute="
\$patient = \App\Models\Patient::first();
\$dokter = \App\Models\Dokter::first();
\$poli = \App\Models\Poliklinik::first();
\$penjab = \App\Models\Penjab::first();

if (!\$patient || !\$dokter || !\$poli || !\$penjab) {
    echo json_encode(['error' => 'Data tidak lengkap']);
    exit(1);
}

echo json_encode([
    'patient_no_rkm_medis' => \$patient->no_rkm_medis,
    'patient_nama' => \$patient->nm_pasien,
    'kd_dokter' => \$dokter->kd_dokter,
    'kd_poli' => \$poli->kd_poli,
    'kd_pj' => \$penjab->kd_pj,
    'p_jawab' => \$patient->namakeluarga ?? \$patient->nm_pasien,
    'almt_pj' => \$patient->alamat ?? 'Alamat tidak diketahui',
]);
")

if [ $? -ne 0 ]; then
    echo "ERROR: Gagal mengambil data sample"
    exit 1
fi

PATIENT_NO_RKM_MEDIS=$(echo $PATIENT_DATA | jq -r '.patient_no_rkm_medis')
KD_DOKTER=$(echo $PATIENT_DATA | jq -r '.kd_dokter')
KD_POLI=$(echo $PATIENT_DATA | jq -r '.kd_poli')
KD_PJ=$(echo $PATIENT_DATA | jq -r '.kd_pj')
P_JAWAB=$(echo $PATIENT_DATA | jq -r '.p_jawab')
ALMT_PJ=$(echo $PATIENT_DATA | jq -r '.almt_pj')

echo "   ✓ Pasien: $PATIENT_NO_RKM_MEDIS"
echo "   ✓ Dokter: $KD_DOKTER"
echo "   ✓ Poli: $KD_POLI"
echo "   ✓ Penjab: $KD_PJ"
echo ""

# Ambil CSRF token
echo "2. Mengambil CSRF token..."
CSRF_RESPONSE=$(curl -s -c /tmp/cookies.txt "$BASE_URL/sanctum/csrf-cookie")
CSRF_TOKEN=$(grep -oP 'XSRF-TOKEN=\K[^;]*' /tmp/cookies.txt | sed 's/%3D/=/g')

if [ -z "$CSRF_TOKEN" ]; then
    echo "   Warning: CSRF token tidak ditemukan, mencoba tanpa token..."
fi

echo ""

# Buat request data
TGL_REGISTRASI=$(date +%Y-%m-%d)
JAM_REG=$(date +%H:%M)

echo "3. Mengirim request registrasi..."
echo "   URL: $BASE_URL/registration/$PATIENT_NO_RKM_MEDIS/register"
echo "   Method: POST"
echo ""

RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" \
    -X POST \
    -b /tmp/cookies.txt \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Requested-With: XMLHttpRequest" \
    -H "X-CSRF-TOKEN: $CSRF_TOKEN" \
    -H "X-XSRF-TOKEN: $CSRF_TOKEN" \
    -d "{
        \"kd_dokter\": \"$KD_DOKTER\",
        \"kd_poli\": \"$KD_POLI\",
        \"kd_pj\": \"$KD_PJ\",
        \"p_jawab\": \"$P_JAWAB\",
        \"almt_pj\": \"$ALMT_PJ\",
        \"hubunganpj\": \"DIRI SENDIRI\",
        \"tgl_registrasi\": \"$TGL_REGISTRASI\",
        \"jam_reg\": \"$JAM_REG\"
    }" \
    "$BASE_URL/registration/$PATIENT_NO_RKM_MEDIS/register")

HTTP_CODE=$(echo "$RESPONSE" | grep -oP 'HTTP_CODE:\K.*')
BODY=$(echo "$RESPONSE" | sed 's/HTTP_CODE:.*//')

echo "4. Response:"
echo "   HTTP Code: $HTTP_CODE"
echo "   Body:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    SUCCESS=$(echo "$BODY" | jq -r '.success' 2>/dev/null)
    if [ "$SUCCESS" = "true" ]; then
        echo "✓ REGISTRASI BERHASIL!"
        NO_RAWAT=$(echo "$BODY" | jq -r '.data.no_rawat' 2>/dev/null)
        NO_REG=$(echo "$BODY" | jq -r '.data.no_reg' 2>/dev/null)
        echo "   No. Rawat: $NO_RAWAT"
        echo "   No. Reg: $NO_REG"
    else
        echo "✗ REGISTRASI GAGAL!"
        MESSAGE=$(echo "$BODY" | jq -r '.message' 2>/dev/null)
        echo "   Message: $MESSAGE"
    fi
else
    echo "✗ HTTP ERROR: $HTTP_CODE"
fi

echo ""
echo "=== SELESAI ==="
echo "Cek log di storage/logs/laravel.log untuk detail debug"

# Cleanup
rm -f /tmp/cookies.txt
