import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StatusBar, Button,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <><View style={{ flex: 1, backgroundColor: '#eee' }}>
      <View style={styles.image}>
        <Image source={require('./img/logoCardio.png')} />
      </View>

      <View style={styles.wrapper}>
        <View style={styles.image2}>
          <Image source={require('./img/Shape_2_copiasm.png')} />
        </View>
        <Text style={styles.login}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
        />
        <View>
          <TouchableHighlight style={styles.btnSend}>
            <Text style={styles.textSend}>Ingresar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#eee',
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  input: {
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  btnSend: {
    backgroundColor: '#2980b9',
    marginTop: 20,
    paddingVertical: 10,
    marginHorizontal: 60
  },
  textSend: {
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 20
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginTop: 50
  },

  login: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20
  },

  image2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },

});

const App2 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>

    <View style={styles1.box}>
      <View style={{ backgroundColor: "#2980b9", flex: 1 }}/>
    </View>


    <View style={styles1.image3}>
          <Image source={require('./img/profile.png')} />
    </View>

    <Text style={styles1.nomtec}>Nombre del Técnico</Text>

    <View style={styles1.calen}>
          <Image source={require('./img/calen.png')} />
    </View>

    <Text style={styles1.VA}>Visualizar Asignaciones</Text>
    <Text style={styles1.VAs}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

    <View style={styles1.check}>
          <Image source={require('./img/check.png')} />
    </View>

    <Text style={styles1.CIT}>Crear Informe Técnico</Text>
    <Text style={styles1.CITs}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>


    <View style={styles1.llave}>
          <Image source={require('./img/llave.png')} />
    </View>

    <Text style={styles1.SR}>Solicitar Repuestos</Text>
    <Text style={styles1.SRs}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>


    <View style={styles1.lupa}>
          <Image source={require('./img/lupa.png')} />
    </View>

    <Text style={styles1.BH}>Busqueda de Historial</Text>
    <Text style={styles1.BHs}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ipsum nec libero auctor feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

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
    marginTop:0,
    position: 'absolute',
    left:     130,
    top:      70,
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

export default App2;
