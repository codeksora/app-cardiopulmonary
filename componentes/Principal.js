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
import storage from '@react-native-firebase/storage';

import firestore from '@react-native-firebase/firestore';

const Principal = ({ navigation }) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg')

    const user = firebase.auth().currentUser;

    // Recibir datos del usuario logeado
    firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
            const userData = querySnapshot.data();

			setName(userData.name)
			
			if(userData.image) {
				storage().ref(userData.image).getDownloadURL().then((url) => {
					setImage(url)
				  });
			}


        })
	
	const __goItem = async (nav) => {
		navigation.navigate(nav, { name: 'Jane' })
	}

    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <ScrollView>
		<View style={styles.box}>
				<ImageBackground 
				source={{
				uri: 'https://i.pinimg.com/originals/fe/93/a8/fe93a86beb623456f12d67a10824a4dd.jpg',
				}}
				style={{width: '100%', height: '100%'}}
			/>
        </View>
    
    
        <View style={styles.imageProfile}>
           <ImageBackground 
            source={{
              uri: image,
            }}
            imageStyle={{ borderRadius: 100}}
            style={{width: 140, height: 140}}
          />
        </View>

        <View style={styles.contentName}>
			<Text style={styles.nameProfile}>{name}</Text>

        </View>

		<View style={styles.contentItems}>
			<TouchableHighlight 
				style={styles.buttonItem}
				underlayColor='#ddd'
				onPress={() => __goItem('Listado de Asignaciones')}>

					<View style={styles.contentItem}>
						<View style={styles.contentItemImage}>
							<Image source={require('../img/calen.png')} />
						</View>

						<View style={styles.contentItemDescription}>
							<Text style={styles.itemTitle}>Visualizar Asignaciones</Text>
							<Text style={styles.itemParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
						</View>
					</View>
			</TouchableHighlight>

			<TouchableHighlight 
				style={styles.buttonItem}
				underlayColor='#ddd'
				onPress={() => __goItem('Crear Informe')}>

					<View style={styles.contentItem}>
						<View style={styles.contentItemImage}>
							<Image source={require('../img/check.png')} />
						</View>

						<View style={styles.contentItemDescription}>
							<Text style={styles.itemTitle}>Crear Informe Técnico</Text>
							<Text style={styles.itemParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
						</View>
					</View>
			</TouchableHighlight>

			<TouchableHighlight 
				style={styles.buttonItem}
				underlayColor='#ddd'
				onPress={() => __goItem('Solicitud Repuesto')}>

					<View style={styles.contentItem}>
						<View style={styles.contentItemImage}>
							<Image source={require('../img/llave.png')} />
						</View>

						<View style={styles.contentItemDescription}>
							<Text style={styles.itemTitle}>Solicitar Repuestos</Text>
							<Text style={styles.itemParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
						</View>
					</View>
			</TouchableHighlight>

			<TouchableHighlight 
				style={styles.buttonItem}
				underlayColor='#ddd'
				onPress={() => __goItem('Historial de Equipo')}>

					<View style={styles.contentItem}>
						<View style={styles.contentItemImage}>
							<Image source={require('../img/lupa.png')} />
						</View>

						<View style={styles.contentItemDescription}>
							<Text style={styles.itemTitle}>Busqueda de Historial</Text>
							<Text style={styles.itemParagraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
						</View>
					</View>
			</TouchableHighlight>
		</View>
    	</ScrollView>
      </View>
    );
  }
  
const styles = StyleSheet.create({
	box: {
		flexDirection: "row",
		height: 150,
		padding: 0
	},
    imageProfile:{
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -70,
		marginBottom: 20
	},  
    nameProfile: {
		marginBottom: 40,
		textAlign: 'center',
		fontWeight: '700',
		textTransform: 'uppercase',
		fontSize: 25,
	},
	buttonItem: {
		backgroundColor: '#fff',
		// borderWidth: 1,
		// borderColor: '#ddd',
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
		paddingHorizontal: 10	
	},
	itemTitle: {
		fontSize: 20
	},
	itemParagraph: {
		fontSize: 10
	}
  });

export default Principal;