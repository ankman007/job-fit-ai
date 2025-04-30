'use client';
import type React from "react";
import { metadata } from "./metaData";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { fetchUserCheatSheets, fetchUserDetails } from "@/constant/api";
import { setUserDetails } from "@/redux/slices/userSlice"; 
import { setCheatsheets } from "@/redux/slices/cheetsheetSlice";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Provider store={store}>
      <Root>{children}</Root>
      <Toaster />
    </Provider>
  );
}

function Root({ children }: RootLayoutProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails));

        const userCheatsheets = await fetchUserCheatSheets();
        dispatch(setCheatsheets(userCheatsheets));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
