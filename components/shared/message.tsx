'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from '@/lib/utils';

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start md:ml-12">
      <Card className="mb-4 py-2 outline outline-offset-2 outline-orange-950 bg-green-200	">
        <CardContent>
          <div className="flex-1 space-y-2 overflow-hidden px-1">
            {children}
          </div>
        </CardContent>
      </Card>
      <Avatar className="outline outline-offset-2 outline-amber-950">
        <AvatarImage
          src="https://github.com/krishaamer.png"
          alt="@krishaamer"
        />
        <AvatarFallback>KH</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function BotMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("group relative flex items-start md:-ml-12", className)}>
      <Avatar className="outline outline-offset-2 outline-amber-950">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Card className="py-2 outline outline-offset-2 outline-orange-950 bg-amber-200	">
        <CardContent>
          <div className="flex-1 space-y-2 overflow-hidden px-1">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg border bg-primary text-primary-foreground",
          !showAvatar && "invisible"
        )}
      >
        <Avatar className="outline outline-offset-2 outline-orange-950">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Card className="py-2 outline outline-offset-2 outline-orange-950 bg-amber-200	">
        <CardContent>
          <div className="flex-1 px-1">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial px-2 py-2'}>{children}</div>
    </div>
  );
}
