import Head from 'next/head';
import { Box, Card, Container, createTheme, Select, TextField, FormLabel, MenuItem, SelectChangeEvent, Stack, Tab, Grid, CardHeader, Tabs, CardContent, Typography, Button, OutlinedInput, Avatar, Badge, FormControl } from '@mui/material';
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
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
const Page = () => {
  const { i18n } = useTranslation();

  const title = 'Profile';
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('USA');

  // handle file selection
  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // handle form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // perform actions with the selected file
    console.log(selectedFile);
  };

  const [country, setCountry] = useState('');
  const handleSelectCountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };
  const countries = [
    { id: 1, name: 'unitedstates', handle: handleSelectCountry },
    { id: 2, name: 'canada', handle: handleSelectCountry },
    { id: 3, name: 'mexico', handle: handleSelectCountry },
    { id: 4, name: 'brazil', handle: handleSelectCountry },
    { id: 5, name: 'argentina', handle: handleSelectCountry },
    { id: 6, name: 'australia', handle: handleSelectCountry },
    { id: 7, name: 'india', handle: handleSelectCountry },
    { id: 8, name: 'china', handle: handleSelectCountry },
    { id: 9, name: 'japan', handle: handleSelectCountry },
    { id: 10, name: 'russia', handle: handleSelectCountry },
    { id: 11, name: 'egypt', handle: handleSelectCountry },
    { id: 12, name: 'saudiarabia', handle: handleSelectCountry },
    { id: 13, name: 'iraq', handle: handleSelectCountry },
    { id: 14, name: 'syria', handle: handleSelectCountry },
    { id: 15, name: 'lebanon', handle: handleSelectCountry },
    { id: 16, name: 'jordan', handle: handleSelectCountry },
    { id: 17, name: 'yemen', handle: handleSelectCountry },
    { id: 18, name: 'oman', handle: handleSelectCountry },
    { id: 19, name: 'qatar', handle: handleSelectCountry },
    { id: 20, name: 'kuwait' }
  ];


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
        bgcolor: "primary.lightest",
        borderTopLeftRadius: i18n.language == 'ar' ? 25 : 0,
        borderBottomLeftRadius: i18n.language == 'ar' ? 25 : 25,
        borderTopRightRadius: i18n.language == 'ar' ? 0 : 25,
        borderBottomRightRadius: i18n.language == 'ar' ? 0 : 25,


      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 2 }} fontWeight={'bold'}>
          {t('Profile')}
        </Typography>
        <Grid container spacing={2} justifyContent={'space-between'}>

          <Grid item xs={12}>
            <Card elevation={0} >

              <CardContent sx={{ p: 1 }}>

                <Grid container spacing={4} p={10} justifyContent={'space-between'}>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <form onSubmit={handleSubmit}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        badgeContent={
                          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" sx={{boxShadow: "-6px 7px 8px rgba(0, 0, 0, 0.08)"}}>

                            <Button
                              variant="contained"
                              size="large"
                              component="label"
                              sx={{color: 'white'}}
                            >
                              <PhotoCameraIcon fontSize='small'  />
                              <input
                                type="file"
                                onChange={handleFileSelect}
                                hidden
                              />
                            </Button>
                          </Avatar>
                        }
                      >
                        <Avatar sx={{ width: 100, height: 100 }} alt="Travis Howard" src={previewUrl} ></Avatar>
                      </Badge>
                    </form>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mx: 2 }}>
                      {t('Full Name')}
                    </FormLabel>
                    <TextField fullWidth={true}   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1, }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={6}>

                      <FormLabel sx={{ mx: 2 }}>
                        {t('Location')}
                      </FormLabel>
                      <Select
                       labelId="demo-multiple-name-label"
                       id="demo-multiple-name"
                      
                        fullWidth={true}
                        sx={{ mt: 1, borderRadius: '50px',
                        '& .muirtl-19j8lcu-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                          height: '20.125px',
                        }
                      }}
                        MenuProps={{
                          
                          PaperProps: {
                            style: {
                              maxHeight: 150,

                            },
                          },
                        }}
                        variant="outlined"
                        value={country}
                        onChange={handleSelectCountry}
                      >
                        {countries.map((item: any) => (

                          <MenuItem key={item?.id} value={item?.name}>{item?.name}</MenuItem>
                        ))}

                      </Select>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mx: 2 }}>
                      {t('Phone Number')}
                    </FormLabel>
                    <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mx: 2 }}>
                      {t('City')}
                    </FormLabel>
                    <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mx: 2 }}>
                      {t('Email')}
                    </FormLabel>
                    <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mx: 2 }}>
                      {t('linkedin')}
                    </FormLabel>
                    <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                  </Grid>
                  <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant='contained' color="warning" sx={{ borderRadius: 8 , p: 1.7, width: '100%'}}>
              {t('Update')}
            </Button>
          </Grid>
                </Grid>
              </CardContent>
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