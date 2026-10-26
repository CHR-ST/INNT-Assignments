import { Text, TextInput, View } from "react-native";
import { GS } from "../styles/GlobalStyle";
//Genanvendelig komponent til at vise et inputfelt med label og hjælpetekst.
export default function FormField({ label, helperText, ...inputProps }) {
  return <View><Text style={GS.inputLabel}>{label}</Text><TextInput style={GS.input} {...inputProps} />{helperText ? <Text style={GS.searchHelp}>{helperText}</Text> : null}</View>;
}
