var express = require("express");
var bodyParser = require("body-parser")
var mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/Renovatconstruction', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to the database"));
db.once('open', () => console.log("Connected to the database"));

app.post("/signup", (req, res) => {
    var Fname = req.body.firstname;
    var Lname = req.body.lastname;
    var Mnumber = req.body.number;
    var Sub = req.body.subject;
    var Email = req.body.email;
    var Msg = req.body.message;
    var data = {
        "First Name": Fname,
        "Last Name": Lname,
        "Mobile Number": Mnumber,
        "Subject": Sub,
        "Email":Email,
        "Message":Msg
    };

    db.collection('userinfo').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record Inserted Successfully:", collection.insertedId);
        return res.redirect('confirm.html');
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.redirect('contact.html');
});

app.listen(3030, () => {
    console.log("Listening on PORT 3030");
});