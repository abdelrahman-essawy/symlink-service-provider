import Head from "next/head";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import SharedTable from "@/components/SharedTable";
import projects from "../../../public/projects.json";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import router from "next/router";

const Page = () => {
  const { i18n } = useTranslation();
  const title = "Projects";
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          bgcolor: "primary.lightest",
          borderTopLeftRadius: 25,
          borderBottomLeftRadius: 25,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
            {dictionary(title as TranslatedWord)}
          </Typography>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12}>
              <Card sx={{ px: 2 }}>
                <SharedTable
                  muiTableBodyRowProps={(row) => ({
                    onClick: () => router.push(`/projects/1`),
                    sx: { cursor: "pointer" },
                  })}
                  endpoint="http://localhost:3000/projects.json"
                  fakeData={projects}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;