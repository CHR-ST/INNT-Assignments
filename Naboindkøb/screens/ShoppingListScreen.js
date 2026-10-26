import { Alert, Pressable, SectionList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { GS } from "../styles/GlobalStyle";
import GroceryItem from "../components/GroceryItem";

// Viser åbne varer grupperet efter den nabo, de er til.

export default function ShoppingListScreen({
  varer,
  onAddItemToTrip,
  onRemoveItemFromTrip,
  onAddAllToTrip,
  canStartShopping,
  currentHelperId,
}) {
  // Udfører ændringer i indkøbsturen og viser fejl, hvis de fejler.
  const opdaterTur = async (handling) => {
    try {
      await handling();
    } catch (error) {
      Alert.alert("Kunne ikke opdatere indkøbsturen", "Tjek din internetforbindelse og prøv igen.");
    }
  };
  // Samler varerne i grupper ud fra, hvem de er til.
  const grupper = varer.reduce((samlet, vare) => {
    const kunde = vare.til || "Ikke angivet";
    samlet[kunde] = samlet[kunde] ? [...samlet[kunde], vare] : [vare];
    return samlet;
  }, {});

  // Tilføj alle-knappen ved hver nabo ændrer kun den aktuelle hjælpers tur.
  const sektioner = Object.entries(grupper).map(([kunde, kundeVarer]) => ({
    title: kunde,
    data: kundeVarer,
    allePåMinTur: kundeVarer.every((vare) => vare.hjaelperId === currentHelperId),
  }));

  return (
    <SafeAreaView style={GS.screen}>
      <SectionList
        sections={sektioner}
        keyExtractor={(vare) => vare.id}
        contentContainerStyle={GS.content}
        ListHeaderComponent={
          <View style={GS.hero}>
            <Text style={GS.eyebrow}>{canStartShopping ? "HJÆLPERENS LISTE" : "MIN INDKØBSLISTE"}</Text>
            <Text style={GS.title}>{canStartShopping ? "Dagens indkøb" : "Mine varer"}</Text>
            <Text style={GS.subtitle}>{canStartShopping ? "Tryk på en vare for at tilføje eller fjerne den fra din tur." : "Her er de varer, du har tilføjet."}</Text>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View style={GS.customerHeader}>
            <Text style={GS.customerTitle}>{section.title}</Text>
            {canStartShopping ? (
              <Pressable
                disabled={section.allePåMinTur}
                onPress={() => opdaterTur(() => onAddAllToTrip(section.title))}
                style={GS.customerAction}
              >
                <Text style={GS.customerCount}>{section.allePåMinTur ? "Alle er på min tur" : "Tilføj alle"} · {section.data.length} {section.data.length === 1 ? "vare" : "varer"}</Text>
                <Ionicons name={section.allePåMinTur ? "checkmark-circle" : "add-circle-outline"} size={18} color="#28665b" />
              </Pressable>
            ) : null}
          </View>
        )}
        renderItem={({ item }) => (
          <GroceryItem
            item={item}
            isOnTrip={item.hjaelperId === currentHelperId}
            onToggleTrip={canStartShopping ? () => opdaterTur(() => (
              item.hjaelperId === currentHelperId ? onRemoveItemFromTrip(item.id) : onAddItemToTrip(item.id)
            )) : undefined}
          />
        )}
      />
    </SafeAreaView>
  );
}
