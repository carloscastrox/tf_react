import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// Rutas públicas
import { PublicRoutes } from "./features/layout/components/PublicRoutes";

// Components Layout / Pages
import { Content } from "./features/layout/components/Content";
import { Banner } from "./features/layout/components/Banner";

import { CharactersPage } from "./shared/pages/CharactersPage";
import { Characters } from "./shared/components/Apiryc";

// Auth

import { Login } from "./features/auth/components/LoginUser";
import { Register } from "./features/auth/components/RegUser";
import { ForgotPassword } from "./features/auth/components/ForgotPass";
import  ProtectedRoute from "./features/auth/components/protectedRoute";

// Dashboard
import { Dashboard } from "./features/dash/components/DashBoard";
import { CharactersQ } from "./shared/components/Apirycs";
import { CharactersAxios } from "./shared/components/ApiAxios";

export const AppRoutes = () => {

  return (
    <HashRouter>
      <Routes>
        {/* RUTAS PÚBLICAS (CON HEADER + FOOTER) */}
        <Route element={<PublicRoutes />}>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Content />
              </>
            }
          />

          <Route path="/forgotpass" element={<ForgotPassword />} />

          <Route path="/apis" element={<CharactersPage />} />
          <Route path="/apis1" element={<Characters />} />
          <Route path="/apis2" element={<CharactersQ />} />
          <Route path="/apis3" element={<CharactersAxios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* RUTA PRIVADA */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </HashRouter>
  );
};