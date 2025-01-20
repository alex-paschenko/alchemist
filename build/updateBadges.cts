import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const coverageDir = path.join(__dirname, '../coverage');
const originalReadmePath = path.join(__dirname, 'resources/README.template.md');
const readmePath = path.join(__dirname, '../README.md');

// Function to extract coverage percentage from coverage-final.json
function getCoveragePercentage(): string {
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
      coveredStatements += Object.values(statements).filter((count) => (count as number) > 0).length;
    }
  }

  if (totalStatements === 0) {
    throw new Error('No statements found in coverage data.');
  }

  const percentage = (coveredStatements / totalStatements) * 100;
  return `${percentage.toFixed(2)}%25`;
}

// Function to update the README file with the coverage percentage
function updateReadme(coverage: string): void {
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
} catch (error: any) {
  console.error('Error updating coverage badge:', error.message);
}
