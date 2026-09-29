import { useCallback, useEffect, useState } from "react";
import { session } from "../integrations/platform";
import { errorMessage, useWorkspace } from "../state/Workspace";
import type { PlatformClient } from "@praximations/client";

export function useResource<T>(load: (client: PlatformClient, organization: string) => Promise<T>) {
  const { organization } = useWorkspace();
  const [result, setResult] = useState<{ organization: string; revision: number; data: T | null; error: string } | null>(null);
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => setRevision(value => value + 1), []);
  useEffect(() => {
    let active = true;
    if (organization && session) void load(session.platform, organization).then(data => { if (active) setResult({ organization, revision, data, error: "" }); }).catch(error => { if (active) setResult({ organization, revision, data: null, error: errorMessage(error) }); });
    return () => { active = false; };
  }, [organization, revision, load]);
  const current = result?.organization === organization && result?.revision === revision ? result : null;
  return { data: current?.data ?? null, error: current?.error ?? "", loading: Boolean(organization && session && !current), refresh, organization };
}
