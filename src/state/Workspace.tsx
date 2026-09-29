import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AppState } from "react-native";
import type { Organization } from "@praximations/client";
import { session } from "../integrations/platform";

interface WorkspaceState { signedIn: boolean; ready: boolean; organizations: Organization[]; organization: string; selectOrganization(id: string): void; error: string }
const Workspace = createContext<WorkspaceState>({ signedIn: false, ready: false, organizations: [], organization: "", selectOrganization: () => {}, error: "" });
export const useWorkspace = () => useContext(Workspace);
export const errorMessage = (error: unknown) => error instanceof Error ? error.message.replaceAll("_", " ") : "Unable to connect";

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const [ready, setReady] = useState(!session);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [organization, selectOrganization] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const client = session;
    if (!client) return;
    const { data } = client.auth.auth.onAuthStateChange((_event, value) => {
      setSignedIn(Boolean(value)); setReady(true); setError("");
      if (!value) { setOrganizations([]); selectOrganization(""); }
    });
    void client.auth.auth.getSession().then(({ data, error }) => { if (error) setError(errorMessage(error)); setSignedIn(Boolean(data.session)); setReady(true); }).catch(error => { setError(errorMessage(error)); setReady(true); });
    const state = AppState.addEventListener("change", state => {
      if (state === "active") client.auth.auth.startAutoRefresh(); else client.auth.auth.stopAutoRefresh();
    });
    if (AppState.currentState === "active") client.auth.auth.startAutoRefresh();
    return () => { data.subscription.unsubscribe(); state.remove(); client.auth.auth.stopAutoRefresh(); };
  }, []);
  useEffect(() => {
    if (!signedIn || !session) return;
    let active = true;
    void session.platform.organizations().then(data => { if (active) { setOrganizations(data.organizations); selectOrganization(data.organizations[0]?.id ?? ""); } }).catch(error => { if (active) setError(errorMessage(error)); });
    return () => { active = false; };
  }, [signedIn]);
  return <Workspace.Provider value={{ signedIn, ready, organizations, organization, selectOrganization, error }}>{children}</Workspace.Provider>;
}
