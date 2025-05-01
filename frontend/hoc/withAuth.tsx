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
      // If there's no token, redirect to the homepage with the current pathname
      if (!token) {
        router.push(`/?redirect=${pathname}`);
        return; // Prevent further execution
      }

      // If the token is expired, redirect to the homepage
      if (isTokenExpired(token)) {
        router.push(`/?redirect=${pathname}`);
      }
    }, [token, router, pathname]);

    // You can return null or a loading state here if needed before the component loads
    if (!token || isTokenExpired(token)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
