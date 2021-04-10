import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function EventCard({ title, location, lookingfor, image, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {location}
        </Text>
        <Text style={styles.lookingfor} numberOfLines={1}>
          {lookingfor}
        </Text>
        

      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  lookingfor: {
    color: colors.secondary,
    fontWeight: "bold",
    marginTop: 10,
  },
  title: {
    marginBottom: 7,
  },
  email:{
    color: colors.blue
  },
  location:{
    color: colors.medium,
    marginTop: 10,
  }
});

export default EventCard;
