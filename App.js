import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { Intestazione } from "./sor";
import { htrepsom, htreppv, PresentiMia, htrepdiacli } from "./sor/rep";
import { LoginScreen, RegistrazioneScreen } from "./sor/auth";
import { SettingsScreen } from "./sor/home";
import {htrepcart} from "./sor/rep/cartella_clinica/htrepcart";
import { htreppres } from "./sor/rep/cartella_clinica/Prescrizione/htreppres";

const Tab = createBottomTabNavigator();
const Stack_REP = createStackNavigator();
const DrawerHome = createDrawerNavigator();
const StackHome = createStackNavigator();
const StackApp = createStackNavigator();

/*
  StackRepSom
  -----------
  Questo stack gestisce la sezione "Ricoverati".

  Flusso:
  - schermata iniziale: Ricoverati
  - schermata di dettaglio: htrepsom

  Quindi quando l'utente entra nella sezione ricoverati,
  parte da "Ricoverati" e poi può navigare verso "htrepsom", "htreppv" o "htCartellaClinica".
*/
function StackRepSom() {
  return (
    <Stack_REP.Navigator initialRouteName="Ricoverati">
      <Stack_REP.Screen
        name="Ricoverati"
        component={Ricoverati}
        options={{ headerShown: false }}
      />
      <Stack_REP.Screen
        name="htrepsom"
        component={htrepsom}
        options={{ headerShown: false }}
      />
      <Stack_REP.Screen
        name="htreppv"
        component={htreppv}
        options={{ headerShown: false }}
      />
      <Stack_REP.Screen
        name="htrepcart"
        component={htrepcart}
        options={{ headerShown: false }}
      />
      <Stack_REP.Screen
        name="htrepdiacli"
        component={htrepdiacli}
        options={{ headerShown: false }}
      />
      <Stack_REP.Screen
        name="htreppres"
        component={htreppres}
        options={{ headerShown: false }}
      />
    </Stack_REP.Navigator>
  );
}

/*
  Ricoverati
  ----------
  Questa funzione rappresenta la schermata principale della sezione ricoverati.

  Cosa fa:
  - mostra l'intestazione in alto
  - mostra un Tab Navigator
  - dentro il tab "Presenti" carica il componente PresentiMia

  Quindi è una schermata contenitore:
  non contiene i dati direttamente, ma monta header + tab + schermata reale.
*/
function Ricoverati({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Intestazione isHome={true} navigation={navigation} />
      <PresentiMia navigation={navigation} />
    </View>
  );
}

/*
  MenuHomePersonalizzato
  ----------------------
  Questa funzione personalizza il contenuto del drawer (menu laterale).

  Invece di usare il menu standard così com'è, aggiunge:
  - una fascia colorata in alto
  - la lista standard delle voci del drawer
  - un pulsante Logout in fondo

  props contiene tutto ciò che serve al drawer:
  navigazione, stato attuale, elenco schermate, ecc.
*/
function MenuHomePersonalizzato(props) {
  return (
    <DrawerContentScrollView {...props} style={{ marginTop: -28 }}>
      <View style={{ height: 75, backgroundColor: "#87ceeb" }} />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={{ fontSize: 24 }}
        onPress={() => {
          props.navigation.navigate("Login");
        }}
      />
    </DrawerContentScrollView>
  );
}

/*
  MenuHome
  --------
  Questo è il drawer principale dell'app.

  Cosa contiene:
  - Ricoverati

  Ogni voce del menu apre una sezione dell'app.
  Inoltre usa il drawer personalizzato definito sopra.
*/
function MenuHome() {
  return (
    <DrawerHome.Navigator
      initialRouteName="Ricoverati"
      drawerContent={(props) => MenuHomePersonalizzato(props)}
      screenOptions={{ headerShown: false }}
    >
      <DrawerHome.Screen
        name="Ricoverati"
        component={StackRepSom}
        options={{ drawerLabelStyle: { fontSize: 24 } }}
      />
    </DrawerHome.Navigator>
  );
}

/*
  StackHomeMenu
  -------------
  Questo stack serve a gestire:
  - MainMenu
  - SettingsScreen

  Quindi permette di partire direttamente dalla lista presenti e poi eventualmente
  andare nella schermata impostazioni.
*/
function StackHomeMenu() {
  return (
    <StackHome.Navigator initialRouteName="MainMenu">
      <StackHome.Screen
        name="MainMenu"
        component={MenuHome}
        options={{ headerShown: false }}
      />
      <StackHome.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </StackHome.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="HomeApp">
        <StackApp.Screen
          name="HomeApp"
          component={StackHomeMenu}
          options={{ headerShown: false }}
        />
        <StackApp.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <StackApp.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}

export default App;
