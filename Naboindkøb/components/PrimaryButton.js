import { Pressable, Text } from "react-native";
import { GS } from "../styles/GlobalStyle";
//Genanvendelig komponent til at vise en primær knap med tekst og onPress-funktion.
export default function PrimaryButton({ title, onPress, disabled = false, secondary = false, style }) {
  return <Pressable disabled={disabled} onPress={onPress} style={[secondary ? GS.secondaryButton : GS.button, disabled && GS.buttonDisabled, style]}><Text style={secondary ? GS.secondaryButtonText : GS.buttonText}>{title}</Text></Pressable>;
}
