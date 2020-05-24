const fs = require('fs');
const path = require('path');
const dirsToIgnore = ['api', 'common-configuration'];

const allFilesSync = (dir, extensions) => {
  fs.readdirSync(dir).forEach(file => {

    const filePath = path.join(dir, file);
    const fileExtensionPos = filePath.lastIndexOf('.');
    const fileExtension = filePath.slice((fileExtensionPos || 0) + 1);
    const dirPos = filePath.lastIndexOf('/');
    const dirPath = filePath.slice((dirPos || 0) + 1);

    if (!fs.statSync(filePath).isDirectory() && extensions.includes(fileExtension)) {
      let fileContent = fs.readFileSync(filePath, 'utf8');
      let importLastPos = fileContent.lastIndexOf('import {');

      if (importLastPos >= 0) {
        fileContent = fileContent.slice(importLastPos + 1);
        fileContent = fileContent.slice(fileContent.indexOf(';') + 1);
      }

      fileContent = `\n # ${file} \n\n${fileContent}`;
      fileContent += '/------------------------------';

      fs.appendFileSync('text.txt', fileContent, 'utf8');
    } else if (fs.statSync(filePath).isDirectory() && !dirsToIgnore.includes(dirPath)) {
      allFilesSync(filePath, extensions);
    }
  });
};

allFilesSync(path.join(__dirname, ''), ['ts', 'html']);
