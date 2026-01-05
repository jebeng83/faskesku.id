#!/bin/bash

# Script untuk testing WA Gateway via terminal
# Usage: ./test-wagateway.sh

BASE_URL="http://127.0.0.1:8000"
WAGATEWAY_BASE="http://127.0.0.1:8100"

echo "=========================================="
echo "Testing WA Gateway"
echo "=========================================="
echo ""

# Step 1: Cek status Node gateway langsung
echo "1. Checking Node Gateway Status (direct)..."
curl -s "$WAGATEWAY_BASE/status" | jq '.' || echo "Node gateway tidak dapat diakses di $WAGATEWAY_BASE"
echo ""
echo "---"
echo ""

# Step 2: Cek status via Laravel API
echo "2. Checking Status via Laravel API..."
STATUS_RESPONSE=$(curl -s "$BASE_URL/api/wagateway/status")
echo "$STATUS_RESPONSE" | jq '.' || echo "$STATUS_RESPONSE"
echo ""
echo "---"
echo ""

# Parse status
AUTHENTICATED=$(echo "$STATUS_RESPONSE" | jq -r '.whatsapp_authenticated // false')
READY=$(echo "$STATUS_RESPONSE" | jq -r '.data.whatsapp_ready // false')

echo "Status Summary:"
echo "  - Authenticated: $AUTHENTICATED"
echo "  - Ready: $READY"
echo ""

if [ "$AUTHENTICATED" != "true" ]; then
    echo "❌ WhatsApp belum terautentikasi. Silakan scan QR code terlebih dahulu."
    exit 1
fi

if [ "$READY" != "true" ]; then
    echo "⚠️  WhatsApp sudah authenticated tapi belum ready. Tunggu beberapa saat..."
    echo "   Coba lagi dalam 5-10 detik."
    exit 1
fi

echo "✅ Client sudah authenticated dan ready!"
echo ""
echo "---"
echo ""

# Step 3: Test kirim pesan
echo "3. Testing Send Message..."
echo "   To: 6285229977208"
echo "   Text: Test pesan dari terminal"

SEND_RESPONSE=$(curl -s -X POST "$BASE_URL/api/wagateway/send" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "to": "6285229977208",
    "text": "Test pesan dari terminal - '$(date +"%Y-%m-%d %H:%M:%S")'"
  }')

echo "$SEND_RESPONSE" | jq '.' || echo "$SEND_RESPONSE"
echo ""

OK=$(echo "$SEND_RESPONSE" | jq -r '.ok // false')
if [ "$OK" == "true" ]; then
    echo "✅ Pesan berhasil dikirim!"
else
    ERROR=$(echo "$SEND_RESPONSE" | jq -r '.error // "Unknown error"')
    HINT=$(echo "$SEND_RESPONSE" | jq -r '.hint // ""')
    echo "❌ Gagal mengirim pesan: $ERROR"
    if [ ! -z "$HINT" ]; then
        echo ""
        echo "Hint: $HINT"
    fi
fi

echo ""
echo "=========================================="
echo "Testing selesai"
echo "=========================================="

