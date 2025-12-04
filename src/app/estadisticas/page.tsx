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
import { PlayoffsBracket } from "./PlayoffsBracket";

interface Team {
  team: string;
  pts: number;
  pj: number;
  gf: number;
  gc: number;
  dg: number;
}

interface TablesByGroup {
  [group: string]: Team[];
}

interface TablesByGender {
  masculino: TablesByGroup;
  femenino: TablesByGroup;
}

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
  tablas: TablesByGender;
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

interface TeamData {
  team: string;
  pts: number;
  pj: number;
  gf: number;
  gc: number;
  dg: number;
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

  // Add goal difference
  // Add goal difference and unify all group teams
  const tablesWithDiff = Object.values(tablas[gender])
    .flat()
    .map((t) => ({
      ...t,
      dg: t.gf - t.gc,
    }));

  // Group generator
  const generateGroups = (teams: TeamData[], size: number) => {
    return Array.from({ length: Math.ceil(teams.length / size) }, (_, i) =>
      teams.slice(i * size, i * size + size)
    );
  };

  // Groups
  const groups =
    gender === "masculino"
      ? generateGroups(tablesWithDiff, 4) // 3 groups of 4
      : generateGroups(tablesWithDiff, 4).slice(0, 2); // 2 groups of 4 (fem)

  // Sort teams inside each group
  const sortedGroups = groups.map((g) =>
    g.sort((a, b) => (b.pts !== a.pts ? b.pts - a.pts : b.dg - a.dg))
  );

  // Best 3rd for men
  let bestThirds: string[] = [];

  if (gender === "masculino") {
    const thirds = sortedGroups.map((g) => g[2]);
    bestThirds = thirds
      .sort((a, b) => (b.pts !== a.pts ? b.pts - a.pts : b.dg - a.dg))
      .slice(0, 2)
      .map((t) => t.team);
  }

  // Color helper
  const getRowColor = (index: number, team: string) => {
    if (index === 0 || index === 1) return "bg-green-950"; // Top 2
    if (gender === "masculino" && index === 2 && bestThirds.includes(team))
      return "bg-violet-950"; // Best 3rd
    return "";
  };

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

      <div>
        {/* Groups table */}
        {activeSection === "tabla" && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>
                {gender === "masculino"
                  ? "Grupos (Hombres)"
                  : "Grupos (Mujeres)"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              {sortedGroups.map((group, idx) => (
                <div key={idx} className="space-y-3 w-full">
                  <h2 className="font-semibold text-lg">
                    Zona {String.fromCharCode(65 + idx)}
                  </h2>

                  <Table className="">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-40">Equipo</TableHead>
                        <TableHead className="w-12 text-center">Pts</TableHead>
                        <TableHead className="w-12 text-center">PJ</TableHead>
                        <TableHead className="w-12 text-center">GF</TableHead>
                        <TableHead className="w-12 text-center">GC</TableHead>
                        <TableHead className="w-12 text-center">DG</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {group.map((t, i) => (
                        <TableRow
                          key={i}
                          className={`${getRowColor(i, t.team)} h-10`}
                        >
                          <TableCell className="w-40">{t.team}</TableCell>
                          <TableCell className="w-12 text-center">
                            {t.pts}
                          </TableCell>
                          <TableCell className="w-12 text-center">
                            {t.pj}
                          </TableCell>
                          <TableCell className="w-12 text-center">
                            {t.gf}
                          </TableCell>
                          <TableCell className="w-12 text-center">
                            {t.gc}
                          </TableCell>
                          <TableCell className="w-12 text-center font-semibold">
                            {t.dg}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>

            {/* === Annual table (COMMENTED FOR FUTURE EDITIONS) === */}
            {/*
            <CardContent>
              <CardHeader><CardTitle>Annual Table (Disabled)</CardTitle></CardHeader>
              <Table> ... your old annual table code ... </Table>
            </CardContent>
            */}

            {/* Separator */}
            <div className="my-6 border-t border-slate-300" />

            {/* Playoffs */}
            <CardContent>
              <PlayoffsBracket teams={tablesWithDiff} />
            </CardContent>
          </Card>
        )}

        {/* Scorers */}
        {activeSection === "goleadores" && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Top Scorers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">Goals</TableHead>
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

        {/* Cards */}
        {activeSection === "tarjetas" && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">Yellow</TableHead>
                    <TableHead className="text-center">Red</TableHead>
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

        {/* Fixture */}
        {activeSection === "fixture" && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Upcoming Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Time</TableHead>
                    <TableHead>Home</TableHead>
                    <TableHead>Away</TableHead>
                    <TableHead className="text-center">Field</TableHead>
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
