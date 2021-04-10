import React, {useEffect, useState} from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";

import * as Location from "expo-location";
import AppButton from '../components/Button';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from "./../config/firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});


function LoginScreen({navigation}) {
  const [location, setLocation] = useState();
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
      
      setMapURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const createSOS = async()=>{
    console.log("Callled")
    var docData = {
      mapurl:mapurl,
      location: location,
      isTaken: false,
    }
    console.log(docData);
    db.collection("Emergency").add(docData).then(console.log("Collection Added")).catch(err=>console.log(err));
  }

  return (
    <ScrollView style={styles.container}>
    <Screen >
     
      <Image style={styles.logo} source={require("../assets/new-logo.jpg")} />
      <AppButton title="Make an SOS" onPress={createSOS}/>
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={async(values) => {
          console.log(values)
        firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(() => navigation.navigate("AppNavigator"))
        .catch(error => console.log(error))
        }}
        validationSchema={validationSchema}
      >
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
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" style={styles.butt} />
      </Form>
      
    </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
  logo: {
    width: "100%",
    // height: "50%",
    alignSelf: "center",
    // marginTop: 50,
    marginBottom: 50,
  },
  butt: {
    marginBottom: 100,
    padding: 100
  }
});

export default LoginScreen;
