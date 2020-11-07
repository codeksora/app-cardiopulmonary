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

  import ImagePicker from 'react-native-image-picker';
  
  //Firebase
  import { utils } from '@react-native-firebase/app';
  import storage from '@react-native-firebase/storage';
import auth, { firebase } from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';


const SolicitudRepuesto = ({ navigation }) => {
    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState('https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg')
    const [upload, setUpload] = useState({
      uri: 'https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg'
    });
    const [dataUpload, setDataUpload] = useState('');
    const [codigoEquipo, setCodigoEquipo] = useState('')
    const [codigoCliente, setCodigoCliente] = useState('')
    const [tipoRepuesto, setTipoRepuesto] = useState('')

    const user = firebase.auth().currentUser;
 

    const __requestReport = async () => {
        firestore()
            .collection('requests')
            .add({
            codigo_equipo: codigoEquipo,
            codigo_liente: codigoCliente,
            tipo_repuesto: tipoRepuesto,
            user_id: user.uid
            })
            .then(() => {
                setCodigoEquipo('')
                setCodigoCliente('')
                setTipoRepuesto('')

                Alert.alert("✅", "Solicitud enviada correctamente")

                navigation.navigate('Principal', { name: 'Jane' })
            });
    }

      

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <View style={styles.contentForm}>
            <View>
              <Text style={styles.label}>Código del Equipo:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(texto) => setCodigoEquipo(texto)}
                    value={codigoEquipo}
                />
            </View>

            <View>
                <Text style={styles.label}>Código del cliente:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(texto) => setCodigoCliente(texto)}
                    value={codigoCliente}
                />
            </View>

            <View>
                <Text style={styles.label}>Tipo de repuesto:</Text>
                <TextInput 
                    multiline
                    style={styles.textarea}
                    onChangeText={(texto) => setTipoRepuesto(texto)}
                    value={tipoRepuesto}
                />
            </View>

            <View>
            <TouchableHighlight 
              style={styles.buttonUpload}
              onPress={__requestReport}>
              <Text style={styles.buttonUploadText}>Enviar</Text>
              </TouchableHighlight>
            </View>

          </View>
    	</ScrollView>
      </View>
    );
  }
  
const styles = StyleSheet.create({
  contentForm: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  textarea: {
    backgroundColor: '#eee',
    height: 150,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    marginBottom: 10
  },
  buttonUpload: {
    backgroundColor: '#2980b9',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10
  },
  buttonUploadText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 20
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
    },
    uploadAvatar: {
        height: 40,
        width: 50
    }
  });

export default SolicitudRepuesto;