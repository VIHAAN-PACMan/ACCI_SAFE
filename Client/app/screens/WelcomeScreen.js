import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";
import * as firebase from 'firebase';

var db = firebase.firestore();

function WelcomeScreen({navigation}) {
  const [mapurl, setMapURL] = useState();
  const [location, setLocation] = useState();

  const createSOS = async () => {
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

    var docData = {
      mapurl: mapurl,
      location: location,
      isTaken: false,
    }
    await db.collection('Emergency').add(docData).then(console.log("Collection Added!"));
  };


  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/new-logo.jpg")} />
        <Text style={styles.tagline}>Safety at it's best</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={() => navigation.navigate("Login")}/>
        <Button title="Register" color="secondary" onPress={() => navigation.navigate("Register")}/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: "100%",
    height: "200%",
  },
  logoContainer: {
    position: "absolute",
    top: "10%",
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
