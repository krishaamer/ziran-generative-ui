import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Lottie from "lottie-react";
import easy from "../public/easy.json";
import dragon from "../public/dragon.json";
import carrot from "../public/carrot.json";

export function Sidebar({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  return (
    <div className="relative mx-auto max-w-2xl px-4 mt-10">
      <h2 className="text-xl font-bold text-center">相關問題</h2>
      <Card
        className="ring-1 ring-orange-950 ring-offset-2 mb-4 mt-2 cursor-pointer hover:bg-yellow-300"
        onClick={async () => {
          submitMessage(
            "I'm a consumer of this brand. Should I invest? What factories is this brand produced in? What is the sustainability score? Compare it to other brands."
          );
        }}
      >
        <CardHeader>
          <CardTitle>
            <h2>Shopping</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          Should I buy this brand's products? What factories is this brand
          produced in? What is the sustainability score? Compare it to other
          brands.
          <Lottie
            animationData={easy}
            loop={true}
            className="featureSvg"
            role="img"
          />
        </CardContent>
      </Card>
      <Card
        className="ring-1 ring-orange-950 ring-offset-2 mb-4 mt-2 cursor-pointer hover:bg-yellow-300"
        onClick={async () => {
          submitMessage(
            "I'm a consumer of this brand. Should I invest? What factories is this brand produced in? What is the sustainability score? Compare it to other brands."
          );
        }}
      >
        <CardHeader>
          <CardTitle>
            <h2>Saving</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          What does it brand do to help the environment? What factories is this
          brand produced in? What is the sustainability score? Compare it to
          other brands.
          <Lottie
            animationData={carrot}
            loop={true}
            className="featureSvg"
            role="img"
          />
        </CardContent>
      </Card>
      <Card
        className="ring-1 ring-orange-950 ring-offset-2 cursor-pointer hover:bg-yellow-300"
        onClick={async () => {
          submitMessage(
            "Is this company a B Corporation? What sustainability credentials does it hold to prove sustainability?"
          );
        }}
      >
        <CardHeader>
          <CardTitle>
            <h2>Investing</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          Should I invest in this brand? Is this company a B Corporation? What
          credentials does it hold to prove sustainability?
          <Lottie
            animationData={dragon}
            loop={true}
            className="featureSvg"
            role="img"
          />
        </CardContent>
      </Card>
    </div>
  );
}
