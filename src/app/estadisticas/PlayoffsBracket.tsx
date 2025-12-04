interface Team {
  team: string;
  pts: number;
  gf?: number;
  gc?: number;
}

interface PlayoffsBracketProps {
  teams: Team[];
  title?: string;
}

export function PlayoffsBracket({
  teams,
  title = "Playoffs - Copa de Oro",
}: PlayoffsBracketProps) {
  // Sort teams by points first, then goal difference if tied
  const sorted = teams
    .slice()
    .sort((a, b) => {
      const dgA = (a.gf ?? 0) - (a.gc ?? 0);
      const dgB = (b.gf ?? 0) - (b.gc ?? 0);
      if (b.pts !== a.pts) return b.pts - a.pts; // sort by points
      return dgB - dgA; // if tie, sort by goal difference
    })
    .slice(0, 8); // take top 8 teams
  // Ensure we have exactly 8 teams (fill placeholders if needed)
  while (sorted.length < 8)
    sorted.push({ team: `T${sorted.length + 1}`, pts: 0 });
  // Quarterfinals matchups: 1vs8, 2vs7, 3vs6, 4vs5
  const seedMatchup = (arr: Team[], a: number, b: number) => ({
    a: arr[a - 1] ?? { team: `T${a}`, pts: 0 },
    b: arr[b - 1] ?? { team: `T${b}`, pts: 0 },
  });

  // Quarterfinals matchups
  const qf = [
    seedMatchup(sorted, 1, 8),
    seedMatchup(sorted, 2, 7),
    seedMatchup(sorted, 3, 6),
    seedMatchup(sorted, 4, 5),
  ];

  // Semifinals placeholders
  const sf = [
    { a: { team: "Winner QF1", pts: 0 }, b: { team: "Winner QF2", pts: 0 } },
    { a: { team: "Winner QF3", pts: 0 }, b: { team: "Winner QF4", pts: 0 } },
  ];

  // Final placeholder
  const final = {
    a: { team: "Winner SF1", pts: 0 },
    b: { team: "Winner SF2", pts: 0 },
  };

  return (
    <div className="mt-6 p-4 rounded-2xl border shadow-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Title and phase info */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-bold tracking-wide">{title}</h3>
        <div className="text-xs md:text-sm uppercase px-2 py-1 rounded-full bg-white/5 border border-white/10">
          Rumbo a la → Gran Final
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {/* Quarterfinals */}
        <div>
          <div className="text-sm font-medium mb-2 font-mono">Cuartos</div>
          <div className="space-y-3">
            {qf.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/3 backdrop-blur-sm border border-white/5"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">
                    {m.a.team}
                  </div>
                  <div className="text-[11px] text-white/70">Pts {m.a.pts}</div>
                </div>
                <div className="mx-2 text-xs text-white/50">vs</div>
                <div className="flex-1 text-right min-w-0">
                  <div className="text-sm font-semibold truncate">
                    {m.b.team}
                  </div>
                  <div className="text-[11px] text-white/70">Pts {m.b.pts}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Semifinals */}
        <div>
          <div className="text-sm font-medium mb-2 font-mono">Semis</div>
          <div className="space-y-6 pt-6">
            {sf.map((m, i) => (
              <div
                key={i}
                className="px-3 py-3 rounded-lg border border-white/6 bg-gradient-to-b from-white/3 to-white/5 shadow-inner"
              >
                <div className="text-xs text-white/60 mb-1">Match {i + 1}</div>
                <div className="text-sm font-semibold">{m.a.team}</div>
                <div className="text-sm font-semibold mt-1">{m.b.team}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final */}
        <div className="col-span-1 md:col-span-2">
          <div className="text-sm font-medium mb-2 font-mono">Final</div>
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-full md:w-3/4 px-4 py-4 rounded-2xl border border-white/8 bg-gradient-to-b from-purple-700/20 to-indigo-800/10 shadow-lg transform-gpu hover:scale-[1.01] transition">
              <div className="text-xs text-white/60">Gran Final</div>
              <div className="mt-2 font-bold text-xl md:text-2xl tracking-tight">
                {final.a.team}
              </div>
              <div className="mt-1 text-sm font-medium text-white/60">vs</div>
              <div className="mt-1  font-bold text-xl md:text-2xl tracking-tight">
                {final.b.team}
              </div>
            </div>

            <div className="text-[12px] text-white/60">
              Solamente los mejores llegan a esta instancia. A hacer historia!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
