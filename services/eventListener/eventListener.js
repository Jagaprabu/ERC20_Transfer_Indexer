require('dotenv').config()
const Web3 = require('web3')
const erc20Abi = abi = require('human-standard-token-abi')
const {saveData} = require('../mongoDB/saveData')

const contractAddress = process.env.CONTRACT_ADDRESS
const provider = new Web3.providers.WebsocketProvider(process.env.WEB_SOCKET)
const web3 = new Web3(provider)

const contract = new web3.eth.Contract(erc20Abi, contractAddress);
const startEventListener = () =>{
contract.events.allEvents(function (err, event) {
  if (err) {
    console.error('Error', err)
    process.exit(1)
  }

  console.log('Event', event)
  if(event.event == 'Transfer'){
    if((String(event.returnValues._from) != "0x0000000000000000000000000000000000000000") &&
       (String(event.returnValues._to) != "0x0000000000000000000000000000000000000000")) {       
        
        saveData(event);
    }
    if(String(event.returnValues._from) == "0x0000000000000000000000000000000000000000") {
        console.log("Mint Happended");
    }
    if(String(event.returnValues._to) == "0x0000000000000000000000000000000000000000") {
        console.log("Burn Happended");
    }
    }
})

console.log('Waiting for events...')
}

module.exports ={startEventListener}
