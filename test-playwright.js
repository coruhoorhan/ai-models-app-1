import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
    console.log('PAGE EXCEPTION:', err.toString());
  });
  
  console.log("Navigating to /");
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  console.log("Navigating to /pricing");
  await page.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  console.log("Done");
  await browser.close();
})();
