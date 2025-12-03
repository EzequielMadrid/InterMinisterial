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
import leagueData from "@/data/league.json";
import { PlayoffsBracket } from "./PlayoffsBracket";

interface LeagueData {
  tablas: Record<
    string,
    { team: string; pts: number; pj: number; gf: number; gc: number }[]
  >;
  goleadores: Record<string, { name: string; team: string; goals: number }[]>;
  tarjetas: Record<
    string,
    { name: string; team: string; yellow: number; red: number }[]
  >;
  fixture: Record<
    string,
    { date: string; time: string; home: string; away: string; field: string }[]
  >;
}

type Section = "tabla" | "goleadores" | "tarjetas" | "fixture";

export default function LeaguePage() {
  const [gender, setGender] = useState<"masculino" | "femenino">("masculino");
  const [data, setData] = useState<LeagueData | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("tabla");

  useEffect(() => {
    setData(leagueData);
  }, []);

  if (!data) return <p className="text-center py-10">Cargando datos...</p>;

  const { tablas, goleadores, tarjetas, fixture } = data;

  // Compute goal difference
  const tablasConDG = tablas[gender].map((t) => ({
    ...t,
    dg: t.gf - t.gc,
  }));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 space-y-4">
      {/* Gender selector */}
      <div className="flex gap-4 justify-center mb-4">
        <Button
          variant={gender === "masculino" ? "default" : "outline"}
          onClick={() => setGender("masculino")}
          className="md:text-lg text-md"
        >
          Masculino
        </Button>
        <Button
          variant={gender === "femenino" ? "default" : "outline"}
          onClick={() => setGender("femenino")}
          className="md:text-lg text-md"
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

      <div className="h-screen">
        {/* Tabla anual */}
        {activeSection === "tabla" && (
          <Card className="h-fit">
            <CardContent>
              <CardHeader>
                <CardTitle>Tabla Anual</CardTitle>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipo</TableHead>
                    <TableHead className="text-center">Puntos</TableHead>
                    <TableHead className="text-center">PJ</TableHead>
                    <TableHead className="text-center">GF</TableHead>
                    <TableHead className="text-center">GC</TableHead>
                    <TableHead className="text-center">DG</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tablasConDG
                    .slice()
                    .sort((a, b) => {
                      if (b.pts !== a.pts) return b.pts - a.pts;
                      return b.dg - a.dg;
                    })
                    .map((t, i) => (
                      <TableRow key={i}>
                        <TableCell>{t.team}</TableCell>
                        <TableCell className="text-center">{t.pts}</TableCell>
                        <TableCell className="text-center">{t.pj}</TableCell>
                        <TableCell className="text-center">{t.gf}</TableCell>
                        <TableCell className="text-center">{t.gc}</TableCell>
                        <TableCell className="text-center font-semibold">
                          {t.dg}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>

            {/* Separator */}
            <div className="my-6 border-t border-slate-300" />

            {/* Playoffs */}
            <CardContent>
              <PlayoffsBracket teams={tablasConDG} />
            </CardContent>
          </Card>
        )}

        {/* Goleadores */}
        {activeSection === "goleadores" && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Edición 2025</CardTitle>
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

        {/* Tarjetas */}
        {activeSection === "tarjetas" && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Edición 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jugador</TableHead>
                    <TableHead>Equipo</TableHead>
                    <TableHead className="text-center">Amarillas</TableHead>
                    <TableHead className="text-center">Rojas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tarjetas[gender].map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.team}</TableCell>
                      <TableCell className="text-yellow-600 font-semibold text-center">
                        {p.yellow}
                      </TableCell>
                      <TableCell className="text-red-600 font-semibold text-center">
                        {p.red}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Fixture */}
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
    </div>
  );
}
