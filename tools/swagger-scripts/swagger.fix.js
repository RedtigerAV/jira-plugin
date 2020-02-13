const fs = require('fs');
const path = require('path');
const schemes = require('./swagger.paths').schemes;

// убираем проверку линтером всех сгенерированных файлов
const excludeFromTSLint = '/* tslint:disable */\r\n\r\n';

// заменяем тип возвращаемого значения с void на any чтобы не падал билд
const formParamsAnchor =
  'let formParams: { append(param: string, value: any): void; };';
const formParamsFix =
  '        let formParams: { append(param: string, value: any): any; };';

// исправление того что в POST запросах для multipart-form-data не передавалось тело formParams
const multipartFormdataMarker = 'new FormData()';
const multipartFormdataMarkerEnd = 'this.httpClient.post';
const multipartFormdataFix = ' formParams,';

/**
 * Добавляет ts-lint:disable к файлу с путем filePath
 * @param filePath - путь до файла
 */
function excludeFileFromTSLint(filePath) {
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
  fs.writeFileSync(filePath, excludeFromTSLint);
  fs.appendFileSync(filePath, fileContent);
}

/**
 * Добавляет все файлы в директории с путем pathDir и к файлам поддиректорй в начало ts-lint:disable
 * @param pathDir
 */
function excludeFromTSLintTree(pathDir) {
  fs.readdir(pathDir, (err, files) => {
    if (err) {
      throw err;
    }
    const tsFiles = files.filter(f => f.includes('.ts'));
    if (tsFiles.length) {
      tsFiles.map(f => {
        excludeFileFromTSLint(path.join(pathDir, f));
      });
    }

    const dirs = p =>
      files.filter(f => fs.statSync(path.join(p, f)).isDirectory());
    const folders = dirs(pathDir);

    if (folders.length) {
      folders.map(folder => excludeFromTSLintTree(path.join(pathDir, folder)));
    }
  });
}

function main(coreDir, servicesFolder) {
  excludeFromTSLintTree(coreDir);

  fs.readdir(servicesFolder, (err, files) => {
    if (err) {
      throw err;
    }

    files.map(f => {
      if (f.includes('service')) {
        let includesSearchTemplateCount = 0;

        let includesMultipartFormdataMarkerCount = 0;
        let isInsideMultipartFixBlock = false;

        const filePath = path.join(servicesFolder, f);

        fileContent = fs
          .readFileSync(filePath, { encoding: 'utf8' })
          .split('\n');

        fs.writeFileSync(filePath, '');

        fileContent.map((line, i) => {
          let newLineSymbol = i === fileContent.length - 1 ? '' : '\n';

          if (line.includes(formParamsAnchor)) {
            // Заменяем void на any в formParams
            fs.appendFileSync(filePath, formParamsFix);
            includesSearchTemplateCount += 1;
          } else if (line.includes(multipartFormdataMarker)) {
            // Запоминаем, что используем multipart-form-data
            fs.appendFileSync(filePath, line);
            isInsideMultipartFixBlock = true;
          } else if (
            // Проверяем. что используем multipart-form-data и делаем post запрос
            line.includes(multipartFormdataMarkerEnd) &&
            isInsideMultipartFixBlock
          ) {
            fs.appendFileSync(filePath, line);
            // Добавляем formParams в параметры запроса
            fs.appendFileSync(filePath, multipartFormdataFix);
            includesMultipartFormdataMarkerCount += 1;
            isInsideMultipartFixBlock = false;
          } else {
            fs.appendFileSync(filePath, line);
          }

          fs.appendFileSync(filePath, newLineSymbol);
        });

        if (includesSearchTemplateCount) {
          console.log(
            `FIXED: file <${filePath}> in ${includesSearchTemplateCount} places with formParams void->any`
          );
        }
        if (includesMultipartFormdataMarkerCount) {
          console.log(
            `FIXED: file <${filePath}> in ${includesMultipartFormdataMarkerCount} places with passing formParams in post request`
          );
        }
      }
    });
  });
}

for (let schema of schemes) {
  main(schema.coreDir, schema.servicesFolder);
}
