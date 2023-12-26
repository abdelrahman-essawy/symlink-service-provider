import { useCallback, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import NextLink from "next/link";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { AuthLayout } from "../../../layouts/auth/layout";
import { useTranslation } from "react-i18next";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useAlert from "@/hooks/useAlert";
import { useAuth } from "@/hooks/use-auth";
import axiosClient from "@/configs/axios-client";
import { showErrorMessage } from "@/utils/helperFunctions";
const Page = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { token } = router.query;
  const auth = useAuth();
  const { showAlert, renderForAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long."
      ).required(),
      confirmPassword: Yup.string().oneOf([Yup.ref("newPassword")], "Passwords must match").required(),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);
      if (typeof token == "string") {
        try {
          await axiosClient.post(`/auth/reset-password/${token}`, {
            newPassword: values?.newPassword,
          });
          showAlert("Your Password has been reset successfully", "success");
          router.push("/auth/login");
        } catch (err: any) {
          helpers.setStatus({ success: false });
          helpers.setErrors({
            submit: showErrorMessage(err).toString() || "Unknown error occurred",
          });
        } finally {
          helpers.setSubmitting(false);
          setIsLoading(false);
        }
      }
    },
  });

  const handleClickShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <>
      <Head>
        <title>New Password | Symlink</title>
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
            maxWidth: 418,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, px: 1 }}>
                {t("New Password")}
              </Typography>
              <Typography color="text.secondary" variant="body1" sx={{ fontWeight: 400, px: 1 }}>
                {t("Please create a new password that you don’t use on any other site.")}
              </Typography>
            </Stack>
            {
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                    fullWidth
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    placeholder={"New Password"}
                    name="newPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type={showNewPassword ? "text" : "password"}
                    value={formik.values.newPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleClickShowNewPassword}
                          >
                            {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    fullWidth
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    placeholder={"confirm Password"}
                    name="confirmPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleClickShowConfirmPassword}
                          >
                            {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {formik.errors.submit && (
                    <Typography color="error" variant="body2">
                      {formik.errors.submit}
                    </Typography>
                  )}
                  <Button
                    fullWidth
                    size="large"
                    color="warning"
                    sx={{ mt: 3, borderRadius: "50px" }}
                    type="submit"
                    variant="contained"
                  >
                    {t("Submit")}
                  </Button>
                  <Stack
                    spacing={1}
                    sx={{
                      mb: 3,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="text.secondary" variant="body2">
                      {t("Just remember?")}
                      &nbsp;
                      <Link
                        component={NextLink}
                        href="/auth/login"
                        underline="hover"
                        variant="body2"
                        fontWeight={700}
                      >
                        {t("Log in")}
                      </Link>
                    </Typography>
                  </Stack>
                </Stack>
              </form>
            }
          </div>
        </Box>
      </Box>
      {renderForAlert()}
    </>
  );
};

Page.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
export default Page;
