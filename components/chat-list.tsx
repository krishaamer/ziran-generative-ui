import Origin from "@/components/origin";

export function ChatList({ messages }: { messages: any[] }) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      <Origin />
      {messages.map((message, index) => (
        <div key={index}>{message.display}</div>
      ))}
    </div>
  );
}
