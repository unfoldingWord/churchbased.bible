// Screenshot with animations/transitions disabled and fonts settled — for
// apples-to-apples visual regression diffs.
import puppeteer from 'puppeteer-core';
const [url, out, width = '1280'] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'shell',
});
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: 800 });
await page.evaluateOnNewDocument(() => {
  const s = document.createElement('style');
  s.textContent = '*,*::before,*::after{transition:none!important;animation:none!important} [data-reveal]{opacity:1!important;transform:none!important;translate:none!important}';
  document.documentElement.appendChild(s);
});
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
await page.evaluate(async () => {
  await document.fonts.ready;
  for (let y = 0; y < document.body.scrollHeight; y += 700) {
    window.scrollTo({ top: y, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 60));
  }
  // Force-load any lazy image the scroll pass didn't catch, and wait for all.
  document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'));
  await Promise.all(
    [...document.images].map((i) =>
      i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })
    )
  );
  window.scrollTo({ top: 0, behavior: 'instant' });
  await new Promise((r) => setTimeout(r, 300));
});
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log('saved', out);
