import { Redirect } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import { Action, Field, Screen, styles } from "../components/Screen";
import { session } from "../integrations/platform";
import { errorMessage, useWorkspace } from "../state/Workspace";

export default function SignIn() {
  const { signedIn, ready } = useWorkspace();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  if (signedIn) return <Redirect href="/business"/>;
  return <Screen title="Welcome back." error={error}><Text style={styles.text}>One account. All your work.</Text>{!session ? <Text style={styles.text}>This app needs your platform connection settings before you can sign in.</Text> : !ready ? <Text>Loading your session…</Text> : <><Field accessibilityLabel="Email" placeholder="Email" autoCapitalize="none" keyboardType="email-address" autoComplete="email" value={email} onChangeText={setEmail}/><Field accessibilityLabel="Password" placeholder="Password" secureTextEntry autoComplete="current-password" value={password} onChangeText={setPassword}/><Action title={busy ? "Signing in…" : "Sign in"} disabled={busy || !email || !password} onPress={() => { if (!session) return; setBusy(true); setError(""); void session.auth.auth.signInWithPassword({ email, password }).then(({ error }) => { if (error) throw error; setPassword(""); }).catch(error => setError(errorMessage(error))).finally(() => setBusy(false)); }}/></>}</Screen>;
}
