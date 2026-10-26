import { SectionList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { GS } from "../styles/GlobalStyle";
import GroceryItem from "../components/GroceryItem";

// Viser alle varer, som den aktuelle hjælper har valgt til sin indkøbstur.
export default function BasketScreen({ varer, helperId, onToggleFundet }) {
  const kundeVarer = varer.filter((vare) => vare.hjaelperId === helperId);
  const antalFundet = kundeVarer.filter((vare) => vare.fundet).length;
  const grupper = kundeVarer.reduce((samlet, vare) => {
    const kunde = vare.til || "Ikke angivet";
    samlet[kunde] = samlet[kunde] ? [...samlet[kunde], vare] : [vare];
    return samlet;
  }, {});
  // Sektioner gør det tydeligt, hvilken nabo varerne hører til.
  const sektioner = Object.entries(grupper).map(([kunde, varerTilKunde]) => ({ title: kunde, data: varerTilKunde }));
  if (!kundeVarer.length) {
    return (
      <SafeAreaView style={GS.screen}>
        <View style={GS.empty}>
          <Ionicons name="people-outline" size={48} color="#82918d" />
          <Text style={GS.emptyTitle}>Din indkøbstur er tom</Text>
          <Text style={GS.emptyText}>Tryk på en vare på Indkøbslisten for at tilføje den til din tur.</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={GS.screen}>
      <SectionList
        sections={sektioner}
        keyExtractor={(vare) => vare.id}
        contentContainerStyle={GS.content}
        ListHeaderComponent={
          <View style={GS.hero}>
            <Text style={GS.eyebrow}>MIN INDKØBSTUR</Text>
            <Text style={GS.title}>Afkryds varer</Text>
            <Text style={GS.subtitle}>{antalFundet} af {kundeVarer.length} varer er fundet.</Text>
          </View>
        }
        renderSectionHeader={({ section }) => <View style={GS.basketSectionHeader}><Text style={GS.basketSectionTitle}>Til {section.title}</Text><Text style={GS.customerCount}>{section.data.length} {section.data.length === 1 ? "vare" : "varer"}</Text></View>}
        renderItem={({ item }) => <GroceryItem item={item} onToggleFundet={onToggleFundet} showRecipient />}
      />
    </SafeAreaView>
  );
}
