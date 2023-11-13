import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from 'react';
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from "formik";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as Yup from "yup";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { Checkbox, TextField, FormControlLabel, Dialog, Card, CardContent, CardHeader } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ViewImagesDialog({ open, handleClose }: any) {
  const { t } = useTranslation();
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(dayjs());
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(dayjs());


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
        maxWidth="sm"
        sx={{ whiteSpace: "nowrap", }}
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 2.5 } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <Card sx={{ overflowY: 'auto' }}>
          <CardHeader sx={{ p: 0, m: 0 }}
            action={
              <HighlightOffRoundedIcon
                onClick={handleClose}
                sx={{
                  position: "relative",
                  transform: 'translate(-100%, 80%)',
                  color: "#C4C4C4",
                  cursor: "pointer",
                }}
              />
            }
          />
          <Typography
            sx={{ textAlign: "center", mt: 2 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {t("Attached file name")}
          </Typography>
          <CardContent>
            <Box >
                <Box
               
                minHeight="250px"

                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    px: 4,
                    borderRadius: 2,
                    gap: 1,
                    bgcolor: 'lightgrey',
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
              <PhotoSizeSelectActualIcon fontSize="inherit" color="inherit" sx={{color: 'darkgrey', fontSize: '100px'}}/>
                </Box>
            </Box>

          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}


