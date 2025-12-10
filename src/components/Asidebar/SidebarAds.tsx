"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function SidebarAds() {
  return (
    <Card className="mt-4 rounded-2xl shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold font-mono">
          Anuncios
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="rounded-xl overflow-hidden">
          <iframe
            className="w-full h-40"
            src="https://www.youtube.com/embed/iAxg1TaLg3M?si=Bcg4y9SRxqHuC5dT"
            title="Anuncio"
            allowFullScreen
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Contactanos para mostrar tu emprendimiento
        </p>
      </CardContent>
    </Card>
  );
}
