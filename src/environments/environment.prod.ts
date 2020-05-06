const chain = '136ce1b8190928711b8bb50fcae6c22fb620fd2c340d760873cf8f7ec3aba2b3';
export const environment = {
    production: true,
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
    Rix: {
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
       nets: [{ name: 'Mainnet', url: 'https://greatchains.arisennodes.io', active: true }],
       disableNets: false,
       voteDonationAcc: 'rixwebnetbp1',
       disableVoteDonation: false,
       version: '2.2.8',
       producers: 1000,
       social: [
         { link: 'https://github.com/orange1337/eosweb', icon: 'fa-github' },
         { link: 'https://www.facebook.com/EOSwebnet-199076424068961', icon: 'fa-facebook' },
         { link: 'https://www.reddit.com/user/eosweb', icon: 'fa-reddit-alien' },
         { link: 'https://medium.com/@EoswebN', icon: 'fa-medium' },
         { link: 'https://twitter.com/EoswebN', icon: 'fa-twitter' },
         { link: 'https://t.me/eoswebdevchat', icon: 'fa-telegram-plane' }
       ],
       liveTXenable: true
    }
};