const fs = require('fs');
const path = require('path');

fs.rm(
  path.join(__dirname, 'project-dist', 'bundle.css'),
  { recursive: true, force: true },
  (error) => {
    if (error) return console.error(error.message);

    fs.readdir(
      path.join(__dirname, 'styles'),
      { withFileTypes: true },
      (error, data) => {
        if (error) return console.error(error.message);

        data.forEach((file) => {
          if (file.isFile && path.extname(file.name) === '.css') {
            const readStream = fs.createReadStream(
              path.join(__dirname, 'styles', file.name),
              'utf-8',
            );
            readStream.on('data', (chunk) => {
              fs.appendFile(
                path.join(__dirname, 'project-dist', 'bundle.css'),
                chunk + '\n',
                (error) => {
                  if (error) return console.error(error.message);
                },
              );
            });
          }
        });
      },
    );
  },
);
