import React, {useEffect, useState} from "react";
import { StyleSheet, Platform, Image, ScrollView, Button } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import AppButton from '../components/Button';
import * as Location from "expo-location";


// import sendwhatsapp from '../config/twilio';
import SendSMS from 'react-native-sms'

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';


const db = firebase.firestore();
uploadImage = async(uri, UserEmail, values) =>{
  const response = await fetch(uri);
  const blob = await response.blob();
  // const { currentUser } = firebase.auth();
  var ref = firebase.storage().ref().child("events/"+UserEmail+"/image"+Math.random()+values.title);
  await ref.put(blob);

  const url = await ref.getDownloadURL().then(console.log("Got the URL")).catch((error)=>console.log(error));
  // console.log("This is url",url)
  // Princeton model 
  // fetch('http://c52a45f89263.ngrok.io', {
  // method: 'POST',
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json'
  // },
  // body: JSON.stringify({
  //   imageUrl: url,
  //   })
  // })
  // .then((response) => console.log(response));

  return url;

}


const collectionwork = async(values, currentUser, url, location, mapurl) =>{
  var docData = {
    title: values.title,
    description: values.description,
    url: url,
    email: currentUser,
    location: location,
    mapurl: mapurl,
    isTaken: false, 
    isGenuine:false,
  };
  await db.collection('Accidents').add(docData).then()
  
}

const firebasework = async(values, currentUser, image, location, mapurl) =>{
  
  const url = await uploadImage(image, currentUser, values)
  .then()
  .catch(error => console.log(error))

  await collectionwork(values, currentUser, url, location, mapurl);  
  
}
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  description: Yup.string().label("Description"),
});



function ListingEditScreen({navigation}) {

  //This is picker
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState();
  
  const handleSOS = () =>{
    fetch("http://localhost:4000/send-text")
    .catch(err => console.log(err));
  }
  
  const [mapurl, setMapURL] = useState();
  
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
      const url = "https://www.google.com/maps/@"+ latitude+","+longitude+",21z";
      console.log(url);
      setMapURL(url);
      alert("Location stored")
    } catch (error) {
      alert("Couldn't fetch your location check GPS")
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  let result;
  const pickImage = async () => {
    result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      // console.log("uri=",result);
    }
  };

  //This is end

  return (
    <ScrollView>
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          description: "",
         
          
        }}
        onSubmit={async(values) => {
          
          const {currentUser} = await firebase.auth();
          await firebasework(values, currentUser.email,image, location, mapurl);
          navigation.navigate("DirectionScreen",{
            location:location,
          });

        }}
        validationSchema={validationSchema}
      >

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, justifyContent:'center', alignSelf:'center', marginTop: 20 }} />}
      <AppButton title="Accident Image" onPress={pickImage} />


        <FormField maxLength={255} name="title" placeholder="Car Number" />

        
      <AppButton title="Locate Me" onPress={getLocation}/>
      

        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Nearby Hospitals" />
      </Form>
    </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
