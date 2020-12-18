import React, {useState} from 'react';

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
  StatusBar,
  Button,
  TouchableHighlight,
  Dimensions,
  Alert,
  ToastAndroid,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';

//Firebase
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const RegistrarTecnico = ({navigation}) => {
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(
    'https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg',
  );
  const [upload, setUpload] = useState({
    uri:
      'https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg',
  });
  const [dataUpload, setDataUpload] = useState('');
  const [codigoEquipo, setCodigoEquipo] = useState('');
  const [datoCliente, setDatoCliente] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuarioList, setTipoUsuarioList] = useState([
    {id: 'INGE', name: 'Ingeniero'},
    {id: 'TECH', name: 'Técnico'},
  ]);

  const user = firebase.auth().currentUser;

  const options = {
    title: 'Carga una imagen',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
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
        const source = {uri: 'data:image/jpeg;base64,' + response.data};

        setUpload(source);
        setDataUpload(response);
      }
    });
  };

  const __addUsuario = async () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        const uid = data.user.uid;

        const response = dataUpload;

        const nameImage = Date.now() + '-' + response.fileName;

        const reference = storage().ref(nameImage);
        // uploads file
        const task = reference.putFile(response.path);

        task.then((resp) => {
          // console.log('Image uploaded to the bucket!', resp.metadata.name);

          storage()
            .ref(resp.metadata.name)
            .getDownloadURL()
            .then((url) => {
              firestore()
                .collection('users')
                .doc(uid)
                .set({
                  imagen: nameImage,
                  image_url: url,
                  name: nombreUsuario,
                  role: tipoUsuario,
                })
                .then(() => {
                  //   setDataUpload('')
                  //   setCodigoEquipo('')
                  //   setDatoCliente('')
                  //   setProblemaCliente('')
                  //   setUpload({
                  //     uri: 'https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg'
                  //   })
                  Alert.alert('Correcto ✅', 'Usuario creado');
                  
                  if(tipoUsuario == 'TECH') {
                    navigation.navigate('Principal', { name: 'Jane' })
                  } else if(tipoUsuario == 'INGE') {
                    navigation.navigate('Principal Ingeniero', { name: 'Jane' })
                  }
                });
            });
        });

        
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }; // Final add usuario

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={styles.contentForm}>
          <View>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => setNombreUsuario(texto)}
              value={nombreUsuario}
            />
          </View>
          <View>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => setEmail(texto)}
              keyboardType="email-address"
              value={email}
            />
          </View>
          <View>
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => setPassword(texto)}
              value={password}
            />
          </View>

          <View>
            <Text style={styles.label}>Tipo de usuario:</Text>
            {tipoUsuarioList && (
              <Picker
                selectedValue={tipoUsuario}
                style={styles.select}
                onValueChange={(itemValue, itemIndex) =>
                  setTipoUsuario(itemValue)
                }>
                <Picker.Item label="Seleccione" value="" />
                {tipoUsuarioList.map((item, key) => (
                  <Picker.Item key={key} label={item.name} value={item.id} />
                ))}
              </Picker>
            )}
          </View>

          <View>
            <Image
              source={upload}
              style={{width: '100%', height: 140, marginBottom: 10}}
            />
          </View>

          <View>
            <TouchableHighlight
              style={styles.buttonUpload}
              onPress={__uploadImage}>
              <Text style={styles.buttonUploadText}>Cargar Foto</Text>
            </TouchableHighlight>
          </View>

          <View>
            <TouchableHighlight
              style={styles.buttonUpload}
              onPress={__addUsuario}>
              <Text style={styles.buttonUploadText}>Agregar usuario</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentForm: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textarea: {
    backgroundColor: '#eee',
    height: 150,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonUpload: {
    backgroundColor: '#2980b9',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  buttonUploadText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 20,
  },
  contentItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contentItemImage: {
    width: '20%',
    justifyContent: 'center',
  },
  contentItemDescription: {
    width: '80%',
  },
  contentItems: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemParagraph: {
    fontSize: 12,
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
    justifyContent: 'center',
  },
  modalAlertContent: {
    backgroundColor: '#fff',
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modalAlertDescription: {
    marginBottom: 20,
  },
  modalButtonContent: {
    alignItems: 'flex-end',
  },
  modalButton: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  modalButtonText: {
    color: '#000',
    fontSize: 16,
  },
  uploadAvatar: {
    height: 40,
    width: 50,
  },
});

export default RegistrarTecnico;
