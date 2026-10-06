import puppeteer from 'puppeteer';

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  let reqs = [];
  let resps = [];
  page.on('request', req => {
    const url = req.url();
    if (url.includes('emailjs')) reqs.push(url);
  });
  page.on('response', async res => {
    const url = res.url();
    if (url.includes('emailjs')) {
      try {
        const text = await res.text();
        resps.push({ url, status: res.status(), body: text });
      } catch {}
    }
  });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.waitForTimeout(4000);
  await page.waitForSelector('#contact', { visible: true });
  await page.type('#name', 'José');
  await page.type('#email', 'jpicado011@gmail.com');
  await page.type('#message', 'Automated test to diagnose rejection');
  await page.evaluate(() => {
    const hp = document.getElementById('company');
    if (hp) hp.value = '';
  });
  const form = await page.$('#contact-form');
  if (form) await form.evaluate(f => f.requestSubmit());
  await page.waitForTimeout(10000);
  const statusText = await page.evaluate(() => {
    const el = document.querySelector('.form__status');
    return el ? el.textContent : 'no-status';
  });
  console.log(JSON.stringify({ reqs, resps, uiStatus: statusText }));
  await browser.close();
}

run();
