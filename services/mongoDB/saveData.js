const TransferLog=require("../../DBschema/trasnferEvent")
const saveData = (event) =>{
   
    TransferLog.collection.insertOne({  
        transactionHash:event.transactionHash,
        blockNumber:event.blockNumber,
        contractAddress:event.address,
        accountAddress:event.returnValues._from,
        from:event.returnValues._from,
        to:event.returnValues._to,
        value:event.returnValues._value,
        event:event.event,
    });
    
    console.log("Saved Transfer Event in DB");
}

module.exports={ saveData }