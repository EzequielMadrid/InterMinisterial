import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Hola de nuevo ✋
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Inicia sesión para acceder a tu perfil y conectarte con otros.
        </p>
        <SignInButton mode="modal">
          <Button className="w-full" variant="outline">
            Iniciar sesión
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="w-full mt-2" variant="default">
            Registrarse
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
);

export default UnAuthenticatedSidebar;
