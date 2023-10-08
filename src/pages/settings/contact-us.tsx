import Head from "next/head";
import { Box, Container, Typography, Grid, Avatar, TextField, Button } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { Card } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import StyledTextarea from "../../components/StyledTextArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const DATA = {
  phone: "123456789",
  email: "a@b.com",
  address: "123 Main St",
};

const Page = () => {
  const title = "Contact us";
  // ----------- hooks -------------
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
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
        <Typography variant="h4">{t(title)}</Typography>
        <Container maxWidth="xl">
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 1, mt: 2 }}>
                <ContactCards label={"Phone"} data={DATA.phone} icon={PhoneIcon} />
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 1, mt: 2 }}>
                <ContactCards label={"Email"} data={DATA.email} icon={EmailIcon} />
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 1, mt: 2 }}>
                <ContactCards label={"Address"} data={DATA.address} icon={LocationOnIcon} />
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="xl">
          <Card sx={{ p: 3, mt: 3 }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {t("ContactUs_Page.How can we help you ?")}
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item md={6}>
                <Box sx={{ m: 4, display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6">{t("ContactUs_Page.Contact form")}</Typography>
                  <Typography variant="body1">
                    {t("ContactUs_Page.Ask us everything and we would love to hear from you")}
                  </Typography>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                  <Box
                    sx={{
                      m: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      alignItems: "flex-start",
                    }}
                  >
                    <TextField
                      id="title"
                      type="text"
                      placeholder={t("Title") || "Title"}
                      inputProps={{
                        step: 300,
                        style: {
                          padding: "8px 0 8px 8px",
                          fontFamily: "Roboto",
                          fontSize: "14px",
                        },
                      }}
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      name="title"
                    />
                    <StyledTextarea
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      name="message"
                      minRows={5}
                      placeholder={t("Your message")}
                    />
                    <Button
                      size="large"
                      color="warning"
                      sx={{ mt: 3, borderRadius: "50px" }}
                      type="submit"
                      variant="contained"
                    >
                      {t("Send")}
                    </Button>
                  </Box>
                </form>
              </Grid>
              <Grid item md={6}>
                <Box sx={{ m: 4, display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6">{t("ContactUs_Page.Our location")}</Typography>
                  <Typography variant="body1">
                    {t("ContactUs_Page.Ask us everything and we would love to hear from you")}
                  </Typography>
                </Box>
                {/* must be an image here  */}
                <div
                  style={{
                    maxWidth: 350,
                    height: 200,
                    backgroundColor: "gray",
                    borderRadius: "10px",
                  }}
                ></div>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

const ContactCards = ({ label, icon: Icon, data }: any) => {
  const { t } = useTranslation();

  return (
    <>
      <Container sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Avatar sx={{ bgcolor: "#7288FA" }}>
          <Icon sx={{ color: "#fff" }} />
        </Avatar>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">{t(label)}</Typography>
          <Typography variant="body1">{t(data)}</Typography>
        </Box>
      </Container>
    </>
  );
};
