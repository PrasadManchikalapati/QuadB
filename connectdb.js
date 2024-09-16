const mongoose = require('mongoose', { useNewUrlParser: true, useUnifiedTopology: true })

function connect(){
    mongoose.connect("mongodb+srv://Prasad:Prasad%40123@cluster0.idmzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
        console.log("database connected")
    })
}

module.exports = connect()