import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Locations } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLocation } from "@/services/locationService";
interface WeatherCardProps {
  location: Locations;
}

export default function WeatherCard({ location }: WeatherCardProps) {
  const queryClient = useQueryClient();
  const { mutate: deleteLocationFN } = useMutation({
    mutationKey: ["deleteLocation"],
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{location.name}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteLocationFN(location.id!)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{location.temperature}°F</div>
        <p className="text-xs text-muted-foreground">{location.condition}</p>
      </CardContent>
    </Card>
  );
}
