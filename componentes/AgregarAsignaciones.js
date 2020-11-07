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


const AgregarAsignaciones = ({ navigation }) => {
    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState('https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg')
    const [upload, setUpload] = useState({
      uri: 'https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg'
    });
    const [dataUpload, setDataUpload] = useState('');
    const [codigoEquipo, setCodigoEquipo] = useState('')
    const [datoCliente, setDatoCliente] = useState('')
    const [problemaCliente, setProblemaCliente] = useState('')

    const user = firebase.auth().currentUser;
      
      const options = {
        title: 'Carga una imagen',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      
	  
	const __uploadImage = async () => {       
        
        ImagePicker.showImagePicker(options, (response) => {          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {          
              // You can also display the image using data:
              const source = { uri: 'data:image/jpeg;base64,' + response.data };

              setUpload(source);
              setDataUpload(response)
              ;
            }
          });
    }
    
    const __addInforme = async () => {
      const response = dataUpload

      const nameImage = Date.now() + '-' + response.fileName;

      const reference = storage().ref(nameImage);
      // uploads file
      const task = reference.putFile(response.path);

      task.then((resp) => {
        // console.log('Image uploaded to the bucket!', resp.metadata.name);

        storage().ref(resp.metadata.name).getDownloadURL().then((url) => {
            firestore()
            .collection('reports')
            .add({
              imagen: nameImage,
              image_url: url,
              codigo_equipo: codigoEquipo,
              dato_liente: datoCliente,
              problema_cliente: problemaCliente,
              user_id: user.uid
            })
            .then(() => {
              setDataUpload('')
              setCodigoEquipo('')
              setDatoCliente('')
              setProblemaCliente('')
              setUpload({
                uri: 'https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg'
              })
    
              Alert.alert("✅", "Informe añadido correctamente")
    
              navigation.navigate('Principal', { name: 'Jane' })
            });
        });
        
      })
    }

      

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <View style={styles.contentForm}>
            <View>
              <Text style={styles.label}>Técnicos:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(texto) => setCodigoEquipo(texto)}
                    value={codigoEquipo}
                />
            </View>

            <View>
              <Text style={styles.label}>Centros de Salud:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(texto) => setCodigoEquipo(texto)}
                    value={codigoEquipo}
                />
            </View>

            <View>
              <Text style={styles.label}>Tipo de Equipo:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(texto) => setCodigoEquipo(texto)}
                    value={codigoEquipo}
                />
            </View>

            <View>
              <Text style={styles.label}>Seleccione Fecha y Hora:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(texto) => setCodigoEquipo(texto)}
                    value={codigoEquipo}
                />
            </View>

             <View>
            <Image source={upload} style={{width: '100%', height: 140, marginBottom: 10}}/>
            </View>
            

            <View>
            <TouchableHighlight 
              style={styles.buttonUpload}
              onPress={__uploadImage}>
              <Text style={styles.buttonUploadText}>Cargar Imagen</Text>
              </TouchableHighlight>
            </View>

            <View>
            <TouchableHighlight 
              style={styles.buttonUpload}
              onPress={__addInforme}>
              <Text style={styles.buttonUploadText}>Enviar Informe</Text>
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

export default AgregarAsignaciones;