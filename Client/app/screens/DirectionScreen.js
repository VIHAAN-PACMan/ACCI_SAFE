import React, {useEffect, useState} from "react";
import { StyleSheet, Image,FlatList, View , ScrollView} from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import AppButton from '../components/Button';
import Icon from "../components/Icon";
import { ListItem, ListItemSeparator } from "../components/lists";
import * as firebase from 'firebase';
import 'firebase/firestore';
import getDirections from 'react-native-google-maps-directions'

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
var hospitalArray=new Array();

function DirectionScreen({navigation,route}) {

  const {location}=route.params;
  const sourceLat=useState(location['latitude']);
  const sourceLong=useState(location['longitude']);

  console.log("here",sourceLat,sourceLong);

  const [hospital, sethospital] = useState([]);

  const goToMaps=async(geometry)=>{
    var destLatitude=geometry.lat;
    var destLongitude=geometry.lng;

    // console.log(sourceLat);

    const data = {
      source: {
       latitude: sourceLat[0],
       longitude: sourceLong[0]
     },
     destination: {
       latitude: destLatitude,
       longitude: destLongitude
     },
     params: [
       {
         key: "travelmode",
         value: "driving"        // may be "walking", "bicycling" or "transit" as well
       },
       {
         key: "dir_action",
         value: "navigate"       // this instantly initializes navigation using the given travel mode
       }
     ]
   }

   getDirections(data)
  };

  const bringDirection=async()=>{

    const url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+sourceLat[0]+","+sourceLong[0]+"&radius=1000&types=hospital&key="+your_secret_spi_key;

      await fetch(url)
      .then(response => response.json())
      .then(data => {
        const dataArray=data.results;
        for (var index in dataArray){
          // const location = data.geometry;
          var locationObject = {
            geometry : dataArray[index].geometry.location,
            name : dataArray[index].name,
            icon : dataArray[index].icon,
            isOpen : dataArray[index].opening_hours.open_now,
            rating : dataArray[index].rating,
            vicinity : dataArray[index].vicinity,
            }
            if (hospitalArray.length<3){
              hospitalArray.push(locationObject);
            }
        }
        
      });
  }
  
    useEffect(()=>{
      bringDirection();
    });
    // console.log(hospitalArray);
    // sethospital(hospitalArray);
    console.log(hospitalArray);
  return (
    <ScrollView>
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/new-logo.jpg")} />
      <AppButton title="Nearby Hospitals"/>

      <View style={styles.container}>
        <FlatList
          data={hospitalArray}
          keyExtractor={(data) => data.name}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            
            <ListItem
              title={item.name}
              subTitle={"Rating : "+item.rating+"* "+" Open = "+item.isOpen}
              // subsubTitle={"Vicinity : "+item.geometry.location}
              IconComponent={
                <Icon
                  // name={item.icon}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => goToMaps(item.geometry,sourceLat,sourceLong)}
            />
          )}
        />
      </View>
    </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 270,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

export default DirectionScreen;
