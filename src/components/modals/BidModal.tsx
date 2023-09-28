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

export default function BasicModal({ open, handleClose }: any) {
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
        maxWidth="xs"
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
            {t("Put your bid")}
          </Typography>
          <CardContent>
            <Box sx={{}}>
              <form onSubmit={formik.handleSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    px: 4,
                    gap: 1,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">{t("Pick duration")}</Typography>
                  <FormControl fullWidth sx={{ direction: 'rtl' }} >
                    {/* For DateRangePicker */}

                    <DatePicker

                      renderInput={(props: any) => <TextField  {...props} helperText={t("From")} />}
                      value={`${dateFrom}`}
                      onChange={(newVal: any) => setDateFrom(newVal)}
                    />


                    {/*     <Select
                  
                    sx={{ borderRadius: "50px" }}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>{t("Pick duration")}</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select> */}
                  </FormControl>
                  <FormControl fullWidth sx={{ direction: 'rtl' }} >
                    {/* For DateRangePicker */}

                    <DatePicker


                      renderInput={(props: any) => <TextField  {...props} helperText={t("To")} />}
                      value={`${dateTo}`}
                      onChange={(newVal: any) => setDateTo(newVal)}
                    />


                  </FormControl>
                  <Typography variant="subtitle2" fontWeight="bold">{t("Put your price")}</Typography>
                  <FormControl fullWidth >
                    <OutlinedInput
                      type="number"
                      placeholder="00.0"
                      sx={{ borderRadius: "50px" }}
                      id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </FormControl>
                  <FormControlLabel

                    control={<Checkbox defaultChecked />}
                    label={t("Put your deal as anonymous")}
                    labelPlacement="end"

                  />
                  <FormControl fullWidth >


                    <Button
                      fullWidth
                      color="primary"
                      sx={{ mt: 3, borderRadius: "50px", p: 1.7, color: 'white' }}
                      type="submit"
                      variant="contained"
                    >
                      {t("Send")}
                    </Button>

                  </FormControl>
                </Box>
              </form>
            </Box>

          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}


