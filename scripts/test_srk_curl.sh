#!/bin/bash

# Script uji coba endpoint Referensi SRK PCare via curl
# 
# Usage:
#   bash scripts/test_srk_curl.sh
#   bash scripts/test_srk_curl.sh "DM"
#   bash scripts/test_srk_curl.sh "" 0 10

Q="${1:-}"
START="${2:-0}"
LIMIT="${3:-25}"

# Ambil base URL dari .env atau gunakan default
# Cek apakah APP_URL sudah di-set, jika tidak gunakan default Laravel
if [ -z "$APP_URL" ]; then
    # Coba ambil dari .env file
    if [ -f .env ]; then
        APP_URL=$(grep "^APP_URL=" .env | cut -d '=' -f2- | tr -d '"' | tr -d "'")
    fi
    # Jika masih kosong, gunakan default Laravel
    BASE_URL="${APP_URL:-http://127.0.0.1:8000}"
else
    BASE_URL="$APP_URL"
fi
ENDPOINT="${BASE_URL}/pcare/api/srk/rekap/test"

echo "=== Test Referensi SRK PCare via cURL ==="
echo "Query: ${Q:-'(kosong)'}"
echo "Start: $START"
echo "Limit: $LIMIT"
echo "Endpoint: $ENDPOINT"
echo ""

# Build query string
QUERY_PARAMS="start=$START&limit=$LIMIT"
if [ -n "$Q" ]; then
    QUERY_PARAMS="q=$(echo "$Q" | sed 's/ /%20/g')&$QUERY_PARAMS"
fi

FULL_URL="${ENDPOINT}?${QUERY_PARAMS}"

echo "Full URL: $FULL_URL"
echo ""

# Execute curl
curl -v \
    -H "Accept: application/json" \
    -H "Content-Type: application/json" \
    "$FULL_URL" \
    2>&1 | tee /tmp/srk_test_response.txt

echo ""
echo ""
echo "=== Response Summary ==="
if command -v jq &> /dev/null; then
    echo "Formatted JSON:"
    cat /tmp/srk_test_response.txt | grep -A 1000 "^{" | jq '.' 2>/dev/null || echo "Failed to parse JSON"
else
    echo "Install 'jq' for better JSON formatting"
    echo "Raw response saved to: /tmp/srk_test_response.txt"
fi

