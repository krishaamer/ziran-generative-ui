import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Sidebar() {
  return (
    <div className="relative mx-auto max-w-2xl px-4 mt-10">
      <h2 className="text-xl font-bold">Related Questions:</h2>
      <Card className="ring-1 ring-orange-950 ring-offset-2 mb-4 mt-2">
        <CardHeader>
          <CardTitle>
            <h2>I'm a consumer of Brand. Should I invest?</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          This brand is produced in factories A, B, C. Sust score D. Compare to
          Brand YXZ.
        </CardContent>
      </Card>
      <h2 className="text-xl font-bold">Brand Credentials:</h2>
      <Card className="ring-1 ring-orange-950 ring-offset-2">
        <CardHeader>
          <CardTitle>
            <h2>B Corporation</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>This brand is not a B Corporation</CardContent>
      </Card>
    </div>
  );
}
