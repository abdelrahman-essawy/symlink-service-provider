import PropTypes from "prop-types";
import NextLink from "next/link";
import Image from "next/image";

import { Box, Typography, Unstable_Grid2 as Grid, IconButton,Button } from "@mui/material";
import React from "react";
import Logo from "../../../public/assets/Logo.svg";
import { useTranslation } from "react-i18next";
// TODO: Change subtitle text
import BgImg from "../../../public/assets/Logo.svg";
import LocalizationSwitcher from "@/components/LocalizationSwitcher";

export const AuthLayout = (props: { children: any }) => {
  const { children } = props;
  const { t } = useTranslation();

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

            alignItems: "center",
            position: "relative",
            color: "white",
            display: "flex",
            justifyContent: "center",
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          <Box display={{ md: "flex", xs: "none" }}>
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
          <Grid sx={{ display: "flex", justifyContent: "end", alignItems: "end",width:"98%",mt:1 }}>
          <IconButton sx={{zIndex:3}} >
            <LocalizationSwitcher />
          </IconButton>
          </Grid>
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          ></Box>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

AuthLayout.prototypes = {
  children: PropTypes.node,
};
