import 'react-native-gesture-handler';
import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StatusBar, Button,
  TouchableHighlight,
  Dimensions,
  Alert 
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Principal from './componentes/Principal';
import Login from './componentes/Login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen
          name="Login"
          component={ Login }
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({

});

export default App;
