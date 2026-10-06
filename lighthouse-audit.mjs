import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import fs from 'fs';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const wsUrl = browser.wsEndpoint();
const port = new URL(wsUrl).port;

const isDesktop = process.argv.includes('--desktop');
const outFile = isDesktop
  ? './lighthouse-report-desktop.html'
  : './lighthouse-report.html';

const flags = {
  port: Number(port),
  output: 'html',
  onlyCategories: ['accessibility', 'performance'],
};

if (isDesktop) {
  flags.formFactor = 'desktop';
  flags.screenEmulation = {
    mobile: false,
    width: 1350,
    height: 940,
    deviceScaleFactor: 1,
    disabled: false,
  };
  flags.throttling = {
    rttMs: 40,
    throughputKbps: 10 * 1024,
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  };
}

const runnerResult = await lighthouse('http://localhost:3000', flags);

fs.writeFileSync(outFile, runnerResult.report);
await browser.close();

const perf = Math.round(runnerResult.lhr.categories.performance.score * 100);
const a11y = Math.round(runnerResult.lhr.categories.accessibility.score * 100);

console.log('');
console.log('=== Lighthouse Results ===');
console.log('Performance:   ' + perf);
console.log('Accessibility: ' + a11y);
console.log('');
console.log('Report: ' + outFile);

if (a11y < 95) {
  console.log('');
  console.log('Accessibility violations:');
  Object.values(runnerResult.lhr.audits)
    .filter(a => a.score !== null && a.score < 1 && a.details?.type === 'table')
    .forEach(a => console.log('  - ' + a.id + ': ' + a.title));
}
