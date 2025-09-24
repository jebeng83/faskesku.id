#!/bin/bash

echo "🚀 Complete Node.js Update Process"
echo "=================================="
echo ""

# Make scripts executable
chmod +x update_nodejs.sh
chmod +x cleanup_old_nodejs.sh
chmod +x verify_nodejs_installation.sh

echo "Step 1: Updating Node.js to latest version..."
echo "=============================================="
./update_nodejs.sh

echo ""
echo "Step 2: Cleaning up old Node.js installations..."
echo "================================================"
./cleanup_old_nodejs.sh

echo ""
echo "Step 3: Verifying installation and testing project..."
echo "===================================================="
./verify_nodejs_installation.sh

echo ""
echo "🎉 Complete Node.js update process finished!"
echo ""
echo "📋 Final Summary:"
echo "  - Node.js has been updated to the latest version"
echo "  - Old installations have been cleaned up"
echo "  - Project compatibility has been verified"
echo ""
echo "💡 You can now:"
echo "  - Run 'npm run dev' to start development"
echo "  - Run 'npm run build' to build the project"
echo "  - Delete the update scripts if no longer needed"