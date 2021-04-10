import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";


import * as firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();
import 'firebase/storage';  


function getUser(currentUser){
  db.collection('Authenticated').doc(currentUser).get().then((user) =>{
    console.log(user.data());
  })
}
const menuItems = [
  {
    title: "Credits",
    icon: {
      name: "star-circle",
      backgroundColor: colors.primary,
    },
    targetScreen: "CreditScreen"
  },
  {
    title: "Add a Blog",
    icon: {
      name: "shape-circle-plus",
      backgroundColor: colors.secondary,
    },
    targetScreen: "CreateBand"
  },
];
function AccountScreen({navigation}) {
  const { currentUser } = firebase.auth();
  const [user, setUser] = useState();
  const [url, setURL] = useState();
  const [credit, setCredits] = useState();

    const getCredit = async() =>{
      await db.collection('Authenticated').doc(currentUser.email).get().then(async(doc)=>{
        console.log(doc.data());
        setCredits(doc.data().Credits);
      })
    }

  const signout = async()=>{
    
    
    await firebase.auth().signOut().then(navigation.navigate("Welcome")).catch((error) => console.log(error));
  }
  const getUsername = async() =>{
    const docRef = db.collection('Authenticated').doc(currentUser.email);
    
    await docRef.get().then( async(doc) =>{
      if(doc.exists)  {
        setUser(doc.data().name);
      }
      
      else
      console.log("Bleh");
      }
    ).catch((error) => console.log(error));
  }

  const getImage = () =>{
    var pathReference = firebase.storage().ref('profile/'+currentUser.email+'/image')
    pathReference.getDownloadURL().then((uri) => {
      setURL(uri);
    });
  }
  
  useEffect(() => {
    getImage();
    getUsername();
    getCredit();
  },[]);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={currentUser.email}
          subTitle={user}
          image={url}
        />
        
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.subTitle}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen, credit)}
            />
          )}
        />
      </View>
 

      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress = {signout}
      />
      
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
