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
export interface IUserProfile {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  account: string;
  username: string;
  linkedin: any;
  name: any;
  password: string;
  email: string;
  email_verified_at: any;
  phone: any;
  phone_verified_at: any;
  avatar: string;
  gender: any;
  fcm_token: any;
  language: string;
  is_active: boolean;
  city_id: any;
  roles: string[];
  city: ICity;
}

const toBeSent = ["name", "email", "linkedin", "city_id", "phone"];
interface ICountry {
  name: string;
  id: string;
}
interface ICity {
  name: string;
  id: string;
  country_id: string;
  country: ICountry[];
}
const Page = () => {
  const { i18n } = useTranslation();
  const title = "Profile";
  const { t } = useTranslation();
  const auth = useAuth();
  const [value, setValue] = React.useState(0);
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
      showAlert(error.response.data.message);
    }
  };

  //when change Country id
  React.useEffect(() => {
    fetchCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileFormRecord?.city?.country_id]);

  React.useEffect(() => {
    console.log(profileFormRecord);
  }, [profileFormRecord]);

  const fetchCountries = async () => {
    try {
      const res = await axiosClient.get("/addresses/country?page=1&limit=10");
      setCountries(res.data.data);
    } catch (error: any) {
      showAlert(error.response.data.message);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axiosClient.get(
        `/addresses/country/${profileFormRecord?.city?.country_id}`
      );
      setCities(res.data.data);
    } catch (error: any) {
      showAlert(error.response.data.message);
    }
  };
  React.useEffect(() => {
    (async () => {
      await fetchCountries();
      await fetchCities();
      await fetchUserProfile();
    })();
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

  const handlePhoneChange = (event: any) => {
    handleChange({
      target: {
        name: "phoneNumber",
        value: event,
      },
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          bgcolor: "primary.lightest",
          borderTopLeftRadius: i18n.language == "ar" ? 25 : 0,
          borderBottomLeftRadius: i18n.language == "ar" ? 25 : 25,
          borderTopRightRadius: i18n.language == "ar" ? 0 : 25,
          borderBottomRightRadius: i18n.language == "ar" ? 0 : 25,
        }}
      >
{  !isLoadingData&&
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
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
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
                        <TextField
                          fullWidth={true}
                          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                          placeholder={`${t("Type here ..")}`}
                          variant="outlined"
                          name="text"
                          value={profileFormRecord?.phone || ""}
                          onChange={(e: any) =>
                            handleChange({
                              target: {
                                value: parseFloat(e?.target?.value),
                                name: "phone",
                              },
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel id={"city_id"} sx={{ mx: 2 }}>
                          {t("City")}
                        </InputLabel>
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
                          disabled={!profileFormRecord?.city?.country_id}
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ mx: 2 }}>{t("Email")}</FormLabel>
                        <TextField
                          fullWidth={true}
                          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                          placeholder={`${t("Type here ..")}`}
                          variant="outlined"
                          name="email"
                          value={profileFormRecord?.email}
                          onChange={handleChange}
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
        }
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
