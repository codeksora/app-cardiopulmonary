import React, { useState } from 'react';

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
    Alert,
    ToastAndroid
  } from 'react-native';
  
import auth, { firebase } from "@react-native-firebase/auth";

import firestore from '@react-native-firebase/firestore';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState('');
    const [isValid, setValid] = useState(true);

    const __doSingIn = async () => {
      
        try {
            let response = await auth().signInWithEmailAndPassword(email, password)
            if (response && response.user) {
              const uid = response.user.uid;
                console.log('Ingreso');
              firestore()
                .collection('users')
                .doc(uid)
                .get()
                .then((querySnapshot) => {
                  const userData = querySnapshot.data();

                  if(userData.role == 'TECH') {
                    navigation.navigate('Principal', { name: 'Jane' })
                  } else if(userData.role == 'INGE') {
                    navigation.navigate('Principal Ingeniero', { name: 'Jane' })
                  }

                })

                Alert.alert("Bienvenido ✅", "Logeado correctamente")
            }
        } catch (e) {
          console.log('Error', e.code);
          let message = '';

            switch(e.code) {
              case 'auth/user-not-found':
              case 'auth/wrong-password':
                message = 'Usuario y/o contraseña incorrectos';
                break;
              case 'auth/firebase-auth':
                message = 'Error al conectar con Firebase';
                break;
            }

            ToastAndroid.showWithGravityAndOffset(
              message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50
            );
        }
    }

    return (
      <>
        <View style={{ flex: 1, backgroundColor: '#eee' }}>
          <View style={styles.image}>
            <Image source={require('../img/logoCardio.png')} />
          </View>

          <View style={styles.wrapper}>
          <View style={styles.image2}>
              <Image source={require('../img/Shape_2_copiasm.png')} />
          </View>
      <Text style={styles.login}>Log In</Text>
          <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              onChangeText={text => {
              setError
              setEmail(text)
              }}
              error={isValid}
          />
          <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={text => setPassword(text)}
              error={isValid}
          />
          <View>
              <TouchableHighlight 
              style={styles.btnSend}
              onPress={__doSingIn}>
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

export default Login;