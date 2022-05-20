const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

stdout.write('Введите текст: \n');

fs.writeFile(path.join(__dirname, 'text.txt'), '', () => {});

stdin.on('data', data => {  
  text = data.toString().trim();
  if (text === 'exit') {
    stdout.write('Процесс завершен');
    process.exit();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), data, () => {});
  }
});

process.on('SIGINT', () => {
  stdout.write('Процесс завершен');  
  process.exit();
})

