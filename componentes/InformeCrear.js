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
import { transform } from '@babel/core';


const InformeCrear = () => {
    const [name, setName] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState('https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg')
    const [upload, setUpload] = useState(null);

    const user = firebase.auth().currentUser;

    database()
      .ref(`/users/${user.uid}`)
      .on('value', snapshot => {
        let user = snapshot.val();
        console.log(user);
        setName(user.name)
        setImage(user.image)
      });
      
      const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      
	  
	const __uploadImage = async () => {
        // console.log('Ingresando');
        // setModalVisible(!modalVisible);
        // ToastAndroid.showWithGravityAndOffset(
        //     "All Your Base Are Belong To Us",
        //     ToastAndroid.SHORT,
        //     ToastAndroid.BOTTOM,
        //     25,
        //     50
        //   );

        storage().ref('1603460402289-homero.jpeg').getDownloadURL().then((url) => {
            //from url you can fetched the uploaded image easily
            // this.setState({profileImageUrl: url});
            console.log("path de imagen", url);
          });

        
        
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
            //   const source = { uri: response.uri };
          
              // You can also display the image using data:
              const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // console.log(source);
              setUpload(source);

              console.log(Date.now());

              const reference = storage().ref(Date.now() + '-' + response.fileName);

              const pathToFile = response.path;
              // uploads file
              const task = reference.putFile(response.path);

              task.then((resp) => {
                  console.log(resp);
                console.log('Image uploaded to the bucket!');
              });
            }
          });
    }
    
    

      

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <View style={styles.contentForm}>
            <View>
              <Text style={styles.label}>Paciente:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(texto) => console.log(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}>Sintomas:</Text>
                <TextInput 
                    multiline
                    style={styles.textarea}
                    onChangeText={(texto) => console.log(texto)}
                />
            </View>

            <View>
                <Text style={styles.label}>Problema que refiere el cliente:</Text>
                <TextInput 
                    multiline
                    style={styles.textarea}
                    onChangeText={(texto) => console.log(texto)}
                />
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
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 20
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

export default InformeCrear;