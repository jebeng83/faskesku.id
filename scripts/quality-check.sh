#!/bin/bash

# Script untuk menjalankan quality check (lint + typecheck)
# Digunakan untuk memastikan kode selalu memenuhi standar sebelum commit/build

set -e  # Exit on error

echo "🔍 Running quality checks..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Run ESLint
echo -e "${YELLOW}📝 Running ESLint...${NC}"
if npm run lint; then
    echo -e "${GREEN}✅ ESLint passed${NC}"
else
    echo -e "${RED}❌ ESLint failed${NC}"
    echo -e "${YELLOW}💡 Run 'npm run lint:fix' to auto-fix some issues${NC}"
    exit 1
fi

echo ""

# Run TypeScript type check
echo -e "${YELLOW}🔷 Running TypeScript type check...${NC}"
if npm run typecheck; then
    echo -e "${GREEN}✅ TypeScript type check passed${NC}"
else
    echo -e "${RED}❌ TypeScript type check failed${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✨ All quality checks passed!${NC}"
