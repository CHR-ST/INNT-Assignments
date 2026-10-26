import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { farver, GS } from "../styles/GlobalStyle";
const statusTekster = { afventer: "Afventer hjælp", iGang: "Indkøb i gang", fundet: "Fundet" };
const statusStil = { afventer: [GS.statusAfventer, GS.statusTextAfventer], iGang: [GS.statusIGang, GS.statusTextIGang], fundet: [GS.statusFundet, GS.statusTextFundet] };
// Det samme varekort bruges på begge lister, men med forskellige tryk-handlinger.
export default function GroceryItem({ item, onToggleFundet, onToggleTrip, isOnTrip = false, showRecipient = false }) {
  const status = item.status || (item.fundet ? "fundet" : "afventer");
  const [badgeStyle, textStyle] = statusStil[status] || statusStil.afventer;
  const meta = [item.mærke || "Intet mærke valgt", item.antal, showRecipient ? `til ${item.til}` : null].filter(Boolean).join(" · ");
  const indhold = <><View style={GS.row}><View style={{ flex: 1 }}><Text style={GS.itemName}>{item.navn}</Text><Text style={GS.itemMeta}>{meta}</Text></View>{onToggleFundet ? <Ionicons name={item.fundet ? "checkmark-circle" : "ellipse-outline"} size={27} color={item.fundet ? farver.succes : farver.svagTekst} /> : null}</View><View style={[GS.statusBadge, badgeStyle]}><Text style={[GS.statusText, textStyle]}>{statusTekster[status] || statusTekster.afventer}</Text></View>{onToggleTrip ? <Text style={GS.cardActionText}>{isOnTrip ? "✓ På min tur — tryk for at fjerne" : "＋ Tryk for at tilføje til min tur"}</Text> : null}{onToggleFundet ? <Text style={[GS.cardActionText, item.fundet && GS.doneText]}>{item.fundet ? "✓ Fundet — tryk for at fjerne markering" : "Tryk for at markere som fundet"}</Text> : null}</>;
  // Hele kortet er knappen, så der er et større og enklere trykfelt.
  if (onToggleTrip) return <Pressable accessibilityRole="button" accessibilityLabel={`${isOnTrip ? "Fjern" : "Tilføj"} ${item.navn} fra min indkøbstur`} onPress={onToggleTrip} style={({ pressed }) => [GS.card, item.fundet && GS.cardDone, pressed && GS.cardPressed]}>{indhold}</Pressable>;
  if (onToggleFundet) return <Pressable accessibilityRole="button" accessibilityLabel={`${item.fundet ? "Fjern markering af" : "Markér"} ${item.navn} som fundet`} onPress={() => onToggleFundet(item.id)} style={({ pressed }) => [GS.card, item.fundet && GS.cardDone, pressed && GS.cardPressed]}>{indhold}</Pressable>;
  return <View style={[GS.card, item.fundet && GS.cardDone]}>{indhold}</View>;
}
