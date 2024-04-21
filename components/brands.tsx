import { Button } from "@/components/ui/button";

const brandQuestions = [
  {
    heading: "What do the brands I buy say about me?",
    message:
      "What do the brands I buy say about me? Make a table listing my personality traits relating to these products.",
  },
  {
    heading: "How sustainable are the brands I buy?",
    message: "How sustainable are the brands I buy? Make a table.",
  },
  {
    heading: "Show me my digital product passports",
    message: "List all the products I bought. Make a table and show me my digital product passports.",
  },
  {
    heading: "Where did the products I bought come from?",
    message: "Where did the products I bought come from?",
  },
];

export default function Brands({
  submitMessage,
  brandsData
}: {
  submitMessage: (message: string) => void;
  brandsData: any[];
}) {
  return (
    <div>
      <h2 className="font-bold pb-4 pt-2 text-xl text-center">
        上個月你購買了這些品牌的產品
      </h2>
      <div className="flex flex-wrap gap-2">
        {brandsData.map((brand, idx) => (
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
            <img src={`/brands/${brand}.jpg`} alt={`${brand} brand`} />
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {brandQuestions.map((msg, index) => (
          <Button
            key={index}
            variant="ghost"
            className="h-auto p-1 text-base shadow-sm border border-slate-100 grow md:grow-0 text-center"
            onClick={async () => {
              submitMessage(msg.message);
            }}
          >
            {msg.heading}
          </Button>
        ))}
      </div>
    </div>
  );
}
