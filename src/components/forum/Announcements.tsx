export const revalidate = 86400; // 24hs cache

import Link from "next/link";
import { getNeuquenNews } from "@/actions/news.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnnouncementsProps {
  variant?: "default" | "post";
}

export default async function Announcements({
  variant = "default",
}: AnnouncementsProps) {
  const news = await getNeuquenNews();
  if (!news || news.length === 0) {
    return <p>No hay noticias disponibles.</p>;
  }
  // post variant for mobile (as a post card)
  const wrapperClasses =
    variant === "post" ? "border rounded-2xl p-4 shadow-sm bg-card" : "";

  return variant === "post" ? (
    <div className={wrapperClasses}>
      <h2 className="font-bold text-md mb-2 flex items-center gap-2">
        📰 Noticias de Hoy
      </h2>
      <div className="space-y-4">
        {news.map((n, i) => (
          <Link
            key={i}
            href={n.link}
            target="_blank"
            className="block hover:bg-muted p-3 rounded-xl transition"
          >
            <h3 className="font-semibold text-sm">{n.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {n.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    // desktop version
    <Card>
      <CardHeader>
        <CardTitle>Noticias de Hoy 📰</CardTitle>
        <CardDescription>
          Mantenete al día con las últimas novedades del Alto Valle. No te
          pierdas nada de lo que pase!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.map((n, i) => (
          <Link
            key={i}
            href={n.link}
            target="_blank"
            className="block hover:bg-muted p-3 rounded-xl transition"
          >
            <h3 className="font-semibold text-sm">{n.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {n.description}
            </p>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
