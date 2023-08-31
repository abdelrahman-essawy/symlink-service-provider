
import Head from 'next/head';
import { Box, Card, Container, Grid, Typography } from '@mui/material';
import React, { } from 'react';
import { useTranslation } from 'react-i18next';
import SharedTable from '@/components/SharedTable';
import bids from "../../public/bids.json";
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { dictionary, TranslatedWord } from '@/configs/i18next';

const Page = () => {

  const { i18n } = useTranslation();
  const title = 'Bids';
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return <>
    <Head>
      <title>
        {dictionary(title as TranslatedWord)} | Symline
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        bgcolor: 'primary.lightest',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,


      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 2 }} fontWeight={'bold'}>
          {dictionary(title as TranslatedWord)}
        </Typography>
        <Card elevation={0}>
          <SharedTable
            endpoint="http://localhost:3000/projects.json"
            fakeData={bids}
            showActions={true}
          />
        </Card>

      </Container>
    </Box>
  </>
}


Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;