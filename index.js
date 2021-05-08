let puppeter = require("puppeteer");
const readline = require("readline-sync");

//user input
let link = readline.question("Plz Enter the link: ");

//Invoke IIFE

(async () => {
  try {
    //launch puppeteer
    let browser = await puppeter.launch();

    //go to new page
    let page = await browser.newPage();

    //go to the link
    await page.goto(link);

    //Gather all the data
    const dimensions = await page.evaluate(() => {
      let data = [];
      let anchors = document.querySelectorAll("a");
      for (let anchor of anchors.values()) {
        data.push(anchor.href);
      }
      return data;
    });

    //print the data in string
    console.log(dimensions.join("\n"));

    //close the puppeteer
    await browser.close();
  } catch (err) {
    console.log(`Sorry provided link is invalid check again`);
  }
})();
