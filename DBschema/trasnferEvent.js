const mongoose = require('mongoose');

const Txdata = new mongoose.Schema({

    transactionHash: {type:String,unique:true,required:true},
    blockNumber:{ type:Number, unique:true,required:true},
    contractAddress:{ type:String, required:true},
    accountAddress:{ type:String, required:true},
    from:{type:String,required:true},
    to:{type:String,required:true},
    value:{type:Number,required:true},
    event:{type:String,required:true},
    
  }
);
  
  module.exports  = mongoose.model('TransferLog', Txdata);