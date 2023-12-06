import Head from "next/head";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import SharedTable from "@/components/SharedTable";
import wallet from "../../../public/wallet.json";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import router from "next/router";

const Page = () => {
  const { i18n } = useTranslation();
  const title = "Wallet";
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

        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
            {dictionary(title as TranslatedWord)}
          </Typography>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12}>
              <Card sx={{
                px: 2,
              }}>
                <SharedTable endpoint="http://localhost:3000/projects.json" fakeData={wallet} />
              </Card>
            </Grid>
          </Grid>
        </Container>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;