import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AddItemScreen from "./screens/AddItemScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import BasketScreen from "./screens/BasketScreen";

//Opretter bundnavigation
const Tab = createBottomTabNavigator();

//Startdata / mockup-data
const startVarer = [
  { id: "1", navn: "Letmælk", mærke: "Arla", antal: "1 liter", til: "Grethe", fundet: false },
  { id: "2", navn: "Rugbrød", mærke: "Schulstad", antal: "1 pakke", til: "Grethe", fundet: false },
  { id: "3", navn: "Æbler", mærke: "Gala", antal: "6 stk.", til: "Erik", fundet: true },
];

// Styrer navigation og fælles data
export default function App() {
  // Gemmer varer og aktiv kunde i state
  const [varer, setVarer] = useState(startVarer);
  const [aktivKunde, setAktivKunde] = useState(null);
//Vare oprettes og sættes som "ikke fundet"
  const tilføjVare = (vare) => {
    setVarer((nuværendeVarer) => [
      { ...vare, id: Date.now().toString(), fundet: false },
      ...nuværendeVarer,
    ]);
  };
  // Skifter fundet status for en vare
  const skiftFundetStatus = (id) => {
    setVarer((nuværendeVarer) =>
      nuværendeVarer.map((vare) =>
        vare.id === id ? { ...vare, fundet: !vare.fundet } : vare
      )
    );
  };

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#28665b",
          tabBarInactiveTintColor: "#82918d",
          tabBarStyle: { height: 66, paddingTop: 6 },
          tabBarIcon: ({ color, size }) => {
            const ikoner = {
              "Tilføj": "add-circle-outline",
              "Indkøbsliste": "list-outline",
              "Afkryds": "checkbox-outline",
            };
            return <Ionicons name={ikoner[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Tilføj">
          {() => <AddItemScreen onAdd={tilføjVare} />}
        </Tab.Screen>
        <Tab.Screen name="Indkøbsliste">
          {() => (
            <ShoppingListScreen
              varer={varer}
              onToggleFundet={skiftFundetStatus}
              onStartIndkøb={setAktivKunde}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Afkryds">
          {() => (
            <BasketScreen
              varer={varer}
              aktivKunde={aktivKunde}
              onToggleFundet={skiftFundetStatus}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
