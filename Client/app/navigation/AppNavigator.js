import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons'; 

import AccountNavigator from './AccountNavigator';
import FeedNavigator from './FeedNavigator';
import ListingEditScreen from '../screens/ListingEditScreen';
import NewListingButton from './NewListingButton';
import BandListingScreen from '../screens/BandListingScreen';
import AllUsersNavigator from './AllUsersNavigator';
import ListingEditNavigator from './ListingEditNavigator';
import BandListingNavigator from './BandListingNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen 
        name="Blog" 
        component={BandListingNavigator}
        options={{
            tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="wunderlist" size={size} color={color}/>
        }}/>
        <Tab.Screen 
        name="Accidents" 
        component={FeedNavigator}
        options={{
            tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="search-web" size={size} color={color}/>
        }}/>
        <Tab.Screen 
        name="ListingEdit" 
        component={ListingEditNavigator}
        options={({navigation}) => ({
            tabBarButton: () => <NewListingButton onPress={() => navigation.navigate("ListingEdit")}/>,
            tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="plus-circle" size={size} color={color}/>
        })}/>
        <Tab.Screen 
        name="Leaderboard" 
        component={AllUsersNavigator}
        options={{
            tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="account-group" size={size} color={color}/>
        }}/>
        <Tab.Screen 
        name="Account" 
        component={AccountNavigator}
        options={{
            tabBarIcon: ({color,size}) => <MaterialCommunityIcons name="account" size={size} color={color}/>
        }}/>
    </Tab.Navigator>
)

export default AppNavigator;