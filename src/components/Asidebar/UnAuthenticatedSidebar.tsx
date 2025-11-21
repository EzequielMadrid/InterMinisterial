import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Hola ✋
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Inicia sesión para acceder a tu perfil y saber novedades sobre el
          Torneo. Accede a resultados, tabla de goleadores, fixture y mucho más!
          También podés subir tus propias publicaciones para compartirlas con la
          comunidad.
        </p>

        {/* Buttons visible only on sm and above */}
        <div className="hidden sm:flex flex-col gap-2">
          <SignInButton mode="modal">
            <Button className="w-full" variant="outline">
              Iniciar sesión
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-full" variant="default">
              Registrarse
            </Button>
          </SignUpButton>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default UnAuthenticatedSidebar;
