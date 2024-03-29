import Head from "next/head";
import {
  Box,
  Card,
  Container,
  Select,
  TextField,
  FormLabel,
  MenuItem,
  Grid,
  IconButton,
  CardContent,
  Typography,
  Button,
  InputAdornment,
  Avatar,
  Badge,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axiosClient from "@/configs/axios-client";
import useAlert from "@/hooks/use-alert";
import { useAuth } from "@/hooks/use-auth";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import PasswordIcon from "@mui/icons-material/Password";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "@/styles/index.module.scss";
import { ICity, ICountry, IUserProfile } from "@/@types/user";
// import * as yup from "yup";

const toBeSent = ["name", "email", "linkedin", "city_id", "phone"];
// const validationSchema = yup.object({
//   name: yup.string().trim(),
//   email: yup.string().email(),
//   linkedin: yup.string(),
//   city_id: yup.string(),
//   phone: yup.number(),
// });
const Page = () => {
  const { i18n } = useTranslation();
  const title = "Profile";
  const { t } = useTranslation();
  const auth = useAuth();
  const { showAlert, renderForAlert } = useAlert();
  const [countries, setCountries] = React.useState<ICountry[] | undefined>(undefined);
  const [cities, setCities] = React.useState<ICity[] | undefined>(undefined);
  const [profileFormRecord, setProfileFormRecord] = React.useState<IUserProfile | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const fetchUserProfile = async () => {
    try {
      setIsLoadingData(true);
      const res = await axiosClient.get("/profile");
      setProfileFormRecord(res.data.data);
      setIsLoadingData(false);
    } catch (error: any) {
      showAlert(error?.response?.data?.message);
    }
  };

  //when change Country id
  React.useEffect(() => {
    if(profileFormRecord){
      setProfileFormRecord({...profileFormRecord,city:{...profileFormRecord?.city,name:"",id:""},city_id:""});
    }
    console.log(profileFormRecord?.city);
    fetchCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileFormRecord?.city?.country_id]);

  const fetchCountries = async () => {
    try {
      const res = await axiosClient.get("/addresses/country?page=1&limit=10");
      setCountries(res.data.data);
    } catch (error: any) {
      showAlert(error?.response?.data?.message);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axiosClient.get(
        `/addresses/country/${profileFormRecord?.city?.country_id}`
      );
      setCities(res.data.data);
    } catch (error: any) {
      showAlert(error?.response?.data?.message);
    }
  };
  React.useEffect(() => {
    (async () => {
      await fetchCountries();
      await fetchCities();
      await fetchUserProfile();
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedFile, setSelectedFile] = useState<string | Blob>("");
  const [formData, setFormData] = useState<FormData | any>(new FormData());
  const [previewUrl, setPreviewUrl] = useState("");

  // handle file selection
  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formData.set(event.target.name, file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  function handleChange(event: any) {
    const data: any = { ...profileFormRecord };
    data[event.target.name] = event.target.value;
    setProfileFormRecord(data as IUserProfile);
  }

  const handlePhoneChange = (value: string | number, name: string) => {
    handleChange({
      target: {
        name,
        value: value,
      },
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const profileFormRecordToBeSent: any = profileFormRecord;
    Object.keys(profileFormRecordToBeSent as any)
      .filter((i) => toBeSent.includes(i))
      .forEach((key: string) => {
        if (profileFormRecordToBeSent[key]) {
          formData.set(key, profileFormRecordToBeSent[key]);
        }
      });

    await auth
      ?.updateProfile(formData)
      .then(() => {
        fetchUserProfile();
        showAlert("Your Profile has been edited successfully", "success");
      })
      .catch((err: any) => {
        showAlert(err?.response?.data?.message, "error");
      });
  };
  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>

      {!isLoadingData && (
        <form onSubmit={handleSubmit}>
          <Container maxWidth="xl">
            <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
              {t("Profile")}
            </Typography>
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid item xs={12}>
                <Card elevation={0}>
                  <CardContent sx={{ p: 1 }}>
                    <Grid container spacing={4} p={10} justifyContent={"space-between"}>
                      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                          badgeContent={
                            <Avatar
                              alt={auth?.user?.name}
                              src="/static/images/avatar/2.jpg"
                              sx={{ boxShadow: "-6px 7px 8px rgba(0, 0, 0, 0.08)" }}
                            >
                              <Button
                                variant="contained"
                                size="large"
                                component="label"
                                sx={{ color: "white" }}
                              >
                                <PhotoCameraIcon fontSize="small" />
                                <input type="file" name="file" onChange={handleFileSelect} hidden />
                              </Button>
                            </Avatar>
                          }
                        >
                          <Avatar
                            sx={{ width: 100, height: 100 }}
                            alt={auth?.user?.name}
                            src={previewUrl || profileFormRecord?.avatar}
                          ></Avatar>
                        </Badge>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ mx: 2 }}>{t("Full Name")}</FormLabel>
                        <TextField
                          fullWidth={true}
                          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                          placeholder={`${t("Type here ..")}`}
                          variant="outlined"
                          name="name"
                          value={profileFormRecord?.name}
                          onChange={handleChange}
                          InputProps={{
                            required:true,
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} >
                        <FormLabel sx={{ mx: 2 }}>{t("Location")}</FormLabel>
                        <Select
                          fullWidth
                          sx={{
                            mt: 1,
                            borderRadius: "50px",
                            "& .muirtl-19j8lcu-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                              {
                                height: "20.125px",
                              },
                            "& svg ,& .MuiSvgIcon-root, & .MuiSelect-icon,& .MuiSelect-iconOutlined":
                              {
                                position: "relative !important",
                                margin:"0 10px !important",
                              },
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 150,
                              },
                            },
                          }}
                          variant="outlined"
                          name="country_id"
                          value={profileFormRecord?.city?.country_id}
                          defaultValue={profileFormRecord?.city?.country_id}
                          onChange={(e: any) => {
                            handleChange({
                              target: { name: "city", value: { country_id: e.target.value } },
                            });
                          }}
                          endAdornment={
                            profileFormRecord?.city?.country_id && (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    handleChange({
                                      target: { name: "city", value: { country_id: null } },
                                    })
                                  }
                                  size="small"
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        >
                          {countries &&
                            countries?.map((item: ICountry) => (
                              <MenuItem key={item?.id} value={item?.id}>
                                {item?.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ mx: 2 }}>{t("Phone Number")}</FormLabel>
                        <Box sx={{ direction: "rtl" }}>
                          <PhoneInputWithCountrySelect
                            placeholder={t("Enter phone number")}
                            name="phone"
                            value={profileFormRecord?.phone || ""}
                            onChange={(e: any) => handlePhoneChange(e, "phone")}
                            defaultCountry="SA"
                            className={styles.inputPhone}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel id={"city_id"} sx={{ mx: 2 }}>
                          {t("City")}
                        </InputLabel>
                        <FormControl required={!!(profileFormRecord?.city?.country_id)} sx={{ m: 1, minWidth: "100%" }}>
                        <Select
                          labelId="city_id"
                          id="city_id"
                          fullWidth={true}
                          sx={{
                            mt: 1,
                            borderRadius: "50px",
                            "& .muirtl-19j8lcu-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                              {
                                height: "20.125px",
                              },
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 150,
                              },
                            },
                          }}
                          variant="outlined"
                          name="city_id"
                          value={profileFormRecord?.city_id}
                          defaultValue={profileFormRecord?.city_id}
                          onChange={handleChange}
                          // disabled={!profileFormRecord?.city}
                          endAdornment={
                            profileFormRecord?.city_id && (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    handleChange({ target: { name: "city_id", value: null } })
                                  }
                                  size="small"
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        >
                          {cities &&
                            cities?.map((item: ICity, index: number) => (
                              <MenuItem key={item?.id || index} value={item?.id || item?.name}>
                                {item?.name}
                              </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ mx: 2 }}>{t("Email")}</FormLabel>
                        <TextField
                          fullWidth={true}
                          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                          placeholder={`${t("Type here ..")}`}
                          variant="outlined"
                          name="email"
                          type="email"
                          value={profileFormRecord?.email}
                          onChange={handleChange}
                          InputProps={{
                            type:"email",
                            startAdornment: (
                              <InputAdornment position="start">
                                <AlternateEmailIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ mx: 2 }}>{t("linkedin")}</FormLabel>
                        <TextField
                          fullWidth={true}
                          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                          placeholder={`${t("Type here ..")}`}
                          variant="outlined"
                          name="linkedin"
                          value={profileFormRecord?.linkedin}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LinkedInIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                          variant="contained"
                          color="warning"
                          sx={{ borderRadius: 8, p: 1.7, width: "100%" }}
                          type="submit"
                        >
                          {isLoading ? <CircularProgress thickness={1.5} /> : t("Update")}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {renderForAlert()}
          </Container>
        </form>
      )}
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
