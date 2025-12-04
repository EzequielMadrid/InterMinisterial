"use client";

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

interface LeagueTablesProps {
  tablas: TablesByGender;
  gender: "masculino" | "femenino";
}

export default function LeagueTables({ tablas, gender }: LeagueTablesProps) {
  // Add goal difference and unify all group teams
  const tablesWithDiff = Object.values(tablas[gender])
    .flat()
    .map((t) => ({
      ...t,
      dg: t.gf - t.gc,
    }));

  // Group generator
  const generateGroups = (teams: Team[], size: number) => {
    return Array.from({ length: Math.ceil(teams.length / size) }, (_, i) =>
      teams.slice(i * size, i * size + size)
    );
  };

  // Groups
  const groups =
    gender === "masculino"
      ? generateGroups(tablesWithDiff, 4)
      : generateGroups(tablesWithDiff, 4).slice(0, 2);

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
    if (index === 0 || index === 1) return "bg-green-950";
    if (gender === "masculino" && index === 2 && bestThirds.includes(team))
      return "bg-violet-950";
    return "";
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>
          {gender === "masculino" ? "Grupos (Hombres)" : "Grupos (Mujeres)"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {sortedGroups.map((group, idx) => (
          <div key={idx} className="space-y-3 w-full">
            <h2 className="font-semibold text-lg">
              Zona {String.fromCharCode(65 + idx)}
            </h2>

            <Table>
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
                    <TableCell className="w-12 text-center">{t.pts}</TableCell>
                    <TableCell className="w-12 text-center">{t.pj}</TableCell>
                    <TableCell className="w-12 text-center">{t.gf}</TableCell>
                    <TableCell className="w-12 text-center">{t.gc}</TableCell>
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

      {/* Separator */}
      <div className="my-6 border-t border-slate-300" />

      {/* Playoffs */}
      <CardContent>
        <PlayoffsBracket teams={tablesWithDiff} />
      </CardContent>
    </Card>
  );
}
