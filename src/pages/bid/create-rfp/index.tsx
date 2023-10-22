import Head from 'next/head';
import { Box, Card, Container, createTheme, Stack, Tab, Grid, Tooltip, CardHeader, Tabs, CardContent, Typography, Popover, Button, List, ListItem, ListItemText, OutlinedInput, IconButton, Checkbox, FormControlLabel, ListItemButton, ListItemIcon, FormLabel, Radio, TextField } from '@mui/material';
import React, { useState, useRef } from 'react';
import { DashboardLayout } from '../../../layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import MobileStepper from '@mui/material/MobileStepper';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CustomTabPanel from '@/components/_used-symline/tabs/tabsPanel';
import { dictionary, TranslatedWord } from '@/configs/i18next';
import Fade from '@mui/material/Fade';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExperienceDialog from '@/components/_used-symline/dialogs/experience-dialog';
import { useRouter } from "next/navigation";
import { styled } from '@mui/material/styles';
import Step1 from '@/components/_used-symline/steps/step1';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Step2 from '@/components/_used-symline/steps/step2';
import AddIcon from '@mui/icons-material/Add';
import { indexof } from 'stylis';
import Moblie from '@/components/_used-symline/questions/mobile';
import Web from '@/components/_used-symline/questions/web';
import Network from '@/components/_used-symline/questions/network';
import SourceCode from '@/components/_used-symline/questions/sourceCode';
import ArchitectureConfigurationReview from '@/components/_used-symline/questions/architectureConfigurationReview';
import ThreatHunting from '@/components/_used-symline/questions/threatHunting';
const Page = () => {

  const { i18n } = useTranslation();
  const title = 'Create RFP';
  const { t } = useTranslation();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [dialogName, setDialogName] = useState('');
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [inputs, setInputs] = useState(["Web"]);
  const questionsTitles = ['Web', 'Architecture configuration review', 'Source code', 'Phone', 'Network', 'Threat hunting'];
  const handleClose = () => setOpen(false);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const addInput = (item: any) => {
    setInputs([...inputs, item]);

  };
  const removeInput = (index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const handleNext = () => {
    if (activeStep !== maxSteps - 1) {

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {

      setTimeout(() => router.push("/"), 2500)
    }
  };

  const handleClickList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseList = () => {
    setAnchorEl(null);
  };

  const openList = Boolean(anchorEl);
  const id = openList ? 'simple-popover' : undefined;

  const steps = [
    {
      id: 1,
      step: <Step1 />,
    },
    {
      id: 2,
      step: <Step2 />,
    },
  ];

  const maxSteps = steps.length;
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
          {dictionary(title as TranslatedWord)}
        </Typography>

        <Grid container spacing={3} justifyContent={'flex-end'}>


          <Grid item xs={12} justifyContent="flex-end" display="flex">



            <Button variant="contained" onClick={handleClickList} aria-describedby={id} aria-label="add" color="warning" size="large" sx={{ borderRadius: 20 }}>
              {t("Add assessment")} <AddIcon />
            </Button>
            <Popover
              id={id}
              open={openList}
              anchorEl={anchorEl}
              onClose={handleCloseList}
              anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
              }}
              PaperProps={{ sx: { width: 300, borderRadius: 3 } }}

            >
              <List sx={{ p: 2 }}>
                {questionsTitles.map((item: any, index) => (


                  <ListItem key={index} disablePadding divider>
                    <ListItemButton onClick={() => (addInput(item))}>

                      <ListItemText primary={`${t(item)}`} />
                    </ListItemButton>
                  </ListItem>
                ))}

              </List>


            </Popover>
          </Grid>


          <Grid item xs={12} >

            <Card elevation={0} sx={{ p: 3, }}>

              <CardContent sx={{ p: 1 }}>
                <Grid container spacing={0} justifyContent={'space-between'} alignItems="center">
                  <Grid item xs={12} >

                    <Grid container spacing={0} direction={'row'} justifyContent={'space-between'} textAlign={'left'}>
                      <Grid item xs={12} sx={{ p: 1, px: 1, borderRadius: 1, bgcolor: "warning.lightest", display: 'flex', alignItems: "center", justifyContent: "space-between" }}>

                        <Typography variant="body2" fontWeight="bold" color="warning.darkest">{t("General questions")}</Typography>

                      </Grid>

                    </Grid>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }}>
                      {t("What is the allowed  testing time ?")}
                    </Typography>

                  </Grid>
                  <Grid container sx={{ px: 2 }} spacing={1} alignItems="center" flexDirection={'row'} justifyContent={'start'} textAlign={'left'}>

                    <Grid item xs={6} md={4} lg={3}>
                      <FormControlLabel
                        value="During the working hours"
                        control={<Checkbox />}
                        label={t("During the working hours")}
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <FormControlLabel
                        value="Off working hours"
                        control={<Checkbox />}
                        label={t("Off working hours")}
                        labelPlacement="end"
                        sx={{ overflow: "hidden", whiteSpace: { xs: "nowrap", sm: "normal" } }}
                      />
                    </Grid>
                    <Grid item xs={6} md={4} lg={3}>
                      <FormControlLabel
                        value="Weekends"
                        control={<Checkbox />}
                        label={t("Weekends")}
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <FormControlLabel
                        value="No preference"
                        control={<Checkbox />}
                        label={t("No preference")}
                        labelPlacement="end"
                      />
                    </Grid>

                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {inputs.map((item, index) => (
            <Grid key={index} item xs={12} >
              <Card elevation={0} sx={{ p: 3 }}>
                <CardContent sx={{ p: 1 }}>
                  <Grid container spacing={2} justifyContent={'space-between'} alignItems="center">
                    <Grid item xs={12}>

                      <Box sx={{ width: '100%', pa: 0 }}>

                        <Grid container spacing={0} justifyContent="center">
                          <Grid item xs={12}>
                            <Box sx={{ px: 1, borderRadius: 1, bgcolor: "warning.lightest", display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                              <Typography variant="body2" fontWeight="bold" color="warning.darkest">{t(`${item}`)}</Typography>
                              <Box>

                                <IconButton onClick={() => removeInput(index)} aria-label="delete" >

                                  <DeleteForeverIcon sx={{ cursor: 'pointer' }} />
                                </IconButton>

                              </Box>
                            </Box>
                            {
                              item === 'Web' && (
                                <Web />
                              )
                            }
                            {
                              item === 'Architecture configuration review' && (
                                <ArchitectureConfigurationReview />
                              )
                            }
                            {
                              item === 'Network' && (
                                <Network />
                              )
                            }
                            {
                              item === 'Threat hunting' && (
                                <ThreatHunting />
                              )
                            }
                              {
                              item === 'Phone' && (
                                <Moblie />
                              )
                            }
                            {
                              item === 'Source code' && (
                                <SourceCode />
                              )
                            }

                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                 
                  </Grid>

                </CardContent>
              </Card>
            </Grid>
          ))}
            
           
        </Grid>

      </Container>
    </Box >
  </>
}


Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;