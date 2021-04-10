import { useState, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet,View } from "react-native";
import * as React from 'react';
import BandCard from "../components/BandCard";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { LogBox } from 'react-native';

import { Searchbar } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();




function BandListingsScreen({navigation}) {
  const [bands,setBands] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);


  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  const li = [];
  var obj;
  const firebasework = async()=>{
    await db.collection("Blogs").get().then(async function(querySnapshot) {
      await querySnapshot.forEach(async function(doc) {
          obj ={
            id: doc.id,
            description: doc.data().description,
            title: doc.data().title,
            uri: doc.data().url,
            location: doc.data().location,
            creator: doc.data().creator,
          }
          await li.push(obj);
          setBands(li);
          
      });
      // console.log(li);
  });
  
  }
  
  // Turn this on
  useEffect(()=>{
    firebasework();
  },[]);

  return (
    <ScrollView>
    <Screen style={styles.screen}>
      <Searchbar
        placeholder="Search Blog"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={{padding:10}}></View>
      <FlatList
        data={bands}
        keyExtractor={(bands) => bands.id.toString()}
        renderItem={({ item }) => (
          <BandCard
            title={item.title}
            location={item.location}
            image={{uri:item.uri}}
            lookingfor = {item.creator}
            onPress={() => navigation.navigate("BandDetails", item)}
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

export default BandListingsScreen;
