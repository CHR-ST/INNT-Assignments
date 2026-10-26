import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../database/firebase";
import { GS } from "../styles/GlobalStyle";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";

// Gemmer en enkel profil, så appen kan vise det rette flow til brugeren.
export default function RoleSetupScreen({ user }) {
  const [navn, setNavn] = useState("");
  const [rolle, setRolle] = useState("nabo");
  const [isSaving, setIsSaving] = useState(false);

  // Gemmer brugerens navn og valgte rolle i Firestore.
  const gemProfil = async () => {
    if (!navn.trim()) {
      Alert.alert("Skriv dit navn", "Navnet bruges til at vise, hvem indkøbslisten er til.");
      return;
    }

    setIsSaving(true);
    try {
      // Brugerens id bruges som dokument-id i Firestore.
      await setDoc(doc(db, "users", user.uid), {
        navn: navn.trim(),
        rolle,
        email: user.email || "",
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      Alert.alert("Kunne ikke gemme profilen", "Tjek Firestore-reglerne og prøv igen.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={GS.screen}>
      <View style={GS.authContent}>
        <Text style={GS.eyebrow}>KOM GODT I GANG</Text>
        <Text style={GS.title}>Hvem er du?</Text>
        <Text style={GS.subtitle}>Vælg den rolle, du vil teste i Naboindkøb.</Text>

        <FormField label="Dit navn"
          autoCapitalize="words"
          onChangeText={setNavn}
          placeholder="Fx Grethe"
          value={navn}
        />

        <Text style={GS.inputLabel}>Din rolle</Text>
        {/* Vælger den rolle, der bestemmer brugerens flow i appen. */}
        <Pressable
          onPress={() => setRolle("nabo")}
          style={[GS.roleCard, rolle === "nabo" && GS.roleCardSelected]}
        >
          <Text style={GS.roleTitle}>Jeg mangler varer</Text>
          <Text style={GS.roleText}>Jeg opretter min egen indkøbsliste.</Text>
        </Pressable>
        <Pressable
          onPress={() => setRolle("hjaelper")}
          style={[GS.roleCard, rolle === "hjaelper" && GS.roleCardSelected]}
        >
          <Text style={GS.roleTitle}>Jeg hjælper med indkøb</Text>
          <Text style={GS.roleText}>Jeg ser åbne lister og krydser varer af.</Text>
        </Pressable>

        <PrimaryButton disabled={isSaving} onPress={gemProfil} title={isSaving ? "Gemmer..." : "Fortsæt"} />
      </View>
    </SafeAreaView>
  );
}
