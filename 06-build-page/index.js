const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, () => {
  fs.rm(
    path.join(__dirname, 'project-dist', 'index.html'),
    { recursive: true, force: true },
    (error) => {
      if (error) return console.error(error.message);

      fs.readFile(
        path.join(__dirname, 'template.html'),
        'utf-8',
        (error, data) => {
          if (error) return console.error(error.message);

          fs.readdir(
            path.join(__dirname, 'components'),
            { withFileTypes: true },
            (error, files) => {
              if (error) return console.error(error.message);

              files.forEach((file) => {
                if (file.isFile && path.extname(file.name) === '.html') {
                  fs.readFile(
                    path.join(__dirname, 'components', file.name),
                    'utf-8',
                    (error, component) => {
                      if (error) return console.error(error.message);
                      const fileName = file.name.slice(0, -5);
                      data = data.replace(`{{${fileName}}}`, component);
                      fs.writeFile(
                        path.join(__dirname, 'project-dist', 'index.html'),
                        data,
                        () => {},
                      );
                    },
                  );
                }
              });
            },
          );
        },
      );
    },
  );

  fs.rm(
    path.join(__dirname, 'project-dist', 'style.css'),
    { recursive: true, force: true },
    (error) => {
      if (error) return console.error(error.message);

      fs.readdir(
        path.join(__dirname, 'styles'),
        { withFileTypes: true },
        (error, styles) => {
          if (error) return console.error(error.message);

          styles.forEach((style) => {
            if (style.isFile && path.extname(style.name) === '.css') {
              const readStream = fs.createReadStream(
                path.join(__dirname, 'styles', style.name),
                'utf-8',
              );
              readStream.on('data', (chunk) => {
                fs.appendFile(
                  path.join(__dirname, 'project-dist', 'style.css'),
                  chunk + '\n',
                  () => {},
                );
              });
            }
          });
        },
      );
    },
  );

  fs.rm(
    path.join(__dirname, 'project-dist', 'assets'),
    { recursive: true, force: true },
    (error) => {
      if (error) return console.error(error.message);

      fs.mkdir(
        path.join(__dirname, 'project-dist', 'assets'),
        { recursive: true },
        () => {
          fs.readdir(
            path.join(__dirname, 'assets'),
            { withFileTypes: true },
            (error, asset) => {
              if (error) return console.error(error.message);

              asset.forEach((el) => {
                if (el.isFile()) {
                  fs.copyFile(
                    path.join(__dirname, 'assets', el.name),
                    path.join(__dirname, 'project-dist', 'assets', el.name),
                    () => {},
                  );
                } else {
                  fs.mkdir(
                    path.join(__dirname, 'project-dist', 'assets', el.name),
                    { recursive: true },
                    () => {},
                  );
                  fs.readdir(
                    path.join(__dirname, 'assets', el.name),
                    { withFileTypes: true },
                    (error, assets) => {
                      if (error) return console.error(error.message);

                      assets.forEach((file) => {
                        if (file.isFile()) {
                          fs.copyFile(
                            path.join(__dirname, 'assets', el.name, file.name),
                            path.join(
                              __dirname,
                              'project-dist',
                              'assets',
                              el.name,
                              file.name,
                            ),
                            () => {},
                          );
                        }
                      });
                    },
                  );
                }
              });
            },
          );
        },
      );
    },
  );
});
