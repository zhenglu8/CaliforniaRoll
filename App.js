import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import OrderScreen from './screens/OrderScreen';
import TrackScreen from './screens/TrackScreen';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Welcome to California Roll', //Set Header Title
            headerStyle: {
              backgroundColor: '#e60000', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{
            title: 'Explore Japanese Cuisine', //Set Header Title
            headerStyle: {
              backgroundColor: '#e60000', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="OrderScreen"
          component={OrderScreen}
          
        />
        <Stack.Screen
          name="TrackScreen"
          component={TrackScreen}
          options={{
            title: 'Track Screen', //Set Header Title
            headerStyle: {
              backgroundColor: '#e60000', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

/*
const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen,
  OrderScreen:OrderScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
