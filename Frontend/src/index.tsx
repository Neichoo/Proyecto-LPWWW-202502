import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import { Admin } from "./screens/Admin";
//
//createRoot(document.getElementById("app") as HTMLElement).render(
//  <StrictMode>
//    <Admin />
//  </StrictMode>,
//);

//import { Administrador } from "./screens/Administrador";
//
//createRoot(document.getElementById("app") as HTMLElement).render(
//  <StrictMode>
//    <Administrador />
//  </StrictMode>,
//);


import { LandingPage } from "./screens/LandingPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
);

//import { Locales } from "./screens/Locales";
//
//createRoot(document.getElementById("app") as HTMLElement).render(
//  <StrictMode>
//    <Locales />
//  </StrictMode>,
//);

//import { SignUp } from "./screens/SignUp";
//
//createRoot(document.getElementById("app") as HTMLElement).render(
//  <StrictMode>
//    <SignUp />
//  </StrictMode>,
//);

//import { Login } from "./screens/Login";
//
//createRoot(document.getElementById("app") as HTMLElement).render(
//  <StrictMode>
//    <Login />
//  </StrictMode>,
//);

//import { CajaOnline } from "./screens/CajaOnline";
//
//createRoot(document.getElementById("app") as HTMLElement).render(
//  <StrictMode>
//    <CajaOnline />
//  </StrictMode>,
//);

//import { Despacho } from "./screens/Despacho";
//
//createRoot(document.getElementById("app") as HTMLElement).render(
//  <StrictMode>
//    <Despacho />
//  </StrictMode>,
//);
