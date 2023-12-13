import Head from "next/head";
import {
  Box,
  Card,
  Container,
  createTheme,
  Stack,
  Tab,
  Grid,
  CardHeader,
  Tabs,
  CardContent,
  Typography,
  Button,
  OutlinedInput,
  IconButton,
  Divider,
} from "@mui/material";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import CustomTabPanel from "@/components/_used-symline/tabs/tabsPanel";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExperienceDialog from "@/components/_used-symline/dialogs/experience-dialog";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Page = () => {
  const { i18n } = useTranslation();
  const title = "Expert name";
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [dialogName, setDialogName] = useState("");
  const [value, setValue] = useState(0);
  const handleClose = () => setOpen(false);
  const handleOpenAdd = () => {
    setDialogName("Add experience");
    setOpen(true);
  };
  const handleOpenEdit = () => {
    setDialogName("Edit experience");
    setOpen(true);
  };
  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
          borderTopLeftRadius: i18n.language == 'ar' ? 25 : 0,
          borderBottomLeftRadius: i18n.language == 'ar' ? 25 : 25,
          borderTopRightRadius: i18n.language == 'ar' ? 0 : 25,
          borderBottomRightRadius: i18n.language == 'ar' ? 0 : 25,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
            {dictionary(title as TranslatedWord)}
          </Typography>
          <Card elevation={0} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 5, p: 1 }}>
              <Image
                height={100}
                width={100}
                style={{ borderRadius: "50%", margin: 5 }}
                src={require("../../assets/avatar-alcides-antonio.png")}
                alt="expert"
              />
              <Box>
                <Typography variant="h5" sx={{ mb: 2 }} fontWeight={"bold"}>
                  {dictionary(title as TranslatedWord)}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", columnGap: 5, flexWrap: "wrap" }}>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                  >
                    <EmailIcon sx={{ mx: 1 }} />
                    mitchellensink@gmail
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                  >
                    <LocalPhoneIcon sx={{ mx: 1 }} />
                    346456456
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                  >
                    <LinkedInIcon sx={{ mx: 1 }} />
                    346456456
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ m: 1 }}>
                  UAE - Abu Dahbi
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={0}
                  direction={"row"}
                  justifyContent={"space-between"}
                  textAlign={"left"}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: "primary.lightest",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {dictionary("Educational info")}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" fontWeight="light" sx={{ mb: 1, mt: 3, px: 1 }}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam iure ratione
                  recusandae, omnis ex totam!
                </Typography>
                <Typography variant="body1" fontWeight="light" sx={{ mb: 1, mt: 3, px: 1 }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, debitis ipsam
                  culpa labore molestias provident illo quibusdam. Velit, fugit voluptas blanditiis
                  numquam architecto, quae vel, ducimus nihil sunt quia reiciendis.
                </Typography>

                <Typography variant="body1" fontWeight="light" sx={{ mb: 1, px: 1 }}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula
                  eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
                  montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                  pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
                  vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer
                  tincidunt.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={0}
                  direction={"row"}
                  justifyContent={"space-between"}
                  textAlign={"left"}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: "primary.lightest",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {dictionary("Experience")}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }}>
                  {dictionary("Project name")}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mb: 1, mt: 3, px: 1, display: "inline-block" }}
                >
                  {dictionary("Date")}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="light"
                  sx={{ mb: 4, px: 1, display: "inline-block" }}
                >
                  10 Apr 2023 to 22 April 2023
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, px: 1 }}>
                  {dictionary("About project")}
                </Typography>
                <Typography variant="body1" fontWeight="light" sx={{ mb: 1, px: 1 }}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula
                  eget dolor.
                </Typography>
                <Divider />
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }}>
                  {dictionary("Project name")}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mb: 1, mt: 3, px: 1, display: "inline-block" }}
                >
                  {dictionary("Date")}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="light"
                  sx={{ mb: 4, px: 1, display: "inline-block" }}
                >
                  10 Apr 2023 to 22 April 2023
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, px: 1 }}>
                  {dictionary("About project")}
                </Typography>
                <Typography variant="body1" fontWeight="light" sx={{ mb: 1, px: 1 }}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula
                  eget dolor.
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={0}
                  direction={"row"}
                  justifyContent={"space-between"}
                  textAlign={"left"}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: "primary.lightest",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {dictionary("Certificate")}
                    </Typography>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      columnGap: 1,
                      flexWrap: "wrap",
                      p: 3,
                    }}
                  >
                    <Image height={80} width={80} alt="pdf" src={require("../../assets/pdf.svg")} />
                    <Image height={80} width={80} alt="png" src={require("../../assets/png.svg")} />
                    <Image height={80} width={80} alt="jpg" src={require("../../assets/jpg.svg")} />
                  </Box>
                </Grid>
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
