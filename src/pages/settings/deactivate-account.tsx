import Head from "next/head";
import { Box, Card, Container, Button, Typography } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import ErrorIcon from "@mui/icons-material/Error";
import { useFormik } from "formik";
import * as Yup from "yup";

const Page = () => {
  const title = `Deactivate account`;
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const formik = useFormik({
    initialValues: {
      deactivation: false,
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Head>
        <title>{title} | Symlink</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          bgcolor: "primary.lightest",
          borderTopLeftRadius: i18n.language == 'ar' ? 25 : 0,
          borderBottomLeftRadius: i18n.language == 'ar' ? 25 : 25,
          borderTopRightRadius: i18n.language == 'ar' ? 0 : 25,
          borderBottomRightRadius: i18n.language == 'ar' ? 0 : 25,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">{t(title)}</Typography>

          <Card sx={{ mt: 3, p: 3 }}>
            <Box
              sx={{
                flexGrow: 1,
                py: 8,
              }}
            >
              <Card
                sx={{
                  mt: 3,
                  p: 3,
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "flex-start",
                  bgcolor: "#F6F6F6",
                }}
              >
                <ErrorIcon sx={{ color: "#84818A" }} />

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: "bold" }} variant="body1">
                    {t("You Are Deactivating Your Account")}
                  </Typography>
                  <Typography variant="body2">
                    {t(
                      "For extra security, this requires you to confirm your email or phone number when you reset your sign in password. Learn more"
                    )}
                  </Typography>
                </Box>
              </Card>
              <form action="">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "100px",
                  }}
                >
                  <Box
                    sx={{
                      margin: 5,
                    }}
                  >
                    <input
                      type="checkbox"
                      id="deactivation"
                      name="deactivation"
                      checked={formik.values.deactivation}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="deactivation">{t("Confirm Account Deactivation")}</label>
                  </Box>

                  <Button
                    size="large"
                    color="warning"
                    sx={{ mt: 3, borderRadius: "50px", alignSelf: "center" }}
                    type="submit"
                    variant="contained"
                  >
                    {t("Deactivate account")}
                  </Button>
                </Box>
              </form>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
