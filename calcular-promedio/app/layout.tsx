"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { supabase } from "@/src/supabaseClient";
import LoginPage from "./login/page";

// Fuentes
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    checkSession();
  }, []);

  // Cerrar sesión (botón en header)
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setMostrarLogin(false);
  };

  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 min-h-screen`}>
        <header className="flex justify-end p-4 bg-gray-200">
          <button
            onClick={() => {
              // si ya hay sesión, el botón será "Cerrar sesión"
              if (session) {
                handleSignOut();
              } else {
                setMostrarLogin(true);
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {session ? "Cerrar sesión" : "Iniciar sesión"}
          </button>
        </header>

        {/* Mostrar login en modal / centro */}
        {mostrarLogin ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <LoginPage
              onLogin={(s: any) => {
                setSession(s);
                setMostrarLogin(false);
              }}
              onClose={() => setMostrarLogin(false)}
            />
          </div>
        ) : (
          <main className="max-w-3xl mx-auto p-4">{children}</main>
        )}
      </body>
    </html>
  );
}
