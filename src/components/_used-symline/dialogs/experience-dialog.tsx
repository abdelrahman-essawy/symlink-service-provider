import * as React from "react";
import {
  Box,
  Dialog,
  TextField,
  Grid,
  CardHeader,
  FormControl,
  Card,
  CardContent,
  Typography,
  AlertColor,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import moment from "moment";
import styles from "@/styles/index.module.scss";
import axiosClient from "@/configs/axios-client";
import {  getUtcTime, showErrorMessage } from "@/utils/helperFunctions";
import { project } from "@/@types/user";

interface IProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  showAlert: (msg: string, status: AlertColor | undefined) => void;
  refreshProviderInfo: () => void;
  editValues: project | undefined;
}
const validationSchema = yup.object({
  name: yup.string().required("Project Name Required"),
  start_date: yup.date().typeError("Enter a start date").required("Enter a start date"),
  end_date: yup.date().min(yup.ref("start_date"), "End date must be after start date")
    .typeError("Enter an end date")
    .required("Enter an end date"),
  description: yup.string().nullable(),
});

export default function ExperienceDialog({
  open,
  handleClose,
  title,
  showAlert,
  refreshProviderInfo,
  editValues = undefined,
}: IProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      start_date: "",
      end_date: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (editValues !== undefined) {
        await EditSubmit(values as project);
      } else {
        await AddSubmit(values as project);
      }
      setLoading(false);
    },
  });

  React.useEffect(() => {
    if (editValues != undefined) {
      let _record = editValues;
      _record.start_date = moment((_record?.start_date)).toISOString(true).slice(0, 10)
      _record.end_date = moment((_record?.end_date)).toISOString(true).slice(0, 10)
      formik.setValues(_record);
    } else {
      //reset form for Add
      formik.setValues({
        name: "",
        start_date: "",
        end_date: "",
        description: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editValues,open]);

  const AddSubmit = async (values: project) => {
    try {
      await axiosClient.post("/provider/add-project", {
        ...values,
        start_date: getUtcTime(values?.start_date),
        end_date: getUtcTime(values?.end_date),
      });
      showAlert("Success! Your Project Experience Has Been Added", "success");
      refreshProviderInfo();
      formik.resetForm();
      handleClose();
    } catch (error) {
      showAlert(showErrorMessage(error), "error");
    }
  };

  const EditSubmit = async (values: project) => {
    try {
      await axiosClient.put(`/provider/update-project/${values?.id}`, {
        ...values,
        start_date: getUtcTime(values?.start_date),
        end_date: getUtcTime(values?.end_date),
      });
      showAlert("Success! Your Project Experience Has Been Edited", "success");
      refreshProviderInfo();
      formik.resetForm();
      handleClose();
    } catch (error) {
      showAlert(showErrorMessage(error), "error");
    }
  };
  return (
    <div>
      <Dialog
        maxWidth="md"
        sx={{ whiteSpace: "nowrap" }}
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 2.5 } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card sx={{ overflowY: "auto" }}>
          <CardHeader
            title={
              <Typography
                sx={{ textAlign: "center" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {t(`${title}`)}
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
            }
          />

          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                spacing={2}
                justifyContent={"start"}
                alignItems={"center"}
                flexDirection={"row"}
                display={"flex"}
              >
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography sx={{ mx: 1.5, mb: 0.5 }} fontSize="medium" fontWeight="medium">
                      {t("Project name")}
                    </Typography>
                    <TextField
                      id="name"
                      type="text"
                      placeholder={`${t("Project name")}`}
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(formik.errors.name) && formik.touched.name}
                      helperText={formik.touched.name && formik.errors.name}
                      sx={{
                        "& .muirtl-q7i02f-MuiFormHelperText-root": {
                          textAlign: "left",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Typography sx={{ mx: 1.5, mb: 0.5 }} fontSize="medium" fontWeight="medium">
                      {t("Date from")}
                    </Typography>
                    <TextField
                      fullWidth={true}
                      id="start_date"
                      name="start_date"
                      value={formik.values.start_date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(formik.errors.start_date) && formik.touched.start_date}
                      helperText={formik.touched.start_date && formik.errors.start_date}
                      type="date"
                      className={styles.inputInput}
                      sx={{
                        height: "100%",
                        "&": {
                          borderRadius: "50px",
                        },
                        "& .muirtl-q7i02f-MuiFormHelperText-root": {
                          textAlign: "initial",
                        },
                      }}
                      inputProps={{
                        min: moment().toISOString(true).slice(0, 19),
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Typography sx={{ mx: 1.5, mb: 0.5 }} fontSize="medium" fontWeight="medium">
                      {t("Date To")}
                    </Typography>
                    <TextField
                      fullWidth={true}
                      id="end_date"
                      name="end_date"
                      value={formik.values.end_date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="date"
                      error={Boolean(formik.errors.end_date) && formik.touched.end_date}
                      helperText={formik.touched.end_date && formik.errors.end_date}
                      className={styles.inputInput}
                      sx={{
                        height: "100%",
                        "&": {
                          borderRadius: "50px",
                        },
                        "& .muirtl-q7i02f-MuiFormHelperText-root": {
                          textAlign: "left",
                        },
                      }}
                      inputProps={{
                        min: moment().toISOString(true).slice(0, 19),
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography sx={{ mx: 1.5, mb: 0.5 }} fontSize="medium" fontWeight="medium">
                      {t("Description your project")}
                    </Typography>
                    <Box>
                      <TextField
                        sx={{
                          "& .MuiInputBase-root": {
                            borderRadius: "12px !important",
                            padding: "0px !important",
                          },
                        }}
                        fullWidth
                        id="Description"
                        placeholder={`${t("Type here your project Description")}`}
                        name={"description"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        error={!!formik.errors.description && formik.touched.description}
                        helperText={formik.touched.description && formik.errors.description}
                        multiline
                        rows={4}
                      />
                    </Box>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <LoadingButton
                    size="large"
                    type="submit"
                    loading={loading}
                    color="warning"
                    sx={{ mt: 3, borderRadius: "50px", alignSelf: "flex-end" }}
                    variant="contained"
                  >
                    {editValues == undefined ? t("Add") : t("Update")}
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  );
}
