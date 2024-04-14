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
            "我應該買這個品牌的產品嗎？ 這個品牌的產品是在哪些工廠製造的？這個品牌的可持續性評分是多少？ 與其他品牌比較一下～～"
          );
        }}
      >
        <CardHeader>
          <CardTitle>
            <Lottie
              animationData={easy}
              loop={true}
              className="tinySvg"
              role="img"
            />
            <h2>購物主題</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          我應該買這個品牌的產品嗎？ 這個品牌的產品是在哪些工廠製造的？
          這個品牌的可持續性評分是多少？ 與其他品牌比較一下～～
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
          <Lottie
            animationData={carrot}
            loop={true}
            className="tinySvg"
            role="img"
          />
          <CardTitle>
            <h2>存錢主題</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          What does it brand do to help the environment? What factories is this
          brand produced in? What is the sustainability score? Compare it to
          other brands.
        </CardContent>
      </Card>
      <Lottie
        animationData={dragon}
        loop={true}
        className="tinySvg"
        role="img"
      />
      <Card
        className="ring-1 ring-orange-950 ring-offset-2 cursor-pointer hover:bg-yellow-200"
        onClick={async () => {
          submitMessage(
            "Is this company a B Corporation? What sustainability credentials does it hold to prove sustainability?"
          );
        }}
      >
        <CardHeader>
          <CardTitle>
            <h2>投資主題</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          Should I invest in this brand? Is this company a B Corporation? What
          credentials does it hold to prove sustainability?
        </CardContent>
      </Card>
    </div>
  );
}
