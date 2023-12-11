import React, { HtmlHTMLAttributes, useEffect, useState } from "react";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  InputLabel,
  FormControlLabel,
  TextField,
  OutlinedInput,
  InputAdornment,
  Box,
  Checkbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "@/styles/index.module.scss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import axiosClient from "@/configs/axios-client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import moment from "moment";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

export interface IQuestion {
  id: string;
  type: string;
  name: string;
}
export interface IProps {
  time_type_id: string;
  handleonchange: (event: any) => void;
  expiration_date: string | Date;
  firstFullName: string;
  firstEmail: string;
  firstMobile: string;
  secondFullName: string;
  secondEmail: string;
  secondMobile: string;
}
function GeneralQuestions({
  time_type_id,
  handleonchange: handleChange,
  expiration_date = moment().toISOString(true).slice(0, 19),
  firstFullName,
  firstEmail,
  firstMobile,
  secondFullName,
  secondEmail,
  secondMobile,
}: IProps) {
  const { t } = useTranslation();

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const fetchGernalQuestions = async () => {
    try {
      const res = await axiosClient?.get(`meta-data?status=times`);
      setQuestions(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGernalQuestions();
  }, []);

  const handlePhoneChange = (value: string | number, name: string) => {
    handleChange({
      target: {
        name,
        value: value,
      },
    });
  };
  return (
    <Grid item xs={12}>
      <Card elevation={1} sx={{ p: 3 }}>
        <CardContent sx={{ p: 1 }}>
          <Grid container spacing={0} justifyContent={"space-between"} alignItems="center">
            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                sx={{
                  p: 1,
                  px: 1,
                  borderRadius: 1,
                  bgcolor: "warning.lightest",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" fontWeight="bold" color="warning.darkest">
                  {t("General questions")}
                </Typography>
              </Grid>
              <FormControl required fullWidth>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ mb: 1, mt: 3, px: 1 }}
                  id="time_type_id"
                >
                  {t("What is the allowed  testing time ?")}
                </Typography>
                <RadioGroup
                  row
                  aria-labelledby="time_type_id"
                  name="time_type_id"
                  value={time_type_id}
                  onChange={handleChange}
                >
                  <Grid container>
                    {questions?.length &&
                      questions?.map((question: IQuestion) => {
                        return (
                          <Grid item xs={6} md={4} lg={3} key={question?.id}>
                            <FormControlLabel
                              sx={{ width: "100%" }}
                              value={question?.id}
                              control={<Radio color="warning" />}
                              label={question?.name}
                              color="warning"
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }}>
                {t("Select expire date")}
              </Typography>
              <OutlinedInput
                fullWidth={true}
                id="expiration_date"
                name="expiration_date"
                value={expiration_date}
                type="date"
                required
                className={styles.inputInput}
                sx={{
                  height: "100%",
                  "&": {
                    borderRadius: "50px",
                  },
                }}
                onChange={handleChange}
                inputProps={{
                  min: moment().toISOString(true).slice(0, 19),
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <DateRangeOutlinedIcon />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight="bold" sx={{ my: 1.5, mt: 3, px: 1 }}>
                {t(`In case of emergency , what is the contact details of the person the assessor should
                have a contact with :`)}
              </Typography>
              <Box sx={{ px: 2 }}>
                <Typography variant="body1" fontWeight="bold" color="primary" sx={{ my: 2 }}>
                  {t("First person:")}
                </Typography>
                <Grid
                  container
                  spacing={2}
                  justifyContent={"space-between"}
                  display={"flex"}
                  sx={{ px: 1 }}
                >
                  <Grid item xs={12} md={4}>
                    <InputLabel>{t("Full Name")}</InputLabel>
                    <TextField
                      fullWidth={true}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
                      placeholder={`${t("Type here ..")}`}
                      variant="outlined"
                      name="firstFullName"
                      value={firstFullName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputLabel>{t("Email")}</InputLabel>
                    <TextField
                      fullWidth={true}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
                      placeholder={`${t("Type here ..")}`}
                      type="email"
                      variant="outlined"
                      name="firstEmail"
                      value={firstEmail}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputLabel>{t("Mobile Number")}</InputLabel>
                    <Box sx={{ direction: "rtl" }}>
                      <PhoneInput
                        placeholder={t("Enter phone number")}
                        name="firstMobile"
                        value={firstMobile}
                        onChange={(e: any) => handlePhoneChange(e, "firstMobile")}
                        defaultCountry="SA"
                        className={styles.inputPhone}
                        required
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Typography variant="body1" fontWeight="bold" color="primary" sx={{ my: 2 }}>
                  {t("Seconed person:")}
                </Typography>
                <Grid
                  container
                  spacing={2}
                  justifyContent={"space-between"}
                  display={"flex"}
                  sx={{ px: 1 }}
                >
                  <Grid item xs={12} md={4}>
                    <InputLabel>{t("Full Name")}</InputLabel>
                    <TextField
                      fullWidth={true}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
                      placeholder={`${t("Type here ..")}`}
                      variant="outlined"
                      name="secondFullName"
                      value={secondFullName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputLabel>{t("Email")}</InputLabel>
                    <TextField
                      fullWidth={true}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
                      placeholder={`${t("Type here ..")}`}
                      variant="outlined"
                      type="email"
                      name="secondEmail"
                      value={secondEmail}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <InputLabel>{t("Mobile Number")}</InputLabel>
                    <Box sx={{ direction: "rtl" }}>
                      <PhoneInput
                        placeholder={t("Enter phone number")}
                        name="secondMobile"
                        value={secondMobile}
                        onChange={(e: any) => handlePhoneChange(e, "secondMobile")}
                        defaultCountry="SA"
                        className={styles.inputPhone}
                        required
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                sx={{
                  mt: 3,
                  p: 1,
                  px: 1,
                  borderRadius: 1,
                  bgcolor: "warning.lightest",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" fontWeight="bold" color="warning.darkest">
                  {t("Terms")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label={
                    <Typography variant="body1" color="initial">
                      {t(
                        `Whitebox (whitelist the assessor's IP of the and provide testing users for every role in the application)`
                      )}
                    </Typography>
                  }
                  control={
                    <Checkbox
                      checked={true}
                      onChange={(event: any) =>
                        handleChange({ target: { name: "term1", value: event.target.checked } })
                      }
                      color="warning"
                    />
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label={
                    <Typography variant="body1" color="initial">
                      {t(`Blackbox (the assessor has no knowledge of the application/ network)`)}
                    </Typography>
                  }
                  control={
                    <Checkbox
                      checked={true}
                      onChange={(event: any) =>
                        handleChange({ target: { name: "term1", value: event.target.checked } })
                      }
                      color="warning"
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default GeneralQuestions;
