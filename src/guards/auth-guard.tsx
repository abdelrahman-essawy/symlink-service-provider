import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useAuthContext } from "../contexts/auth-context";
import { getPermissionNameFromPath, hasPermissionToViewPath } from "@/configs/pathsPermission";
import { getRolesThatCanAccessPathName } from "@/configs/roles";

export const AuthGuard = (props: { children: any }) => {
  const { children } = props;
  const router = useRouter();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const auth = useAuthContext();

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  // useEffect(() => {
  //   if (!router.isReady) {
  //     return;
  //   }

  //   // Prevent from calling twice in development mode with React.StrictMode enabled
  //   if (ignore.current) {
  //     return;
  //   }

  //   ignore.current = true;

  //   if (!auth?.isAuthenticated) {
  //     router
  //       .replace({
  //         pathname: "/auth/login",
  //         query: router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
  //       })
  //       .catch(console.error);
  //   } else {
  //     setChecked(true);
  //   }
  // }, [router, router.isReady, auth?.isAuthenticated]);
  
  useEffect(() => {
    const redirectToLogin = () => {
      router.push("/auth/login");
    };
    if (!router.isReady) {
      return;
    }
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }
    ignore.current = true;

    if (!auth?.isAuthenticated) {
      redirectToLogin();
    } else {
        setChecked(true);
      
    }
  }, [router, router.isReady, auth?.isAuthenticated, auth?.user]);

  if (!checked) {
    return (
      <div>
        <p>...</p>
      </div>
    );
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  const { pathname } = router;

  const permision = getPermissionNameFromPath(pathname as any);

  if (!permision) router.push("/401");
  console.log("permision", permision);
  // if (!permision) {
  //   return <div>No rule for this path, contact the administrator.</div>;
  // }

  if (!auth?.user) {
    return router.push("/auth/login");
  }
  //   return (
  //     <>
  //       <div>Not authorized to view {pathname}</div>
  //       <div>Your role: {useAuth?.user?.role}</div>
  //       <div>You need permision: {permision}</div>
  //       <div>
  //         Roles than can access {pathname}: {getRolesThatCanAccessPathName(pathname)}
  //       </div>
  //     </>
  //   );
  // }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
