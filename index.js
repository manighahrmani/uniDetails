const puppeteer = require('puppeteer');
const fs = require('fs'); 
const config = require('./config');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(config.url);

  const data = await page.evaluate(() => {
    const universityList = [];
    const courseList = [];
    const headers = document.querySelectorAll('.course-title');
    headers.forEach((header) => {
      const courseName = header.nextElementSibling;
      const universityName = courseName.nextElementSibling;
      universityList.push(universityName.innerText);
      courseList.push(header.innerText);
    });
    const data = universityList.map((element, index) => [element, courseList[index]]);
    return data;
  });

  for (let i = 0; i < data.length; i++) {
    const row = data[i][0] + ',' + data[i][1] + '\n';
    fs.appendFile(config.fileName, row, (err) => {
      if (err) throw err;
    });
  }
    

  await browser.close();
  console.log('Done');
})();



