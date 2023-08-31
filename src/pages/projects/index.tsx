import Head from 'next/head';
import { Box, Card, Container,createTheme, Stack, Tab, Grid, CardHeader, Tabs, CardContent, Typography, Button, OutlinedInput } from '@mui/material';
import React, { useState, useRef } from 'react';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import { TabPanel } from '@mui/lab';
import { Theme } from '@mui/material';
import CustomTabPanel from '@/components/_used-symline/tabs/tabsPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useAbout } from '../../hooks/use-about';
import MUIRichTextEditor, { TMUIRichTextEditorRef } from 'mui-rte-fixed';
import HeaderTabs from '@/components/_used-symline/tabs/headerTabs';
import { withStyles } from "@mui/styles";

const Page = () => {
  const { i18n } = useTranslation();

  const title = 'Projects';
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
        <Typography variant="h3" sx={{ mb: 2 }} fontWeight={'bold'}>
          {'Project name'}
        </Typography>
        <Grid container spacing={2} justifyContent={'space-between'}>
          <Grid item xs={12} md={6} >
            <HeaderTabs value={value} handleChange={handletabs} label1='Discussion' label2='Questions' label3='Attached filles' />
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant='contained' color="warning" sx={{ borderRadius: 8 }}>
              {'Submit to review'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Card elevation={0}>
              <CustomTabPanel value={value} index={0}> two</CustomTabPanel>
              <CustomTabPanel value={value} index={1}>

                <CardContent sx={{ p: 1 }}>
                  <Typography variant="h6" fontWeight="bold" color="primary" sx={{ p: 1, mb: 3, borderRadius: 1, bgcolor: "primary.lightest" }}>General Questtions</Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    What is preferred testing time ?
                  </Typography>
                  <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                    During the working hours
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    In case of emergency , what is the contact details of the person the assessor should have a contact with :
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                    First person:
                  </Typography>
                  <Grid container spacing={1} justifyContent={'space-between'}>
                    <Grid item xs={12} md={4} >
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                    Name: Jone Doe
                  </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} >
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                    Email: johndoel@gmail.com
                  </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} >
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                    Mobile Number: 9876543210
                  </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                    First person:
                  </Typography>
                  <Grid container spacing={0} justifyContent={'space-between'}>
                    <Grid item xs={12} md={4} >
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                    Name: Jone Doe
                  </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} >
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                    Email: johndoel@gmail.com
                  </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} >
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                    Mobile Number: 9876543210
                  </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="h6" fontWeight="bold" color="primary" sx={{ p: 1, mb: 3, borderRadius: 1, bgcolor: "primary.lightest" }}>Web</Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    What is preferred testing time ?
                  </Typography>
                  <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                   Vulnerability assessment
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    ow many web applications you want to assess ?
                  </Typography>
                  <Grid container spacing={0} justifyContent={'space-start'}>
                    <Grid item xs={12} md={4} >
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                   Internal applications: 7
                  </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} >
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                    External applications: 4
                  </Typography>
                    </Grid>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                   List the scoped applications: (i.e.domain.com)
                  </Typography>
                  <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. 
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                   4 Is verification required to assess whether the reported Vulnerability have been fixed ?
                  </Typography>
                  </Grid>
                </CardContent>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}> three</CustomTabPanel>
            </Card>
          </Grid>
        </Grid>

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