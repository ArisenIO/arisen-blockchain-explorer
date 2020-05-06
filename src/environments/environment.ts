// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const chain = '136ce1b8190928711b8bb50fcae6c22fb620fd2c340d760873cf8f7ec3aba2b3';
export const environment = {
    production: false,
    appName: 'RIXweb',
    network: {
        blockchain: 'rix',
        host: 'https://greatchains.arisennodes.io',
        port: 443,
        protocol: 'https',
        expireInSeconds: 120,
        chainId: chain
    },
    chain: chain,
    RIX: {
        httpEndpoint: 'https://greatchains.arisennodes.io',
        chainId: chain,
        verbose: false
    },
    frontConfig: {
       coin: 'RIX',
       bp: 'bp.json',
       tokenContract: 'arisen.token',
       totalBalance: 'RIX',
       convertToUSD: true,
       customBalance: false,
       logo: '/assets/images/arisen-logo-dark-gray.png',
       name: {
          big: '',
          small: 'Explorer'
       },
       nets: [{ name: 'Mainnet', url: 'https://greatchains.arisennodes.io', active: true },
              { name: 'Jungle', url: 'https://jungle.RIXweb.net', active: false },
              { name: 'Europechain', url: 'https://xec.RIXweb.net', active: false },
              { name: 'WAX', url: 'https://wax.RIXweb.net', active: false }],
       disableNets: false,
       voteDonationAcc: 'RIXwebnetbp1',
       disableVoteDonation: false,
       version: '2.2.8',
       producers: 1000,
       social: [
         { link: 'https://github.com/arisenio', icon: 'fa-github' },
         { link: 'https://facebook.com/arisenx', icon: 'fa-facebook' },
         { link: 'https://medium.com/arisenx', icon: 'fa-medium' },
         { link: ' https://twitter.com/arisenx', icon: 'fa-twitter' },
       ],
       liveTXenable: true
    }
};

/*const chain = '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4';
export const environment = {
    production: true,
    appName: 'WAXweb',
    network: {
        blockchain: 'RIX',
        host: 'wax.cryptolions.io',
        port: 443,
        protocol: 'https',
        expireInSeconds: 120,
        chainId: chain
    },
    chain: chain,
    RIX: {
        httpEndpoint: 'https://wax.cryptolions.io',
        chainId: chain,
        verbose: false
    },
    frontConfig: {
       coin: 'WAX',
       bp: 'bp.json',
       tokenContract: 'RIXio.token',
       totalBalance: 'WAX',
       convertToUSD: true,
       customBalance: false,
       logo: '/assets/images/wax.png',
       name: {
          big: 'wax',
          small: 'web'
       },
       nets: [{ name: 'Mainnet', url: 'https://RIXweb.net', active: false },
              { name: 'Jungle', url: 'https://jungle.RIXweb.net', active: false },
              { name: 'Europechain', url: 'https://xec.RIXweb.net', active: false },
              { name: 'WAX', url: 'https://wax.RIXweb.net', active: true },
              { name: 'LYNX', url: 'https://lynx.RIXweb.net', active: false }],
       disableNets: false,
       voteDonationAcc: 'cryptolions1',
       disableVoteDonation: false,
       version: '1.0.0',
       producers: 1000,
       social: [
         { link: 'https://github.com/orange1337/RIXweb', icon: 'fa-github' },
         { link: 'https://www.facebook.com/RIXwebnet-199076424068961', icon: 'fa-facebook' },
         { link: 'https://www.reddit.com/user/RIXweb', icon: 'fa-reddit-alien' },
         { link: 'https://medium.com/@RIXwebN', icon: 'fa-medium' },
         { link: 'https://twitter.com/RIXwebN', icon: 'fa-twitter' },
         { link: 'https://t.me/RIXwebdevchat', icon: 'fa-telegram-plane' }
       ],
       liveTXenable: true
    }
};*/
