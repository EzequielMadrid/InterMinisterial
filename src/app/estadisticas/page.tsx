"use client";

import { useState } from "react";
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

export default function TorneoPage() {
  const [gender, setGender] = useState<"masculino" | "femenino">("masculino");

  // -------------------------
  // DATOS LOCALES
  // -------------------------

  const tablas = {
    masculino: [
      { team: "Tiburones", pts: 18, pj: 7, gf: 15, gc: 6 },
      { team: "Leones", pts: 14, pj: 7, gf: 10, gc: 7 },
    ],
    femenino: [
      { team: "Águilas", pts: 20, pj: 8, gf: 22, gc: 4 },
      { team: "Panteras", pts: 15, pj: 8, gf: 12, gc: 9 },
    ],
  };

  const goleadores = {
    masculino: [
      { name: "Juan Pérez", team: "Tiburones", goals: 12 },
      { name: "Carlos Díaz", team: "Leones", goals: 9 },
    ],
    femenino: [
      { name: "Laura Gómez", team: "Águilas", goals: 14 },
      { name: "Valentina Ríos", team: "Panteras", goals: 7 },
    ],
  };

  const tarjetas = {
    masculino: [
      { name: "Martín López", team: "Águilas", yellow: 3, red: 1 },
      { name: "Diego Romero", team: "Tiburones", yellow: 2, red: 0 },
    ],
    femenino: [
      { name: "Sofía Torres", team: "Águilas", yellow: 2, red: 0 },
      { name: "Carla Medina", team: "Panteras", yellow: 1, red: 1 },
    ],
  };

  const fixture = {
    masculino: [
      {
        date: "2025-02-10",
        time: "18:00",
        home: "Tiburones",
        away: "Leones",
        field: "Cancha 1",
      },
      {
        date: "2025-02-12",
        time: "20:00",
        home: "Águilas",
        away: "Titanes",
        field: "Cancha 2",
      },
    ],
    femenino: [
      {
        date: "2025-02-11",
        time: "17:00",
        home: "Águilas",
        away: "Panteras",
        field: "Cancha 1",
      },
      {
        date: "2025-02-13",
        time: "19:30",
        home: "Fénix",
        away: "Águilas",
        field: "Cancha 3",
      },
    ],
  };

  // -------------------------
  // MAIN UI
  // -------------------------

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
                <TableHead>Puntos</TableHead>
                <TableHead>PJ</TableHead>
                <TableHead>GF</TableHead>
                <TableHead>GC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tablas[gender].map((t, i) => (
                <TableRow key={i}>
                  <TableCell>{t.team}</TableCell>
                  <TableCell>{t.pts}</TableCell>
                  <TableCell>{t.pj}</TableCell>
                  <TableCell>{t.gf}</TableCell>
                  <TableCell>{t.gc}</TableCell>
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
                <TableHead>Goles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goleadores[gender].map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.team}</TableCell>
                  <TableCell className="font-semibold">{p.goals}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AMARILLAS / EXPULSADOS */}
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
                <TableHead>Amarillas</TableHead>
                <TableHead>Rojas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tarjetas[gender].map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.team}</TableCell>
                  <TableCell className="text-yellow-600 font-semibold">
                    {p.yellow}
                  </TableCell>
                  <TableCell className="text-red-600 font-semibold">
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
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Visitante</TableHead>
                <TableHead>Cancha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fixture[gender].map((m, i) => (
                <TableRow key={i}>
                  <TableCell>{m.date}</TableCell>
                  <TableCell>{m.time}</TableCell>
                  <TableCell>{m.home}</TableCell>
                  <TableCell>{m.away}</TableCell>
                  <TableCell>{m.field}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
