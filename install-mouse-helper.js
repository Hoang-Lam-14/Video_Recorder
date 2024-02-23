// This injects a box into the page that moves with the mouse;
// Useful for debugging
async function installMouseHelper(page) {
  await page.evaluateOnNewDocument(() => {
    // Install mouse helper only for top-level frame.
    if (window !== window.parent) return;
    window.addEventListener(
      "DOMContentLoaded",
      () => {
        const box = document.createElement("puppeteer-mouse-pointer");
        const styleElement = document.createElement("style");
        styleElement.innerHTML = `
          puppeteer-mouse-pointer {
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10000;
            width: 20px;   
            height: 20px;  
            background-size: cover;
            border: none;
            margin: 0;
            padding: 0;
            background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%23fff" stroke="%23000" stroke-width="20" d="M423.547,323.115l-320-320c-3.051-3.051-7.637-3.947-11.627-2.304s-6.592,5.547-6.592,9.856V480c0,4.501,2.837,8.533,7.083,10.048c4.224,1.536,8.981,0.192,11.84-3.285l85.205-104.128l56.853,123.179c1.792,3.883,5.653,6.187,9.685,6.187c1.408,0,2.837-0.277,4.203-0.875l74.667-32c2.645-1.131,4.736-3.285,5.76-5.973c1.024-2.688,0.939-5.675-0.277-8.299l-57.024-123.52h132.672c4.309,0,8.213-2.603,9.856-6.592C427.515,330.752,426.598,326.187,423.547,323.115z"/></svg>');
          }
          puppeteer-mouse-pointer.button-1 {
            transition: none;
            background: rgba(0,0,0,0.9);
          }
          puppeteer-mouse-pointer.button-2 {
            transition: none;
            border-color: rgba(0,0,255,0.9);
          }
          puppeteer-mouse-pointer.button-3 {
            transition: none;
            border-radius: 4px;
          }
          puppeteer-mouse-pointer.button-4 {
            transition: none;
            border-color: rgba(255,0,0,0.9);
          }
          puppeteer-mouse-pointer.button-5 {
            transition: none;
            border-color: rgba(0,255,0,0.9);
          }
        `;
        document.head.appendChild(styleElement);
        document.body.appendChild(box);
        document.addEventListener(
          "mousemove",
          (event) => {
            box.style.left = event.pageX + "px";
            box.style.top = event.pageY + "px";
            updateButtons(event.buttons);
          },
          true
        );
        document.addEventListener(
          "mousedown",
          (event) => {
            updateButtons(event.buttons);
            box.classList.add("button-" + event.which);
          },
          true
        );
        document.addEventListener(
          "mouseup",
          (event) => {
            updateButtons(event.buttons);
            box.classList.remove("button-" + event.which);
          },
          true
        );
        function updateButtons(buttons) {
          for (let i = 0; i < 5; i++)
            box.classList.toggle("button-" + i, buttons & (1 << i));
        }
      },
      false
    );
  });
}

module.exports = { installMouseHelper };
