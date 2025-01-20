"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const url_1 = require("url");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path.dirname(__filename);
const coverageDir = path.join(__dirname, '../coverage');
const originalReadmePath = path.join(__dirname, 'resources/README.template.md');
const readmePath = path.join(__dirname, '../README.md');
// Function to extract coverage percentage from coverage-final.json
function getCoveragePercentage() {
    const finalCoveragePath = path.join(coverageDir, 'coverage-final.json');
    if (!fs.existsSync(finalCoveragePath)) {
        throw new Error('Coverage final file not found. Ensure tests have been run and coverage is generated.');
    }
    const coverageData = JSON.parse(fs.readFileSync(finalCoveragePath, 'utf-8'));
    let totalStatements = 0;
    let coveredStatements = 0;
    for (const file in coverageData) {
        if (coverageData[file] && coverageData[file].s) {
            const statements = coverageData[file].s;
            totalStatements += Object.keys(statements).length;
            coveredStatements += Object.values(statements).filter((count) => count > 0).length;
        }
    }
    if (totalStatements === 0) {
        throw new Error('No statements found in coverage data.');
    }
    const percentage = (coveredStatements / totalStatements) * 100;
    return `${percentage.toFixed(2)}%`;
}
// Function to update the README file with the coverage percentage
function updateReadme(coverage) {
    if (!fs.existsSync(originalReadmePath)) {
        throw new Error('Original README template not found.');
    }
    const templateContent = fs.readFileSync(originalReadmePath, 'utf-8');
    const updatedContent = templateContent.replace('$$coverage$$', coverage);
    fs.writeFileSync(readmePath, updatedContent, 'utf-8');
    console.log('README.md updated successfully with coverage:', coverage);
}
// Main execution
try {
    const coverage = getCoveragePercentage();
    updateReadme(coverage);
}
catch (error) {
    console.error('Error updating coverage badge:', error.message);
}
//# sourceMappingURL=updateBadges.js.map