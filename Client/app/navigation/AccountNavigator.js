import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import CreateBand from '../screens/CreateBand';
import CreditScreen from '../screens/CreditScreen';
const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator >
        <Stack.Screen name="Account" component={AccountScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CreditScreen" component={CreditScreen} options={{headerShown: false}}/>
        <Stack.Screen name = "CreateBand" component={CreateBand} options={{headerShown: false}}/>
    </Stack.Navigator>
)

export default AccountNavigator;