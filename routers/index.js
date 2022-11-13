const routers = require("express").Router();
const TransferLog=require("../DBschema/trasnferEvent")
routers.get('/getTrasferTx/:address',async(req,res)=>{
    const address = req.params.address;
    
    TransferLog.find({accountAddress:address}, function (err, display) {
        if (err){
            console.log(err)
        }else{
            if(display.length === 0){
                console.log("No Transfer Transactions Found");
                res.json({
                    "Message: ": "No Transfer Transactions Found"
                  })
            }
    
            else{
                console.log(display);
                showData(display)
                let getTxData = sendResponse(display)
                res.json({
                    "Transaction Data: ": getTxData
                  })
                
            }
        }
    });

})


const showData = async(data)=>{
    console.log("Total Transfer Transactions: " + data.length);
    for(let i=0; i<data.length; i++) {
        console.log(data[i].from+" -> "+data[i].to+" - "+data[i].value+" wei");
    }
}

const sendResponse = (data)=>{
    let arr=[]
    for(let i=0; i<data.length; i++) {
        arr.push(data[i].from+" -> "+data[i].to+" - "+data[i].value+" wei");
    }
    //console.log(arr);
    const responseData={
        "Total Transfer Transactions: " : data.length,
        "Transfer History :": arr
    }
    console.log(responseData);
    return responseData;
}
module.exports=routers;