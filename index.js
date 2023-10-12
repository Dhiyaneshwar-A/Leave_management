const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve your HTML file from the same directory as the server script

mongoose.connect("mongodb://127.0.0.1:27017/aravindh").then((res) => {
    console.log("Db is connected");
}).catch((err) => {
    console.log(err);
});

const UserSchema = new mongoose.Schema({
    username: String,
    leavetype:String,
    startdate:Date,
    enddate:Date,
    days:String,
    reason:String,
    hod:String
});
const User = mongoose.model("User", UserSchema);
app.get("/fetch", (req, res) => {
    User.find()
        .then((data) => {
            res.json(data); // Send the fetched data as a JSON response
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error fetching data" });
        });
});
app.use(express.json()); // Add this line to parse JSON data in the request body
app.put('/update/:username',async(req,res)=>{
    try {
        const { username } = req.params;
        const { hod } = req.body;
        console.log(hod);
        await User.findOneAndUpdate({ username: username }, {hod:hod},{upsert:true})
            .then((updatedUser) => {
                if (!updatedUser) {
                    console.log("User not found");
                    res.status(404).json({ error: 'User not found' });
                } else {
                    console.log(updatedUser);
                    res.json({ message: 'User updated successfully' });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ error: 'Error updating user' });
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error updating user' });
    }
})


app.post("/registration/", async function (req, res) {
    try {
        console.log(req.body);
        const { username, leavetype, startdate, enddate, days, reason } = req.body;
        const hod = "not approved";
        const Userdata = new User({ username, leavetype, startdate, enddate, days, reason, hod }); // Include hod in the document creation
        await Userdata.save();
        res.json({ message: "Registration successful" }); // Send a success response to the client
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Registration failed" }); // Send an error response to the client
    }
});

app.listen(3000, () => {
    console.log("Server started");
});
