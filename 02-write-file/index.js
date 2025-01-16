const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

stdout.write('Enter text: \n');
fs.writeFile(path.join(__dirname, 'text.txt'), '', () => {});

stdin.on('data', (data) => {
  const text = data.toString().trim();
  if (text === 'exit') {
    stdout.write('Process is complete');
    process.exit();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), data, () => {});
  }
});

process.on('SIGINT', () => {
  stdout.write('Process is complete');
  process.exit();
});
