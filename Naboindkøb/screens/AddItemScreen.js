import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GS } from "../styles/GlobalStyle";
import { søgProdukter } from "../services/prej";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";

// Formular til at tilføje en ny vare.
export default function AddItemScreen({ onAdd, profil }) {
  // States gemmer brugerens input.
  const [navn, setNavn] = useState("");
  const [mærke, setMærke] = useState("");
  const [antal, setAntal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forslag, setForslag] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [valgtProduktId, setValgtProduktId] = useState(null);

  const ændrVareNavn = (tekst) => {
    setNavn(tekst);
    setValgtProduktId(null);
  };

  const hentProduktforslag = async () => {
    if (navn.trim().length < 3) {
      setForslag([]);
      setSearchError("Skriv mindst tre bogstaver for at søge efter et produkt.");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    try {
      // API-kaldet sker kun efter et bevidst tryk på søgeknappen.
      const resultater = await søgProdukter(navn);
      setForslag(resultater);
      if (!resultater.length) {
        setSearchError("Ingen forslag fundet. Du kan stadig skrive varen selv.");
      }
    } catch (error) {
      setForslag([]);
      setSearchError("Kunne ikke hente forslag. Du kan stadig skrive varen selv.");
    } finally {
      setIsSearching(false);
    }
  };

  const vælgForslag = (produkt) => {
    // Et produktforslag udfylder formularen, men kan stadig ændres manuelt.
    setNavn(produkt.navn);
    setMærke(produkt.mærke);
    setValgtProduktId(produkt.id || null);
    setForslag([]);
    setSearchError("");
  };

  const fortsætManuelt = () => {
    setForslag([]);
    setSearchError("");
    setValgtProduktId(null);
  };

  // Tjekker formularen og gemmer varen, hvis de nødvendige felter er udfyldt.
  const gemVare = async () => {
    if (!navn.trim() || !antal.trim()) {
      Alert.alert("Mangler oplysninger", "Skriv mindst varenavn og antal.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Sender formularens data til App.js, som gemmer varen i Firestore.
      await onAdd({
        navn: navn.trim(),
        mærke: mærke.trim(),
        antal: antal.trim(),
        til: profil.navn,
        prejProduktId: valgtProduktId,
      });
      // Rydder felterne efter en vellykket gemning.
      setNavn(""); setMærke(""); setAntal("");
      setForslag([]); setValgtProduktId(null); setSearchError("");
      Alert.alert("Tilføjet", "Varen er nu på indkøbslisten.");
    } catch (error) {
      Alert.alert("Kunne ikke gemme varen", "Tjek din internetforbindelse og Firestore-reglerne.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={GS.screen}>
      <ScrollView contentContainerStyle={GS.content} keyboardShouldPersistTaps="handled">
        <View style={GS.hero}>
          <Text style={GS.eyebrow}>NABOHJÆLP</Text>
          <Text style={GS.title}>Hvad mangler du?</Text>
          <Text style={GS.subtitle}>Skriv en vare på listen, eller søg efter et produktforslag.</Text>
        </View>
        <FormField label="Vare" value={navn} onChangeText={ændrVareNavn} placeholder="Fx havregryn" helperText="Du kan altid skrive varen selv og tilføje den direkte." />
        <PrimaryButton secondary disabled={isSearching} onPress={hentProduktforslag} title={isSearching ? "Søger..." : "Søg produktforslag"} />

        {searchError ? <Text style={GS.searchError}>{searchError}</Text> : null}
        {forslag.length ? (
          <View style={GS.suggestionList}>
            <Text style={GS.suggestionHeading}>Forslag fra butikker</Text>
            {forslag.map((produkt) => (
              <Pressable key={produkt.id || produkt.navn} onPress={() => vælgForslag(produkt)} style={GS.suggestionButton}>
                <Text style={GS.suggestionName}>{produkt.navn}</Text>
                <Text style={GS.suggestionMeta}>{[produkt.mærke, produkt.mængde].filter(Boolean).join(" · ") || "Tryk for at vælge"}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
        {(searchError || forslag.length) ? (
          <Pressable onPress={fortsætManuelt} style={GS.manualChoice}>
            <Text style={GS.manualChoiceText}>Fortsæt uden produktforslag</Text>
          </Pressable>
        ) : null}
        <FormField label="Mærke (valgfrit)" value={mærke} onChangeText={setMærke} placeholder="Fx AXA" />
        <FormField label="Antal" value={antal} onChangeText={setAntal} placeholder="Fx 1 pakke" />
        <PrimaryButton disabled={isSubmitting} onPress={gemVare} title={isSubmitting ? "Gemmer..." : "Tilføj til indkøbslisten"} />
      </ScrollView>
    </SafeAreaView>
  );
}
