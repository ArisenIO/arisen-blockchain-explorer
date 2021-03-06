const path = require('path');
let config = {};

// production mod
config.PROD = false;

config.toInt = 10000;
config.coin = 'RIX';

// mongo uri and options
config.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ArisenExplorer';
config.MONGO_OPTIONS = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

// cron processes (aggregation of main stat - actions, transactions, accounts, analytics)
config.CRON = false;
config.CRON_API = 'https://greatchains.arisennodes.io';

// anable TPS APS daemon aggregation
config.TPS_ENABLE = true;
config.MAX_TPS_TIME_UPDATE = 5000; // time of break between reload (leave by default)

// enable for private network (daemon for Actions, Accounts)
config.CUSTOM_GLOBA_STATS = false;

// producer json name
config.producerJSON = 'bp.json';

// telegram alert bot (depreceted)
config.telegram = {
  ON: true,
  TOKEN: '818664401:AAHwB3g88TVLzTidKKX4vhX4zYH58E3EaUs',
  TIME_UPDATE: 5000
};

// reserve nodes
config.endpoints = [
      'https://greatchains.arisennodes.io'
];
config.rixInfoConfigs = {
    mainNet: {
      chainId: "136ce1b8190928711b8bb50fcae6c22fb620fd2c340d760873cf8f7ec3aba2b3",
      httpEndpoint: "https://greatchains.arisennodes.io",
      name: "Main Net",
      key: "mainNet"
    },
};

// rixjs
config.rixConfig = {
  chainId: "136ce1b8190928711b8bb50fcae6c22fb620fd2c340d760873cf8f7ec3aba2b3",
  keyProvider: "",
  httpEndpoint: config.endpoints[0],
  expireInSeconds: 60,
  broadcast: true,
  debug: false,
  sign: true,
  logger: {
    error: console.error
  }
};
// ArisenID wallet
config.walletAPI = {
    host: 'https://greatchains.arisennodes.io',
    port: '',
    protocol: 'https'
};

// api url for producers list
config.customChain = 'https://greatchains.arisennodes.io';

// api url for history
config.historyChain = 'https://greatchains.arisennodes.io';

// tokens api
config.tokensAPI = 'https://greatchains.arisennodes.io';

config.apiV = 'v1'; // api version
config.RAM_UPDATE = 5 * 60 * 1000; // time for ram update - /api/api.*.socket
config.HISTORY_UPDATE = 5 * 60 * 1000; // time for stats update - /api/api.*.socket 
config.MAX_BUFFER = 500000; // max buffer size for child processes (kb) - /crons
config.blockUpdateTime = 900; // mainpage upades frequency  - /api/api.*.socket in ml sec
config.offsetElementsOnMainpage = 10; // blocks on mainpage
config.limitAsync = 30; // max threads for async.js module  
config.updateTPS = 1000;

// log4js
config.logger = {
    appenders: {
      out:  {
            type: 'stdout'
      },
      server: {
        type: 'file',
        filename: path.join(__dirname, './server/logs/server.log'),
      },
      socket_io: {
        type: 'file',
        filename: path.join(__dirname, './server/logs/socket_io.log'),
      },
      accounts_daemon: {
        type: 'file',
        filename: path.join(__dirname, './server/logs/accounts_daemon.log'),
      },
      accounts_analytics: {
        type: 'file',
        filename: path.join(__dirname, './server/logs/accounts_analytics.log'),
      },
      global_stat: {
        type: 'file',
        filename: path.join(__dirname, './server/logs/global_stat.log'),
      },
      ram_bot: {
        type: 'file',
        filename: path.join(__dirname, './server/logs/ram_bot.log'),
      }
    },
    categories: {
        default:       {
          appenders: ['out'],
          level:     'trace'
        },
        server:  {
          appenders: ['out', 'server'],
          level:     'trace'
        },
        socket_io:  {
          appenders: ['out', 'socket_io'],
          level:     'trace'
        },
        accounts_daemon:  {
          appenders: ['out', 'accounts_daemon'],
          level:     'trace'
        },
        accounts_analytics:  {
          appenders: ['out', 'accounts_analytics'],
          level:     'trace'
        },
        global_stat:  {
          appenders: ['out', 'global_stat'],
          level:     'trace'
        },
        ram_bot:  {
          appenders: ['out', 'ram_bot'],
          level:     'trace'
        }
    }
};

// slack notifications
config.loggerSlack = {
      alerts: {
        type: '',
        token: '',
        channel_id: '',
        username: '',
      }
};

module.exports = config;

