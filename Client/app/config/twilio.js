const AccountSID= "AC9f250baee7c0d6d291e3cdf54aa2135d";
const AuthToken = "5533748a2ab1b725c91632e2d3cd9071";
const client = require('twilio')(AccountSID, AuthToken);

export default function sendwhatsapp(){
    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Your Emergency contact is injured',
         to: 'whatsapp:+919834175941'
       })
      .then(message => console.log(message.sid));
}