import Head from "next/head";
import { Box, Container, ListItemIcon, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { Card } from "@mui/material";

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
  const title = "Terms and Conditions";
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{title} | Symlink</title>
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
            <Box sx={{ width: "100%", typography: "body1", mb: 1 }}>
              <Typography variant="h5">{t("TermsAndConditions_Page.Privacy Policy")}</Typography>
            </Box>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <Typography variant="body1">{t("TermsAndConditions_Page.Privacy text")}</Typography>
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
                      <Box sx={{ width: "100%", typography: "body1" }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {index + 1} - {t(`About_Page.${data?.title}`)}
                        </Typography>
                        <Typography variant="body1" sx={{ mx: 2 }}>
                          {t(`${data?.body}`)}
                        </Typography>
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
