import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { ptBR, registerTranslation } from "react-native-paper-dates";
//registerTranslation('pt-BR', ptBR);
registerTranslation("pt", {
  save: "Salvar",
  selectSingle: "Selecionar data",
  selectMultiple: "Selecionar dates",
  selectRange: "Selecionar periodo",
  notAccordingToDateFormat: (inputFormat) =>
    `O formato de data deve ser ${inputFormat}`,
  mustBeHigherThan: (date) => `Deve ser mais tarde então ${date}`,
  mustBeLowerThan: (date) => `Deve ser mais cedo então ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Deve estar entre ${startDate} - ${endDate}`,
  dateIsDisabled: "O dia não é permitido",
  previous: "Anterior",
  next: "Próximo",
  typeInDate: "Digite a data",
  pickDateFromCalendar: "Data de escolha do calendário",
  close: "Fechar",
});

// You can import from local files
import ModeloAPIList from "../components/ModeloAPIList";
import ModeloAPIForm from "../components/ModeloAPIForm";
import ModeloAsyncStorageForm from "../components/ModeloAsyncStorageForm";
import ModeloAsyncStorageList from "../components/ModeloAsyncStorageList";
import UsuarioList from "../components/UsuarioList";
import UsuarioForm from "../components/UsuarioForm";
import ConfigApp from "../components/ConfigApp";
import RegistroForm from "../components/RegistroForm";
import LoginForm from "../components/LoginForm";
import Main from "../components/Main";
import ExampleDate from "../components/ExampleDate";
//import MapMain from '../components/MapMain';

const PricipalStack = createNativeStackNavigator();

function PrincipalStackScreen() {
  return (
    <PricipalStack.Navigator>
      <PricipalStack.Screen
        name="ModeloAPIList"
        component={ModeloAPIList}
        options={{ title: "Modelo API List" }}
      />
      <PricipalStack.Screen
        name="ModeloAPIForm"
        component={ModeloAPIForm}
        options={{ title: "Modelo Formulário" }}
      />

      <PricipalStack.Screen
        name="UsuarioForm"
        component={UsuarioForm}
        options={{ title: "Formulário Usuário" }}
      />
      <PricipalStack.Screen
        name="RegistroForm"
        component={RegistroForm}
        options={{
          title: "Formulário Registro de Usuário",
          headerRight: () => (
            <Ionicons
              name={"ios-add-circle"}
              size={25}
              color={"white"}
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Post")}
            />
          ),
        }}
      />
      <PricipalStack.Screen
        name="LoginForm"
        component={LoginForm}
        options={{
          title: "Login Usuário",
          headerRight: () => (
            <Ionicons
              name={"ios-add-circle"}
              size={25}
              color={"white"}
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Post")}
            />
          ),
        }}
      />
    </PricipalStack.Navigator>
  );
}

const ConfigStack = createNativeStackNavigator();

function ConfigStackScreen() {
  return (
    <ConfigStack.Navigator>
      {/* 
      <ConfigStack.Screen
        name="MapMain"
        component={MapMain}
        options={{ title: 'Modelo Mapa' }}
      />*/}
      <ConfigStack.Screen
        name="Config"
        component={ConfigApp}
        options={{ title: "Configuração App" }}
      />
    </ConfigStack.Navigator>
  );
}

const AsyncStorageStack = createNativeStackNavigator();

function AsyncStorageStackScreen() {
  return (
    <AsyncStorageStack.Navigator>
      <AsyncStorageStack.Screen
        name="ModeloAsyncStorageList"
        component={ModeloAsyncStorageList}
        options={{ title: "Modelo AsyncStorage List" }}
      />
      <AsyncStorageStack.Screen
        name="ModeloAsyncStorageForm"
        component={ModeloAsyncStorageForm}
        options={{ title: "Modelo AsyncStorage Formulário" }}
      />
    </AsyncStorageStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="inicio"
          component={PrincipalStackScreen}
          options={{
            tabBarLabel: "Início",
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="local"
          component={AsyncStorageStackScreen}
          options={{
            tabBarLabel: "Async Storage",
            tabBarIcon: ({ color }) => (
              <Icon name="save" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="config"
          component={ConfigStackScreen}
          options={{
            tabBarLabel: "Config",
            tabBarIcon: ({ color }) => (
              <Icon name="gear" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
