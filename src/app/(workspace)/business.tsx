import { useState } from "react";
import { Text } from "react-native";
import type { PlatformClient } from "@praximations/client";
import { Action, Card, Field, Screen, styles } from "../../components/Screen";
import { useResource } from "../../hooks/useResource";
import { session } from "../../integrations/platform";
import { errorMessage } from "../../state/Workspace";

const load = async (client: PlatformClient, id: string) => ({ ...await client.projects(id), catalog: await client.discovery(id) });
export default function Business() {
  const { data, organization, loading, refresh, error } = useResource(load);
  const [name, setName] = useState(""); const [saving, setSaving] = useState(false); const [failure, setFailure] = useState("");
  return <Screen title="Business" loading={loading} refresh={refresh} error={failure || error}><Text style={styles.text}>Projects shared across your devices.</Text>{data?.catalog.capabilities.some(item => item.id === "business.projects.create") && <><Field accessibilityLabel="Project name" placeholder="Name your next project" value={name} onChangeText={setName} maxLength={160}/><Action title={saving ? "Creating…" : "Create project"} disabled={saving || !name.trim()} onPress={() => { if (!session) return; setSaving(true); setFailure(""); void session.platform.createProject(organization, name).then(() => { setName(""); refresh(); }).catch(error => setFailure(errorMessage(error))).finally(() => setSaving(false)); }}/></>}{data?.projects.map(project => <Card key={project.id} title={project.name} label={project.status} detail={project.description || `${project.priority} priority`}/>)}{data && data.projects.length === 0 && <Text style={styles.text}>No projects here yet.</Text>}</Screen>;
}
