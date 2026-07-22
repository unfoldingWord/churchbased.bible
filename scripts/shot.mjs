// Full-page screenshot via system Chrome: node scripts/shot.mjs <url> <out.png> [width]
import puppeteer from 'puppeteer-core';

const [url, out, width = '1280'] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'shell',
});
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: 800 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
// let lazy images + reveal animations settle
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const step = () => {
      y += 600;
      window.scrollTo({ top: y, behavior: 'instant' });
      if (y < document.body.scrollHeight) setTimeout(step, 60);
      else {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(res, 400);
      }
    };
    step();
  });
});
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log('saved', out);
