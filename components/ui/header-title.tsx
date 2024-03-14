'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export async function HeaderTitle() {
  return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="link"
            size="default"
            className="w-12 h-12 p-1 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
          >
            <span>綠濾</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>New Question</TooltipContent>
      </Tooltip>
  );
}
