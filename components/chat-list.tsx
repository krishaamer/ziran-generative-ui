import Origin from "@/components/origin";

export function ChatList({ messages }: { messages: any[] }) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      <div className="rounded-xl text-card-foreground border p-2 mt-2 mb-6">
        <Origin />
      </div>
      {messages.map((message, index) => (
        <div key={index}>{message.display}</div>
      ))}
    </div>
  );
}
