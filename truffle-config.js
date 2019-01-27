// Allows us to use ES6 in our migrations and tests.
require('babel-register')
const HDWalletProvider = require("truffle-hdwallet-provider");
// module.exports = {
//   networks: {
//     ganache: {
//       host: '127.0.0.1',
//       port: 9545,
//       network_id: '*' // Match any network id
//     }
//   }
// }

module.exports = {
networks: {
  development: {
   host: "127.0.0.1",
   port: 9545,
   network_id: "*" // Match any network id
 },
 rinkeby: {
  provider: function() {
 return new HDWalletProvider("eight become nerve melt remind target shock lady hello clever jar amount", "https://rinkeby.infura.io/v3/898d3cda6ccb4b26a70b8d52f5d2c042")
     },
      network_id: '4',
      gas: 4500000,
      gasPrice: 10000000000,
    }
   }
 };
