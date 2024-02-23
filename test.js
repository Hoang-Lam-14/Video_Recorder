const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");
const { installMouseHelper } = require("./install-mouse-helper");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function createBrowser(url) {
  let browser = await puppeteer.launch({
    // headless: "new",
    headless: false,
    defaultViewport: null,
    args: [`--window-size=1920,1130`],
    ignoreHTTPSErrors: true,
    ignoreDefaultArgs: ["--enable-automation"],
  });

  return browser;
}

function sleep(ms) {
  return new Promise(function (res) {
    setTimeout(res, ms);
  });
}

async function main() {
  let browser = await createBrowser();
  let page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 5 });
  await page.goto(`https://app.subiz.com.vn/login`, {
    waitUntil: "load",
  });

  await page.waitForSelector(".auth-form");
  let userInut = await page.waitForSelector(".form-control.auth-form__input");

  const boundingBox = await userInut.boundingBox();
  await page.mouse.move(
    boundingBox.x + boundingBox.width / 2,
    boundingBox.y + boundingBox.height / 2,
    { steps: 10 }
  );
  await userInut.type("lamhoang@subiz.com");
  await sleep(1000);
  let passwordInput = await page.waitForSelector(
    ".form-control.auth-form__password-input.auth-form__input"
  );

  const boundingBox2 = await passwordInput.boundingBox();
  await page.mouse.move(
    boundingBox2.x + boundingBox2.width / 2,
    boundingBox2.y + boundingBox2.height / 2,
    { steps: 10 }
  );
  await passwordInput.type("ajlekuNQ");
  await sleep(1000);

  let button = await page.waitForSelector(".btn.btn__primary.auth-form__btn");

  const boundingBoxBtn = await button.boundingBox();
  await page.mouse.move(
    boundingBoxBtn.x + boundingBoxBtn.width / 2,
    boundingBoxBtn.y + boundingBoxBtn.height / 2,
    { steps: 10 }
  );

  await page.click(".btn.btn__primary.auth-form__btn");
  await page.waitForNavigation();

  await page.evaluate(() => {
    document.querySelector("div").style.width = "1336px";
    document.querySelector("div").style.height = "752px";
    document.body.style.zoom = 1.437;
    document.body.requestFullscreen();
  });
  await sleep(10000);

  const recorder = await page.screencast({
    path: "recording.webm",
  });

  await sleep(7000);

  await recorder.stop();
  await browser.close();
  return;

}

main();
