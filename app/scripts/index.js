// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import StarNotaryArtifact from '../../build/contracts/StarNotary.json'

// StarNotary is our usable abstraction, which we'll use through the code below.
const StarNotary = contract(StarNotaryArtifact)

let accounts
let account

const createStar = async () => {
  const instance = await StarNotary.deployed();
  const name = document.getElementById("starName").value;
  const id = document.getElementById("starId").value;
  const dec = document.getElementById("dec").value;
  const mag = document.getElementById("mag").value;
  const cent = document.getElementById("cent").value;
  const story = document.getElementById("story").value;
  await instance.createStar(name, dec, mag, cent, story, id, {from: account});
  App.setStatus("New Star Owner is " + account + ".");
}

const lookUptokenIdToStarInfo = async () => {
  const instance = await StarNotary.deployed();
  const id2 = document.getElementById("starId2").value;
  let starName = await instance.lookUptokenIdToStarInfo(id2, {from: account});
  App.setStatus2("the star name is " + starName + ".");
}


const App = {
  start: function () {
    const self = this

    // Bootstrap the MetaCoin abstraction for Use.
    StarNotary.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      accounts = accs
      account = accounts[0]

    })
  },

  setStatus: function (message) {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  setStatus2: function (message) {
    const status = document.getElementById('status2')
    status.innerHTML = message
  },

  createStar: function () {
    createStar();
  },
  lookUptokenIdToStarInfo: function () {
    lookUptokenIdToStarInfo();
  },

}

window.App = App

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn(
      'Using web3 detected from external source.' +
      ' If you find that your accounts don\'t appear or you have 0 MetaCoin,' +
      ' ensure you\'ve configured that source properly.' +
      ' If using MetaMask, see the following link.' +
      ' Feel free to delete this warning. :)' +
      ' http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:9545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
  }

  App.start()
})
