import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";
import { GS } from "../styles/GlobalStyle";
import FormField from "../components/FormField";
import PrimaryButton from "../components/PrimaryButton";

// Håndterer både login og oprettelse af konto på samme skærm.
export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tjekker input og gennemfører den valgte handling.
  const handleAuth = async () => {
    if (!email.trim() || !password) {
      setErrorMessage("Skriv både e-mail og adgangskode.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);
    try {
      // Firebase vælger login eller ny konto ud fra skærmens aktuelle tilstand.
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={GS.screen}>
      <View style={GS.authContent}>
        <Text style={GS.eyebrow}>NABOHJÆLP</Text>
        <Text style={GS.title}>{isLogin ? "Velkommen tilbage" : "Opret en konto"}</Text>
        <Text style={GS.subtitle}>
          {isLogin ? "Log ind for at se og hjælpe med indkøbslisten." : "Opret en konto for at komme i gang."}
        </Text>

        <FormField label="E-mail"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="navn@email.dk"
          value={email}
        />
        <FormField label="Adgangskode"
          autoComplete="password"
          onChangeText={setPassword}
          placeholder="Mindst 6 tegn"
          secureTextEntry
          value={password}
        />

        {errorMessage ? <Text style={GS.errorText}>{errorMessage}</Text> : null}

        <PrimaryButton disabled={isSubmitting} onPress={handleAuth} title={isSubmitting ? "Vent venligst..." : isLogin ? "Log ind" : "Opret konto"} />
        <Pressable onPress={() => { setIsLogin((value) => !value); setErrorMessage(""); }} style={GS.authSwitch}>
          <Text style={GS.authSwitchText}>
            {isLogin ? "Har du ikke en konto? Opret en her" : "Har du allerede en konto? Log ind her"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
