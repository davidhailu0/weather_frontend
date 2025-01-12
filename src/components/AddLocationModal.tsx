"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLocation, searchOpenWeatherMap } from "@/services/locationService";
import { useDebouncedCallback } from "use-debounce";

export default function AddLocationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();
  const [locationName, setLocationName] = useState<string>("");
  const [location, setLocation] = useState({
    id: 0,
    coordinates: {
      lat: 0,
      lon: 0,
    },
    nickname: "",
    notes: "",
  });
  const { mutate: addLocationFN } = useMutation({
    mutationKey: ["addLocation"],
    mutationFn: addLocation,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      setLocationName("");
      setLocation({
        id: 0,
        coordinates: {
          lat: 0,
          lon: 0,
        },
        nickname: "",
        notes: "",
      });
    },
  });

  const handleUserInput = (query: string) => {
    setLocationName(query);
    setError(false);
    if (Boolean(query) && query.length > 2) {
      handleSearch(query);
    }
  };

  const handleSearch = useDebouncedCallback(async (query: string) => {
    const response = await searchOpenWeatherMap(query);
    if (response === "404") {
      setError(true);
    } else {
      setLocation({
        ...location,
        id: response.id,
        coordinates: {
          lat: response.coord.lat,
          lon: response.coord.lon,
        },
      });
    }
  }, 300);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    addLocationFN({ ...location, name: locationName });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4">Add New Location</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid col-span-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="locationName">Location Name</Label>
            <Input
              id="locationName"
              value={locationName}
              onChange={(e) => handleUserInput(e.target.value)}
              placeholder="Enter city name"
            />
            {error && (
              <p className="text-red-500 text-sm">
                Please Enter the City Name Correctly. {locationName} does not
                exist.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="locationName">Nick Name</Label>
            <Input
              id="locationName"
              value={location.nickname}
              onChange={(e) =>
                setLocation({ ...location, nickname: e.target.value })
              }
              placeholder="Enter nickname"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="locationCoordinates">Coordinates</Label>
            <Input
              id="locationCoordinates"
              value={location.coordinates.lat + ", " + location.coordinates.lon}
              onChange={(e) =>
                setLocation({
                  ...location,
                  coordinates: {
                    lat: parseFloat(e.target.value.split(",")[0]),
                    lon: parseFloat(e.target.value.split(",")[1]),
                  },
                })
              }
              placeholder="Enter coordinates"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="locationNotes">Notes</Label>
            <Textarea
              id="locationNotes"
              value={location.notes}
              onChange={(e) =>
                setLocation({ ...location, notes: e.target.value })
              }
              placeholder="Enter notes"
            />
          </div>
          <Button type="submit">Add Location</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
