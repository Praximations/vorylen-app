import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { WorkspaceProvider } from "../state/Workspace";
export default function RootLayout() { return <WorkspaceProvider><StatusBar style="dark"/><Stack screenOptions={{ headerShown: false }}/></WorkspaceProvider>; }
