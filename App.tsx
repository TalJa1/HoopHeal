/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import {vh, vw} from './services/styleProps';
import Home from './views/bottoms/Home';
import Exercise from './views/bottoms/Exercise';
import ProgressView from './views/bottoms/ProgressView';
import Settings from './views/bottoms/Settings';
import {
  exerciseIcon,
  homeIcon,
  profileIcon,
  progressIcon,
} from './assets/svgIcon';
import LoadingView from './views/LoadingView';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const TabNavigator = () => {
    return (
      <View style={styles.tabnavigationStyle}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#F87643',
            tabBarShowLabel: false,
            tabBarStyle: {
              borderTopWidth: 0,
              backgroundColor: '#000000',
              height: vh(7),
            },
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused}) => {
                const iconSize = focused ? vw(7) : vw(6);
                return <View>{homeIcon(iconSize, iconSize, color)}</View>;
              },
            }}
          />
          <Tab.Screen
            name="Exercise"
            component={Exercise}
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused}) => {
                const iconSize = focused ? vw(7) : vw(6);
                return <View>{exerciseIcon(iconSize, iconSize, color)}</View>;
              },
            }}
          />
          <Tab.Screen
            name="ProgressView"
            component={ProgressView}
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused}) => {
                const iconSize = focused ? vw(7) : vw(6);
                return <View>{progressIcon(iconSize, iconSize, color)}</View>;
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
              tabBarIcon: ({color, focused}) => {
                const iconSize = focused ? vw(7) : vw(6);
                return <View>{profileIcon(iconSize, iconSize, color)}</View>;
              },
            }}
          />
        </Tab.Navigator>
      </View>
    );
  };
  return (
    <NavigationContainer>
      {/* Main || LoadingView */}
      <Stack.Navigator initialRouteName="LoadingView">
      <Stack.Screen
          name="LoadingView"
          component={LoadingView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  tabnavigationStyle: {backgroundColor: '#221E3D', flex: 1},
});
