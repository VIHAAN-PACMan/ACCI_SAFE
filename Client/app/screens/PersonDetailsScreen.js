import React from "react";
import { View, Image, StyleSheet } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import Icon from "../components/Icon";

function ListingDetailsScreen({route}) {
  const person = route.params;

  return (
    <View>
      <Image style={styles.image} source={{uri:person.uri}} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{person.name}</Text>
        <Text style={styles.location}><Icon backgroundColor={colors.secondary} name={"google-maps"} style={styles.icon} size={25}/> {person.location}</Text>
        <Text style={styles.details}><Icon backgroundColor={colors.blue} name={"card-text-outline"} style={styles.icon} size={25}/> {person.bio}</Text>
        <Text style={styles.contact}><Icon name={"email"} style={styles.icon} size={25}/> {person.email}</Text>        
      </View> 
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
  location: {
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

export default ListingDetailsScreen;
