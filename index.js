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
      universityList.push(universityName.innerText.replace(/,/g, ''));
      courseList.push(header.innerText.replace(/,/g, ''));
    });
    const data = universityList.map((element, index) => [element, courseList[index]]);
    return data;
  });
  const moreData = await page.evaluate(() => {
    const qualificationsList = [];
    const qualifications = document.querySelectorAll('.qualification');
    qualifications.forEach((qualification) => {
      qualificationsList.push(qualification.innerText.replace(/,/g, '').replace('Qualification\n', ''));
    });
    const studyModesList = [];
    const studyModes = document.querySelectorAll('.study-mode');
    studyModes.forEach((studyMode) => {
      studyModesList.push(studyMode.innerText.replace(/,/g, '').replace('Study mode\n', ''));
    });
    const durationsList = [];
    const durations = document.querySelectorAll('.duration');
    durations.forEach((duration) => {
      durationsList.push(duration.innerText.replace(/,/g, '').replace('Duration\n', ''));
    });
    const moreData = qualificationsList.map((element, index) => [element, studyModesList[index], durationsList[index]]);
    return moreData;
  });
  
  const finalData = data.map((element, index) => [element[0], element[1], moreData[index][0], moreData[index][1], moreData[index][2]]);    

  for (let i = 0; i < finalData.length; i++) {
    const row = finalData[i].join(',') + '\n';
    fs.appendFile(config.fileName, row, (err) => {
      if (err) throw err;
    });
  }
    

  await browser.close();
  console.log('Done');
})();



