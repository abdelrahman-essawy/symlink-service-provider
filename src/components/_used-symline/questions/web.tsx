
import { Box, Card, Container, createTheme, Stack, Radio, Tab, FormLabel, Grid, Select, Chip, CardHeader, Tabs, CardContent, Divider, Typography, Button, OutlinedInput, IconButton, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from "next/navigation";

export default function Web() {

  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>

      <Grid container spacing={0} alignItems="center" flexDirection={'row'} justifyContent={'start'} textAlign={'left'}>
        <Grid item xs={12} >
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
            {t("Type of the assessment ?")}
          </Typography>

          <Grid spacing={0} container alignItems="end" justifyContent="flex-start">
            <Grid item xs={6} md={4}>
              <FormControlLabel
                value="Web"
                control={<Checkbox />}
                label={t("Web")}
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControlLabel
                value="Architecture configuration review"
                control={<Checkbox />}
                label={t("Architecture configuration review")}
                labelPlacement="end"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
            {t("How many web applications you want to assess?")}
          </Typography>

          <Grid spacing={3} container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel sx={{ mx: 2 }}>
                {t('Internal applications')}
              </FormLabel>
              <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />

            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormLabel sx={{ mx: 2 }}>
                {t('Internal applications')}
              </FormLabel>
              <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />

            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
            {t("What many API functions you have in the application? (example: Register, Login, Create a ticket, Close a ticket, etc..)")}
          </Typography>

          <Grid spacing={0} container alignItems="end" justifyContent="flex-start">
            <Grid item xs={6} md={4}>
              <FormControlLabel
                value="small (1-5 API functions)"
                control={<Checkbox />}
                label={t("small (1-5 API functions)")}
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControlLabel
                value="medium (6-20 API functions)"
                control={<Checkbox />}
                label={t("medium (6-20 API functions)")}
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControlLabel
                value="large (20+ API functions"
                control={<Checkbox />}
                label={t("large (20+ API functions)")}
                labelPlacement="end"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
            {t("List the scoped applications:(i.e.domain.com)")}
          </Typography>

          <Grid spacing={3} container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12} >
              <FormLabel sx={{ mx: 2 }}>
                {t('(this option will be hidden from the bidders by default unless you want to be shown in the review page before publishing your proposal)')}
              </FormLabel>
              <TextField fullWidth={true} multiline rows={3} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />

            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
            {t("List the scoped applications:(i.e.domain.com)")}
          </Typography>

          <Grid spacing={3} container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12} >
              <FormLabel sx={{ mx: 2 }}>
                {t('(this option will be hidden from the bidders by default unless you want to be shown in the review page before publishing your proposal)')}
              </FormLabel>
              <TextField fullWidth={true} multiline rows={3} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' }, mt: 1 }} placeholder={`${t('Description')}`} variant="outlined" />

            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
            {t("Is verification required to assess whether the reported vulnerabilities have been fixed?")}
          </Typography>

          <Grid spacing={0} container alignItems="end" justifyContent="flex-start">
            <Grid item xs={6} md={4}>
              <FormControlLabel
                value="Yes"
                control={
                  <Radio
                    color="primary"

                    size="medium"

                  />
                }
                label={t("Yes")}
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControlLabel
                value="No"
                control={
                  <Radio
                    color="primary"

                    size="medium"

                  />
                }
                label={t("No")}
                labelPlacement="end"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
            {t("Is it mandatory that the assessor to be onsite ?")}
          </Typography>

          <Grid spacing={0} container alignItems="end" justifyContent="flex-start">
            <Grid item xs={6} md={4}>
              <FormControlLabel
                value="Yes"
                control={
                  <Radio
                    color="primary"

                    size="medium"

                  />
                }
                label={t("Yes")}
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControlLabel
                value="No"
                control={
                  <Radio
                    color="primary"

                    size="medium"

                  />
                }
                label={t("No")}
                labelPlacement="end"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} >
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3, }}>
            {t("If yes, how many times ?")}
          </Typography>

          <Grid spacing={3} container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={4}>
             
              <TextField fullWidth={true} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' }, mt: 1 }} placeholder={`${t('Type here ..')}`} variant="outlined" />

            </Grid>
           
          </Grid>
        </Grid>
      </Grid>

    </>
  )
}




