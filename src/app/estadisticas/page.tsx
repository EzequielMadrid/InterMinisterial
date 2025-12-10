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

interface FixtureMatch {
  date: string;
  time: string;
  home: string;
  away: string;
  field: string;
  score?: string;
}

interface LeagueData {
  tablas: any;
  goleadores: {
    masculino: Scorer[];
    femenino: Scorer[];
  };
  fixture: {
    masculino: FixtureMatch[];
    femenino: FixtureMatch[];
  };
}

type Section = "tabla" | "goleadores" | "fixture";

export default function LeaguePage() {
  const [gender, setGender] = useState<"masculino" | "femenino">("masculino");
  const [data, setData] = useState<LeagueData | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("tabla");
  const [showScrollModal, setShowScrollModal] = useState(false);

  useEffect(() => {
    setData(leagueData as LeagueData);
  }, []);

  useEffect(() => {
    if (activeSection === "tabla") setShowScrollModal(true);
  }, [activeSection]);

  if (!data) return <p className="text-center py-10">Loading...</p>;

  const { tablas, goleadores, fixture } = data;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 space-y-4">
      {showScrollModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] animate-in fade-in duration-300">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 w-[90%] max-w-md animate-in zoom-in duration-300">
            <h2 className="text-xl font-bold text-center mb-2">
              👀 No te pierdas los Playoffs
            </h2>
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-300 mb-4">
              Desplázate hasta el final de la tabla para ver el cuadro de
              playoffs.
            </p>
            <Button
              className="w-full mt-2"
              onClick={() => setShowScrollModal(false)}
            >
              Ir
            </Button>
          </div>
        </div>
      )}

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

      <div className="flex justify-center gap-4 mb-4">
        {["tabla", "goleadores", "fixture"].map((sec) => (
          <Button
            key={sec}
            variant={activeSection === sec ? "default" : "outline"}
            onClick={() => setActiveSection(sec as Section)}
          >
            {sec.charAt(0).toUpperCase() + sec.slice(1)}
          </Button>
        ))}
      </div>

      {activeSection === "tabla" && (
        <LeagueTables tablas={tablas} gender={gender} />
      )}

      {activeSection === "goleadores" && (
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>
              Top 5 {gender === "femenino" ? "Goleadoras" : "Goleadores"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {gender === "femenino" ? "Jugadora" : "Jugador"}
                  </TableHead>
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
                  <TableHead className="text-center">Resultado</TableHead>
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
                    <TableCell className="text-center">
                      {m.score ?? "-"}
                    </TableCell>
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
