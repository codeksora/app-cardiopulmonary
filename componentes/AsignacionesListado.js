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

const AsignacionesListado = ({ navigation }) => {
    const user = firebase.auth().currentUser;

    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState('https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg')
    const [assignments, setAssignments] = useState([])
    const [assignmentSelected, setAssignmentSelected] = useState(null)

    const __closeModal = async () => {             
        setModalVisible(!modalVisible);
    }

    const __openModal =  (key) => {             
      console.log(key);

      firestore()
      .collection('assignments')
      .doc(key)
      .get()
      .then((querySnapshot) => {
        setAssignmentSelected(querySnapshot.data())
      })

      setModalVisible(true);
    }

    const loadAssigments = async ({user}) => {
      
      useEffect(() => {
        const subscriber = firestore()
        .collection('assignments')
        .where('user_id', '==', user.uid)
        .onSnapshot((querySnapshot) => {
          const assigmentsList = [];

          querySnapshot.forEach(documentSnapshot => {
            assigmentsList.push({
              key: documentSnapshot.id,
              ...documentSnapshot.data()
            });
          });

          setAssignments(assigmentsList)
        });

        // firestore()
        // .collection('informes')
        // .where('user_id', '==', user.uid)
        // .onSnapshot((querySnapshot) => {
        //   querySnapshot.forEach(documentSnapshot => {
        //     console.log(documentSnapshot.data());
        //   })
        // });
        
        return () => subscriber();
      }, [user]);
    }

    loadAssigments({user});

    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <ScrollView>
		<View style={styles.contentItems}>         
      { assignments && assignments.map((item) => 
        <TouchableHighlight 
        key = {item.key}
          style={styles.buttonItem}
          underlayColor='#ddd'
          onPress={() => __openModal(item.key)}>

            <View style={styles.contentItem}>
              <View style={styles.contentItemImage}>
                <Image source={require('../img/calen.png')} />
              </View>

              <View style={styles.contentItemDescription}>
                <Text style={styles.itemTitle}>{ item.title }</Text>
                <Text style={styles.itemParagraph}>Fecha: { item.date }</Text>
                <Text style={styles.itemParagraph}>Dirección: { item.address }</Text>
              </View>
            </View>
        </TouchableHighlight> 
      )}  
		</View>
    	</ScrollView>

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
                    <Text style={styles.itemTitle}>Referencia</Text>
                    {assignmentSelected && <Text style={styles.modalAlertDescription}>{assignmentSelected.reference}</Text>}

                    <View style={styles.modalButtonContent}>
                        <TouchableHighlight 
                        style={styles.modalButton}
                        underlayColor='#ddd'
                        onPress={__closeModal}>

                                <Text style={styles.modalButtonText}>OK</Text>
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

export default AsignacionesListado;