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

export default function TorneoPage() {
  const [gender, setGender] = useState<"masculino" | "femenino">("masculino");
  const [data, setData] = useState<LeagueData | null>(null);

  useEffect(() => {
    fetch("/data/league.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((e) => console.error("Error cargando JSON:", e));
  }, []);

  if (!data) return <p className="text-center py-10">Cargando datos...</p>;

  const { tablas, goleadores, tarjetas, fixture } = data;

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 space-y-10">
      {/* BOTONES MASC / FEM */}
      <div className="flex gap-4 justify-center">
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

      {/* TABLA DE POSICIONES */}
      <Card>
        <CardHeader>
          <CardTitle>Tabla de posiciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipo</TableHead>
                <TableHead className="text-center">Puntos</TableHead>
                <TableHead className="text-center">PJ</TableHead>
                <TableHead className="text-center">GF</TableHead>
                <TableHead className="text-center">GC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tablas[gender].map((t, i) => (
                <TableRow key={i}>
                  <TableCell>{t.team}</TableCell>
                  <TableCell className="text-center">{t.pts}</TableCell>
                  <TableCell className="text-center">{t.pj}</TableCell>
                  <TableCell className="text-center">{t.gf}</TableCell>
                  <TableCell className="text-center">{t.gc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* GOLEADORES */}
      <Card>
        <CardHeader>
          <CardTitle>Goleadores</CardTitle>
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

      {/* TARJETAS */}
      <Card>
        <CardHeader>
          <CardTitle>Tarjetas</CardTitle>
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

      {/* FIXTURE */}
      <Card>
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
    </div>
  );
}
