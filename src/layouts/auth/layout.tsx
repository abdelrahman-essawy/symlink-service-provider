import PropTypes from "prop-types";
import NextLink from "next/link";
import Image from "next/image";

import { Box, Typography, Unstable_Grid2 as Grid, IconButton, Button, Card } from "@mui/material";
import React from "react";
import Logo from "../../../public/assets/Logo.svg";
import { useTranslation } from "react-i18next";
// TODO: Change subtitle text
import BgImg from "../../../public/assets/Logo.svg";
import LocalizationSwitcher from "@/components/LocalizationSwitcher";
import ButtonGroup from "@mui/material/ButtonGroup";
import Link from "next/link";
import { useRouter } from "next/router";
export const AuthLayout = (props: { children: any }) => {
  const { children } = props;
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        direction: "rtl",

        flex: "1 1 auto",
      }}
    >
      <Grid container sx={{ flex: "1 1 auto" }}>
        {/*layout section*/}
        <Grid
          xs={12}
          lg={6}
          sx={{
            bgcolor: "primary.main",
            display: { lg: "flex", xs: "none" },
            alignItems: "center",
            position: "relative",
            color: "white",
            justifyContent: "center",
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          <Box>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid xs={12}></Grid>
              <img alt="" width="300px" src={Logo.src} />
            </Grid>
          </Box>
        </Grid>
        {/*login section*/}
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              width: "98%",
              mt: 1,
              position: "absolute",
              top: "0",
            }}
          >
            <IconButton sx={{ zIndex: 3 }}>
              <LocalizationSwitcher />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ButtonGroup
              variant="contained"
              sx={{
                maxWidth: { md: 550, xs: "90%", sm: "75%" },
                direction: "ltr",
                display:
                  router?.pathname == "/auth/login" || router?.pathname == "/auth/register"
                    ? "flex"
                    : "none",
                pt: "20px",
                mb: 3,
              }}
              fullWidth
              disableElevation
              color="warning"
            >
              <Button
                onClick={() => {
                  if (!(router?.pathname == "/auth/login")) {
                    router.push("/auth/login");
                  }
                }}
                sx={{
                  background: router?.pathname == "/auth/register" ? "none" : "",
                  border: "1px solid  #EEC86F",
                }}
              >
                {t("Sign in")}
              </Button>
              <Button
                onClick={() => {
                  if (!(router?.pathname == "/auth/register")) {
                    router.push("/auth/register");
                  }
                }}
                sx={{
                  background: router?.pathname == "/auth/login" ? "none" : "",
                  border: "1px solid  #EEC86F",
                }}
              >
                {t("Create Account")}
              </Button>
            </ButtonGroup>
          </Box>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

AuthLayout.prototypes = {
  children: PropTypes.node,
};
