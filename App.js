import 'react-native-gesture-handler';
import * as React from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Principal from './componentes/Principal';
import Login from './componentes/Login';
import AsignacionesListado from './componentes/AsignacionesListado';
import InformeCrear from './componentes/InformeCrear';
import SolicitudRepuesto from './componentes/SolicitudRepuesto';
import PrincipalIngeniero from './componentes/PrincipalIngeniero';
import VerInformes from './componentes/VerInformes';
import HistorialEquipo from './componentes/HistorialEquipo';
import AgregarAsignaciones from './componentes/AgregarAsignaciones';
import SolicitudRepuestoListado from './componentes/SolicitudRepuestoListado';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}} component={ Login } />

        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Principal Ingeniero" component={PrincipalIngeniero} />

        <Stack.Screen name="Listado de Asignaciones" component={AsignacionesListado} />
        <Stack.Screen name="Crear Informe" component={InformeCrear} />
        <Stack.Screen name="Solicitud Repuesto" component={SolicitudRepuesto} />
        <Stack.Screen name="Ver Informes" component={VerInformes} />
        <Stack.Screen name="Historial de Equipo" component={HistorialEquipo} />
        <Stack.Screen name="Agregar Asignaciones" component={AgregarAsignaciones} />
        <Stack.Screen name="Ver Solicitud de Repuesto" component={SolicitudRepuestoListado} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
