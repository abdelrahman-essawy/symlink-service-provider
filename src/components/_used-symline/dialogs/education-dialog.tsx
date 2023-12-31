


import * as React from "react";
import { Box, Dialog, TextField, Grid, CardHeader,FormControl, Card, CardContent, InputLabel, CardActions, Typography, Button, } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import {useState} from "react";
import * as Yup from "yup";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

export default function EducationDialog({ open, handleClose}: any) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const update = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setLoading(false);
    handleClose();
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Dialog
        maxWidth="md"
        sx={{whiteSpace: "nowrap", }}
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 2.5 } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <Card sx={{overflowY:'auto'  }}>
          <CardHeader title={
            <Typography
              sx={{ textAlign: "center" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >   {t('Edit educational info')}
            </Typography>
          }
            action={
              <HighlightOffRoundedIcon
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: "20px",
                  top: "20px",
                  color: "#C4C4C4",
                  cursor: "pointer",
                }}
              />
            } />

          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid

                container
               
                spacing={2}
                justifyContent={'start'}
                alignItems={'center'}
                flexDirection={'row'}
                display={'flex'}
              >
              
                <Grid item xs={12} >
                <FormControl fullWidth>

                <Typography sx={{ mx: 2, mb: 1}}  fontSize="medium" fontWeight="medium">
                    {t('Educational info')}
                  </Typography>
                  <TextField
                    id="title"
                    type="text"
                    multiline
                    rows={2}
                    placeholder={t("Type here ..") || "Type here .."}
                   InputProps={{
                    
                    sx: {
                      p:0,
                      borderRadius: '10px', // Set the desired border radius
                    },// Set the desired border radius
                    
                   }}
                
                
                    name="title"
                  />
                </FormControl>

                </Grid>
                <Grid item xs={2} >

                  <LoadingButton 
                    size="large"
                    onClick={update}
                    loading={loading}
                    color="warning"
                    sx={{ mt: 3, borderRadius: "50px", alignSelf: 'flex-end'}}
                    type="submit"
                    variant="contained"
                  >
                    {t("Update")}
                  </LoadingButton >
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}
