"use client";
import React, { useEffect, useState, lazy, Suspense } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Use jwtDecode directly instead of destructuring
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import SpinnerSec from "./component/SpinnerSec";

const Header = lazy(() => import("./component/Header"));
const MainBody = lazy(() => import("./component/MainBody"));
const Footer = lazy(() => import("./component/Footer"));
const Login = lazy(() => import("./Login/page"));

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("newtoken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <Suspense
            fallback={
              <>
                <SpinnerSec />
              </>
            }
          >
            {isAuthenticated ? (
              <>
                <Header userId={userId} />
                <MainBody userId={userId} />
                <Footer />
              </>
            ) : (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUserId={setUserId}
              />
            )}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
