import { useState } from "react";
import type { PlatformClient } from "@praximations/client";
import { Action, Card, Screen } from "../../components/Screen";
import { useResource } from "../../hooks/useResource";
import { session } from "../../integrations/platform";
import { errorMessage } from "../../state/Workspace";
const load = (client: PlatformClient, id: string) => client.discovery(id);
export default function Systems() {
  const { data, loading, refresh, error } = useResource(load); const [failure, setFailure] = useState("");
  return <Screen title="Systems" loading={loading} refresh={refresh} error={failure || error}>{data?.systems.map(system => <Card key={system.id} title={system.id} label={system.kind} detail={system.state}/>)}{data?.capabilities.map(capability => <Card key={capability.id} title={capability.id} label="Available capability" detail={capability.description}/>)}<Action title="Sign out" onPress={() => { void session?.auth.auth.signOut().then(({ error }) => { if (error) throw error; }).catch(error => setFailure(errorMessage(error))); }}/></Screen>;
}
