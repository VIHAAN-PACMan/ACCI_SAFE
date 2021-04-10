import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Text from "../components/Text";
import Icon from "../components/Icon";

function CreditScreen({route}) {
  const listing = route.params;

  return (
      <Screen>
    <View style={styles.container}>
        
        <Icon backgroundColor={colors.secondary} name={"star-box"} style={styles.icon} size={100}/> 
  <Text style={styles.location}>Congratulations you have 10 credits</Text>
    </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        alignSelf: "center"
    },
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
    marginTop: "10%",
    fontSize: 24
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

export default CreditScreen;
