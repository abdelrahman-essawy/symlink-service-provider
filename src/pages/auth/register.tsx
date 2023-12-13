import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
  Typography,
  Select,
  FormLabel,
  Grid,
  Avatar,
  Badge,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { AuthLayout } from "../../layouts/auth/layout";
import { useTranslation } from "react-i18next";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const { t, i18n } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  // handle file selection
  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  const Roles = [
    {
      id: "1",
      name: "Expert",
    },
    {
      id: "2",
      name: "Company",
    },
  ];
  const formik = useFormik({
    initialValues: {
      email: "",
      role: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      role: Yup.string().required("role is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth?.signUp(selectedFile, values.email, values.password, values.role);
        router.push("/auth/login");
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>{t("Register")} | Symline</title>
      </Head>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            width: "100%",
          }}
        >
          <div>
            {/* <Stack spacing={1} sx={{ mb: 3 ,direction:i18n.language == 'ar' ? "ltr":"rtl" }}>
              <Typography variant="h4">{t("Register")}</Typography>
              <Typography color="text.secondary" variant="body2">
                {t("Already have an account?")}
                &nbsp;
                <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
                  {t("Log in")}
                </Link>
              </Typography>
            </Stack> */}
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    badgeContent={
                      <Avatar
                        alt="New Account"
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
                          <input type="file" onChange={handleFileSelect} hidden />
                        </Button>
                      </Avatar>
                    }
                  >
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      alt="Travis Howard"
                      src={previewUrl}
                    ></Avatar>
                  </Badge>
                </Grid>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  placeholder={`${t("Email")}`}
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  autoComplete="off"
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  placeholder={`${t("password")}`}
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={formik.values.password}
                  autoComplete="off"
                />

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <RadioGroup
                      row
                      value={formik.values.role}
                      name="role"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <Grid container>
                        {Roles?.length &&
                          Roles?.map((role: any) => {
                            return (
                              <Grid item xs={6} md={4} lg={3} key={role?.id}>
                                <FormControlLabel
                                  sx={{ width: "100%" }}
                                  value={role?.id}
                                  control={<Radio color="warning" />}
                                  label={t(role?.name)}
                                  color="warning"
                                />
                              </Grid>
                            );
                          })}
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3, borderRadius: "50px" }}
                type="submit"
                variant="contained"
                color="warning"
              >
                {t("Create")}
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;

export default Page;
