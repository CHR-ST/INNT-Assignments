import { Pressable, SectionList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { GS } from "../styles/GlobalStyle";

//Viser alle varer grupperet efter kunder

export default function ShoppingListScreen({ varer, onToggleFundet, onStartIndkøb }) {
  const navigation = useNavigation();
  const grupper = varer.reduce((samlet, vare) => { //samler i grupper
    const kunde = vare.til || "Ikke angivet";
    samlet[kunde] = samlet[kunde] ? [...samlet[kunde], vare] : [vare];
    return samlet;
  }, {});

  //laver grupper om til sektioner
  const sektioner = Object.entries(grupper).map(([kunde, kundeVarer]) => ({
    title: kunde,
    data: kundeVarer,
  }));

  return (
    <SafeAreaView style={GS.screen}>
      <SectionList //viser varer opdelt i sektionerne
        sections={sektioner}
        keyExtractor={(vare) => vare.id}
        contentContainerStyle={GS.content}
        ListHeaderComponent={
          <View style={GS.hero}>
            <Text style={GS.eyebrow}>HJÆLPERENS LISTE</Text>
            <Text style={GS.title}>Dagens indkøb</Text>
            <Text style={GS.subtitle}>Tryk på en vare, når du har fundet den i butikken.</Text>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Pressable // Navigerer til afkrydsningsskærm
            style={GS.customerHeader}
            onPress={() => {
              onStartIndkøb(section.title);
              navigation.navigate("Afkryds");
            }}
          >
            <Text style={GS.customerTitle}>{section.title}</Text>
            <View style={GS.customerAction}>
              <Text style={GS.customerCount}>Start indkøb · {section.data.length} {section.data.length === 1 ? "vare" : "varer"}</Text>
              <Ionicons name="chevron-forward" size={18} color="#28665b" />
            </View>
          </Pressable>
        )}
        renderItem={({ item }) => (
          <View style={[GS.card, item.fundet && GS.cardDone]}>
            <View style={GS.row}>
              <View style={{ flex: 1 }}>
                <Text style={GS.itemName}>{item.navn}</Text>
                <Text style={GS.itemMeta}>{item.mærke || "Intet mærke valgt"} · {item.antal}</Text>
              </View>
            </View>
            <Pressable style={GS.action} onPress={() => onToggleFundet(item.id)}>
              <Text style={[GS.actionText, item.fundet && GS.doneText]}>
                {item.fundet ? "✓ Markeret som fundet" : "＋ Markér som fundet"}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
