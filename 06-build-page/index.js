const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, () => {
  fs.rm(path.join(__dirname, 'project-dist', 'index.html'), {recursive: true, force: true}, () => {
    fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => { 
      fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, files) => {
        files.forEach(el => {
          if ((el.isFile) && (path.extname(el.name) === '.html')) {
            fs.readFile(path.join(__dirname, 'components', el.name), 'utf-8', (err, comp) => {
              let nameFile = el.name.slice(0, -5);
              data = data.replace(`{{${nameFile}}}`, comp);
              fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), (data), () => {})
            })
          }
        });
      });
    });
  });
  
  fs.rm(path.join(__dirname, 'project-dist', 'style.css'), {recursive: true, force: true}, () => {
    fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, styles) => {
      styles.forEach(el => {
        if ((el.isFile) && (path.extname(el.name) === '.css')) {        
          const readStream = fs.createReadStream(path.join(__dirname, 'styles', el.name), 'utf-8');
          readStream.on('data', (chunk) => {
            fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), (chunk + '\n') , () => {});
          }) 
        }
      })
    })
  })
  
  fs.rm(path.join(__dirname, 'project-dist', 'assets'), {recursive: true, force: true}, () => {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, () => {
      fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, asset) => {
        asset.forEach(el => {
          if (el.isFile()) {
            fs.copyFile(path.join(__dirname, 'assets', el.name), path.join(__dirname, 'project-dist', 'assets', el.name), () => {});
          } else {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', el.name), {recursive: true}, () => {});
            fs.readdir(path.join(__dirname, 'assets', el.name), {withFileTypes: true}, (err, assets) => {
              assets.forEach(elem => {
                if (elem.isFile()) {
                  fs.copyFile(path.join(__dirname, 'assets', el.name, elem.name), path.join(__dirname, 'project-dist', 'assets', el.name, elem.name), () => {});
                }
              })
            })
          }
        })
      });
    });
  })
});
