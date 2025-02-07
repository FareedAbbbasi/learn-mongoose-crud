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

app.get("/api/enquiry-list", async (req, res) => {
    let enquireyList = await enquireyModel.find();
    res.send({status: 1, msg: "Enquiry list", data:enquireyList})
})

app.delete("/api/enquiry-delete/:id", async (req, res) => {
    let enquireyId = req.params.id;
    let deletedEnquiry = await enquireyModel.deleteOne({_id:enquireyId})
    res.send({status: 1, msg: "Enquiry deleted successfully", id: enquireyId, delRes: deletedEnquiry})
})

app.put("/api/enquiry-update/:id", async (req, res) => {
    let enquireyId = req.params.id;
    let {sName, sEmail, sPhone, sMessage} = req.body;
    let updateObj = {
        name: sName,
        email: sEmail,
        phone: sPhone,
        message: sMessage
    };
    let updateRes = await enquireyModel.updateOne({_id: enquireyId}, updateObj)
    res.send({status: 1, message: "Enquired updated success", updateRes})
})

mongoose.connect(process.env.DBURL).then(()=> {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT,() => {
        console.log("Server is running on port" + process.env.PORT);
    })
})