# Uni Details Extractor

This is a simple Node project that will extract details from UCAS pages.

## Installation

### Setup for university machines only:

Go to the [AppsAnywhere](appsanywhere.port.ac.uk/) and get the following in this order:

- Node.js v19.4
- Git GUI

### Rest of the setup (for all machines):

Open a terminal or PowerShell and run the following commands:

```bash
git clone https://github.com/manighahrmani/uniDetails
```

Then move into the directory:

```bash
cd uniDetails
```

Then install the dependencies:

```bash
npm setup
```

## Usage

First, check the config.
This file includes the first page of the UCAS list and a file name for the output.
```js
module.exports = {
  url: "https://www.ucas.com/explore/courses?subject=Hospitality%2C%20leisure%2C%20and%20tourism&filterBy=all&studyYear=current&latLng=false&page=1",
  fileName: 'university.csv'
};
```

Update the URL to the page of the UCAS site you want to extract.
And update the file name to the name of the file you want to save the data.


Now, run the program:

```bash
npm start
```

The program will extract the data and save it to the file you specified in the config.
To open the folder where the file is saved, run the following command (for Windows only on PowerShell):

```bash
Invoke-Item .
```

On Mac, you can use the following command:

```bash
open .
```

