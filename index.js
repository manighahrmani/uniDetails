// Can you get the list of all university from this page: https://www.ucas.com/explore/courses?subject=Hospitality%2C%20leisure%2C%20and%20tourism&filterBy=all&studyYear=current&latLng=false&page=1
// And save it to a file called "university.txt"?

const puppeteer = require('puppeteer');
const fs = require('fs');


// ask the user for the url and the file name from the command line
const url = "https://www.ucas.com/explore/courses?subject=Hospitality%2C%20leisure%2C%20and%20tourism&filterBy=all&studyYear=current&latLng=false&page=1";
const fileName = 'university.csv';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
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

  fs.writeFile(fileName, universityList.join(',\n'), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
    

  await browser.close();

})();


