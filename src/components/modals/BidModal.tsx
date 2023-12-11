import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Checkbox,
  FormControlLabel,
  Dialog,
  Grid,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  TextField,
} from "@mui/material";
import axiosClient from "@/configs/axios-client";
import { showErrorMessage } from "@/utils/helperFunctions";

const validationSchema = yup.object({
  price: yup.number().required().positive("Price should be number"),
  duration: yup.string().required("Duration is required"),
  duration_num: yup.number().required().positive("Duration should be number"),
  is_anonymous: yup.boolean().nullable(),
});

export default function BasicModal({ open, handleClose, multi_RFP_id, showMessage }: any) {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      price: 0,
      duration: "",
      duration_num: 0,
      is_anonymous: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axiosClient.post(`/offers/add-offer-to-project`, { ...values, multi_RFP_id });
        showMessage("Your offer has been successfully sent to the client! 🚀", "success");
        formik.resetForm();
        handleClose();
      } catch (error) {
        showMessage(showErrorMessage(error).toString(), "error");
      }
    },
  });

  return (
    <Box>
      <Dialog
        maxWidth="xs"
        sx={{ whiteSpace: "nowrap" }}
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 2.5 } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card>
          <CardHeader
            action={
              <HighlightOffRoundedIcon
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  cursor: "pointer",
                  top: 15,
                  right: 15,
                }}
                color="primary"
              />
            }
          />
          <Typography
            sx={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {t("Put your bid")}
          </Typography>
          <CardContent>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    px: 2,
                    gap: 0.5,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography sx={{ mx: 1 }} variant="subtitle2" fontWeight="bold">
                    {t("Pick duration")}
                  </Typography>
                  <Grid
                    container
                    spacing={0}
                    justifyContent="space-between"
                    sx={{ direction: "rtl" }}
                  >
                    <Grid item xs={8} md={9}>
                      <TextField
                        type="number"
                        fullWidth
                        placeholder={`${t("Number here ")}`}
                        sx={{
                          "& .MuiInputBase-root": { borderRadius: "0px 50px 50px 0px", py: 0.4 },
                        }}
                        id="outlined-adornment-amount"
                        name="duration_num"
                        value={formik.values.duration_num}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors.duration_num) && formik.touched.duration_num}
                        helperText={formik.touched.duration_num && formik.errors.duration_num}
                      />
                    </Grid>

                    <Grid item xs={4} md={3}>
                      <FormControl
                        fullWidth
                        error={formik.touched.duration && Boolean(formik.errors.duration)}
                      >
                        <Select
                          sx={{ borderRadius: "50px 0px 0px 50px" }}
                          fullWidth
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          value={formik.values.duration}
                          name="duration"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <MenuItem disabled value="">
                            {t("Pick duration")}
                          </MenuItem>
                          <MenuItem value={"hour"}>{t("Hour")}</MenuItem>
                          <MenuItem value={"day"}>{t("Day")}</MenuItem>
                          <MenuItem value={"week"}>{t("Week")}</MenuItem>
                          <MenuItem value={"month"}>{t("Month")}</MenuItem>
                          <MenuItem value={"year"}>{t(" Year")}</MenuItem>
                        </Select>
                        <FormHelperText>
                          {formik.touched.duration && formik.errors.duration}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Typography sx={{ mx: 1 }} variant="subtitle2" fontWeight="bold">
                    {t("Put your price")}
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      placeholder="00.0"
                      sx={{ borderRadius: "50px" }}
                      id="outlined-adornment-amount"
                      name="price"
                      value={formik?.values?.price}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      error={formik.touched.price && !!formik.errors.price}
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mt: 2, p: 0, mx: 0 }}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={t("Put your deal as anonymous")}
                      labelPlacement="end"
                      value={formik.values.is_anonymous}
                      name="is_anonymous"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormHelperText>{formik.errors.is_anonymous}</FormHelperText>
                  </FormControl>

                  <FormControl fullWidth>
                    <Button
                      fullWidth
                      color="primary"
                      sx={{ mt: 3, borderRadius: "50px", color: "white" }}
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
    </Box>
  );
}
