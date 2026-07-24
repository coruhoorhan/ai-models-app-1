import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR LOG:', msg.text());
  });
  
  page.on('pageerror', err => {
    console.log('PAGE EXCEPTION:', err.toString());
  });
  
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await page.goto('http://localhost:4173/pricing', { waitUntil: 'networkidle0' });
  
  await browser.close();
})();
