import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, SafeAreaView } from "react-native";

import EventCard from "../components/EventCard";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { LogBox } from 'react-native';


import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();




function ListingsScreen({navigation}) {
  const [events,setEvents] = useState([]);
  

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  const li = [];
  var obj;
  const firebasework = async()=>{
    await db.collection("Accidents").get().then(async function(querySnapshot) {
      await querySnapshot.forEach(async function(doc) {
          obj ={
            id: doc.id,
            description: doc.data().description,
            title: doc.data().title,
            uri: doc.data().url,
            email: doc.data().email,
            mapurl: doc.data().mapurl,
          }
          await li.push(obj);
          setEvents(li);
          
      });
      // console.log(li);
  });
  
  }
  

  useEffect(()=>{
    firebasework();
  },[]);

  return (
    <ScrollView>
    <Screen style={styles.screen}>
      <FlatList
        data={events}
        keyExtractor={(events) => events.id.toString()}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            subTitle={item.description}
            
            email={item.email}
            image={{uri:item.uri}}
            onPress={() => navigation.navigate("ListingDetails", item)}
          />
        )}
      />
    </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
    flex: 1,
  },
});

export default ListingsScreen;
