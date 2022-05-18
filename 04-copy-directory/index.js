const fs = require('fs');
const path = require('path');


fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true}, () => {
  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, () => {});
  fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, data) => {
    data.forEach(el => {
      if (el.isFile()) {
        fs.copyFile(path.join(__dirname, 'files', el.name), path.join(__dirname, 'files-copy', el.name), () => {});
      }
    })
  });
})





