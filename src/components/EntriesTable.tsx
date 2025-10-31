import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Entry } from "../api";

const columns: ColumnsType<Entry> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (value: Entry["description"]) => value ?? "",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
    render: (value: string) => new Date(value).toLocaleString(),
  },
];

export default function EntriesTable({
  entries,
}: Readonly<{ entries: Entry[] }>) {
  return (
    <Card
      title="Entries"
      styles={{
        header: {
          background: "#1f2937",
          color: "#e5e7eb",
          borderBottom: "1px solid #334155",
        },
      }}
    >
      <Table<Entry>
        bordered
        columns={columns}
        dataSource={entries}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: "No entries yet." }}
        // style={{ background: "#1f2937", color: "#e5e7eb" }}
      />
    </Card>
  );
}
