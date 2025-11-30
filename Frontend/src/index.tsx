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
import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { Locales } from "./screens/Locales";
import { ProductDetailPage } from "./screens/Productos/Productos";
import { Despacho } from "./screens/Despacho/Despacho";
import { Contacto } from "./screens/Contacto/Contacto";
import { Admin } from "./screens/Admin/Admin";
import { Administrador } from "./screens/Administrador/Administrador";
import { Administrador as AdministradorCompras } from "./screens/AdministradorCompras/Administrador";
import { CajaOnline } from "./screens/CajaOnline/CajaOnline";
import { CarritoDeCompras } from "./screens/CarritoDeCompras/CarritoDeCompras";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <div className="app-viewport">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/locales" element={<Locales />} />
          <Route path="/productos" element={<ProductDetailPage />} />
          <Route path="/productos/:id" element={<ProductDetailPage />} />
          <Route path="/despacho" element={<Despacho />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/administrador-compras" element={<AdministradorCompras />} />
          <Route path="/caja-online" element={<CajaOnline />} />
          <Route path="/carrito" element={<CarritoDeCompras />} />
        </Routes>
      </BrowserRouter>
    </div>
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
