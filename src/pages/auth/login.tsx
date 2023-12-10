import { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React from "react";
import { useAuth } from "../../hooks/use-auth";
import { AuthLayout } from "../../layouts/auth/layout";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Page = () => {
  const { t , i18n} = useTranslation();
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("username");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("username is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth?.signIn(values.username, values.password);
        router.push("/projects");
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err?.response?.data?.message || "Unknown error occurred" });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleMethodChange = useCallback((_event: any, value: React.SetStateAction<string>) => {
    setMethod(value);
  }, []);

  const handleSkip = useCallback(() => {
    // auth.skip();
    router.push("/");
  }, [router]);

  return (
    <>
      <Head>
        <title>{t("Login")} | Symline</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
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
            {method === "username" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                  <Grid item xs={12}>
                    {/* <Stack spacing={2} sx={{ mb: 3 ,direction:i18n.language == 'ar' ? "ltr":"rtl" }}>
                      <Typography variant="h4">{t("Login")}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {t("Don't have an account")} &nbsp;
                        <Link href="/auth/register">{t("Register")}</Link>
                      </Typography>
                    </Stack> */}
                    <TextField
                      error={!!(formik.touched.username && formik.errors.username)}
                      fullWidth
                      helperText={formik.touched.username && formik.errors.username}
                      placeholder={`${t("username")}`}
                      name="username"
                      sx={{ mb: 3 }}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="username"
                      value={formik.values.username}
                    />
                    <TextField
                      error={!!(formik.touched.password && formik.errors.password)}
                      fullWidth
                      helperText={formik.touched.password && formik.errors.password}
                      placeholder={`${t("password")}`}
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
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
                    />
                    <Typography
                      sx={{
                        mx: 2,
                        mt: 2,

                        fontSize: 14,
                        fontWeight: 700,
                      }}
                      color={"primary"}
                    >
                      <NextLink href="/auth/login" style={{ textDecoration: "none" }}>
                        {t("Forgot password ?")}
                      </NextLink>
                    </Typography>
                    <Button
                      fullWidth
                      size="large"
                      color="warning"
                      sx={{ mt: 3, borderRadius: "50px" }}
                      type="submit"
                      variant="contained"
                    >
                      {t("continue")}
                    </Button>
                  </Grid>
                </Grid>

                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;

export default Page;
