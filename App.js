/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StatusBar, Button,
  TouchableHighlight
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <><View style={{flex: 1,backgroundColor: '#eee'}}>
      <View style={styles.image}>
        <Image source={require('./img/logoCardio.png')} />
      </View>
      
      <View style={styles.wrapper}>
      <View style={styles.image2}>
        <Image source={require('./img/Shape_2_copiasm.png')} />
      </View>
        <Text style={styles.login}>Log In</Text>
        <TextInput 
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
        />
        <View>
          <TouchableHighlight style={styles.btnSend}>
              <Text style={styles.textSend}>Ingresar</Text>
          </TouchableHighlight>
        </View>
      </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#eee',
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  input: {
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  btnSend: {
    backgroundColor: '#2980b9',
    marginTop: 20,
    paddingVertical: 10,
    marginHorizontal: 60
  },
  textSend: {    
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 20
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginTop: 50
  },

  login: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20
  },

  image2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },

});

export default App;
