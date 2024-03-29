const { get } = require('follow-redirects').https;
const HttpsProxyAgent = require('https-proxy-agent');
const { createWriteStream, readFileSync, writeFileSync } = require('fs');
const { parse } = require('url');
const { fork } = require('child_process');
const { resolve } = require('path');
const tmp = require('tmp');
const https = require('https');
const { unlinkSync } = require('fs');

let envs = {};

process.argv.slice(2).forEach(arg=>{
  let [key,value] = arg.split('=');
  envs[key] = value || true;
});

tmp.file({}, (err, path, fd) => {
  const proxyInfo = process.env.http_proxy ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.HTTPS_PROXY;

  const agent = proxyInfo ?
    new HttpsProxyAgent(proxyInfo) :
    new https.Agent();

  const file = createWriteStream('', { fd });
  const request = get({
    ...parse(envs.source),
    agent
  }, r => {
    r.pipe(file);
    console.log(path);
    file.on('finish', () => {
      file.close();

      if (envs.dirName === 'platform') {
        patchSpec(path);
      }

      trimIds(path);
      const gen = fork('node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator', [
        'generate',
        '--skip-validate-spec',
        '--remove-operation-id-prefix',
        '--model-name-suffix',
        'Model',
        '-i',
        `"${path}"`,
        '-o',
        `"${resolve(__dirname, 'src/app/core/api/' + envs.dirName)}"`,
        '-g',
        'typescript-angular'
      ]);

      gen.on('exit', (code) => {
        if (code === 0) {
          try {
            unlinkSync(`./src/app/core/api/${envs.dirName}/index.ts`);
          } catch (error) {}
        }
      })
    });
  });
});

function trimIds(path) {
  o = JSON.parse(readFileSync(path));
  o.servers[0].url = 'https://timgo.atlassian.net';
  Object.keys(o.paths).forEach(p => {
    Object.keys(o.paths[p]).forEach(method => {
      if (o.paths[p][method]['x-atlassian-connect-scope'] == 'INACCESSIBLE') {
        console.log(`${method} for ${p} is inaccessible.  Skipping...`);
        delete o.paths[p][method];
      } else {
        const id = o.paths[p][method].operationId;

        if (id) {
          const e = id.split('.').slice(-1)[0];
          const newId = e.split('_')[0];
          console.log(`Rewriting ${id} to ${newId}`);
          o.paths[p][method].operationId = newId;
        }
      }
    })
  });

  writeFileSync(path, JSON.stringify(o));
}

function patchSpec(path) {
  o = JSON.parse(readFileSync(path));
  // Remove the null value and the inversion of equality symbol (~=) from the
  // enumeration and set the type to nullable on FieldValueClause.operator
  o.components.schemas.FieldValueClause.properties.operator.nullable = true;
  o.components.schemas.FieldValueClause.properties.operator.enum = o.components.schemas.FieldValueClause.properties.operator.enum.filter(x => x && x !== '~=');
  writeFileSync(path, JSON.stringify(o));
}
