//Dependencies: 
//yarn add express cors twilio 

const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

//twilio requirements -- Texting API 
const accountSid= "ACba58dcb921e73b400cb0ee63467b840c";
const authToken = "3d4d241cbf4d47f093b03b99a763ae36";
const client = new twilio(accountSid, authToken);

const app = express(); //alias

app.use(cors()); //Blocks browser from restricting any data

//Welcome Page for the Server 
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})

//Twilio 
app.post('/send-text', (req, res) => {
    //Welcome Message
    // res.send('Hello to the Twilio Server')

    //_GET Variables
    const {contact1, contact2, url, name} = req.query;

    //Send Text

    client.messages.create({

        body: `There's is an emergency at location ${url} involving ${name}. Please inform the local authorities.` ,
        to: `whatsapp:+91${contact1}`,  // Text this number
        from: 'whatsapp:+14155238886', // From a valid Twilio number
    }).then((message) => console.log(message.body));
    client.messages.create({
        body: `There's is an emergency at location ${url} involving ${name}. Please inform the local authorities.` ,
        to: `whatsapp:+91${contact2}`,  // Text this number
        from: 'whatsapp:+14155238886', // From a valid Twilio number
    }).then((message) => console.log(message.body));

})

app.listen(4000, () => console.log("Running on Port 4000"))