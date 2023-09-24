import { Box, Card, Container, createTheme, Stack, Tab, FormLabel, Grid, Select, Chip, CardHeader, Tabs, CardContent, Divider, Typography, Button, OutlinedInput, IconButton, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useState, useRef } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from 'dayjs';


export default function Step1() {

  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const router = useRouter();
  const [country, setCountry] = useState('');
  const [date, setDate] = React.useState<Dayjs>(); // dayjs('2023-08-27')
  const [hide, setHide] = useState('hidden');
const [show, setShow] = useState(true);
const [show2, setShow2] = useState(true);

const showIcon = () => {
  setShow(!show);
};
const showIcon2 = () => {
  setShow2(!show2);
};
  return (
    <>

      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} md={7.5} >
          <Box sx={{ py: 1, px: 1, borderRadius: 1, bgcolor: "warning.lightest", display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="body2" fontWeight="bold" color="warning.darkest">{t("General questions")}</Typography>
          </Box>
          <Grid container spacing={0} alignItems="center" flexDirection={'row'} justifyContent={'start'} textAlign={'left'}>
            <Grid item xs={12} >
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
                {t("Select expire date")}
              </Typography>
              <Box sx={{ px: 1, direction: 'rtl' }}>
                <DatePicker
                  disablePast
                  renderInput={(props: any) => <TextField  {...props} />}
                  value={`${date || '09/27/2023'}`}
                  onChange={(newVal: any) => setDate(newVal)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
                {t("What is the preferred testing time?")}
              </Typography>
              <Box>
                <Grid spacing={0} container alignItems="center" justifyContent="flex-start">
                  <Grid item xs={6} >
                    <FormControlLabel
                      value="During the working hours"
                      control={<Checkbox />}
                      label={t("During the working hours")}
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item xs={6} >
                    <FormControlLabel
                      value="Weekends"
                      control={<Checkbox />}
                      label={t("Weekends")}
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item xs={6} >
                    <FormControlLabel
                      value="Off working hours"
                      control={<Checkbox />}
                      label={t("Off working hours")}
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item xs={6} >
                    <FormControlLabel
                      value="No preference"
                      control={<Checkbox />}
                      label={t("No preference")}
                      labelPlacement="end"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} >
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
                {t("What is the preferred testing time?")}
              </Typography>
              <Grid spacing={0} container alignItems="center" justifyContent="flex-start">
                <Grid item xs={12} md={6}>
                  <Typography variant="button" color="primary" fontWeight="bold">
                    {t("First person:")}
                  </Typography>
                  <Grid container spacing={3} justifyContent="flex-start" alignItems="center" sx={{ mt: 2 }}>
                    <Grid item xs={12} md={10}>
                      <FormLabel sx={{ mx: 2 }}>
                        {t('Full Name')}
                      </FormLabel>
                      <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <FormLabel sx={{ mx: 2 }}>
                        {t('Email')}
                      </FormLabel>
                      <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <FormLabel sx={{ mx: 2 }}>
                        {t('Mobile')}
                      </FormLabel>
                      <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="button" color="primary" fontWeight="bold">
                    {t("Seconed person:")}
                  </Typography>
                  <Grid container spacing={3} justifyContent="flex-start" alignItems="center" sx={{ mt: 2 }}>
                    <Grid item xs={12} md={10}>
                      <FormLabel sx={{ mx: 2 }}>
                        {t('Full Name')}
                      </FormLabel>
                      <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <FormLabel sx={{ mx: 2 }}>
                        {t('Email')}
                      </FormLabel>
                      <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <FormLabel sx={{ mx: 2 }}>
                        {t('Mobile')}
                      </FormLabel>
                      <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
        <Divider variant="fullWidth" orientation="vertical" flexItem={true} sx={{ mx: 2, borderColor: 'lightgrey' }} />
        <Grid item xs={12} md={4} sx={{ pt: { xs: 4, md: 0 } }}>
          <Box sx={{ py: 1, px: 1, borderRadius: 1, bgcolor: "warning.lightest", display: 'flex', alignItems: "center", justifyContent: "space-between" }}>

            <Typography variant="body2" fontWeight="bold" color="warning.darkest">{t("Terms")}</Typography>

          </Box>
          <Grid container spacing={3} alignItems="center" flexDirection={'row'} justifyContent={'start'} >
            <Grid item xs={12} sx={{ mt: 3, display: 'flex', flexDirection: 'row', alignItems:"center" }}>
              <IconButton color="warning" aria-label="add an alarm" size='small' sx={{ border: `1px solid #ffe3a0` }} onClick={showIcon}>
                <CheckIcon fontSize='small' sx={{color: 'warning.dark',visibility: show ? 'hidden' : 'visable'}} />
              </IconButton>
              <Typography sx={{px:1}} variant="body2">{t("Whitebox(whitelist the assessor's IP of the and provide testing users for every role in the application)")}</Typography>


            </Grid>
            <Grid item xs={12} sx={{ mt: 3, display: 'flex', flexDirection: 'row', alignItems:"center" }}>
              <IconButton color="warning" aria-label="add an alarm" size='small' sx={{ border: `1px solid #ffe3a0` }} onClick={showIcon2}>
                <CheckIcon fontSize='small' sx={{color: 'warning.dark',visibility: show2 ? 'hidden' : 'visable'}} />
              </IconButton>
              <Typography sx={{px:1}} variant="body2" >{t("Blackbox (the assessor has no knowledage of the application/ network)")}</Typography>


            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}


