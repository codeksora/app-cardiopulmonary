import React, { useState } from 'react';

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

const AsignacionesListado = () => {
    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState('https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg')

    const user = firebase.auth().currentUser;

    database()
      .ref(`/users/${user.uid}`)
      .on('value', snapshot => {
        let user = snapshot.val();
        console.log(user);
        setName(user.name)
        setImage(user.image)
	  });
	  
	const __closeModal = async () => {
        // console.log('Ingresando');
        setModalVisible(!modalVisible);
        // ToastAndroid.showWithGravityAndOffset(
        //     "All Your Base Are Belong To Us",
        //     ToastAndroid.SHORT,
        //     ToastAndroid.BOTTOM,
        //     25,
        //     50
        //   );
	}

    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <ScrollView>
		<View style={styles.contentItems}>
			<TouchableHighlight 
				style={styles.buttonItem}
				underlayColor='#ddd'
				onPress={() => {
                    setModalVisible(true);
                }}>

					<View style={styles.contentItem}>
						<View style={styles.contentItemImage}>
							<Image source={require('../img/calen.png')} />
						</View>

						<View style={styles.contentItemDescription}>
							<Text style={styles.itemTitle}>Actualización de Equipo del centro médico</Text>
							<Text style={styles.itemParagraph}>Fecha: 12/12/2020</Text>
                            <Text style={styles.itemParagraph}>Dirección: Av. 28 de Julio 164</Text>
						</View>
					</View>
			</TouchableHighlight>
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
                    <Text style={styles.itemTitle}>El equipo 1 está ubicado en</Text>
                    <Text style={styles.modalAlertDescription}>El modelo del equipo es XXXXX, está en el centro de salud Norte, 3er Piso</Text>

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