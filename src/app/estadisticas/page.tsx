"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import leagueData from "@/data/league.json" assert { type: "json" };
import LeagueTables from "./LeagueTables";

interface Scorer {
  name: string;
  team: string;
  goals: number;
}

interface Cards {
  name: string;
  team: string;
  yellow: number;
  red: number;
}

interface FixtureMatch {
  date: string;
  time: string;
  home: string;
  away: string;
  field: string;
}

interface LeagueData {
  tablas: any;
  goleadores: {
    masculino: Scorer[];
    femenino: Scorer[];
  };
  tarjetas: {
    masculino: Cards[];
    femenino: Cards[];
  };
  fixture: {
    masculino: FixtureMatch[];
    femenino: FixtureMatch[];
  };
}

type Section = "tabla" | "goleadores" | "tarjetas" | "fixture";

export default function LeaguePage() {
  const [gender, setGender] = useState<"masculino" | "femenino">("masculino");
  const [data, setData] = useState<LeagueData | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("tabla");

  useEffect(() => {
    setData(leagueData as LeagueData);
  }, []);

  if (!data) return <p className="text-center py-10">Loading...</p>;

  const { tablas, goleadores, tarjetas, fixture } = data;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 space-y-4">
      {/* Gender selector */}
      <div className="flex gap-4 justify-center mb-4">
        <Button
          variant={gender === "masculino" ? "default" : "outline"}
          onClick={() => setGender("masculino")}
        >
          Masculino
        </Button>
        <Button
          variant={gender === "femenino" ? "default" : "outline"}
          onClick={() => setGender("femenino")}
        >
          Femenino
        </Button>
      </div>

      {/* Section selector */}
      <div className="flex justify-center gap-4 mb-4">
        {["tabla", "goleadores", "tarjetas", "fixture"].map((sec) => (
          <Button
            key={sec}
            variant={activeSection === sec ? "default" : "outline"}
            onClick={() => setActiveSection(sec as Section)}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </Button>
        ))}
      </div>

      {/* TABLES */}
      {activeSection === "tabla" && (
        <LeagueTables tablas={tablas} gender={gender} />
      )}

      {/* GOLEADORES */}
      {activeSection === "goleadores" && (
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Top 5 Goleadores</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jugador</TableHead>
                  <TableHead>Equipo</TableHead>
                  <TableHead className="text-center">Goles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goleadores[gender].map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.team}</TableCell>
                    <TableCell className="font-semibold text-center">
                      {p.goals}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* CARDS */}
      {activeSection === "tarjetas" && (
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Tarjetas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jugador</TableHead>
                  <TableHead>Equipo</TableHead>
                  <TableHead className="text-center">Amarilla</TableHead>
                  <TableHead className="text-center">Roja</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tarjetas[gender].map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.team}</TableCell>
                    <TableCell className="text-yellow-600 text-center font-semibold">
                      {p.yellow}
                    </TableCell>
                    <TableCell className="text-red-600 text-center font-semibold">
                      {p.red}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* FIXTURE */}
      {activeSection === "fixture" && (
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Próximos partidos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Fecha</TableHead>
                  <TableHead className="text-center">Hora</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Visitante</TableHead>
                  <TableHead className="text-center">Cancha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fixture[gender].map((m, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-center">{m.date}</TableCell>
                    <TableCell className="text-center">{m.time}</TableCell>
                    <TableCell>{m.home}</TableCell>
                    <TableCell>{m.away}</TableCell>
                    <TableCell className="text-center">{m.field}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
