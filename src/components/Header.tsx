"use client";

import { useDebouncedCallback } from "use-debounce";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function Header({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const queryClient = useQueryClient();

  const onSearchLocations = useDebouncedCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["locations"] });
  }, 300);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    queryClient.invalidateQueries({ queryKey: ["locations"] });
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Weather Dashboard</h1>
        <form onSubmit={handleSearch} className="flex items-center">
          <Input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearchLocations();
            }}
            className="mr-2"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </header>
  );
}
