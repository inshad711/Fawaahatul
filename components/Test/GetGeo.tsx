"use client";
import { useEffect, useState } from "react";

export default function LocationTest() {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => setLocation(data));
  }, []);

  return (
    <div>
      {location ? (
        <p>
          You are in {location.city}, {location.region}, {location.country}
        </p>
      ) : (
        <p>Detecting location...</p>
      )}
    </div>
  );
}
