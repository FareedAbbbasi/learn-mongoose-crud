let express = require('express')
var mongoose = require('mongoose');
let enquireyModel = require('./models/enquiry.model')
require('dotenv').config();


// connect to MongoDB
let app = express();

app.use(express.json());
app.post('/api/enquiry-insert', (req, res) => {
    let {sName, sEmail, sPhone, sMessage } = req.body
    let enquiry = new enquireyModel({
        name: sName, 
        email: sEmail,
        phone: sPhone,
        message: sMessage
    });
    enquiry.save().then(()=>{
        res.send({status:1, message:"Enquiry saved successfully"});
    }).catch((err)=>{
        res.send({status:0, message:"Error while saving enquiry", error:err});
    })
})

mongoose.connect(process.env.DBURL).then(()=> {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT,() => {
        console.log("Server is running on port " + process.env.PORT);
    })
})