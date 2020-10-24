import 'react-native-gesture-handler';
import * as React from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import Principal from './componentes/Principal';
import Login from './componentes/Login';
// import AsignacionesListado from './componentes/AsignacionesListado';
import InformeCrear from './componentes/InformeCrear';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}} component={ Login } />
        <Stack.Screen name="Principal" component={Principal} />
        {/* <Stack.Screen name="Listado de Asignaciones" component={AsignacionesListado} /> */}
        <Stack.Screen name="Crear Informe" component={InformeCrear} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
