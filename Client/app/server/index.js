//Dependencies: 
//yarn add express cors twilio 

const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

//twilio requirements -- Texting API 
const accountSid= "AC9f250baee7c0d6d291e3cdf54aa2135d";
const authToken = "5533748a2ab1b725c91632e2d3cd9071";
const client = new twilio(accountSid, authToken);

const app = express(); //alias

app.use(cors()); //Blocks browser from restricting any data

//Welcome Page for the Server 
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})

//Twilio 
app.get('/send-text', (req, res) => {
    //Welcome Message
    res.send('Hello to the Twilio Server')

    //_GET Variables
    

    //Send Text
    client.messages.create({
        body: 'Your appointment is coming up on July 21 at 3PM',
        to: 'whatsapp:+919834175941',  // Text this number
        from: 'whatsapp:+14155238886', // From a valid Twilio number
    }).then((message) => console.log(message.body));
})

app.listen(4000, () => console.log("Running on Port 4000"))
