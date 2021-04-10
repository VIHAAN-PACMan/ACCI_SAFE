import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ListingsScreen from '../screens/ListingsScreen';
import BandDetailsScreen from '../screens/BandDetailsScreen';
import AllAccountsScreen from '../screens/AllAccountsScreen';
import BandListingScreen from '../screens/BandListingScreen';
const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator mode="modal" screenOptions={{headerShown : false}}>

        <Stack.Screen name="BandDetails" component={BandListingScreen}/>
        <Stack.Screen name="BandDetails" component={BandDetailsScreen}/>

        <Stack.Screen name="AllAccounts" component={AllAccountsScreen}/>
    </Stack.Navigator>
)

export default FeedNavigator;