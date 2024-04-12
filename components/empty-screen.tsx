import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import High from "@/components/llm-polygon";
import Personal from "@/components/llm-personal";
import TabBar from "./tab-bar";

const brands = [
  "3m",
  "canon",
  "csd",
  "debuyer",
  "lanew",
  "loreal",
  "nikon",
  "olympus",
  "panasonic",
  "pentax",
  "philips",
  "sony",
];

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <Avatar className="ring-1 ring-offset-2 ring-amber-950">
        <AvatarImage src="/images/avatar-2.jpg" alt="AI" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <Personal />
      </div>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <High />
      </div>
      <div className="rounded-lg border bg-background p-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {brands.map((brand, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="h-auto p-1 text-base shadow-sm border border-slate-100 grow md:grow-0 text-center"
              onClick={async () => {
                submitMessage(
                  `How sustainable is the ${brand} brand? What are some more sustainable alternatives?`
                );
              }}
            >
              <img src={`/brands/${brand}.jpg`} />
            </Button>
          ))}
        </div>
      </div>
      <TabBar submitMessage={submitMessage} />
    </div>
  );
}
