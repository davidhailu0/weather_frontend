"use client";
import Header from "@/components/Header";
import WeatherGrid from "@/components/WeatherGrid";
import AddLocationModal from "@/components/AddLocationModal";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="min-h-screen bg-gray-100">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Weather Dashboard</h1>
        <WeatherGrid city={searchQuery} />
        <AddLocationModal />
      </main>
    </div>
  );
}
