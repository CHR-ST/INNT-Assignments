import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GS } from "../styles/GlobalStyle";

//Formular til til at tilføje en ny vare.
export default function AddItemScreen({ onAdd }) { //OnAdd tilføjer varen til listen i APP.js
  //states der gemmer intput fra brugeren
  const [navn, setNavn] = useState("");
  const [mærke, setMærke] = useState("");
  const [antal, setAntal] = useState("");
  const [til, setTil] = useState("Grethe");

  //tjekker formular og om der mangler input, hvis ikke tilføjes vare
  const gemVare = () => { 
    if (!navn.trim() || !antal.trim()) {
      Alert.alert("Mangler oplysninger", "Skriv mindst varenavn og antal.");
      return;
    }
    onAdd({ navn: navn.trim(), mærke: mærke.trim(), antal: antal.trim(), til: til.trim() || "Ukendt" });
    setNavn(""); setMærke(""); setAntal(""); //rydder input felter.
    Alert.alert("Tilføjet", "Varen er nu på indkøbslisten.");
  };

  return (
    <SafeAreaView style={GS.screen}>
      <ScrollView contentContainerStyle={GS.content} keyboardShouldPersistTaps="handled">
        <View style={GS.hero}>
          <Text style={GS.eyebrow}>NABOHJÆLP</Text>
          <Text style={GS.title}>Hvad mangler du?</Text>
          <Text style={GS.subtitle}>Tilføj en vare, så en hjælper kan tage den med på indkøbsturen.</Text>
        </View>
        <Text style={GS.inputLabel}>Vare</Text>
        <TextInput value={navn} onChangeText={setNavn} placeholder="Fx havregryn" style={GS.input} />
        <Text style={GS.inputLabel}>Mærke (valgfrit)</Text>
        <TextInput value={mærke} onChangeText={setMærke} placeholder="Fx AXA" style={GS.input} />
        <Text style={GS.inputLabel}>Antal</Text>
        <TextInput value={antal} onChangeText={setAntal} placeholder="Fx 1 pakke" style={GS.input} />
        <Text style={GS.inputLabel}>Hvem er varen til?</Text>
        <TextInput value={til} onChangeText={setTil} placeholder="Fx Grethe" style={GS.input} />
        <Pressable style={GS.button} onPress={gemVare}><Text style={GS.buttonText}>Tilføj til indkøbslisten</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
