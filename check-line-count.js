import fs from 'fs';
import path from 'path';

const MAX_LINES = 150;
const IGNORED_FILES = ['types.ts', 'design-tokens.css', 'tailwind.config.ts', 'package.json', 'package-lock.json', 'bun.lock'];
const IGNORED_DIRS = ['node_modules', 'dist', '.git'];
let hasError = false;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').length;
  if (lines > MAX_LINES) {
    console.error(`❌ Error: File ${filePath} exceeds ${MAX_LINES} lines (currently ${lines} lines).`);
    hasError = true;
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!IGNORED_DIRS.includes(file)) {
        walkDir(filePath);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      if (!IGNORED_FILES.includes(file) && !file.includes('.test.') && !file.includes('.spec.')) {
        checkFile(filePath);
      }
    }
  }
}

walkDir('./src');

if (hasError) {
  process.exit(1);
} else {
  console.log(`✅ All files pass the ${MAX_LINES} line limit.`);
}
