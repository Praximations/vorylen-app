import type { PlatformClient } from "@praximations/client";
import { Text } from "react-native";
import { Card, Screen, styles } from "../../components/Screen";
import { useResource } from "../../hooks/useResource";
const load = (client: PlatformClient, id: string) => client.devProjects(id);
export default function Dev() { const { data, loading, refresh, error } = useResource(load); return <Screen title="Dev" loading={loading} refresh={refresh} error={error}>{data?.projects.map(project => <Card key={project.id} title={project.name} label="Development"/>)}{data && data.projects.length === 0 && <Text style={styles.text}>No development projects yet.</Text>}</Screen>; }
