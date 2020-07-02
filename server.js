const ace = require('atlassian-connect-express');
const config = require('atlassian-connect-express/lib/internal/config');
const utils = require('atlassian-connect-express/lib/internal/utils');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const http = require('http');

const CONFIG_FILENAME = 'config.json';
const configOpts = utils.loadJSON(CONFIG_FILENAME);
const configuration = config(configOpts);

const app = express();
const addon = ace(app);
const devEnv = app.get('env') == 'development';

app.set('disableHostCheck', true);
app.set('port', configuration.port());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compression());
app.use(express.static(__dirname + '/dist/jira-timgo'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/dist/jira-timgo')));

if (devEnv) {
  app.use(errorHandler());
}

app.use(addon.middleware());

const server = http.createServer(app);

server.listen(configuration.port());

if (devEnv) {
  addon.register();
}
