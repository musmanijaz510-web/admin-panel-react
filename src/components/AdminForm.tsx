import { useState } from "react";
import { Card, Form, Input, Button, Alert } from "antd";

export type AdminFormProps = {
  readonly onCreated: () => void;
  readonly create: (title: string, description: string) => Promise<void>;
};

type FormValues = {
  title: string;
  description?: string;
};

export default function AdminForm({ onCreated, create }: AdminFormProps) {
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFinish(values: FormValues) {
    setError(null);
    try {
      setSubmitting(true);
      await create(values.title.trim(), values.description ?? "");
      form.resetFields();
      onCreated();
    } catch (err: any) {
      setError(err?.message ?? "Failed to create");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card
      title="Add Entry"
      style={{
        maxWidth: 700,
        width: "100%",
      }}
      styles={{
        header: {
          background: "#1f2937",
          color: "#e5e7eb",
          borderBottom: "1px solid #334155",
        },
      }}
    >
      <Form<FormValues>
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ title: "", description: "" }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter description" rows={4} />
        </Form.Item>

        {error && (
          <Form.Item>
            <Alert type="error" message={error} showIcon />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitting}>
            Add Entry
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
