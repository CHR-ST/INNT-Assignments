import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { GS } from "../styles/GlobalStyle";

// Viser liste over indkøbsvarer for valgt bruger
export default function BasketScreen({ varer, aktivKunde, onToggleFundet }) {
  const kundeVarer = varer.filter((vare) => vare.til === aktivKunde);
  const antalFundet = kundeVarer.filter((vare) => vare.fundet).length;
// Hvis der ikke er en valgt kunde, vises følgende:
  if (!aktivKunde) {
    return (
      <SafeAreaView style={GS.screen}>
        <View style={GS.empty}>
          <Ionicons name="people-outline" size={48} color="#82918d" />
          <Text style={GS.emptyTitle}>Vælg først en kunde</Text>
          <Text style={GS.emptyText}>Tryk på et kundenavn på Indkøbslisten for at starte et indkøb.</Text>
        </View>
      </SafeAreaView>
    );
  }
// Valgte kundes varer vises
  return (
    <SafeAreaView style={GS.screen}>
      <FlatList
        data={kundeVarer}
        keyExtractor={(vare) => vare.id}
        contentContainerStyle={GS.content}
        ListHeaderComponent={
          <View style={GS.hero}>
            <Text style={GS.eyebrow}>INDKØB ER STARTET</Text>
            <Text style={GS.title}>{aktivKunde}</Text>
            <Text style={GS.subtitle}>{antalFundet} af {kundeVarer.length} varer er fundet.</Text>
          </View>
        }
        // Viser hver vare med mulighed for at markere som fundet
        renderItem={({ item }) => (
          <View style={[GS.card, item.fundet && GS.cardDone]}>
            <View style={GS.row}>
              <View>
                <Text style={GS.itemName}>{item.navn}</Text>
                <Text style={GS.itemMeta}>{item.antal} til {item.til}</Text>
              </View>
              <Ionicons
                name={item.fundet ? "checkmark-circle" : "ellipse-outline"}
                size={27}
                color={item.fundet ? "#3b8b61" : "#82918d"}
              />
            </View>
            <Pressable style={GS.action} onPress={() => onToggleFundet(item.id)}>
              <Text style={[GS.actionText, item.fundet && GS.doneText]}>
                {item.fundet ? "✓ Fundet — fjern markering" : "Markér som fundet"}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
