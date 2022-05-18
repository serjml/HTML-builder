const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'styles');

fs.readdir(folder, {withFileTypes: true}, (err, data) => {
  data.forEach(el => {
    if ((el.isFile) && (path.extname(el.name) === '.css')) {
      console.log(el)
      const readStream = fs.createReadStream(path.join(__dirname, 'styles', el.name), 'utf-8');      
      readStream.on('data', (chunk) => {
        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), (chunk + '\n') , () => {});
      }) 
    }
  })
})
