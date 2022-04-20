'use strict';

module.exports = appInfo => {

  const config = exports = {};

  config.keys = appInfo.name + '_1650426914972_246';

  config.middleware = [
    "errHandler",
  ];

  config.mongoose = {
    client: {
      url: 'mongodb://47.96.9.220:27017/realworld',
      options: {
        serverSelectionTimeoutMS: 5000,
        useUnifiedTopology: true
      },
      plugins: [],
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  const userConfig = require('./secret')

  return {
    ...config,
    ...userConfig,
  };
};
