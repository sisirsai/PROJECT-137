import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/home';
import DetailsScreen from './screens/detail';

export default function App() {
  return <AppContainer />;
}
const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Details: { screen: DetailsScreen },
  },
  { initialRouteName: 'Home' }
);

const AppContainer = createAppContainer(AppStackNavigator);
