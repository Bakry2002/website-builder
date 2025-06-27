import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/stores/use-builder-store";
import { MonitorIcon, SmartphoneIcon, TabletIcon } from "lucide-react";

export const DeviceSwitcher = () => {
  const { deviceScreen, setDeviceScreen } = useBuilderStore();

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className={cn(
                "rounded-full",
                deviceScreen === "monitor" &&
                  "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:text-white"
              )}
              variant="outline"
              onClick={() => setDeviceScreen("monitor")}
            >
              <MonitorIcon className="w-4 h-4  " />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Monitor Screen</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className={cn(
                "rounded-full",
                deviceScreen === "tablet" &&
                  "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:text-white"
              )}
              variant="outline"
              onClick={() => setDeviceScreen("tablet")}
            >
              <TabletIcon className="w-4 h-4  " />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Tablet Screen</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className={cn(
                "rounded-full",
                deviceScreen === "mobile" &&
                  "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:text-white"
              )}
              variant="outline"
              onClick={() => setDeviceScreen("mobile")}
            >
              <SmartphoneIcon className="w-4 h-4  " />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mobile Screen</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
