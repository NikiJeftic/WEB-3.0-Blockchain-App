require('@nomiclabs/hardhat-waffle');

module.exports= {
  solidity:'0.8.0',
  networks: {
    ropsten: {
      url:'https://eth-ropsten.alchemyapi.io/v2/6U02PtU9Hl9GOfYTb2nfStbES08YYRAg', //HTTP copied from alchemy
      accounts: ['cd07b296805db4ec4a86325dfc25041f38aab797ab3cfadf8176e661a5469eb2'] //address used for funding conttract, PRIVATE KEY
    }
  }
}