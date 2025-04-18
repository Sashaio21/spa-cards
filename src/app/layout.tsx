'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";
import {store} from "../redux/store"
import Header from "@/components/Header";
import GlobalInit from "./GlobalInit";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container`}
      >
        <Provider store={store}>
          <Header/>
          {children}
          <footer 
          style={{
            marginTop: "50px"
          }}
          >footer</footer>
          <GlobalInit/>
        </Provider>
      </body>
    </html>
  );
}
