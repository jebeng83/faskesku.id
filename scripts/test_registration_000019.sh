#!/bin/bash

# Script untuk uji coba registrasi pasien via terminal
# No RM: 000019
# Dokter: dr. Ratna Candrasari (D0000003)
# Poli: UMUM (UMU)
# Cara Bayar: UMUM (A09)

# Base URL
BASE_URL="http://127.0.0.1:8000"

# Data registrasi
NO_RM="000019"
KD_DOKTER="D0000003"
KD_POLI="UMU"
KD_PJ="A09"
P_JAWAB="RIZKI AMALIA"
ALMT_PJ="Alamat Pasien"
HUBUNGANPJ="DIRI SENDIRI"

# Langkah 1: Ambil CSRF token
echo "=== Langkah 1: Mengambil CSRF Token ==="
CSRF_RESPONSE=$(curl -s -c /tmp/cookies.txt -b /tmp/cookies.txt "${BASE_URL}/sanctum/csrf-cookie" -X GET)
echo "CSRF Cookie Response: $CSRF_RESPONSE"

# Tunggu sebentar untuk memastikan cookie ter-set
sleep 1

# Langkah 2: Ambil token dari cookie
# Cookie XSRF-TOKEN biasanya di-encode URL, jadi perlu decode
CSRF_TOKEN=$(grep -i 'XSRF-TOKEN' /tmp/cookies.txt 2>/dev/null | awk '{print $NF}' | sed 's/%/\\x/g' | xargs -0 printf 2>/dev/null || grep -i 'XSRF-TOKEN' /tmp/cookies.txt 2>/dev/null | awk '{print $NF}')

if [ -z "$CSRF_TOKEN" ]; then
    echo "Warning: CSRF token tidak ditemukan di cookie, mencoba mengambil dari meta tag"
    # Coba ambil dari meta tag dengan curl
    HTML_RESPONSE=$(curl -s -b /tmp/cookies.txt -c /tmp/cookies.txt "${BASE_URL}/registration")
    CSRF_TOKEN=$(echo "$HTML_RESPONSE" | grep -oP 'name="csrf-token" content="\K[^"]*' | head -1)
fi

if [ -z "$CSRF_TOKEN" ]; then
    echo "Error: Tidak dapat mengambil CSRF token"
    exit 1
fi

echo "CSRF Token: ${CSRF_TOKEN:0:40}..."

# Langkah 3: Buat payload JSON
PAYLOAD=$(cat <<EOF
{
    "kd_dokter": "${KD_DOKTER}",
    "kd_poli": "${KD_POLI}",
    "kd_pj": "${KD_PJ}",
    "p_jawab": "${P_JAWAB}",
    "almt_pj": "${ALMT_PJ}",
    "hubunganpj": "${HUBUNGANPJ}"
}
EOF
)

echo ""
echo "=== Langkah 2: Mengirim Request Registrasi ==="
echo "URL: ${BASE_URL}/registration/${NO_RM}/register"
echo "Payload:"
echo "$PAYLOAD" | jq '.'

# Langkah 4: Kirim request POST
RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    "${BASE_URL}/registration/${NO_RM}/register" \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "X-Requested-With: XMLHttpRequest" \
    -H "X-CSRF-TOKEN: ${CSRF_TOKEN}" \
    -H "X-XSRF-TOKEN: ${CSRF_TOKEN}" \
    -b /tmp/cookies.txt \
    -c /tmp/cookies.txt \
    -d "$PAYLOAD")

# Pisahkan response body dan status code
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo ""
echo "=== Response ==="
echo "HTTP Status Code: $HTTP_CODE"
echo "Response Body:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

# Cleanup
rm -f /tmp/cookies.txt

echo ""
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Registrasi berhasil!"
else
    echo "❌ Registrasi gagal dengan status code: $HTTP_CODE"
fi

