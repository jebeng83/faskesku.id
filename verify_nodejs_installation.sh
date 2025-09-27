#!/bin/bash

echo "🔍 Verifying Node.js installation and project compatibility..."

# Check Node.js version
echo "📋 Node.js version:"
node -v

# Check npm version
echo "📋 npm version:"
npm -v

# Check if Node.js is working properly
echo "🧪 Testing Node.js functionality..."
node -e "console.log('✅ Node.js is working properly!')"

# Check npm functionality
echo "🧪 Testing npm functionality..."
npm --version > /dev/null && echo "✅ npm is working properly!"

# Check project dependencies
echo "🔍 Checking project dependencies..."
if [ -f "package.json" ]; then
    echo "📦 Found package.json"
    
    # Install dependencies
    echo "📦 Installing project dependencies..."
    npm install
    
    # Check if installation was successful
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully!"
    else
        echo "❌ Error installing dependencies"
        exit 1
    fi
    
    # Try to run build script if it exists
    if npm run build --dry-run 2>/dev/null; then
        echo "🏗️  Testing build script..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "✅ Build completed successfully!"
        else
            echo "⚠️  Build failed - may need dependency updates"
        fi
    else
        echo "ℹ️  No build script found in package.json"
    fi
    
    # Try to run dev script if it exists
    if npm run dev --dry-run 2>/dev/null; then
        echo "ℹ️  Development server script is available"
        echo "💡 You can run 'npm run dev' to start the development server"
    else
        echo "ℹ️  No dev script found in package.json"
    fi
    
else
    echo "⚠️  No package.json found in current directory"
fi

# Check for potential compatibility issues
echo "🔍 Checking for potential compatibility issues..."

# Check if there are any deprecated packages
echo "🔍 Checking for deprecated packages..."
npm audit --audit-level=moderate 2>/dev/null || echo "ℹ️  npm audit not available or no issues found"

echo "🎉 Node.js verification completed!"
echo ""
echo "📋 Summary:"
echo "  - Node.js version: $(node -v)"
echo "  - npm version: $(npm -v)"
echo "  - Installation location: $(which node)"
echo ""
echo "💡 Next steps:"
echo "  1. Run 'npm run dev' to start development server"
echo "  2. Run 'npm run build' to build the project"
echo "  3. Check for any deprecated packages with 'npm audit'"