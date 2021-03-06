import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Modal,
    TextInput,
    Image,
    ImageBackground,
    StatusBar, Button,
    TouchableHighlight,
    Dimensions,
    Alert ,
    ToastAndroid
  } from 'react-native';

//Firebase
import auth, { firebase } from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const SolicitudRepuestoListado = ({ navigation }) => {
    const user = firebase.auth().currentUser;

    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState('https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg')
    const [requests, setRequests] = useState([])
    const [assignmentSelected, setAssignmentSelected] = useState(null)

    const loadReports = async ({user}) => {
      
      useEffect(() => {
        const subscriber = firestore()
        .collection('requests')
        .onSnapshot((querySnapshot) => {
          const requestsList = [];

          querySnapshot.forEach(documentSnapshot => {
                requestsList.push({
                    key: documentSnapshot.id,
                    ...documentSnapshot.data()
                });
          });
          console.log(requestsList);
          setRequests(requestsList)  
          
        });
        
        return () => subscriber();
      }, [user]);
    }

    loadReports({user});

    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <ScrollView>
		<View style={styles.contentItems}>

                
      { requests && requests.map((item) => 
        <TouchableHighlight 
        key = {item.key}
          style={styles.buttonItem}
          underlayColor='#ddd'>

            <View style={styles.contentItem}>
              <View style={styles.contentItemImage}>
                <Image source={require('../img/llave.png')} />
              </View>

              <View style={styles.contentItemDescription}>
                <Text style={styles.itemTitle}>Repuesto: { item.tipo_repuesto }</Text>
                <Text style={styles.itemParagraph}>Código del equipo: { item.codigo_equipo }</Text>
                <Text style={styles.itemParagraph}>Código del cliente: { item.codigo_liente }</Text>
              </View>
            </View>
        </TouchableHighlight> 
      )}  
		</View>
    	</ScrollView>
      </View>
    );
  }
  
const styles = StyleSheet.create({
	buttonItem: {
		// backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
		paddingHorizontal: 20,
		paddingVertical: 20,
		marginBottom: 10
	}, 
	contentItem: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	contentItemImage: {
		width: '20%',
		justifyContent: 'center'
	},
	contentItemDescription: {
		width: '80%'
	},
	contentItems: {
        paddingTop: 10,
		paddingHorizontal: 10	
	},
	itemTitle: {
        fontSize: 15,
        fontWeight: 'bold'
	},
	itemParagraph: {
		fontSize: 12
    },
    modalAlert: {
        position: 'absolute',
        top: 0,
        height: '100%',
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.5)',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalAlertContent: {
        backgroundColor: '#fff',
        width: 300,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    modalAlertDescription: {
        marginBottom: 20
    },
    modalButtonContent: {
        alignItems: 'flex-end'
    },
    modalButton: {
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        
    },
    modalButtonText: {
        color: '#000',
        fontSize: 16
    }
  });

export default SolicitudRepuestoListado;