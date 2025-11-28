#!/bin/bash

# Script untuk stop semua proses Octane yang berjalan

echo "🛑 Stopping Octane processes..."

# Stop proses di port 8000 (default)
if lsof -i :8000 > /dev/null 2>&1; then
    echo "Found process on port 8000, stopping..."
    lsof -ti :8000 | xargs kill
    echo "✅ Port 8000 cleared"
else
    echo "✅ Port 8000 is already free"
fi

# Stop proses di port 8001 (alternatif)
if lsof -i :8001 > /dev/null 2>&1; then
    echo "Found process on port 8001, stopping..."
    lsof -ti :8001 | xargs kill
    echo "✅ Port 8001 cleared"
else
    echo "✅ Port 8001 is already free"
fi

# Stop semua proses artisan octane
pkill -f "artisan octane:start" 2>/dev/null

echo "✅ All Octane processes stopped"
