import Head from 'next/head';
import { Box, Card, Container, createTheme, Stack, Tab, Grid, CardHeader, Tabs, CardContent, Typography, Button, OutlinedInput, IconButton } from '@mui/material';
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
import SharedTable from '@/components/SharedTable';
import projects from "../../../public/projects.json";
import { dictionary, TranslatedWord } from '@/configs/i18next';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const Page = () => {

  const { i18n } = useTranslation();
  const title = 'Experience';
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
          {dictionary(title as TranslatedWord)}
        </Typography>
        <Grid container spacing={2} justifyContent={'space-between'}>
          <Grid item xs={12} md={6} >
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant='contained' color="warning" sx={{ borderRadius: 8 }}>
              {t('Add')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Card elevation={0} sx={{ p: 3 }}>


              <CardContent sx={{ p: 1 }}>
                <Grid container spacing={2} justifyContent={'space-between'}>
                  <Grid item xs={12} >

                    <Grid container spacing={0} direction={'row'} justifyContent={'space-between'} textAlign={'left'}>
                      <Grid item xs={12} sx={{ px: 1, borderRadius: 1, bgcolor: "primary.lightest", display: 'flex', alignItems: "center", justifyContent: "space-between" }}>

                        <Typography variant="h6" fontWeight="bold" color="primary">Project name</Typography>
                        <Box>

                          <IconButton sx={{ mx: 1 }}><DeleteForeverIcon /></IconButton>
                          <IconButton><BorderColorIcon /></IconButton>

                        </Box>
                      </Grid>

                    </Grid>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }}>
                      Date
                    </Typography>
                    <Typography variant="body1" fontWeight="light" sx={{ mb: 4, px: 1 }}>
                      10 Apr 2023 to 22 April 2023
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, px: 1 }}>
                      About project
                    </Typography>
                    <Typography variant="body1" fontWeight="light" sx={{ mb: 1, px: 1 }}>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.

                    </Typography>
                  </Grid>
                  <Grid item xs={12} >

                    <Grid container spacing={0} direction={'row'} justifyContent={'space-between'} textAlign={'left'}>
                      <Grid item xs={12} sx={{ px: 1, borderRadius: 1, bgcolor: "primary.lightest", display: 'flex', alignItems: "center", justifyContent: "space-between" }}>

                        <Typography variant="h6" fontWeight="bold" color="primary">Project name</Typography>
                        <Box>

                          <IconButton sx={{ mx: 1 }}><DeleteForeverIcon /></IconButton>
                          <IconButton><BorderColorIcon /></IconButton>

                        </Box>
                      </Grid>

                    </Grid>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }}>
                      Date
                    </Typography>
                    <Typography variant="body1" fontWeight="light" sx={{ mb: 4, px: 1 }}>
                      10 Apr 2023 to 22 April 2023
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, px: 1 }}>
                      About project
                    </Typography>
                    <Typography variant="body1" fontWeight="light" sx={{ mb: 1, px: 1 }}>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.

                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
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