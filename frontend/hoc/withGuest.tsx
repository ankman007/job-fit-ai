"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { isTokenExpired } from "@/utils";
import { useEffect, useMemo, useState } from "react";

const withGuest = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const GuestComponent = (props: P) => {
    const router = useRouter();
    const pathname = usePathname();
    const token = useSelector((state: RootState) => state.auth.accessToken);

    const [checkedAuth, setCheckedAuth] = useState(false);

    const isLoggedIn = useMemo(() => token && !isTokenExpired(token), [token]);

    useEffect(() => {
      if (isLoggedIn) {
        router.replace(`/?redirect=${pathname}`);
      } else {
        setCheckedAuth(true);
      }
    }, [isLoggedIn, router]);

    if (!checkedAuth) {
        return null;
    }

    return <WrappedComponent {...props} />;
  };

  return GuestComponent;
};

export default withGuest;
