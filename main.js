const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");
const { installMouseHelper } = require("./install-mouse-helper");

async function createBrowser(url) {
  let browser = await puppeteer.launch({
    // headless: "new",
    headless: false,
    defaultViewport: null,
    args: [`--window-size=1920,1130`],
    ignoreHTTPSErrors: true,
  });

  return browser;
}

async function clearBrowser(page) {
  await page.evaluate(() => localStorage.clear());
  const cookies = await page.cookies();
  for (const cookie of cookies) await page.deleteCookie(cookie);
}
function sleep(ms) {
  return new Promise(function (res) {
    setTimeout(res, ms);
  });
}

async function login(page) {
  await page.goto(`http://localhost:8080/login?redirect=%2Fconvo`, {
    waitUntil: "load",
  });
  await sleep(1000);

  page.mouse.move(500, 500, { steps: 20 });
  await sleep(1000);

  await page.waitForSelector(".auth-form");
  let userInut = await page.waitForSelector(".form-control.auth-form__input");

  const boundingBox = await userInut.boundingBox();
  await page.mouse.move(
    boundingBox.x + boundingBox.width / 2,
    boundingBox.y + boundingBox.height / 2,
    { steps: 10 }
  );
  await userInut.type("lamhoang@subiz.com", { delay: 100 });
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
  await passwordInput.type("ajlekuNQ", { delay: 100 });
  await sleep(1000);

  let button = await page.waitForSelector(".btn.btn__primary.auth-form__btn");

  const boundingBoxBtn = await button.boundingBox();
  await page.mouse.move(
    boundingBoxBtn.x + boundingBoxBtn.width / 2,
    boundingBoxBtn.y + boundingBoxBtn.height / 2,
    { steps: 10 }
  );
  await sleep(1000);
  await page.mouse.click(
    boundingBoxBtn.x + boundingBoxBtn.width / 2,
    boundingBoxBtn.y + boundingBoxBtn.height / 2
  );
  // await page.click(".btn.btn__primary.auth-form__btn");
  await page.waitForNavigation();

  await sleep(2000);
}

async function sendProduct(page) {
  let input = await page.waitForSelector(".lexical_editor_input");
  await page.mouse.move(900, 780, { steps: 20 });
  await sleep(500);
  await input.type("/gia", { delay: 100 });
  await sleep(500);
  await page.keyboard.press("Enter");
  await sleep(500);
  await page.keyboard.press("Enter");
  await sleep(1000);
  await page.evaluate(async () => {
    let date = Date.now();
    await handleRT({
      id: "evrwwasqzqpgctdosgbavzzzz",
      account_id: "acpxkgumifuoofoosble",
      created: date,
      type: "message_sent",
      by: {
        client_id: "dashboard",
        id: "agrsvlmesmacutzpiz",
        type: "agent",
      },
      touchpoint: {
        id: "6289724947817028",
        channel: "facebook",
        source: "310894785705836",
      },
      data: {
        message: {
          conversation_id: "csrwwasqyzgqqfhhhh",
          text: "Dạ, em gửi chị bảng giá gói dịch vụ Subiz cơ bản dành cho 1 agent ạ!",
          format: "plaintext",
          attachments: [
            {
              type: "file",
              mimetype: "image/png",
              url: "https://vcdn.subiz-cdn.com/file/5e05db13f0dc1555b935367ac9897869d8dd73097bfa9e94d1a4a88d059dd902_acpxkgumifuoofoosble",
              thumbnail_url:
                "https://vcdn.subiz-cdn.com/file/firwwvhtgjotkcdljnvf_512_5e05db13f0dc1555b935367ac9897869d8dd73097bfa9e94d1a4a88d059dd902_acpxkgumifuoofoosble_acpxkgumifuoofoosble",
              name: "Bảng giá Gói cơ bản.png",
              size: 740963,
              file_id:
                "5e05db13f0dc1555b935367ac9897869d8dd73097bfa9e94d1a4a88d059dd902_acpxkgumifuoofoosble",
              md5: "68b771d13cf6eb045923fdca85f98664",
              width: 1500,
              height: 1564,
              thumbnail_width: 160,
              thumbnail_height: 167,
            },
          ],
        },
      },
    });
  });

  await sleep(1000);
  await page.evaluate(async () => {
    let date = Date.now();
    await handleRT({
      id: "evrwwasqzqpgctdosgbavwwww",
      account_id: "acpxkgumifuoofoosble",
      created: date,
      type: "message_sent",
      by: {
        id: "usrtquywfmwttnwejhhhh",
        client_id: "fabikon",
        type: "user",
      },
      touchpoint: {
        id: "6289724947817028",
        channel: "facebook",
        source: "310894785705836",
      },
      data: {
        message: {
          conversation_id: "csrwwasqyzgqqfhhhh",
          text: "Mình muốn tham khảo gói Subiz cơ bản",
          format: "plaintext",
        },
      },
    });
  });
  await sleep(1000);
  let icon = await page.$$(".lexical_editor_toolbar_btn.has-tooltip");
  let boundingBox = await icon[1].boundingBox();
  await page.mouse.move(
    boundingBox.x + boundingBox.height / 2,
    boundingBox.y + boundingBox.width / 2,
    { steps: 20 }
  );
  await sleep(500);
  await page.mouse.click(
    boundingBox.x * 1.1 + boundingBox.height / 2,
    boundingBox.y * 1.1 + boundingBox.width / 2
  );
  await sleep(500);
  let product = await page.waitForSelector(".product_res.dummy");
  let productBox = await product.boundingBox();
  await page.mouse.move(
    productBox.x + productBox.height / 2,
    productBox.y + productBox.width / 2,
    { steps: 20 }
  );
  await sleep(500);
  await page.mouse.click(
    productBox.x * 1.1 + productBox.height / 2,
    productBox.y / 1.1 / 1.1 + productBox.width / 2,
    { steps: 20 }
  );
  await sleep(1000);
  let btn = await page.waitForSelector(".btn.btn__primary.mr-3");
  let productBoxBtn = await btn.boundingBox();
  await page.mouse.move(
    productBoxBtn.x + productBoxBtn.height / 2,
    productBoxBtn.y + productBoxBtn.width / 2,
    { steps: 20 }
  );
  await sleep(500);
  await page.click(".btn.btn__primary.mr-3");
  await sleep(1000);
  await page.evaluate(async () => {
    let date = Date.now();
    await handleRT({
      id: "evrwwasqzqpgctdosgbavvvvv",
      account_id: "acpxkgumifuoofoosble",
      created: date,
      type: "message_sent",
      by: {
        client_id: "dashboard",
        id: "agrsvlmesmacutzpiz",
        type: "agent",
      },
      touchpoint: {
        id: "6289724947817028",
        channel: "facebook",
        source: "310894785705836",
      },
      data: {
        message: {
          conversation_id: "csrwwasqyzgqqfhhhh",
          format: "plaintext",
          attachments: [
            {
              type: "product",
              product: {
                id: "240259",
                product_group_id: "240259",
                handle: "co-ban---1-agent---1-thang",
                name: "Cơ bản - 1 agent - 1 tháng",
                i18n_name: {
                  vi_VN: "Cơ bản - 1 agent - 1 tháng",
                },
                image:
                  "https://vcdn.subiz-cdn.com/file/firslrejhxuuiflkecdv_acpxkgumifuoofoosble",
                images: [
                  "https://vcdn.subiz-cdn.com/file/firslrejhxuuiflkecdv_acpxkgumifuoofoosble",
                ],
                visibility: "published",
                price: 261862,
              },
            },
          ],
          fields: [
            {
              key: "idempotency",
              value: '"idiklwtkiurf"',
            },
          ],
        },
      },
    });
  });
  await page.click(".product_select_close");
  await sleep(1000);
}

async function main() {
  let browser = await createBrowser();
  let page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 5 });

  // await installMouseHelper(page);
  await login(page);
  await sleep(1000);

  await page.click(".btn.btn__lg.btn__light.ml-4");
  await sleep(1000);

  await page.evaluate(() => {
    document.querySelector("div").style.width = "1336px";
    document.querySelector("div").style.height = "752px";
    document.body.style.zoom = 1.437;
    document.body.requestFullscreen();
  });
  await sleep(3000);

  const recorder = await page.screencast({
    path: "subiz.webm",
  });

  await page.evaluate(async () => {
    let date = Date.now();
    const events1 = [
      {
        id: "evrwwasqzolvuynwfvlafaaaa",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "conversation_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfaaaa",
            account_id: "acpxkgumifuoofoosble",
            created: date,
            members: [
              {
                type: "agent",
                id: "agqsupqkmdtokktfgn",
                membership: "observer",
                invited_by: {
                  id: "agrsvlmesmacutzpiz",
                  client_id: "dashboard",
                  type: "agent",
                },
                joined_at: 1705393431154,
                seen_at: 1705396883712,
                received_at: 1705396883712,
                invite_reason: "6",
              },
              {
                type: "agent",
                id: "agohhwgfuxitmyif39",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejaaaa",
                  type: "user",
                },
                joined_at: 1705380805853,
                seen_at: 1705399966039,
                received_at: 1705399966039,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agpxkgycwccstrfptx",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejaaaa",
                  type: "user",
                },
                joined_at: 1705380805737,
                seen_at: 1705400138838,
                received_at: 1705400138838,
                invite_reason: "15",
              },
              {
                type: "user",
                id: "usrtquywfmwttnwejaaaa",
                membership: "active",
                invited_by: {
                  id: "usrtquywfmwttnwejaaaa",
                  type: "user",
                },
                first_message_at: 1705380806339,
                seen_at: 1705400120312,
                received_at: 1705400139443,
                last_sent: 1705400119571,
                total_messages: 5,
              },
              {
                type: "agent",
                id: "agriviekoixdhmwpcc",
                membership: "active",
                invited_by: {
                  id: "usrtquywfmwttnwejaaaa",
                  type: "user",
                },
                joined_at: 1705380805762,
                first_message_at: 1705381658269,
                seen_at: 1705400230458,
                received_at: 1705400230458,
                last_sent: 1705400139089,
                invite_reason: "5",
                total_messages: 9,
              },
              {
                type: "agent",
                id: "agqmwfyuehpuzpehmv",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejaaaa",
                  type: "user",
                },
                joined_at: 1705380806024,
                seen_at: 1705516692722,
                received_at: 1705516692722,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrsvlmesmacutzpiz",
                membership: "observer",
                invited_by: {
                  id: "agqmwfyuehpuzpehmv",
                  client_id: "dashboard",
                  type: "agent",
                },
                joined_at: 1705392885862,
                seen_at: 1706168936611,
                received_at: 1706168916813,
                invite_reason: "6",
              },
            ],
            state: "pending",
            touchpoint: {
              id: "csrwqpebneeclziyyz",
              channel: "subiz",
              source: "web",
            },
            integration: {
              account_id: "acpxkgumifuoofoosble",
              connector_id: "subikon",
              name: "Subiz chat",
              connector_type: "subiz",
              state: "activated",
              id: "acpxkgumifuoofoosble.subizv4.subikon",
            },
            actived: date,
            updated: date,
            is_returned: true,
            _subconvos: [],
          },
        },
      },

      {
        id: "evrwwasqzqpgctdosgbavaaaa",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "message_sent",
        by: {
          id: "usrtquywfmwttnwejaaaa",
          client_id: "clsubizapi",
          type: "user",
        },
        touchpoint: {
          id: "csrwqpebneeclziyyz",
          channel: "subiz",
          source: "web",
        },
        data: {
          message: {
            conversation_id: "csrwwasqyzgqqfaaaa",
            text: "Bạn còn iPhone 15 loại 256Gb không?",
            format: "plaintext",
          },
        },
      },

      {
        id: "evrwwasqzpmlntcrxktjuaaaa",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "my_conversation_list_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfaaaa",
            tags: [{}],
            state: "active",
            touchpoint: {
              id: "csrwqpebneeclziyyz",
              channel: "subiz",
              source: "web",
            },
            integration: {
              id: "acpxkgumifuoofoosble.subizv4.subikon",
            },
            actived: date,
            fields: [
              {
                key: "data",
                value: "[replied]",
              },
            ],
            read: true,
          },
        },
      },
    ];

    await handleRT(events1[0]);
    await handleRT(events1[1]);
    await handleRT(events1[2]);
  });

  await sleep(1000);

  let convo1 = await page.waitForSelector(
    '[attr-convo-id="csrwwasqyzgqqfaaaa"]'
  );

  const boundingBox1 = await convo1.boundingBox();
  await page.mouse.click(160, 180);

  let input1 = await page.waitForSelector(".lexical_editor_input");
  await input1.type("Shop mình còn bạn nhé. Bạn muốn điện thoại màu gì ạ?");
  await sleep(500);
  await page.keyboard.press("Enter");
  await sleep(500);
  await page.keyboard.press("Enter");
  await sleep(500);
  await page.evaluate(async () => {
    let date = Date.now();
    await handleRT({
      id: "evrwwasqzqpgctdosgbavwwww",
      account_id: "acpxkgumifuoofoosble",
      created: date,
      type: "message_sent",
      by: {
        id: "agrsvlmesmacutzpiz",
        type: "agent",
      },
      touchpoint: {
        id: "csrwqpebneeclziyyz",
        channel: "subiz",
        source: "web",
      },
      data: {
        message: {
          conversation_id: "csrwwasqyzgqqfaaaa",
          text: "Shop mình còn bạn nhé. Bạn muốn điện thoại màu gì ạ?",
          format: "plaintext",
        },
      },
    });
  });
  await sleep(6000);

  await page.evaluate(async () => {
    let date = Date.now();
    const events2 = [
      {
        id: "evrwwasqzolvuynwfvlafbbbb",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "conversation_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfbbbb",
            account_id: "acpxkgumifuoofoosble",
            created: date,
            members: [
              {
                type: "agent",
                id: "agpxkgycwccstrfptx",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejbbbb",
                  type: "user",
                },
                joined_at: 1706166207520,
                invite_reason: "15",
              },
              {
                type: "agent",
                id: "agrrroqdwsxbhvcdvn",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejbbbb",
                  type: "user",
                },
                joined_at: 1706166207568,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agohhwgfuxitmyif39",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejbbbb",
                  type: "user",
                },
                joined_at: 1706166207731,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agqmwfyuehpuzpehmv",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejbbbb",
                  type: "user",
                },
                joined_at: 1706166207909,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agqedvggzqocgkzfrk",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejbbbb",
                  type: "user",
                },
                joined_at: 1706166208003,
                invite_reason: "5",
              },
              {
                type: "user",
                id: "usrtquywfmwttnwejbbbb",
                membership: "active",
                invited_by: {
                  id: "usrtquywfmwttnwejbbbb",
                  type: "user",
                },
                first_message_at: 1706166207219,
                seen_at: 1706166207219,
                received_at: 1706166248481,
                last_sent: 1706166207219,
                total_messages: 1,
              },
              {
                type: "agent",
                id: "agrsvlmesmacutzpiz",
                membership: "observer",
                invited_by: {
                  id: "agriviekoixdhmwpcc",
                  client_id: "dashboard",
                  type: "agent",
                },
                joined_at: 1706166248410,
                seen_at: 1706166311591,
                received_at: 1706166260156,
                invite_reason: "6",
              },
              {
                type: "agent",
                id: "agriviekoixdhmwpcc",
                membership: "active",
                invited_by: {
                  id: "usrtquywfmwttnwejbbbb",
                  type: "user",
                },
                joined_at: 1706166207657,
                first_message_at: 1706166245882,
                seen_at: 1706166262528,
                received_at: 1706166262528,
                last_sent: 1706166245882,
                invite_reason: "5",
                total_messages: 1,
              },
            ],
            state: "pending",
            touchpoint: {
              id: "6289724947817028",
              channel: "facebook",
              source: "310894785705836",
            },
            integration: {
              account_id: "acpxkgumifuoofoosble",
              connector_id: "fabikon",
              logo_url:
                "https://vcdn.subiz-cdn.com/file/ff4b7b633db652533472d70832a1cc4a5e7608c4d6120cc9e457434fa796145e_acpxkgumifuoofoosble",
              name: "Subiz",
              connector_type: "facebook",
              integrated: 1528770431496,
              last_integrated: 1704443518898,
              state: "activated",
              id: "acpxkgumifuoofoosble.310894785705836.fabikon",
              sending_status: "ok",
              last_hook_received: 1706165183607,
              last_request_sent: 1706165430530,
              token_status: "ok",
              token_status_updated: 1704443518891,
            },
            actived: date,
            updated: date,
            is_returned: true,
            _subconvos: [],
          },
        },
      },

      {
        id: "evrwwasqzqpgctdosgbavbbbb",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "message_sent",
        by: {
          id: "usrtquywfmwttnwejbbbb",
          client_id: "fabikon",
          type: "user",
        },
        touchpoint: {
          id: "6289724947817028",
          channel: "facebook",
          source: "310894785705836",
        },
        data: {
          message: {
            conversation_id: "csrwwasqyzgqqfbbbb",
            text: "Shop còn iphone 15 Pro Max  màu trắng không?",
            format: "plaintext",
            fields: [
              {
                key: "_fabikon",
                value:
                  '"m_295fHtwjQBgTFUNeCRFY6VvkL5xXiSxGgTD1Dueci5edqkUwsh32CIGkdVhjOOdKfSb2kkeD2TT3x8NhBwhZ8w"',
              },
            ],
          },
        },
      },

      {
        id: "evrwwasqzpmlntcrxktjubbbb",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "my_conversation_list_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfbbbb",
            tags: [{}],
            state: "active",
            touchpoint: {
              id: "6289724947817028",
              channel: "facebook",
              source: "310894785705836",
            },
            integration: {
              id: "acpxkgumifuoofoosble.310894785705836.fabikon",
            },
            actived: date,
            fields: [
              {
                key: "data",
                value: "[replied]",
              },
            ],
            read: true,
          },
        },
      },
    ];

    await handleRT(events2[0]);
    await handleRT(events2[1]);
    await handleRT(events2[2]);
  });

  let convo2 = await page.waitForSelector(
    '[attr-convo-id="csrwwasqyzgqqfbbbb"]'
  );

  const boundingBox2 = await convo2.boundingBox();

  await page.mouse.click(160, 180);
  let input2 = await page.waitForSelector(".lexical_editor_input");
  await input2.type("Shop mình còn bạn nhé. Bạn cần loại bao nhiêu GB ạ?");
  await sleep(1000);
  await page.keyboard.press("Enter");
  await sleep(1000);
  await page.evaluate(async () => {
    let date = Date.now();
    await handleRT({
      id: "evrwwasqzqpgctdosgbavzzzz",
      account_id: "acpxkgumifuoofoosble",
      created: date,
      type: "message_sent",
      by: {
        id: "agrsvlmesmacutzpiz",
        type: "agent",
      },
      touchpoint: {
        id: "6289724947817028",
        channel: "facebook",
        source: "310894785705836",
      },
      data: {
        message: {
          conversation_id: "csrwwasqyzgqqfbbbb",
          text: "Shop mình còn bạn nhé. Bạn cần loại bao nhiêu GB ạ?",
          format: "plaintext",
        },
      },
    });
  });
  await sleep(6000);

  await page.evaluate(async () => {
    let date = Date.now();
    const events3 = [
      {
        id: "evrwwasqzolvuynwfvlafcccc",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "conversation_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfcccc",
            account_id: "acpxkgumifuoofoosble",
            created: date,
            members: [
              {
                type: "agent",
                id: "agpxkgycwccstrfptx",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejcccc",
                  type: "user",
                },
                joined_at: 1706170819686,
                invite_reason: "15",
              },
              {
                type: "agent",
                id: "agqedvggzqocgkzfrk",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejcccc",
                  type: "user",
                },
                joined_at: 1706170819724,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrrroqdwsxbhvcdvn",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejcccc",
                  type: "user",
                },
                joined_at: 1706170819745,
                invite_reason: "5",
              },
              {
                type: "user",
                id: "usrtquywfmwttnwejcccc",
                membership: "active",
                invited_by: {
                  id: "usrtquywfmwttnwejcccc",
                  type: "user",
                },
                first_message_at: 1706170819644,
                seen_at: 1706170819644,
                received_at: 1706170819644,
                last_sent: 1706170819644,
                total_messages: 1,
              },
              {
                type: "agent",
                id: "agqmwfyuehpuzpehmv",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejcccc",
                  type: "user",
                },
                joined_at: 1706170819708,
                seen_at: 1706170891813,
                received_at: 1706170891813,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agriviekoixdhmwpcc",
                membership: "active",
                invited_by: {
                  id: "usrtquywfmwttnwejcccc",
                  type: "user",
                },
                joined_at: 1706170819759,
                first_message_at: 1706171098848,
                seen_at: 1706171256618,
                received_at: 1706171256618,
                last_sent: 1706171098848,
                invite_reason: "5",
                total_messages: 1,
              },
              {
                type: "agent",
                id: "agohhwgfuxitmyif39",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejcccc",
                  type: "user",
                },
                joined_at: 1706170819771,
                seen_at: 1706172093930,
                received_at: 1706172093930,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrsvlmesmacutzpiz",
                membership: "observer",
                invited_by: {
                  id: "agriviekoixdhmwpcc",
                  client_id: "dashboard",
                  type: "agent",
                },
                joined_at: 1706170824823,
                seen_at: 1706172703711,
                received_at: 1706172700821,
                invite_reason: "6",
              },
            ],
            state: "pending",
            touchpoint: {
              id: "25233107442943297",
              channel: "instagram",
              source: "17841424333816730",
            },
            integration: {
              account_id: "acpxkgumifuoofoosble",
              connector_id: "fabikon",
              logo_url:
                "https://vcdn.subiz-cdn.com/file/18e93222d51988d374ed22e78609b4d76165d98a165606b3d167c7470d4b92db_acpxkgumifuoofoosble",
              name: "Subiz",
              connector_type: "instagram",
              integrated: 1648960263539,
              last_integrated: 1703652693855,
              state: "activated",
              id: "acpxkgumifuoofoosble.instagram_17841424333816730.fabikon",
              created: 1648960263539,
              username: "subizlivechat",
              linked_page_id: "310894785705836",
              sending_status: "ok",
              last_hook_received: 1704189471670,
              last_request_sent: 1704189472722,
              token_status: "ok",
              token_status_updated: 1704189472006,
            },
            actived: date,
            updated: date,
            is_returned: true,
            _subconvos: [],
          },
        },
      },

      {
        id: "evrwwasqzqpgctdosgbavcccc",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "message_sent",
        by: {
          id: "usrtquywfmwttnwejcccc",
          client_id: "fabikon",
          type: "user",
        },
        touchpoint: {
          id: "25233107442943297",
          channel: "instagram",
          source: "17841424333816730",
        },
        data: {
          message: {
            conversation_id: "csrwwasqyzgqqfcccc",
            text: "Shop ship điện thoại cho mình chưa?",
            format: "plaintext",
          },
        },
      },

      {
        id: "evrwwasqzpmlntcrxktjucccc",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "my_conversation_list_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfcccc",
            tags: [{}],
            state: "active",
            touchpoint: {
              id: "25233107442943297",
              channel: "instagram",
              source: "17841424333816730",
            },
            integration: {
              id: "acpxkgumifuoofoosble.instagram_17841424333816730.fabikon",
            },
            actived: date,
            fields: [
              {
                key: "data",
                value: "[replied]",
              },
            ],
            read: true,
          },
        },
      },
    ];

    await handleRT(events3[0]);
    await handleRT(events3[1]);
    await handleRT(events3[2]);
  });

  let convo3 = await page.waitForSelector(
    '[attr-convo-id="csrwwasqyzgqqfcccc"]'
  );

  const boundingBox3 = await convo3.boundingBox();

  await page.mouse.click(160, 180);

  let input3 = await page.waitForSelector(".lexical_editor_input");
  await input3.type(
    "Dạ mình vừa gửi shipper rồi, khoảng 30 phút nữa bạn nhận được ạ."
  );
  await sleep(1000);
  await page.keyboard.press("Enter");
  await sleep(1000);
  await page.evaluate(async () => {
    let date = Date.now();
    await handleRT({
      id: "evrwwasqzqpgctdosgbavxxxx",
      account_id: "acpxkgumifuoofoosble",
      created: date,
      type: "message_sent",
      by: {
        id: "agrsvlmesmacutzpiz",
        type: "agent",
      },
      touchpoint: {
        id: "25233107442943297",
        channel: "instagram",
        source: "17841424333816730",
      },
      data: {
        message: {
          conversation_id: "csrwwasqyzgqqfcccc",
          text: "Dạ mình vừa gửi shipper rồi, khoảng 30 phút nữa bạn nhận được ạ.",
          format: "plaintext",
        },
      },
    });
  });
  await sleep(6000);

  await page.evaluate(async () => {
    let date = Date.now();
    const events5 = [
      {
        id: "evrwwasqzolvuynwfvlafeeee",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "conversation_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfeeee",
            account_id: "acpxkgumifuoofoosble",
            created: date,
            members: [
              {
                type: "agent",
                id: "agpxkgycwccstrfptx",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejeeee",
                  type: "user",
                },
                joined_at: 1706166818516,
                invite_reason: "15",
              },
              {
                type: "agent",
                id: "agohhwgfuxitmyif39",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejeeee",
                  type: "user",
                },
                joined_at: 1706166818545,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agqmwfyuehpuzpehmv",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejeeee",
                  type: "user",
                },
                joined_at: 1706166818565,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agqedvggzqocgkzfrk",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejeeee",
                  type: "user",
                },
                joined_at: 1706166818583,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrrroqdwsxbhvcdvn",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejeeee",
                  type: "user",
                },
                joined_at: 1706166818598,
                invite_reason: "5",
              },
              {
                type: "user",
                id: "usrtquywfmwttnwejeeee",
                membership: "active",
                invited_by: {
                  id: "usrtquywfmwttnwejeeee",
                  type: "user",
                },
                first_message_at: 1706166818211,
                seen_at: 1706166818211,
                received_at: 1706166821985,
                last_sent: 1706166818211,
                total_messages: 1,
              },
              {
                type: "agent",
                id: "agriviekoixdhmwpcc",
                membership: "active",
                invited_by: {
                  id: "usrtquywfmwttnwejeeee",
                  type: "user",
                },
                joined_at: 1706166818530,
                first_message_at: 1706166821271,
                seen_at: 1706166826651,
                received_at: 1706166826651,
                last_sent: 1706166821271,
                invite_reason: "5",
                total_messages: 1,
              },
              {
                type: "agent",
                id: "agrsvlmesmacutzpiz",
                membership: "observer",
                invited_by: {
                  id: "agriviekoixdhmwpcc",
                  client_id: "dashboard",
                  type: "agent",
                },
                joined_at: 1706166823789,
                seen_at: 1706166901430,
                received_at: 1706166868204,
                invite_reason: "6",
              },
            ],
            state: "pending",
            touchpoint: {
              id: "3082833267236030926",
              channel: "zalo",
              source: "935022139843821727",
            },
            integration: {
              account_id: "acpxkgumifuoofoosble",
              connector_id: "zalokon",
              logo_url:
                "https://vcdn.subiz-cdn.com/file/41b76a640d393782370db31797b05fe20276c47d5343fba6a41f7476e0c9e8cd_acpxkgumifuoofoosble",
              name: "Subiz",
              connector_type: "zalo",
              integrated: 1572602397424,
              last_integrated: 1700103888037,
              state: "activated",
              id: "acpxkgumifuoofoosble.935022139843821727.zalokon",
              created: 1607708452812,
              sending_status: "ok",
            },
            actived: date,
            updated: date,
            is_returned: true,
            _subconvos: [],
          },
        },
      },

      {
        id: "evrwwasqzqpgctdosgbaveeee",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "message_sent",
        by: {
          id: "usrtquywfmwttnwejeeee",
          type: "user",
        },
        touchpoint: {
          id: "3082833267236030926",
          channel: "zalo",
          source: "935022139843821727",
        },
        data: {
          message: {
            conversation_id: "csrwwasqyzgqqfeeee",
            text: "Mình cần bảo hành điện thoại",
            format: "plaintext",
            fields: [
              {
                key: "_zalokon",
                value:
                  '"m_295fHtwjQBgTFUNeCRFY6VvkL5xXiSxGgTD1Dueci5edqkUwsh32CIGkdVhjOOdKfSb2kkeD2TT3x8NhBwhZ8w"',
              },
            ],
          },
        },
      },

      {
        id: "evrwwasqzpmlntcrxktjueeee",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "my_conversation_list_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfeeee",
            tags: [{}],
            state: "active",
            touchpoint: {
              id: "3082833267236030926",
              channel: "zalo",
              source: "935022139843821727",
            },
            integration: {
              id: "acpxkgumifuoofoosble.935022139843821727.zalokon",
            },
            actived: date,
            fields: [
              {
                key: "data",
                value: "[replied]",
              },
            ],
            read: true,
          },
        },
      },
    ];

    await handleRT(events5[0]);
    await handleRT(events5[1]);
    await handleRT(events5[2]);
  });

  let convo5 = await page.waitForSelector(
    '[attr-convo-id="csrwwasqyzgqqfeeee"]'
  );

  const boundingBox5 = await convo5.boundingBox();

  await page.mouse.click(160, 180);

  let input5 = await page.waitForSelector(".lexical_editor_input");
  await input5.type(
    "Bạn chia sẻ điện thoại của bạn đang gặp vấn đề gì để mình hỗ trợ bạn nhé."
  );
  await sleep(500);
  await page.keyboard.press("Enter");
  await sleep(500);
  await page.evaluate(async () => {
    let date = Date.now();
    await handleRT({
      id: "evrwwasqzqpgctdosgbavxxxx",
      account_id: "acpxkgumifuoofoosble",
      created: date,
      type: "message_sent",
      by: {
        id: "agrsvlmesmacutzpiz",
        type: "agent",
      },
      touchpoint: {
        id: "3082833267236030926",
        channel: "zalo",
        source: "935022139843821727",
      },
      data: {
        message: {
          conversation_id: "csrwwasqyzgqqfeeee",
          text: "Bạn chia sẻ điện thoại của bạn đang gặp vấn đề gì để mình hỗ trợ bạn nhé.",
          format: "plaintext",
        },
      },
    });
  });
  await sleep(6000);

  await page.evaluate(async () => {
    let date = Date.now();
    const events6 = [
      {
        id: "evrwwasqzolvuynwfvlafffff",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "conversation_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfffff",
            account_id: "acpxkgumifuoofoosble",
            created: date,
            members: [
              {
                type: "agent",
                id: "agqsupqkmdtokktfgn",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765667926,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrevvnsdklzrejtsd",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765667947,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrjsaecyjeaftswfn",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765667980,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrkzbssrtjojoqdgz",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765668018,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrvsslmalhmlfcpvd",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765668097,
                invite_reason: "5",
              },
              {
                type: "user",
                id: "usrtquywfmwttnwejffff",
                membership: "active",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                first_message_at: 1704765667766,
                seen_at: 1704765667766,
                received_at: 1704765667766,
                last_sent: 1704765667766,
                total_messages: 1,
              },
              {
                type: "bot",
                id: "agqhgysftasqlibeho",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  client_id: "googlekon",
                  type: "user",
                },
                joined_at: 1704765668207,
                invite_reason: "17",
              },
              {
                type: "agent",
                id: "agohhwgfuxitmyif39",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765667848,
                seen_at: 1704770956014,
                received_at: 1704770956014,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agqmwfyuehpuzpehmv",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765667900,
                seen_at: 1704786857602,
                received_at: 1704786857602,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrkzpvpefuglbnjly",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765668031,
                seen_at: 1704792026771,
                received_at: 1704792026771,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agriviekoixdhmwpcc",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765667964,
                seen_at: 1704796415212,
                received_at: 1704796415212,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agpxkgycwccstrfptx",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765667834,
                seen_at: 1704851602912,
                received_at: 1704851602912,
                invite_reason: "15",
              },
              {
                type: "agent",
                id: "agqedvggzqocgkzfrk",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765667863,
                seen_at: 1705114748227,
                received_at: 1705114748227,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrqjxjcrlergohiwz",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765668046,
                seen_at: 1705316326251,
                received_at: 1705316326251,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrrroqdwsxbhvcdvn",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765668061,
                seen_at: 1705652331566,
                received_at: 1705652331566,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrsvlmesmacutzpiz",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejffff",
                  type: "user",
                },
                joined_at: 1704765668082,
                seen_at: 1706586136522,
                received_at: 1706586133138,
                invite_reason: "5",
              },
            ],
            state: "active",
            touchpoint: {
              id: "AbFvOqnEGefbS8yHQW9mMxoUGcUaL19RAUinMXC9rpL8uyiwiMnJCa9q7iOgeBHKFJTcJ-QYNrqz",
              channel: "google_review",
              source: "10205258525738217240",
            },
            integration: {
              account_id: "acpxkgumifuoofoosble",
              connector_id: "googlekon",
              name: "VietnamBIZ Online Solutions",
              connector_type: "google_review",
              integrated: 1702893494960,
              last_integrated: 1704436664393,
              state: "activated",
              id: "acpxkgumifuoofoosble.10205258525738217240.googlekon",
              created: 1702893494960,
              google_review_average_rating: 5,
              google_review_total_review_count: 1,
              google_review_primary_phone: "024 7302 1368",
              google_review_address:
                "Tầng 6, tòa nhà Kailash, ngõ 92 Trần Thái Tông, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội",
              google_review_description:
                "Phần mềm quản trị khách hàng trên nền tảng giao tiếp với khách hàng (tin nhắn/email và gọi điện) .",
              google_review_maps_uri:
                "https://maps.google.com/maps?cid=9757485869089826922",
              sending_status: "ok",
            },
            google_review: {
              review_id:
                "AbFvOqnEGefbS8yHQW9mMxoUGcUaL19RAUinMXC9rpL8uyiwiMnJCa9q7iOgeBHKFJTcJ-QYNrqz",
              rating_string: "FIVE",
              rating: 5,
              created: date,
              updated: date,
              review_rely: {},
              comment: "Giá cả hợp lý. Dịch vụ tốt!",
              reviewer: {
                profile_photo_url:
                  "https://img.freepik.com/free-photo/confident-asian-businessman-looking-camera_1262-1524.jpg",
                display_name: "Nguyễn Minh Quang",
              },
            },
            last_message_sent: {
              id: "evrwmfwjxazitsdkziaeuffff",
              account_id: "acpxkgumifuoofoosble",
              created: date,
              updated: date,
              type: "message_sent",
              by: {
                id: "usrtquywfmwttnwejffff",
                client_id: "googlekon",
                type: "user",
              },
              data: {
                message: {
                  conversation_id: "csrwwasqyzgqqfffff",
                  text: "Giá cả hợp lý. Dịch vụ tốt!",
                  format: "plaintext",
                },
              },
            },
            actived: date,
            updated: date,
            is_returned: true,
            _subconvos: [],
          },
        },
      },

      {
        id: "evrwwasqzpmlntcrxktjuffff",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "my_conversation_list_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfffff",
            tags: [{}],
            state: "active",
            touchpoint: {
              id: "AbFvOqnEGefbS8yHQW9mMxoUGcUaL19RAUinMXC9rpL8uyiwiMnJCa9q7iOgeBHKFJTcJ-QYNrqz",
              channel: "google_review",
              source: "10205258525738217240",
            },
            integration: {
              id: "acpxkgumifuoofoosble.10205258525738217240.googlekon",
            },
            actived: date,
            read: true,
          },
        },
      },
    ];

    await handleRT(events6[0]);
    await handleRT(events6[1]);
    await handleRT(events6[2]);
  });

  let convo6 = await page.waitForSelector(
    '[attr-convo-id="csrwwasqyzgqqfffff"]'
  );

  const boundingBox6 = await convo6.boundingBox();

  await page.mouse.click(160, 180);

  await sleep(6000);

  await page.evaluate(async () => {
    let date = Date.now();
    const events4 = [
      {
        id: "evrwwasqzolvuynwfvlafdddd",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "conversation_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfdddd",
            account_id: "acpxkgumifuoofoosble",
            created: date,
            members: [
              {
                type: "user",
                id: "usrpswtrefeydhcdntfju",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                },
              },
              {
                type: "agent",
                id: "agpxkgycwccstrfptx",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991623977,
                invite_reason: "15",
              },
              {
                type: "agent",
                id: "agrjsaecyjeaftswfn",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624033,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agqmwfyuehpuzpehmv",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624209,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrvsslmalhmlfcpvd",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624247,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrevvnsdklzrejtsd",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624335,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrkzpvpefuglbnjly",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624529,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrkzbssrtjojoqdgz",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624728,
                invite_reason: "5",
              },
              {
                type: "user",
                id: "usrtquywfmwttnwejdddd",
                membership: "active",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                first_message_at: 1705991623927,
                seen_at: 1705991623927,
                received_at: 1705991623927,
                last_sent: 1705991623927,
                total_messages: 1,
              },
              {
                type: "agent",
                id: "agohhwgfuxitmyif39",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624710,
                seen_at: 1705994166749,
                received_at: 1705994166749,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agqedvggzqocgkzfrk",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624509,
                seen_at: 1705996094090,
                received_at: 1705996094090,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agriviekoixdhmwpcc",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624011,
                seen_at: 1705997288089,
                received_at: 1705997288089,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agqsupqkmdtokktfgn",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624229,
                seen_at: 1706004035335,
                received_at: 1706004035335,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrqjxjcrlergohiwz",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624629,
                seen_at: 1706005862920,
                received_at: 1706005862920,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrrroqdwsxbhvcdvn",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624467,
                seen_at: 1706086747912,
                received_at: 1706086747912,
                invite_reason: "5",
              },
              {
                type: "agent",
                id: "agrsvlmesmacutzpiz",
                membership: "observer",
                invited_by: {
                  id: "usrtquywfmwttnwejdddd",
                  type: "user",
                },
                joined_at: 1705991624490,
                seen_at: 1706167628819,
                received_at: 1706167628819,
                invite_reason: "5",
              },
            ],
            state: "pending",
            touchpoint: {
              id: "<D4828CFB-37BB-43BA-BEDA-EBB13B742F11@songtaocraft.com>",
              channel: "email",
              source: "work@subiz.com",
            },
            integration: {
              account_id: "acpxkgumifuoofoosble",
              connector_id: "mailkon",
              name: "Subiz Email",
              connector_type: "email",
              integrated: 1543486195505,
              last_integrated: 1543486195505,
              state: "activated",
              id: "acpxkgumifuoofoosble.mailv4.mailkon",
            },
            actived: date,
            updated: date,
            is_returned: true,
            _subconvos: [],
          },
        },
      },

      {
        id: "evrwwasqzqpgctdosgbavdddd",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "message_sent",
        by: {
          id: "usrtquywfmwttnwejdddd",
          client_id: "mailkon",
          type: "user",
        },
        touchpoint: {
          id: "<D4828CFB-37BB-43BA-BEDA-EBB13B742F11@songtaocraft.com>",
          channel: "email",
          source: "work@subiz.com",
        },
        data: {
          message: {
            conversation_id: "csrwwasqyzgqqfdddd",
            text: `<div class="reply-body" spellcheck="true">
        <div>
        <div>
        <p>Chào bạn,</p>
        <p>Điện thoại của mình mới mua bên shop được 2 tháng nhưng hiện tại bị lỗi màn hình. </p>
        <p>Bạn hỗ trợ bảo hành giúp mình nhé!</p>
        <p>Hương Nguyễn</p>
        <p>Email: huongnguyen@songtaocraft.com</p>
        <p>Wecaht/Facebook/Whatsapp:86+13724843730</p>
        <p>Skype:songtao-21</p>
        </div>
        <div> </div>
        </div>
        
        <div class="mail_signature"><span class="sender-default-sign" contenteditable="false" data-name="sign"></span></div>
        </div><img style="height: 1px !important; max-height: 1px !important; max-width: 1px !important; width: 1px !important" src="https://2907fde.cloudmailshub.com/f981eba8-f085-4e5d-aa2f-0543bb6c44e9/t/6MEMWhQUck6nKgu1LCS38opZIhQc2sD2EIqMas8RFfR2C1jnukMeRA%3D%3D.png"/>`,
            format: "html",
            fields: [
              {
                key: "headers",
                value: `{"Arc-Authentication-Results":["i=1; mx.google.com;       spf=pass (google.com: domain of daisy@songtaocraft.com designates 115.124.28.136 as permitted sender) smtp.mailfrom=daisy@songtaocraft.com"],"Arc-Message-Signature":["i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816;        h=mime-version:subject:message-id:to:from:date;        bh=lfKuYzVC6FNfU3Ft05fs3z7o258DBBr1PT7wLLNLtnc=;        fh=3zXe9KHh6fr15u+s7nqeictts8WcYZ/soAJDyAfMwlY=;        b=Fm6nadS0HLO7ACqBuKFLsK2vrNq+4ayvGufoxIK7r3Roe7RiTVyDG84iZ9d6U3flUF         Pbbt5XUsMMluKk6x5jeaQ9jx7VxKAKYBvfFBZPzHiETkEbAliKYI60YBk3qR6WZOYRJv         u8UXGFl1Q/zfj8r+BWbnEDS4TfCMkCtBfO+TqtTV1qZsIVj7Mf7+MWJgA2K0vv47b7E6         NeLGuQF0G2/XRscTgY3nlTP4l3JqIRnt763GI/HUQCRU830N5KpvYMAVCUlz6pEdNblr         qeUFXYj+dTo1pU8ts6kiNWX5JcPVKBXF5k40i5mklx3NLMjNfTvUPGdZmSAioInc4H8X         lU5A=="],"Arc-Seal":["i=1; a=rsa-sha256; t=1705991620; cv=none;        d=google.com; s=arc-20160816;        b=vLGmlw8ynbgFRkKm7QTnvNTqduy/XvFk0r0Es3/VTnqAKwXBxBNyHm89FEDxQxFbbZ         G5KxUcxAYG083XqG9tVLF4v3LzupZAPV6+mYVS1F+VCLdysoP6DIO9B8RUU2ntc4YWjD         6lLqlM8d96TUDMr1Vtjo0feMFk6h80u2RNcNfxvDTdSzvpp3uxqfoGPPbM4uO67nUaOu         pVpwi3NNCG4BqMWu9cKpudPQ8vtJ2ERXq1REQ8ZFPiR00f67eLwuO7Wqtq3uX/Lxmaz0         GzmZCScWYgdNV+cj1cKeogEGH1HrdVWr7xDnZGWiKI4PewoBl1BDrzjxuIiS0IQYLyxA         mqJQ=="],"Authentication-Results":["mx.google.com;       spf=pass (google.com: domain of daisy@songtaocraft.com designates 115.124.28.136 as permitted sender) smtp.mailfrom=daisy@songtaocraft.com"],"Content-Type":["multipart/alternative; boundary=\\"----=_Part_4703037_557753808.1705991616278\\""],"Date":["Tue, 23 Jan 2024 14:33:36 +0800 (CST)"],"Delivered-To":["work@subiz.com"],"From":["daisy \\u003cdaisy@songtaocraft.com\\u003e"],"Message-Id":["\\u003cD4828CFB-37BB-43BA-BEDA-EBB13B742F11@songtaocraft.com\\u003e"],"Mime-Version":["1.0"],"Received":["from mail-oa1-f47.google.com (mxd [209.85.160.47]) by mx.sendgrid.net with ESMTP id c7V8UqY-TEWAsFOHrgUjDA for \\u003cacpxkgumifuoofoosble@mail.subiz.com\\u003e; Tue, 23 Jan 2024 06:33:43.192 +0000 (UTC)","by mail-oa1-f47.google.com with SMTP id 586e51a60fabf-214915c4973so7902fac.1        for \\u003cacpxkgumifuoofoosble@mail.subiz.com\\u003e; Mon, 22 Jan 2024 22:33:43 -0800 (PST)","by 2002:a05:6359:6f14:b0:175:f4cd:dc33 with SMTP id tk20csp240141rwb;        Mon, 22 Jan 2024 22:33:40 -0800 (PST)","from out28-136.mail.aliyun.com (out28-136.mail.aliyun.com. [115.124.28.136])        by mx.google.com with ESMTPS id k10-20020a634b4a000000b005ceea1ff06dsi9254128pgl.168.2024.01.22.22.33.38        for \\u003cwork@subiz.com\\u003e        (version=TLS1_3 cipher=TLS_AES_256_GCM_SHA384 bits=256/256);        Mon, 22 Jan 2024 22:33:40 -0800 (PST)","from DESKTOP-355C6788(mailfrom:daisy@songtaocraft.com fp:SMTPD_---.WCyy61L_1705991616)          by smtp.aliyun-inc.com;          Tue, 23 Jan 2024 14:33:36 +0800"],"Received-Spf":["pass (google.com: domain of daisy@songtaocraft.com designates 115.124.28.136 as permitted sender) client-ip=115.124.28.136;"],"Return-Path":["\\u003cdaisy@songtaocraft.com\\u003e"],"Subject":["artificial tree"],"To":["work@subiz.com"],"X-Alimail-Antispam":["AC=AD;BC=0.7157373|0.1065697;BR=01201311R181b1;CH=blue;DM=|AD|false|;DS=AD|ad_normal|0.766847-0.207651-0.0255014;FP=6404016089361073733|6|1|3|0|-1|-1|-1;HT=ay29a033018047190;MF=daisy@songtaocraft.com;NM=1;PH=DS;RN=1;RT=1;SR=0;TI=SMTPD_---.WCyy61L_1705991616;"],"X-Forwarded-For":["support@subiz.com acpxkgumifuoofoosble@mail.subiz.com"],"X-Forwarded-To":["acpxkgumifuoofoosble@mail.subiz.com"],"X-Gm-Message-State":["AOJu0YxleD91sGTo46ACh6qqS6W4bfqgKzq7h1sczKlCNgmUdCN6a00g\\tjxR4ZA9zC34Y1POdbD+bnk0zY7xZHHAZ+izGz9BuX/xMFgZK0x0qa3rAAATiu2SYNhPkUSHwvya\\tD0fIinzNmgnpAhBhC0WGD7niyLH7pxV+PPfhxLHoi/jYS1SDOGKch7078WLi7gfafcxPQBJId/A\\txbGTE="],"X-Google-Dkim-Signature":["v=1; a=rsa-sha256; c=relaxed/relaxed;        d=1e100.net; s=20230601; t=1705991623; x=1706596423;        h=mime-version:subject:message-id:to:from:date:delivered-to         :x-forwarded-for:x-forwarded-to:x-gm-message-state         :x-original-authentication-results:from:to:cc:subject:date         :message-id:reply-to;        bh=lfKuYzVC6FNfU3Ft05fs3z7o258DBBr1PT7wLLNLtnc=;        b=BcnBHh0/+yuaZFfYzZyZRAdsjL30L7N1715muk77PrlNFtLsfxp6diIRVZrljXf2Qc         zfBMzmKwK7+i2G7x3w0t5FGATvrQQf3RSnjydC1Ic4ZuK6QPsYDTK21pZc4dxYePeSM8         Cjmgby8LYJnR6BjFsAp1NTLVArknsda7j8BUyUo0L/SPO29VHcljqd+ft/RenkN4zmQO         8RZpsoSY5nVjVF5YdrIeVNTVvn1iVx63fUJbhEtkU547Inn4ZGJJOmHcsyMiZO+n8mWg         MlW7UEs7kbR8Zdj0uoJDmCHpcKSnSr80V6L+dA7Iud/wfYagpFsMMSHCj7MKDZQy1UUM         N+6w=="],"X-Google-Smtp-Source":["AGHT+IHwyUYkrmsWJnfEKVwiJ14+R3r9udDY9n2Bq/U92YJ+M9zf0qvsS65dNvXKU6wcZ4y3DnMs"],"X-Original-Authentication-Results":["mx.google.com;       spf=pass (google.com: domain of daisy@songtaocraft.com designates 115.124.28.136 as permitted sender) smtp.mailfrom=daisy@songtaocraft.com"],"X-Priority":["3"],"X-Received":["by 2002:a05:6870:d207:b0:210:a311:6b38 with SMTP id g7-20020a056870d20700b00210a3116b38mr966481oac.99.1705991622878;        Mon, 22 Jan 2024 22:33:42 -0800 (PST)","by 2002:a05:6870:44ca:b0:210:d3fb:6854 with SMTP id t10-20020a05687044ca00b00210d3fb6854mr1056005oai.63.1705991620376;        Mon, 22 Jan 2024 22:33:40 -0800 (PST)"],"X-Xm-Mid":["15812851138424"]}`,
              },
              {
                key: "to",
                value: '["acpxkgumifuoofoosble@mail.subiz.com"]',
              },
              {
                key: "envelop_from",
                value:
                  '"support+caf_=acpxkgumifuoofoosble=mail.subiz.com@subiz.com"',
              },
              {
                key: "from",
                value: '"daisy \\u003cdaisy@songtaocraft.com\\u003e"',
              },
              {
                key: "subject",
                value: '"Bảo hành điện thoại"',
              },
              {
                key: "sender_ip",
                value: '"209.85.160.47"',
              },
              {
                key: "cc",
                value: '[""]',
              },
              {
                key: "message-smtp-id",
                value:
                  '"\\u003cD4828CFB-37BB-43BA-BEDA-EBB13B742F11@songtaocraft.com\\u003e"',
              },
              {
                key: "in-reply-to",
                value: '""',
              },
              {
                key: "delivered-to",
                value: '"work@subiz.com"',
              },
              {
                key: "plaintext",
                value:
                  '"Chào bạn,\\nĐiện thoại của mình mới mua bên shop được 2 tháng nhưng hiện tại bị lỗi màn hình. \\nBạn hỗ trợ bảo hành giúp mình nhé!\\n\\n \\n\\n\\n\\n"',
              },
            ],
          },
        },
      },

      {
        id: "evrwwasqzpmlntcrxktjudddd",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "my_conversation_list_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfdddd",
            tags: [{}],
            state: "active",
            touchpoint: {
              id: "<D4828CFB-37BB-43BA-BEDA-EBB13B742F11@songtaocraft.com>",
              channel: "email",
              source: "work@subiz.com",
            },
            integration: {
              id: "acpxkgumifuoofoosble.mailv4.mailkon",
            },
            actived: date,
            fields: [
              {
                key: "data",
                value: "[replied]",
              },
            ],
            read: true,
          },
        },
      },
    ];

    await handleRT(events4[0]);
    await handleRT(events4[1]);
    await handleRT(events4[2]);
  });

  let convo4 = await page.waitForSelector(
    '[attr-convo-id="csrwwasqyzgqqfdddd"]'
  );

  const boundingBox4 = await convo4.boundingBox();

  await page.mouse.click(160, 180);

  await sleep(6000);

  await page.evaluate(async () => {
    let date = Date.now();
    const events7 = [
      {
        id: "evrwwasqzolvuynwfvlafgggg",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "conversation_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfgggg",
            account_id: "acpxkgumifuoofoosble",
            created: date,
            members: [
              {
                type: "user",
                id: "usrtquywfmwttnwejgggg",
                membership: "active",
                joined_at: 1705286536545,
                seen_at: 1705286536545,
                last_sent: 1705286536545,
              },
              {
                type: "agent",
                id: "agriviekoixdhmwpcc",
                membership: "observer",
                invited_by: {
                  id: "subiz",
                  type: "connector",
                },
                joined_at: 1705286536625,
                invite_reason: "c58",
              },
              {
                type: "agent",
                id: "agpxkgycwccstrfptx",
                membership: "observer",
                invited_by: {
                  id: "subiz",
                  type: "connector",
                },
                joined_at: 1705286536719,
                invite_reason: "c58",
              },
              {
                type: "agent",
                id: "agrsvlmesmacutzpiz",
                membership: "active",
                invited_by: {
                  id: "agrsvlmesmacutzpiz",
                },
                joined_at: 1705286536820,
                call_answered: 1705286543152,
                call_rang: 1705286537168,
                invite_reason: "c42",
              },
            ],
            state: "active",
            touchpoint: {
              id: "84827682688",
              channel: "call",
              source: "842473021368",
            },
            integration: {
              account_id: "acpxkgumifuoofoosble",
              connector_id: "call",
              logo_url: "emoji://260e",
              connector_type: "call",
              integrated: 1702869026808,
              last_integrated: 1703045733890,
              state: "activated",
              id: "acpxkgumifuoofoosble.842473021368.call",
              created: 1702869026808,
              call_center_driver: "subiz",
              sip_provider: "fpt",
              last_outbound_called: 1705285545905,
              last_inbound_called: 1705286474435,
            },
            call: {
              started: date,
              answered: date + 5000,
              ended: date + 10000,
              to_number: "842473021368",
              from_number: "84827682688",
              direction: "inbound",
              driver: "subiz",
              duration_sec: 8,
              process_id: "rqrwpxutmgoflwtlfoxfbmodw",
              status: "ended",
              answered_device: "phwebcall9",
              recorded_audio: {
                account_id: "acpxkgumifuoofoosble",
                name: "2024-01-15_acpxkgumifuoofoosble_csrwpxuqomzrmvhzfh_recorded.wav",
                type: "audio/x-wav",
                size: 234284,
                md5: "1a2758e6ae4d01b37e88823fd4a1ff03",
                created: 1705286555291,
                url: "https://vcdn.subiz-cdn.com/file/firwpxusxhreoftyqitw",
                id: "firwpxusxhreoftyqitw",
                audio_waveform: [
                  0.042106494, 0.054221623, 0.052048787, 0.08257722, 0.08612763,
                  0.07056293, 0.059832036, 0.07983108, 0.112682424, 0.06407352,
                  0.095628545, 0.043256238, 0.03896828, 0.061656334,
                  0.055309545, 0.09378445, 0.06488992, 0.10293495, 0.109729506,
                  0.09380918, 0.10510971, 0.08854121, 0.097384386, 0.20475473,
                  0.21400973, 0.07133785, 0.00018669061, 0.00012002552,
                  0.000103102706, 0.00009796373, 0.00012461058, 0.06618505,
                  0.0013445498, 0.00009567957, 0.00011232559, 0.008423008,
                  0.011254149, 0.01362093, 0.00033435377, 0.000100052064,
                  0.00014284102, 0.025148893, 0.034136772, 0.0025628572,
                  0.051228866, 0.061679058, 0.065798014, 0.026833922,
                  0.00010947914, 0.0001463325, 0.000120635916, 0.00029894954,
                  0.0049543423, 0.004730692, 0.0055689146, 0.0047025667,
                  0.014168793, 0.00008965104, 0.000087275854, 0.00011883766,
                  0.00014349431, 0.00014034075, 0.00012325098, 0.00013653573,
                  0.00001306427,
                ],
                duration: 14,
                ttl: 1736822554963,
                category: "other",
                uploaded: 1705286555302,
                gcs_url:
                  "acpxkgumifuoofoosble/1b02b562aa123396e118ee0915fc2f63b8bb8a20bc5c4fb542db37fd86ead685",
              },
            },
            actived: date,
            updated: date,
            is_returned: true,
            _subconvos: [],
          },
        },
      },

      {
        id: "evrwwasqzpmlntcrxktjugggg",
        account_id: "acpxkgumifuoofoosble",
        created: date,
        type: "my_conversation_list_updated",
        data: {
          conversation: {
            id: "csrwwasqyzgqqfgggg",
            tags: [{}],
            state: "active",
            touchpoint: {
              id: "84827682688",
              channel: "call",
              source: "842473021368",
            },
            integration: {
              id: "acpxkgumifuoofoosble.842473021368.call",
            },
            actived: date,
            read: true,
          },
        },
      },
    ];

    await handleRT(events7[0]);
    await handleRT(events7[1]);
    await handleRT(events7[2]);
  });

  let convo7 = await page.waitForSelector(
    '[attr-convo-id="csrwwasqyzgqqfgggg"]'
  );

  const boundingBox7 = await convo7.boundingBox();

  await page.mouse.click(160, 180);

  await sleep(6000);

  await recorder.stop();
  await browser.close();
}

main();
