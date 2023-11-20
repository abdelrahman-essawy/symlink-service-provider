import Head from "next/head";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SharedTable from "@/components/SharedTable";
import bids from "../../public/bids.json";
import { DashboardLayout } from "@/layouts/dashboard/layout";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import router from "next/router";

const Page = () => {
  const { i18n } = useTranslation();
  const title = "Bids";
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Head>
        <title>{dictionary(title as TranslatedWord)} | Symline</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          bgcolor: "primary.lightest",
          borderTopLeftRadius: i18n.language == 'ar' ? 25 : 0,
          borderBottomLeftRadius: i18n.language == 'ar' ? 25 : 25,
          borderTopRightRadius: i18n.language == 'ar' ? 0 : 25,
          borderBottomRightRadius: i18n.language == 'ar' ? 0 : 25,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
            {dictionary(title as TranslatedWord)}
          </Typography>
          <Card sx={{ px: 2 }}>
            <SharedTable
              endpoint="http://localhost:3000/bids.json"
              fakeData={bids}
              showActions={true}
              renderRowActions={(row) => (
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    borderRadius: 8,
                    backgroundColor: "#FFF8E6",
                    border: 1,
                    borderColor: "#FFD777",
                  }}
                  onClick={() => { }}
                >
                  {dictionary("Bid")}
                </Button>
              )}
              muiTableBodyRowProps={(row) => ({
                onClick: () => router.push(`/bid/rfp-name`),
                sx: { cursor: "pointer" },
              })}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;