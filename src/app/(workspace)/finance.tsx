import type { PlatformClient } from "@praximations/client";
import { Card, Screen } from "../../components/Screen";
import { useResource } from "../../hooks/useResource";
const load = (client: PlatformClient, id: string) => client.finance(id);
export default function Finance() {
  const { data, loading, refresh, error } = useResource(load);
  return <Screen title="Finance" loading={loading} refresh={refresh} error={error}>{data && <><Card title={String(data.alerts.length)} label="Open financial alerts"/><Card title={String(data.pending_approvals.length)} label="Awaiting approval"/>{data.alerts.map(alert => <Card key={alert.id} title={alert.title || "Financial alert"} label={alert.severity}/>)}</>}</Screen>;
}
