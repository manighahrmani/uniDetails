const puppeteer = require('puppeteer');
const fs = require('fs'); 
const config = require('./config');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(config.url);
  const universityList = await page.evaluate(() => {
    const universityList = [];
    const headers = document.querySelectorAll('.course-title');
    headers.forEach((header) => {
      const nextElement = header.nextElementSibling;
      const universityName = nextElement.nextElementSibling;
      universityList.push(universityName.innerText);
    });
    return universityList;
  });

  fs.writeFile(config.fileName, universityList.join(',\n'), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
    

  await browser.close();

})();


