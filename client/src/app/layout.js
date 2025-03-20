"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/store";
import { Toaster } from "react-hot-toast";
import Leftnav from "@/components/Leftnav/leftnav";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const excludedPaths = ["/", "/login", "/signup"];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster position="bottom-left" reverseOrder={false} />

            {/* Show LeftNav on all pages except /dashboard */}
            <div className="flex">
              {!excludedPaths.includes(pathname) && <Leftnav />}

              {/* Main Content */}
              <main className={`flex-1 ${pathname !== "/"}`}>{children}</main>
            </div>
          </PersistGate>
        </StoreProvider>
      </body>
    </html>
  );
}
