import { useCallback, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { AuthLayout } from "../../../layouts/auth/layout";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
import useAlert from "@/hooks/use-alert";
import { showErrorMessage } from "@/utils/helperFunctions";

const Page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const auth = useAuth();
  const { showAlert, renderForAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Should be valid email").required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      setIsLoading(true);
      try {
        await auth?.requestRestPassword(values.email);
        showAlert(
          `Check your inbox for a password reset email from Symlink follow the instructions, and also check your spam/junk folder if not found.`,
          "success"
        );
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: showErrorMessage(err).toString() || "Unknown error occurred" });
        helpers.setSubmitting(false);
      } finally {
        helpers.setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Forget password | Symlink</title>
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
                Forget password
              </Typography>
              <Typography color="text.secondary" variant="body1" sx={{ fontWeight: 400, px: 1 }}>
                {t(
                  "No worriest! Just enter your email and we will send you a reset password link."
                )}
              </Typography>
            </Stack>
            {
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3} sx={{ direction: "rtl" }}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    name="email"
                    placeholder="ex.test@example.com"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                    sx={{
                      "& .muirtl-q7i02f-MuiFormHelperText-root": {
                        textAlign: "initial",
                      },
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
                    {t("Send Recovery Email")}
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
      {renderForAlert(4000)}
    </>
  );
};

Page.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;

export default Page;
