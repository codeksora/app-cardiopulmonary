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

const HistorialEquipo = ({ navigation }) => {
    const user = firebase.auth().currentUser;

    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState('https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg')
    const [reports, setReports] = useState([])
    const [textSearch, setTextSearch] = useState('')
    const [assignmentSelected, setAssignmentSelected] = useState(null)

    const __searchNow = async () => {    
        
      firestore()
        .collection('reports')
        .where('codigo_equipo', '==', textSearch)
        .get()
        .then((querySnapshot) => {
            const reports = [];

            querySnapshot.forEach(documentSnapshot => {
                reports.push({
                    key: documentSnapshot.id,
                    ...documentSnapshot.data()
                })
            });
            if(textSearch != '')
            setReports(reports)
        });

        setModalVisible(!modalVisible);
    }

    const __openModal =  () => {             
  

      setModalVisible(true);
    }

    const loadReports = async ({user}) => {
      
      useEffect(() => {
        const subscriber = firestore()
        .collection('reports')
        .onSnapshot((querySnapshot) => {
          const reportsList = [];

          querySnapshot.forEach(documentSnapshot => {
                reportsList.push({
                    key: documentSnapshot.id,
                    ...documentSnapshot.data()
                });
    
          });

          setReports(reportsList)  
          
        });
        
        return () => subscriber();
      }, [user]);
    }

    loadReports({user});

    return (
      <View style={{ flex: 1, backgroundColor: '#eee', position: 'relative' }}>
        <ScrollView>
		<View style={styles.contentItems}>
            { reports && reports.map((item) => 
                <TouchableHighlight 
                key = {item.key}
                style={styles.buttonItem}
                underlayColor='#ddd'>

                    <View style={styles.contentItem}>
                    <View style={styles.contentItemImage}>
                        {item.image_url && 
                            <Image source={{
                                uri: item.image_url
                            }} style={{width: 50, height: 50}}/>
                        }
                    </View>

                    <View style={styles.contentItemDescription}>
                        <Text style={styles.itemTitle}>Código: { item.codigo_equipo }</Text>
                        <Text style={styles.itemParagraph}>Datos del cliente: { item.dato_liente }</Text>
                        <Text style={styles.itemParagraph}>Problema del cliente: { item.problema_cliente }</Text>
                    </View>
                    </View>
                </TouchableHighlight> 
            )}  
		</View>
        
    	</ScrollView>

        <View>
        <TouchableHighlight 
            style={styles.buttonSearch}
            underlayColor='#ddd'
            onPress={__openModal}>
            <Image source={require('../img/lupw.png')} style={styles.buttonSearchIcon}/>
        </TouchableHighlight>
        </View>

        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}
        >

            <View style={styles.modalAlert}>
                <View style={styles.modalAlertContent}>
                    <Text style={styles.itemTitle}>Buscar por código</Text>
                    <TextInput 
                        style={styles.inputSearch}
                        onChangeText={(texto) => setTextSearch(texto)}
                        value={textSearch}
                    />

                    <View style={styles.modalButtonContent}>
                        <TouchableHighlight 
                        style={styles.modalButton}
                        underlayColor='#ddd'
                        onPress={__searchNow}>

                                <Text style={styles.modalButtonText}>Buscar</Text>
                        </TouchableHighlight>

                    </View>
                </View>
            </View>
        </Modal>
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
    buttonSearch: {
        position: 'absolute',
        backgroundColor: '#2980b9',
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: 20,
        bottom: 10,
        right: 10
    },
    buttonSearchIcon: {
        width: 30,
        height: 30
    },
    inputSearch: {
        marginTop: 10,
        backgroundColor: '#ddd',
        paddingHorizontal: 10,
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

export default HistorialEquipo;