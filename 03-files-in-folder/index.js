const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (error, data) => {
    if (error) {
      return console.error(error.message);
    }

    data.forEach((file) => {
      if (file.isFile()) {
        const extension = path.extname(file.name).slice(1);
        const name = path.basename(file.name, path.extname(file.name));

        fs.stat(
          path.join(__dirname, 'secret-folder', file.name),
          (error, file) => {
            if (error) {
              return console.error(error.message);
            }

            const size = file.size / 1024;
            console.log(`${name} - ${extension} - ${size}kb`);
          },
        );
      }
    });

    console.log(data);
  },
);
