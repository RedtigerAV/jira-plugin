const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const dirs = require('./swagger.paths').schemes.map(schema =>
  path.join(__dirname, schema.coreDir)
);

for (let dir of dirs) {
  if (fs.existsSync(dir)) {
    rimraf(dir, () => console.log(`Swagger directory "${dir}" cleared!\n`));
  }
}
