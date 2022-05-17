const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, data) => {  
  data.forEach( el => {
    if (el.isFile()) {
      let ext = path.extname(el.name).slice(1);
      let fileName = path.basename(el.name, path.extname(el.name));
      fs.stat(path.join(__dirname, 'secret-folder', el.name), (err, file) => {
        let size = file.size / 1024;
        console.log(fileName + ' - ' + ext  + ' - ' + size + 'kb');
      })
    }})
});