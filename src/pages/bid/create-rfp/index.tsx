import Head from 'next/head';
import { Box, Card, Container, createTheme, Stack, Tab, Grid, CardHeader, Tabs, CardContent, Typography, Button, OutlinedInput, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState, useRef } from 'react';
import { DashboardLayout } from '../../../layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import MobileStepper from '@mui/material/MobileStepper';

import CustomTabPanel from '@/components/_used-symline/tabs/tabsPanel';
import { dictionary, TranslatedWord } from '@/configs/i18next';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExperienceDialog from '@/components/_used-symline/dialogs/experience-dialog';
import { useRouter } from "next/navigation";
import Step1 from '@/components/_used-symline/steps/step1';
import Step2 from '@/components/_used-symline/steps/step2';
const Page = () => {

  const { i18n } = useTranslation();
  const title = 'Create RFP';
  const { t } = useTranslation();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [dialogName, setDialogName] = useState('');
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const handleClose = () => setOpen(false);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    if (activeStep !== maxSteps - 1) {

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {

      setTimeout(() => router.push("/"), 2500)
    }
  };


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
        bgcolor: 'primary.lightest',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,


      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 2 }} fontWeight={'bold'}>
          {dictionary(title as TranslatedWord)}
        </Typography>
        <Grid container spacing={3} justifyContent={'space-between'}>

          <Grid item xs={12}>
            <Card elevation={0} sx={{ p: 3 }}>
              <CardContent sx={{ p: 1 }}>
                <Grid container spacing={0} justifyContent={'space-between'} alignItems="center">
                  <Grid item xs={12} >

                    <Grid container spacing={0} direction={'row'} justifyContent={'space-between'} textAlign={'left'}>
                      <Grid item xs={12} sx={{ py: 1, px: 1, borderRadius: 1, bgcolor: "warning.lightest", display: 'flex', alignItems: "center", justifyContent: "space-between" }}>

                        <Typography variant="body2" fontWeight="bold" color="warning.darkest">{t("General questions")}</Typography>

                      </Grid>

                    </Grid>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }}>
                      {t("Type of the assessment ?")}
                    </Typography>

                  </Grid>
                  <Grid container sx={{ px: 2 }} spacing={1} alignItems="center" flexDirection={'row'} justifyContent={'start'} textAlign={'left'}>

                    <Grid item xs={6} md={3}>
                      <FormControlLabel
                        value="web"
                        control={<Checkbox />}
                        label={t("Web")}
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControlLabel
                        value="Architecture configuration review"
                        control={<Checkbox />}
                        label={t("Architecture configuration review")}
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControlLabel
                        value="مصدر الرمز"
                        control={<Checkbox />}
                        label={t("Source code")}
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControlLabel
                        value="Moblie"
                        control={<Checkbox />}
                        label={t("Mobile")}
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControlLabel
                        value="Network"
                        control={<Checkbox />}
                        label={t("Network")}
                        labelPlacement="end"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControlLabel
                        value="threat hunting"
                        control={<Checkbox />}
                        label={t("Threat hunting")}
                        labelPlacement="end"
                      />
                    </Grid>
                  </Grid>

                </Grid>

              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card elevation={0} sx={{ p: 3 }}>
              <CardContent sx={{ p: 1 }}>
                <Grid container spacing={2} justifyContent={'space-between'} alignItems="center">
                  <Grid item xs={12}>

                    <Box sx={{ my: 1, width: '100%', pa: 0 }}>
                      {steps[activeStep].step}
                    </Box>
                  </Grid>
                  <Grid item xs={5} >

                <MobileStepper
                
                  sx={{
                    direction: "rtl",
                    pa: 0,
                    '& .MuiMobileStepper-dots': {
                      visibility: 'hidden',
                    }
                  }}
                  steps={maxSteps}
                  position="static"
                  
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      variant="contained"
                      size="medium"
                      color='warning'
                      onClick={handleNext}

                    >
                      {activeStep === maxSteps - 1 ? t('confirm') : t('Next')}

                    </Button>
                  }
                  backButton={ activeStep == 1 ?
                    <Button variant="outlined"

                      size="medium" onClick={handleBack} >

                      {t('Back')}
                    </Button>
                    : ""
                  }
                />
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