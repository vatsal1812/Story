/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';

inquirer
  .prompt([
    {
    "message":"enter the url: ",
     name:"url",
    }
  ])
  .then((answers) => {
    const url = answers.url;
    var qr_svg = qr.image('url');
    qr_svg.pipe(require('fs').createWriteStream("qr_img.png"));
    require('fs').writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });