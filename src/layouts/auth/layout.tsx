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
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              width: "98%",
              mt: 1,
            }}
          >
            <IconButton sx={{ zIndex: 3 }}>
              <LocalizationSwitcher />
            </IconButton>
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ButtonGroup
              variant="outlined"
              sx={{
                direction: "ltr",
                pt: "110px",
                borderRadius: "0px",
                width: { lg: "65%", xs: "80%", sm: "60%" },
                mb: 3,
              }}
              fullWidth
              disableElevation
              // color={router?.pathname =='/auth/login'?"warning":"primary"}
            >
              <Button
                onClick={() => {
                  if (!(router?.pathname == "/auth/login")) {
                    router.push("/auth/login");
                  }
                }}
                sx={{
                  background: router?.pathname == "/auth/login" ? "#EEC86F" : "",
                  "&:hover": {
                    color: "#fff",
                    background: "#EEC86F",
                  },
                }}
              >
                {t("Login")}
              </Button>
              <Button
                onClick={() => {
                  if (!(router?.pathname == "/auth/register")) {
                    router.push("/auth/register");
                  }
                }}
                sx={{
                  color: router?.pathname == "/auth/register" ? "#fff" : "",
                  background: router?.pathname == "/auth/register" ? "#4338CA" : "",
                  "&:hover": {
                    color: "#fff",
                    background: "#6366f1c2",
                  },
                }}
              >
                {t("Rgister")}
              </Button>
            </ButtonGroup>
          </Grid>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

AuthLayout.prototypes = {
  children: PropTypes.node,
};
