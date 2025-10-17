#!/bin/bash

# Angular ng serve Troubleshooting Script
# Handles: cache corruption, version drift, watcher issues, config loops

echo "🔍 Angular ng serve Troubleshooting Toolkit"
echo "==========================================="

# Function to check and display versions
check_versions() {
    echo "📋 Checking versions..."
    echo "Node: $(node --version 2>/dev/null || echo 'Not found')"
    echo "npm: $(npm --version 2>/dev/null || echo 'Not found')"
    echo "Angular CLI: $(ng version --skip-git 2>/dev/null | grep 'Angular CLI' | head -1 || echo 'Not found')"
    echo "Project Angular: $(ng version --skip-git 2>/dev/null | grep '@angular/core' | head -1 || echo 'Not found')"
    echo ""
}

# Function to kill hanging processes
kill_hanging_processes() {
    echo "🔪 Killing hanging ng processes..."

    # Find and kill ng serve processes
    NG_PIDS=$(ps aux | grep -E "(ng serve|angular|esbuild)" | grep -v grep | awk '{print $2}')
    if [ ! -z "$NG_PIDS" ]; then
        echo "Found hanging processes: $NG_PIDS"
        echo $NG_PIDS | xargs kill -9 2>/dev/null || true
        echo "✓ Processes terminated"
    else
        echo "✓ No hanging processes found"
    fi
    echo ""
}

# Function to clear all caches
clear_caches() {
    echo "🧹 Clearing caches..."

    # Angular CLI cache
    ng cache clean 2>/dev/null && echo "✓ Angular CLI cache cleared" || echo "⚠ Angular CLI cache clear failed"

    # npm cache
    npm cache clean --force 2>/dev/null && echo "✓ npm cache cleared" || echo "⚠ npm cache clear failed"

    # TypeScript build cache
    rm -rf dist/out-tsc/ 2>/dev/null && echo "✓ TypeScript build cache cleared" || echo "⚠ TypeScript cache already clean"
    rm -f dist/out-tsc/.tsbuildinfo 2>/dev/null

    # Angular build outputs
    rm -rf dist/ 2>/dev/null && echo "✓ Build outputs cleared" || echo "⚠ Build outputs already clean"

    # Node modules cache (if specified)
    if [ "$1" = "--deep" ]; then
        echo "🔄 Deep cleaning: removing node_modules..."
        rm -rf node_modules/
        rm -f package-lock.json yarn.lock bun.lock 2>/dev/null
        echo "✓ Dependencies cleared - will need to reinstall"
    fi
    echo ""
}

# Function to check for problematic configurations
check_config_issues() {
    echo "⚙️  Checking configuration issues..."

    # Check for proxy config issues
    if [ -f "proxy.conf.json" ]; then
        echo "📡 Found proxy configuration - checking for loops..."
        if grep -q "localhost:4200" proxy.conf.json; then
            echo "⚠ Warning: Potential proxy loop detected in proxy.conf.json"
        fi
    fi

    # Check angular.json for problematic settings
    if [ -f "angular.json" ]; then
        # Check for deprecated properties
        if grep -q "buildOptimizer\|vendorChunk\|namedChunks" angular.json; then
            echo "⚠ Warning: Deprecated properties found in angular.json"
        fi

        # Check for excessive polling
        if grep -q '"poll".*[0-9]\{4,\}' angular.json; then
            echo "⚠ Warning: High polling interval detected (may cause performance issues)"
        fi
    fi

    echo "✓ Configuration check complete"
    echo ""
}

# Function to check file system watchers
check_watchers() {
    echo "👀 Checking file system watchers..."

    # Check system limits on macOS/Linux
    if command -v sysctl &> /dev/null; then
        MAX_FILES=$(sysctl -n kern.maxfiles 2>/dev/null || echo "unknown")
        OPEN_FILES=$(lsof 2>/dev/null | wc -l | tr -d ' ')
        echo "Max files: $MAX_FILES, Currently open: $OPEN_FILES"

        if [ "$OPEN_FILES" -gt 50000 ] 2>/dev/null; then
            echo "⚠ Warning: High number of open files may affect watchers"
        fi
    fi

    # Check for .git folder size (can slow down watchers)
    if [ -d ".git" ]; then
        GIT_SIZE=$(du -sh .git 2>/dev/null | cut -f1)
        echo "Git folder size: $GIT_SIZE"
    fi

    echo "✓ Watcher check complete"
    echo ""
}

# Function to apply quick fixes
apply_quick_fixes() {
    echo "🔧 Applying quick fixes..."

    # Create .angular folder if missing
    mkdir -p .angular 2>/dev/null

    # Ensure proper permissions
    chmod -R 755 node_modules/.bin/ 2>/dev/null || true

    # Fix common path issues
    export PATH="./node_modules/.bin:$PATH"

    echo "✓ Quick fixes applied"
    echo ""
}

# Function to test ng serve with different options
test_serve_options() {
    echo "🧪 Testing ng serve with different options..."

    # Test basic serve
    echo "Testing: ng serve --dry-run"
    ng serve --dry-run --port 4200 2>&1 | head -5

    echo ""
    echo "If the above looks good, try these serve options:"
    echo "1. ng serve --port 4200 --host 0.0.0.0"
    echo "2. ng serve --port 4200 --poll 2000"
    echo "3. ng serve --port 4200 --disable-host-check"
    echo "4. ng serve --port 4200 --no-live-reload"
    echo ""
}

# Main execution
main() {
    local DEEP_CLEAN=false

    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --deep)
                DEEP_CLEAN=true
                shift
                ;;
            --help|-h)
                echo "Usage: $0 [--deep] [--help]"
                echo "  --deep: Perform deep cleaning (removes node_modules)"
                echo "  --help: Show this help message"
                exit 0
                ;;
            *)
                echo "Unknown option: $1"
                exit 1
                ;;
        esac
    done

    check_versions
    kill_hanging_processes

    if [ "$DEEP_CLEAN" = true ]; then
        clear_caches --deep
        echo "🔄 Reinstalling dependencies..."
        npm install
        echo ""
    else
        clear_caches
    fi

    check_config_issues
    check_watchers
    apply_quick_fixes
    test_serve_options

    echo "🎯 Troubleshooting complete!"
    echo ""
    echo "Try running: ng serve --port 4200"
    echo "If issues persist, run with --deep flag for full cleanup"
}

# Run main function
main "$@"
