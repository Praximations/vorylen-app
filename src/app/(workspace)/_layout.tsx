import { Redirect, Tabs } from "expo-router";
import { useWorkspace } from "../../state/Workspace";
export default function WorkspaceLayout() {
  const { ready, signedIn } = useWorkspace();
  if (!ready) return null;
  if (!signedIn) return <Redirect href="/"/>;
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#245d4b", tabBarStyle: { backgroundColor: "#f4f6f3" }, tabBarIconStyle: { display: "none" }, tabBarLabelStyle: { fontSize: 13, fontWeight: "600" } }}><Tabs.Screen name="business" options={{ title: "Business" }}/><Tabs.Screen name="dev" options={{ title: "Dev" }}/><Tabs.Screen name="finance" options={{ title: "Finance" }}/><Tabs.Screen name="systems" options={{ title: "Systems" }}/></Tabs>;
}
