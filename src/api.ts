export type Entry = {
  id: string;
  title: string;
  description: string | null;
  timestamp: string;
};

const FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL as
  | string
  | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as
  | string
  | undefined;

function getFunctionUrl(): string {
  if (!FUNCTION_URL) {
    throw new Error("VITE_SUPABASE_FUNCTION_URL is not set");
  }
  return FUNCTION_URL;
}

function getAuthHeaders(): HeadersInit {
  if (!SUPABASE_ANON_KEY) {
    throw new Error("VITE_SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return {
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    apikey: SUPABASE_ANON_KEY,
  };
}

export async function fetchEntries(): Promise<Entry[]> {
  const res = await fetch(getFunctionUrl(), {
    method: "GET",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
  });
  if (!res.ok) throw new Error(`Failed to fetch entries: ${res.status}`);
  const json = await res.json();
  return json.data ?? [];
}

export async function createEntry(
  title: string,
  description: string
): Promise<Entry> {
  const res = await fetch(getFunctionUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`Failed to create entry: ${res.status} ${err}`);
  }
  const json = await res.json();
  return json.data;
}
