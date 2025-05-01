'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { setTokens, clearTokens } from "@/redux/slices/authSlice";
import { setUserDetails, clearUserDetails } from "@/redux/slices/userSlice";
import { setCheatsheets, clearCheatsheets } from "@/redux/slices/cheatsheetSlice";
import type { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import Head from "next/head";
import { isTokenExpired } from "@/utils";

const apiBaseURL = "http://localhost:8000";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const access = useSelector((state: RootState) => state.auth.accessToken);

  const fetchUserDetails = async (accessToken: string) => {
    try {
      const userRes = await fetch(`${apiBaseURL}/user/details`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!userRes.ok) throw new Error('Failed to fetch user details');

      const userData = await userRes.json();
      if (userData.user_details) {
        dispatch(setUserDetails(userData.user_details));
      }
    } catch (err: any) {
      console.error("Error fetching user details:", err);
    }
  };

  const fetchCheatsheets = async (accessToken: string) => {
    try {
      const cheatsheetRes = await fetch(`${apiBaseURL}/user/cheatsheets`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!cheatsheetRes.ok) throw new Error('Failed to fetch cheatsheets');

      const cheatsheetData = await cheatsheetRes.json();
      if (cheatsheetData.cheatsheets) {
        dispatch(setCheatsheets(cheatsheetData.cheatsheets));
      }
    } catch (err: any) {
      console.error("Error fetching cheatsheets:", err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!access) {
        dispatch(clearUserDetails());
        return;
      }

      // Check if the token is expired
      const isTokenValid = !isTokenExpired(access);
      if (!isTokenValid) {
        console.warn("Token expired, clearing authentication...");
        dispatch(clearTokens());
        dispatch(clearUserDetails());
        return;
      }

      await fetchUserDetails(access);
      await fetchCheatsheets(access);
    };

    fetchUserData();
  }, [dispatch, access]);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
