import { useEffect, useState } from "react";
import "./App.css";
import AdminForm from "./components/AdminForm";
import EntriesTable from "./components/EntriesTable";
import { createEntry, fetchEntries, type Entry } from "./api";
import { Alert, Layout, Menu, Spin } from "antd";

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string>("home");

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEntries();
      setEntries(data);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load entries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(title: string, description: string) {
    await createEntry(title, description);
  }

  return (
    <Layout>
      <Layout.Header
        style={{
          position: "fixed",
          top: 0,
          zIndex: 10,
          width: "100%",
          padding: 0,
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeKey]}
          items={[
            { key: "home", label: "Home" },
            { key: "create", label: "Create Entry" },
          ]}
          onClick={({ key }) => setActiveKey(String(key))}
        />
      </Layout.Header>
      <Layout.Content
        style={{ marginTop: 64, padding: 24, minHeight: "calc(100vh - 64px)" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {activeKey === "home" ? (
            <div>
              {loading && <Spin />}
              {error && <Alert type="error" message={error} showIcon />}
              {!loading && !error && <EntriesTable entries={entries} />}
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AdminForm
                onCreated={() => {
                  load();
                  setActiveKey("home");
                }}
                create={handleCreate}
              />
            </div>
          )}
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default App;
