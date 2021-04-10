import React,{useState, useEffect} from "react";
import {ActivityIndicator, StyleSheet, Platform, Image, ScrollView, View } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import * as ImagePicker from 'expo-image-picker';
import AppButton from '../components/Button';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

import useLocation from '../hooks/useLocation';


const db = firebase.firestore();


const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  numberplate: Yup.string().required().label("Numberplate"),
  contact1: Yup.number().required().label("Contact1"),
  contact2: Yup.number().required().label("Contact2"),
  contact3: Yup.number().required().label("Contact3"),
  
});



function RegisterScreen({navigation}) {


  // useEffect(() => {
  //   getLocation();
    
  // }, []);

  const [image, setImage] = useState(null);
  const [textInput, settextInput] = useState([]);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  },[]);
  let result;
  const pickImage = async () => {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //Car Registration Number
  //Get Location
  //Emergency Contact Info
  //Add dynamically text fields
  //Image Picker closed
  // useEffect(()=>{
  //   console.log(textInput)
  // }, [textInput])
  uploadImage = async(uri, UserEmail) =>{
    const response = await fetch(uri);
    const blob = await response.blob();
    // const { currentUser } = firebase.auth();
    var ref = await firebase.storage().ref().child("profile/"+UserEmail+"/image");
    await ref.put(blob);
    return ref.getDownloadURL().then(console.log("Got the URL")).catch((error)=>console.log(error));
  }
  const firebasework = async(values) =>{
    
    await firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(user => console.log('register'))
    .catch(error => console.log(error));

    const uri = await uploadImage(image, values.email)
    .then(console.log("Image Uploaded"))
    .catch(error => console.log(error))

    var docData = {
      email: values.email,
      name: values.name,
      uri: uri,
      contact1: values.contact1,
      contact2: values.contact2,
      contact3: values.contact3,
      numberplate: values.numberplate,
      Credits: 0,
    };

    await db.collection('Authenticated').doc(values.email).set(docData).then(console.log("Collection added"))
    


  }

  // const addTextInput = (key) => {
  //   let newtextInput = textInput;
  //   newtextInput.push(
  //   <FormField
  //     autoCorrect={false}
  //     icon="star-circle-outline"
  //     name="specialization"
  //     placeholder="Contact"
  //     key={key}
  //   />);
  //   console.log(key)
  //   settextInput(newtextInput)
  // }



  return (
    <ScrollView>
    <Screen style={styles.container}>
      <Form
        initialValues={{ 
          name: "", 
          email: "", 
          password: "",
          numberplate: "",
          contact1: "",
          contact2: "",
          contact3: "",
          
        }}
        onSubmit={(values) => {
          console.log(values);
          firebasework(values);
          navigation.navigate("Login");

          
        }}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />

        

          <FormField
          autoCorrect={false}
          icon="google-maps"
          name="numberplate"
          placeholder="Enter you Car Number"
        />
        <FormField
      autoCorrect={false}
      icon="star-circle-outline"
      name="contact1"
      placeholder="Contact"
      />
      <FormField
      autoCorrect={false}
      icon="star-circle-outline"
      name="contact2"
      placeholder="Emergency Contact"
      />
      <FormField
      autoCorrect={false}
      icon="star-circle-outline"
      name="contact3"
      placeholder="Emergency Contact"
      />
        {/* <View>
        <AppButton title='+' onPress={() => addTextInput(textInput.length)} />
        {textInput.map((value) => {
          {value}
        })}
        </View> */}


      <AppButton title="Profile Picture" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, alignSelf:'center' }} />}

        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
    <ActivityIndicator animating/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
