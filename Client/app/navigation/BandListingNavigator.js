import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ListingsScreen from '../screens/ListingsScreen';
import BandDetailsScreen from '../screens/BandDetailsScreen';
import AllAccountsScreen from '../screens/AllAccountsScreen';
import BandListingsScreen from '../screens/BandListingScreen';
const Stack = createStackNavigator();

const BandListingNavigator = () => (
    <Stack.Navigator mode="modal" screenOptions={{headerShown : false}}>
        <Stack.Screen name="BandListing" component={BandListingsScreen}/>
        <Stack.Screen name="BandDetails" component={BandDetailsScreen}/>
    </Stack.Navigator>
)

export default BandListingNavigator;