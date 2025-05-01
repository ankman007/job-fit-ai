"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { isTokenExpired } from "@/utils";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const pathname = usePathname();
    const token = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
      if (!token) {
        router.push(`/?redirect=${pathname}`);
        return;
      }

      if (isTokenExpired(token)) {
        router.push(`/?redirect=${pathname}`);
      }
    }, [token, router, pathname]);

    if (!token || isTokenExpired(token)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

const withGuest = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const GuestComponent = (props: P) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
      if (token && !isTokenExpired(token)) {
        router.replace("/");
      }
    }, [token, router]);

    if (token && !isTokenExpired(token)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return GuestComponent;
};