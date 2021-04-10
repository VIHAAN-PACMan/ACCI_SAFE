import React, {useEffect} from "react";
import { View, Image, StyleSheet, FlatList, LogBox, ScrollView } from "react-native";

import colors from "../config/colors";
import { MemberItem, ListItemSeparator } from "../components/lists";

import Text from "../components/Text";
import Icon from "../components/Icon";

function BandDetailsScreen({route}) {
  const listing = route.params;
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists: missing keys for items']);
}, [])
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri:listing.uri}} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>

        <Text style={styles.location}><Icon backgroundColor={colors.secondary} name={"google-maps"} style={styles.icon} size={25}/> {listing.location}</Text>
        <Text style={styles.details}><Icon backgroundColor={colors.blue} name={"card-text-outline"} style={styles.icon} size={25}/> {listing.creator}</Text>
        <Text style={styles.details}><Icon backgroundColor={colors.blue} name={"card-text-outline"} style={styles.icon} size={25}/> {listing.description}</Text>
              
      
      </View> 
    </ScrollView>
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

export default BandDetailsScreen;
