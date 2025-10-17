#!/usr/bin/env node

// Angular Configuration Validator
// Checks for common config issues that cause ng serve to hang

const fs = require('fs');
const path = require('path');

function validateAngularConfig() {
    console.log('🔍 Validating Angular Configuration...\n');

    const configPath = path.join(process.cwd(), 'angular.json');

    if (!fs.existsSync(configPath)) {
        console.log('❌ angular.json not found');
        return false;
    }

    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const issues = [];
        const warnings = [];

        // Check for deprecated properties that cause schema errors
        const deprecatedProps = ['buildOptimizer', 'vendorChunk', 'namedChunks', 'extractCss'];
        const projectName = Object.keys(config.projects)[0];
        const buildConfig = config.projects[projectName]?.architect?.build;

        if (buildConfig) {
            // Check development configuration
            const devConfig = buildConfig.configurations?.development;
            if (devConfig) {
                deprecatedProps.forEach(prop => {
                    if (devConfig[prop] !== undefined) {
                        issues.push(`Deprecated property '${prop}' found in development configuration`);
                    }
                });
            }

            // Check for problematic polling settings
            const serveConfig = config.projects[projectName]?.architect?.serve;
            if (serveConfig?.options?.poll) {
                const pollValue = serveConfig.options.poll;
                if (pollValue < 500) {
                    warnings.push(`Poll interval (${pollValue}ms) is very aggressive and may cause high CPU usage`);
                } else if (pollValue > 5000) {
                    warnings.push(`Poll interval (${pollValue}ms) is very slow and may delay updates`);
                }
            }

            // Check for proxy configuration issues
            if (serveConfig?.options?.proxyConfig) {
                const proxyPath = serveConfig.options.proxyConfig;
                if (fs.existsSync(proxyPath)) {
                    try {
                        const proxyConfig = JSON.parse(fs.readFileSync(proxyPath, 'utf8'));
                        Object.entries(proxyConfig).forEach(([context, config]) => {
                            if (config.target && config.target.includes('localhost:4200')) {
                                issues.push(`Potential proxy loop detected: ${context} -> ${config.target}`);
                            }
                        });
                    } catch (e) {
                        warnings.push(`Could not parse proxy configuration: ${proxyPath}`);
                    }
                }
            }

            // Check for excessive assets
            const assets = buildConfig.options?.assets || [];
            if (assets.length > 50) {
                warnings.push(`Large number of assets (${assets.length}) may slow build process`);
            }

            // Check for missing required files
            const requiredFiles = ['src/main.ts', 'src/index.html'];
            requiredFiles.forEach(file => {
                if (!fs.existsSync(file)) {
                    issues.push(`Required file missing: ${file}`);
                }
            });
        }

        // Report results
        if (issues.length === 0 && warnings.length === 0) {
            console.log('✅ Configuration looks good!');
        } else {
            if (issues.length > 0) {
                console.log('❌ Critical Issues Found:');
                issues.forEach(issue => console.log(`  • ${issue}`));
                console.log('');
            }

            if (warnings.length > 0) {
                console.log('⚠️  Warnings:');
                warnings.forEach(warning => console.log(`  • ${warning}`));
                console.log('');
            }
        }

        return issues.length === 0;

    } catch (error) {
        console.log(`❌ Error parsing angular.json: ${error.message}`);
        return false;
    }
}

function generateOptimalConfig() {
    console.log('🔧 Generating optimal serve configuration...\n');

    const optimalServeOptions = {
        "serve": {
            "builder": "@angular-devkit/build-angular:dev-server",
            "options": {
                "liveReload": true,
                "hmr": false,
                "poll": 1000,
                "host": "localhost",
                "port": 4200
            },
            "configurations": {
                "development": {
                    "buildTarget": "around:build:development"
                },
                "production": {
                    "buildTarget": "around:build:production"
                }
            },
            "defaultConfiguration": "development"
        }
    };

    console.log('Recommended serve configuration:');
    console.log(JSON.stringify(optimalServeOptions, null, 2));
}

// Main execution
if (require.main === module) {
    const isValid = validateAngularConfig();

    if (!isValid) {
        console.log('\n' + '='.repeat(50));
        generateOptimalConfig();
    }

    console.log('\n💡 Quick fixes:');
    console.log('  • Run: ng cache clean');
    console.log('  • Kill hanging processes: pkill -f "ng serve"');
    console.log('  • Clear dist: rm -rf dist/');
    console.log('  • For deep clean: ./ng-serve-troubleshoot.sh --deep');
}
