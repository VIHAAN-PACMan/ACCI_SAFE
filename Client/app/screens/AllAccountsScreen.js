import React, {useEffect, useState} from "react";
import { View, Image, StyleSheet, FlatList, LogBox } from "react-native";

import colors from "../config/colors";
import { ListItem, ListItemSeparator } from "../components/lists";



//Firebase imports
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const db = firebase.firestore();

function AllAccountsScreen({navigation}) {
    const [users, setUsers] = useState();
    var arr =[];
    const firebasework = async() =>{
        // await db.collection("Authenticated").get().then(async function(querySnapshot) {
        //     await querySnapshot.forEach(async function(doc) {
        //         await arr.push(doc.data());
        //     })
        //     setUsers(arr);
        // })
        // console.log(users);
        await db.collection("Authenticated").orderBy('Credits', 'desc').limit(5).get().then(async function(querySnapshot){
          await querySnapshot.forEach(async function(doc) {
                    await arr.push(doc.data());
                })
                setUsers(arr);
            })
            console.log(users);

    }
    useEffect(() => {
        firebasework();
  }, [])
    return (
      <View style={styles.detailsContainer}>
          <FlatList
              data = {users}
              ItemSeparatorComponent={ListItemSeparator}
              keyExtractor={(Item) => Item.email}
              renderItem = {({item}) => (
                  <ListItem
                      title={item.name}
                      subTitle={item.email}
                      image={item.uri}
                      onPress={() => navigation.navigate("PersonDetails", item)}
                        
                  />
                  
              )}
          />
        </View> 
    );
  }
  
  const styles = StyleSheet.create({
    detailsContainer: {
      padding: 20,
    },
    image: {
      width: "100%",
      height: 300,
    },
    price: {
      color: colors.secondary,
      fontWeight: "bold",
      fontSize: 20,
      marginVertical: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold"
    },
    userContainer: {
      marginVertical: 40,
    },
    location:{
      marginTop: 20,
      marginBottom: 10
    },
    details:{
      marginTop: 5,
      marginBottom: 15
    },
    contact:{
      marginBottom: 10,
      alignItems: 'center',
      justifyContent:'center',
      fontSize: 20
    },
    icon:{
      marginRight: '10',
    }
  });
  
  export default AllAccountsScreen;
  