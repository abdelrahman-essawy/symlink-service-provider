import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { usePathname } from "next/navigation";
import { withAuthGuard } from "../../hocs/with-auth-guard";
import React from "react";
import { useTranslation } from "react-i18next";
import { Stack, useMediaQuery } from "@mui/material";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled(Stack)(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const DashboardLayout = withAuthGuard((props: { children: any }) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(true);
  const { i18n } = useTranslation();
  useEffect(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot style={{
            paddingLeft: useMediaQuery("(min-width:1200px)") ? i18n.language === "en" ? SIDE_NAV_WIDTH : 0 : 0,
            paddingRight: useMediaQuery("(min-width:1200px)") ? i18n.language === "en" ?  0: SIDE_NAV_WIDTH : 0,
      }}>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
});