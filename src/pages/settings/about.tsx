import Head from "next/head";
import { Box, Card, Container, ListItemIcon, Typography } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import CircleIcon from "@mui/icons-material/Circle";

const DATA = [
  {
    title: "High Standards in design",
    body: "Lorem Test",
  },
  {
    title: "Most anticipated techniques",
    body: "Lorem Test",
  },
  {
    title: "Even rated customers",
    body: "Lorem Test",
  },
];

const Page = () => {
  const title = `About_Page.About`;
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{title} | Pronto</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">{t(title)}</Typography>

          <Card sx={{ mt: 3, p: 3 }}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <Typography variant="h5">{t("About_Page.Our Mission")}</Typography>
            </Box>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <Typography variant="body1">{t("Lorem Test")}</Typography>
            </Box>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <List>
                {DATA.map((data, index) => {
                  return (
                    <ListItem
                      key={index + data?.title}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        my: 3,
                      }}
                    >
                      <ListItemIcon>
                        <CircleIcon />
                      </ListItemIcon>
                      <Box sx={{ width: "100%", typography: "body1" }}>
                        <Typography variant="h6">{t(`About_Page.${data?.title}`)}</Typography>
                        <Typography variant="body1">{t(`${data?.body}`)}</Typography>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
