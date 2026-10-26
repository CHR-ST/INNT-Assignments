import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AddItemScreen from "./screens/AddItemScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import BasketScreen from "./screens/BasketScreen";
import AuthScreen from "./screens/AuthScreen";
import AccountScreen from "./screens/AccountScreen";
import RoleSetupScreen from "./screens/RoleSetupScreen";
import { auth, db } from "./database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

// Opretter bundnavigation.
const Tab = createBottomTabNavigator();

// Styrer navigation og fælles data
export default function App() {
  // Varer synkroniseres løbende med Firestore.
  const [varer, setVarer] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profil, setProfil] = useState(null);
  const [profilLoading, setProfilLoading] = useState(true);

  // Holder brugeren logget ind, også efter appen er blevet lukket.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  // Henter brugerens rolle fra Firestore.
  useEffect(() => {
    if (!user) {
      setProfil(null);
      setProfilLoading(false);
      return undefined;
    }

    setProfilLoading(true);
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      setProfil(snapshot.exists() ? snapshot.data() : null);
      setProfilLoading(false);
    }, (error) => {
      console.error("Kunne ikke hente brugerprofil:", error.message);
      setProfilLoading(false);
    });

    return unsubscribe;
  }, [user]);

  // Lytter på ændringer i databasen, mens brugeren er logget ind.
  useEffect(() => {
    if (!user) {
      setVarer([]);
      return undefined;
    }

    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      setVarer(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    }, (error) => {
      console.error("Kunne ikke hente varer fra Firestore:", error.message);
    });

    return unsubscribe;
  }, [user]);

  // Opretter en vare i Firestore, så den gemmes efter appen lukkes.
  const tilføjVare = async (vare) => {
    if (!user) return;

    await addDoc(collection(db, "items"), {
      ...vare,
      fundet: false,
      status: "afventer",
      oprettetAf: user.uid,
      oprettetAfEmail: user.email || "Ukendt bruger",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  // Opdaterer en eksisterende vare i Firestore.
  const skiftFundetStatus = async (id) => {
    const vare = varer.find((nuværendeVare) => nuværendeVare.id === id);
    if (!vare) return;

    await updateDoc(doc(db, "items", id), {
      fundet: !vare.fundet,
      status: vare.fundet ? "iGang" : "fundet",
      updatedAt: serverTimestamp(),
    });
  };

  // Tilføjer varen til den aktuelle hjælpers indkøbstur.
  const tilføjTilIndkøbstur = async (id) => {
    await updateDoc(doc(db, "items", id), {
      status: "iGang",
      hjaelperId: user.uid,
      hjaelperNavn: profil.navn,
      updatedAt: serverTimestamp(),
    });
  };

  // Fjerner varen fra hjælperens tur, så en anden hjælper kan vælge den.
  const fjernFraIndkøbstur = async (id) => {
    await updateDoc(doc(db, "items", id), {
      status: "afventer",
      hjaelperId: null,
      hjaelperNavn: null,
      updatedAt: serverTimestamp(),
    });
  };

  // Tilføjer kun varer, der ikke allerede er taget af en anden hjælper.
  const tilføjAlleTilIndkøbstur = async (kunde) => {
    const varerTilIndkøb = varer.filter((vare) => (
      vare.til === kunde && !vare.fundet && !vare.hjaelperId
    ));
    await Promise.all(varerTilIndkøb.map((vare) => tilføjTilIndkøbstur(vare.id)));
  };

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {/* Viser den rigtige skærm ud fra login og profilopsætning. */}
      {authLoading || (user && profilLoading) ? null : !user ? (
        <AuthScreen />
      ) : !profil ? (
        <RoleSetupScreen user={user} />
      ) : (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#28665b",
          tabBarInactiveTintColor: "#82918d",
          tabBarStyle: { height: 66, paddingTop: 6 },
          tabBarIcon: ({ color, size }) => {
            const ikoner = {
              "Tilføj": "add-circle-outline",
              "Mine varer": "list-outline",
              "Indkøbsliste": "list-outline",
              "Afkryds": "checkbox-outline",
              "Profil": "person-circle-outline",
            };
            return <Ionicons name={ikoner[route.name]} size={size} color={color} />;
          },
        })}
      >
        {/* Fanerne afhænger af, om brugeren er nabo eller hjælper. */}
        {profil.rolle === "nabo" ? (
          <>
            <Tab.Screen name="Tilføj">
              {() => <AddItemScreen onAdd={tilføjVare} profil={profil} />}
            </Tab.Screen>
            <Tab.Screen name="Mine varer">
              {() => <ShoppingListScreen varer={varer.filter((vare) => vare.oprettetAf === user.uid)} canStartShopping={false} />}
            </Tab.Screen>
          </>
        ) : (
          <>
            <Tab.Screen name="Indkøbsliste">
              {() => (
                <ShoppingListScreen
                  varer={varer.filter((vare) => !vare.fundet && (!vare.hjaelperId || vare.hjaelperId === user.uid))}
                  currentHelperId={user.uid}
                  onAddItemToTrip={tilføjTilIndkøbstur}
                  onRemoveItemFromTrip={fjernFraIndkøbstur}
                  onAddAllToTrip={tilføjAlleTilIndkøbstur}
                  canStartShopping
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Afkryds">
              {() => <BasketScreen varer={varer} helperId={user.uid} onToggleFundet={skiftFundetStatus} />}
            </Tab.Screen>
          </>
        )}
        <Tab.Screen name="Profil">
          {() => <AccountScreen user={user} profil={profil} />}
        </Tab.Screen>
      </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
