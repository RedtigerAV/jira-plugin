const ace = require('atlassian-connect-express');
const config = require('atlassian-connect-express/lib/internal/config');
const utils = require('atlassian-connect-express/lib/internal/utils');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');

const CONFIG_FILENAME = 'config.json';
const configOpts = utils.loadJSON(CONFIG_FILENAME);
const configuration = config(configOpts);

module.exports = {
  devServer: {
    publicPath: '/',
    port: configuration.port(),
    disableHostCheck: true,
    before: function (app) {
      const addon = ace(app);
      app.set('port', configuration.port());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: false}));
      app.use(cookieParser());
      app.use(compression());
      if (app.get('env') == 'development') {
        app.use(errorHandler());
      }

      app.use(addon.middleware());
      addon.register();
    }
  }
};
