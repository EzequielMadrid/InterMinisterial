import { esES } from "@clerk/localizations";

export const esAR = {
  ...esES,
  locale: "es-AR",

  // 🔹 Sign In
  signIn: {
    ...esES.signIn,
    start: {
      ...(esES.signIn?.start || {}),
      title: "Iniciá sesión",
      subtitle: "Accedé a tu cuenta",
      actionText: "¿No tenés cuenta?",
      actionLinkText: "Registrate",
    },
  },

  // 🔹 Sign Up
  signUp: {
    ...esES.signUp,
    start: {
      ...(esES.signUp?.start || {}),
      title: "Registrate",
      subtitle: "Creá tu cuenta",
      actionText: "¿Ya tenés cuenta?",
      actionLinkText: "Iniciá sesión",
    },
  },

  // 🔹 User Button
  userButton: {
    ...esES.userButton,
    action__signOut: "Cerrar sesión",
    action__manageAccount: "Administrar cuenta",
  },
};
