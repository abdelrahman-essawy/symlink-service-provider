import PropTypes from "prop-types";
import NextLink from "next/link";
import Image from "next/image";

import { Box, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import React from "react";
import Logo from "../../../public/assets/Logo.svg";
import { useTranslation } from "react-i18next";
// TODO: Change subtitle text
import  BgImg  from '../../../public/assets/Logo.svg';

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
          {/* <Image
            quality={100}
            fill
            sizes="100%"
            src={BgImg.src}
            alt="Description of the SVG"
            style={{
              objectFit: "cover",

              zIndex: "-1",
              backgroundRepeat: "repeat",
            }}
          /> */}
          <Box display={{xs:'none', lg: 'flex'}}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">

            <Grid item xs={12}>


              <img alt="" width="300px" src={Logo.src} />
              </Grid>
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
