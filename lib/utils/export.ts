export interface ExportableMessage {
  role: string;
  content: string;
  createdAt: Date | string;
}

export interface ExportableConversation {
  id: string;
  title: string;
  model: string;
  createdAt: Date | string;
  messages: ExportableMessage[];
}

export function exportToMarkdown(conv: ExportableConversation): string {
  let md = `# ${conv.title}\n\n`;
  md += `*Exported from Mindora — ${new Date().toLocaleString()}*\n`;
  md += `*Model: ${conv.model}*\n\n---\n\n`;

  for (const msg of conv.messages) {
    const roleName = msg.role === "user" ? "👤 User" : "✨ Mindora";
    const time = new Date(msg.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    md += `### ${roleName} (${time})\n\n${msg.content}\n\n---\n\n`;
  }

  return md;
}

export function exportToJson(conv: ExportableConversation): string {
  return JSON.stringify(
    {
      app: "Mindora",
      version: "1.0",
      exportedAt: new Date().toISOString(),
      conversation: conv,
    },
    null,
    2
  );
}

export function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
