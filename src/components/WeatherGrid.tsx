"use client";

import { useQuery } from "@tanstack/react-query";
import WeatherCard from "./WeatherCard";
import { searchLocation } from "@/services/locationService";
import { Locations } from "@/lib/types";

export default function WeatherGrid({ city }: { city: string }) {
  const { data: locationsData } = useQuery<Locations[]>({
    queryKey: ["locations"],
    queryFn: () => searchLocation(city),
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {locationsData?.map((location) => (
        <WeatherCard key={location.id} location={location} />
      ))}
    </div>
  );
}
