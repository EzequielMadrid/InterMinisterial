import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CloudSunRain } from "lucide-react";

export const revalidate = 1800; // 30 minutes

// Nearby cities with coordinates
const cities = [
  { name: "Neuquén", lat: -38.9516, lon: -68.0591 },
  { name: "Cipolletti", lat: -38.9332, lon: -67.9903 },
  { name: "Plottier", lat: -38.9673, lon: -68.233 },
  { name: "Centenario", lat: -38.8304, lon: -68.12 },
];

// ***** Open-Meteo API *****
async function getWeather(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url, { next: { revalidate: 1800 } });
  return res.json();
}

export default async function Weather({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  // Fetch all cities weather simultaneously
  const data = await Promise.all(
    cities.map(async (city) => {
      const w = await getWeather(city.lat, city.lon);
      return {
        name: city.name,
        temp: w.current_weather?.temperature ?? "--",
        wind: w.current_weather?.windspeed ?? "--",
      };
    })
  );

  return (
    <Card
      className={
        variant === "mobile"
          ? "rounded-xl border bg-card p-3 shadow-none"
          : "rounded-2xl shadow-md"
      }
    >
      <CardHeader
        className={
          variant === "mobile"
            ? "flex items-center justify-start mb-2 py-0"
            : "flex items-center justify-center mb-4"
        }
      >
        <CloudSunRain
          className={
            variant === "mobile"
              ? "w-6 h-6 text-slate-200"
              : "w-8 h-8 text-slate-300"
          }
        />
      </CardHeader>
      {/* MOBILE VERSION — horizontal carousel */}
      {variant === "mobile" ? (
        <CardContent className="overflow-x-auto apple-scrollbar">
          <div className="flex gap-4">
            {data.map((c) => (
              <div
                key={c.name}
                className="min-w-[140px] flex flex-col items-center border p-2 rounded-lg text-center"
              >
                <span className="font-medium text-sm">{c.name}</span>
                <div className="flex flex-col items-center mt-1 leading-tight text-muted-foreground">
                  <span className="text-lg font-semibold font-mono">
                    {c.temp}°
                  </span>
                  <span className="text-xs font-mono">{c.wind} km/h</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      ) : (
        <CardContent className="space-y-2">
          {data.map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between border-b last:border-none pb-2 last:pb-0"
            >
              <span className="font-medium text-sm">{c.name}</span>
              <div className="flex flex-col items-end leading-tight text-muted-foreground">
                <span className="text-base font-semibold font-mono">
                  {c.temp}°
                </span>
                <span className="text-xs font-mono">{c.wind} km/h</span>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
