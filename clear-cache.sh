#!/bin/bash

echo "Clearing Angular build caches..."

# Kill any running ng processes
pkill -f "ng serve" 2>/dev/null || true

# Clear Angular CLI cache
ng cache clean 2>/dev/null || true

# Clear dist folder
rm -rf dist/

# Clear TypeScript build cache
rm -rf dist/out-tsc/
rm -f dist/out-tsc/.tsbuildinfo

# Clear node_modules cache (optional - uncomment if needed)
# rm -rf node_modules/
# npm install

echo "Cache cleared! You can now run 'ng serve' for a fresh build."
