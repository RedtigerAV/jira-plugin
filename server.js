const ace = require('atlassian-connect-express');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const http = require('http');

const app = express();
const addon = ace(app);
const port = addon.config.port();
const devEnv = app.get('env') == 'development';

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compression());
app.use(express.static(__dirname + '/dist/jira-timgo'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/dist/jira-timgo')));
app.get('/installed', (req, res) => {
  res.send('success');
});

if (devEnv) {
  app.use(errorHandler());
}

app.use(addon.middleware());

http.createServer(app).listen(port, function(){
  if (devEnv) {
    addon.register();
  }
});
