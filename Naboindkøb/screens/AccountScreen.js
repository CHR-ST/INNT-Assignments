import { Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../database/firebase";
import { GS } from "../styles/GlobalStyle";
import PrimaryButton from "../components/PrimaryButton";

// Viser den aktuelle konto og giver brugeren mulighed for at logge ud.
export default function AccountScreen({ user, profil }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Kunne ikke logge ud:", error.message);
    }
  };

  // Funktion til at skifte mellem "hjaelper" og "nabo" roller for testformål.
  const skiftTestRolle = async () => {
    const næsteRolle = profil?.rolle === "hjaelper" ? "nabo" : "hjaelper";
    try {
      await updateDoc(doc(db, "users", user.uid), { rolle: næsteRolle });
    } catch (error) {
      Alert.alert("Kunne ikke skifte rolle", "Tjek din internetforbindelse og prøv igen.");
    }
  };

  return (
    <SafeAreaView style={GS.screen}>
      <View style={GS.content}>
        <View style={GS.hero}>
          <Text style={GS.eyebrow}>DIN KONTO</Text>
          <Text style={GS.title}>Profil</Text>
          <Text style={GS.subtitle}>Du er logget ind som:</Text>
        </View>
        <View style={GS.card}>
          <Text style={GS.itemName}>{profil?.navn || "Ukendt bruger"}</Text>
          <Text style={GS.itemMeta}>{profil?.rolle === "hjaelper" ? "Hjælper med indkøb" : "Mangler varer"}</Text>
          <Text style={GS.itemMeta}>{user?.email || "Ukendt e-mail"}</Text>
        </View>
        <Text style={GS.subtitle}>Test begge flows på samme konto:</Text>
        <PrimaryButton secondary onPress={skiftTestRolle} title={profil?.rolle === "hjaelper" ? "Skift til nabo" : "Skift til hjælper"} />
        <PrimaryButton onPress={handleLogout} title="Log ud" />
      </View>
    </SafeAreaView>
  );
}
