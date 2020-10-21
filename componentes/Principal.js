import React, { useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    ImageBackground,
    StatusBar, Button,
    TouchableHighlight,
    Dimensions,
    Alert 
  } from 'react-native';

//Firebase
import auth, { firebase } from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';

const Principal = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')

    const user = firebase.auth().currentUser;

    database()
      .ref(`/users/${user.uid}`)
      .on('value', snapshot => {
        let user = snapshot.val();
        console.log(user);
        setName(user.name)
        setImage(user.image)
      });

    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <ScrollView>
        <View style={styles1.box}>
          <View style={{ backgroundColor: "#2980b9", flex: 1 }}/>
        </View>
    
    
        <View style={styles1.image3}>
          <ImageBackground 
            source={{
              uri: image,
            }}
            imageStyle={{ borderRadius: 100}}
            style={{width: 140, height: 140}}
          />
        </View>
        <Text style={styles1.nomtec}>{name}</Text>
    
        <View style={styles1.calen}>
              <Image source={require('../img/calen.png')} />
        </View>
    
        <Text style={styles1.VA}>Visualizar Asignaciones</Text>
        <Text style={styles1.VAs}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
    
        <View style={styles1.check}>
              <Image source={require('../img/check.png')} />
        </View>
    
        <Text style={styles1.CIT}>Crear Informe Técnico</Text>
        <Text style={styles1.CITs}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
    
    
        <View style={styles1.llave}>
              <Image source={require('../img/llave.png')} />
        </View>
    
        <Text style={styles1.SR}>Solicitar Repuestos</Text>
        <Text style={styles1.SRs}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
    
    
        <View style={styles1.lupa}>
              <Image source={require('../img/lupa.png')} />
        </View>
    
        <Text style={styles1.BH}>Busqueda de Historial</Text>
        <Text style={styles1.BHs}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </ScrollView>
      </View>
    );
  }
  
const styles1 = StyleSheet.create({
  box: {
      flexDirection: "row",
      height: 150,
      padding: 0
    },
  
    image3:{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -70
    },
  
    nomtec: {
      marginTop: 80,
      paddingHorizontal: 115,
      fontSize: 20,
    },
  
    VA: {
      marginTop: 35,
      paddingLeft: 90,
      fontSize: 20,
    },
  
    VAs: {
      marginTop: 5,
      paddingLeft: 90,
      fontSize: 11,
    },
  
    CIT: {
      marginTop: 25,
      paddingLeft: 90,
      fontSize: 20,
    },
  
    CITs: {
      marginTop: 5,
      paddingLeft: 90,
      fontSize: 11,
    },
  
    SR: {
      marginTop: 25,
      paddingLeft: 90,
      fontSize: 20,
    },
  
    SRs: {
      marginTop: 5,
      paddingLeft: 90,
      fontSize: 11,
    },
  
    BH: {
      marginTop: 25,
      paddingLeft: 90,
      fontSize: 20,
    },
  
    BHs: {
      marginTop: 5,
      paddingLeft: 90,
      fontSize: 11,
    },
  
    calen:{
      position: 'absolute',
      left:     20,
      top:      300,
    },
  
    check:{
      position: 'absolute',
      left:     20,
      top:      400,
    },
  
    llave:{
      position: 'absolute',
      left:     20,
      top:      500,
    },
  
    lupa:{
      position: 'absolute',
      left:     20,
      top:      600,
    },
  });

export default Principal;