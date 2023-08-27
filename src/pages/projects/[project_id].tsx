import Head from 'next/head';
import { Box, Card, Container, Stack, Tab, Tabs, Typography, Button, OutlinedInput } from '@mui/material';
import React from 'react';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import HeaderTabs from '@/components/_used-symline/tabs/headerTabs';
const Page = () => {
  const title = 'Projects';
  const { t } = useTranslation();
 
  return <>
    <Head>
      <title>
        {title} | Symline
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
        <Typography variant="h3" fontWeight={'bold'}>
          {t(title)}
        </Typography>
        <Typography variant="h3" fontWeight={'bold'}>
          {t(title)}
        </Typography>
      {/*   <HeaderTabs label1='Discussion' label2='Questions' label3='Attached filles'/> */}
        <Card sx={{ mt: 3 }} elevation={0}>
        
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