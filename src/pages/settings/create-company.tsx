import Head from "next/head";
import { Box, Container, Typography, Grid, Avatar, TextField, Button, Select } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { Card } from "@mui/material";
import StyledTextarea from "../../components/StyledTextArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Page = () => {
  const title = "Company profile";
  // ----------- hooks -------------
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      url: "",
      message: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const [companyField, setCompanyField] = React.useState<string[]>([]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setCompanyField(typeof value === "string" ? value.split(",") : value);
  };

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
          <Card sx={{ p: 3, mt: 3 }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item md={6} xs={12}>
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
                      id="companyName"
                      type="text"
                      placeholder={t("Company name") || "Company name"}
                      inputProps={{
                        step: 300,
                        style: {
                          padding: "8px 0 8px 8px",
                          fontFamily: "Roboto",
                          fontSize: "14px",
                        },
                      }}
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      name="companyName"
                    />
                    <TextField
                      id="url"
                      type="text"
                      
                      placeholder={t("Website URL") || "Website URL"}
                      inputProps={{
                        step: 300,
                        style: {
                          padding: "8px 0 8px 8px",
                          fontFamily: "Roboto",
                          fontSize: "14px",
                        },
                      }}
                      value={formik.values.url}
                      onChange={formik.handleChange}
                      name="url"
                    />
                    <Select
                      sx={{ width: "200px", borderRadius: "50px" }}
                      multiple
                      fullWidth
                      displayEmpty
                      value={companyField}
                      onChange={handleChange}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>{t("Company fields")}</em>;
                        }

                        return selected.join(", ");
                      }}
                      MenuProps={MenuProps}
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={"Software"}>Software</MenuItem>
                      <MenuItem value={"Software"}>Software</MenuItem>
                    </Select>
                    <TextField
                     fullWidth
                    id="title"
                    multiline
                  
                    rows="3"

                    type="text"
                    placeholder={t("Description") || "Description"}
                    InputProps={{

                      sx: {
                        p: 0,
                        borderRadius: '10px', // Set the desired border radius
                      },// Set the desired border radius

                    }}


                  />

                    <Button
                      size="large"
                      color="warning"
                      sx={{ mt: 3, borderRadius: "50px" ,display: {xs: 'none', md: 'block'}}}
                      type="submit"
                      variant="contained"
                    >
                      {t("Send")}
                    </Button>
                  </Box>
                </form>
              </Grid>
              <Grid item md={6}>
                <Image
                  style={{ marginTop: "70px" }}
                  height={200}
                  width={350}
                  alt="company"
                  src={require("../../assets/company.svg")}
                />
                  <Button
                      size="large"
                      color="warning"
                      sx={{ mt: 3, borderRadius: "50px" ,display: {xs: 'block', md: 'none'}}}
                      type="submit"
                      variant="contained"
                    >
                      {t("Send")}
                    </Button>
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
