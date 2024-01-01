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
  FormHelperText,
  FormGroup,
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
import { RequiredAstrisc } from "@/components/RequiredAstrisc";
import { addDays, isBefore } from "date-fns";

export interface IQuestion {
  id: string;
  type?: string;
  name: string;
}
export interface IProps {
  preferred_testing_time: string[];
  handleonchange: (event: any) => void;
  expiration_date: string | Date;
  firstFullName: string;
  firstEmail: string;
  firstMobile: string;
  secondFullName: string;
  secondEmail: string;
  secondMobile: string;
}
export enum PreferredTestingTime {
  DURING_WORKING_HOURS = "DURING_WORKING_HOURS",
  OFF_WORKING_HOURS = "OFF_WORKING_HOURS",
  WEEKEND = "WEEKEND",
  NOT_PREFFERED = "NOT_PREFFERED",
}
const questions: IQuestion[] = [
  {
    id: PreferredTestingTime.DURING_WORKING_HOURS,
    name: "During the working hours",
  },
  {
    id: PreferredTestingTime.OFF_WORKING_HOURS,
    name: "Off working hours",
  },
  {
    id: PreferredTestingTime.WEEKEND,
    name: "Weekends",
  },
  {
    id: PreferredTestingTime.NOT_PREFFERED,
    name: "No preference",
  },
];
function GeneralQuestions({
  preferred_testing_time,
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

  const [error, setError] = useState<string>("");

  const handlePhoneChange = (value: string | number, name: string) => {
    handleChange({
      target: {
        name,
        value: value,
      },
    });
  };
  const handleChangeExpireDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredDate = event.target.value;
    handleChange({
      target: {
        name: event.target.name,
        value: enteredDate,
      },
    });

    const selectedDate = new Date(enteredDate);
    if (isBefore(selectedDate, new Date())) {
      setError("Please select a date from tomorrow onwards.");
    } else {
      setError("");
    }
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
                  id="preferred_testing_time"
                >
                  {t("What is the allowed testing time ?")} <RequiredAstrisc />
                </Typography>
                  <Grid container>
                    {questions?.length &&
                      questions?.map((question: IQuestion) => {
                        return (
                          <Grid item xs={6} md={4} lg={3} key={question?.id}>
                            <FormControlLabel
                              sx={{ width: "100%" }}
                              value={question?.id}
                              control={<Checkbox color="warning" checked={preferred_testing_time?.includes(question?.id)} required={!(preferred_testing_time?.length>0)} />}
                              label={question?.name}
                              color="warning"
                              name="preferred_testing_time"
                              onChange={(e: any) => {
                                let new_preferred_testing_time = preferred_testing_time;
                                if(new_preferred_testing_time?.includes(e?.target?.value)){
                                    new_preferred_testing_time = new_preferred_testing_time?.filter(time=>time != e?.target?.value)
                                }
                                else{
                                  new_preferred_testing_time?.push(e?.target?.value)
                                }
                                handleChange({
                                  target: {
                                    name: e.target.name,
                                    value: new_preferred_testing_time,
                                  }
                                });
                              }}
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }}>
                {t("Select expire date")} <RequiredAstrisc />
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
                onChange={handleChangeExpireDate}
                inputProps={{
                  min: addDays(new Date(), 1).toISOString().split("T")[0],
                }}
                error={Boolean(error)}
                startAdornment={
                  <InputAdornment position="start">
                    <DateRangeOutlinedIcon />
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ color: (theme) => theme?.palette?.error.main, width: "100%" }}>
                {error}
              </FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" fontWeight="bold" sx={{ my: 1.5, mt: 3, px: 1 }}>
                {t(`In case of an emergency, what are the contact details of the person the assessor should
                    have contact with:`)}
              </Typography>
              <Box sx={{ px: 2 }}>
                <Typography variant="body1" fontWeight="bold" color="primary" sx={{ my: 2 }}>
                  {t("First person:")} {t("(Optional)")}
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
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Typography variant="body1" fontWeight="bold" color="primary" sx={{ my: 2 }}>
                  {t("Seconed person:")} {t("(Optional)")}
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
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default GeneralQuestions;
