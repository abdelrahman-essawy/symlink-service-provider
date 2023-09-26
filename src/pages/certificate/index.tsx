import Head from "next/head";
import Image from "next/image";
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
} from "@mui/material";
import React, { useState, useRef } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import CustomTabPanel from "@/components/_used-symline/tabs/tabsPanel";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExperienceDialog from "@/components/_used-symline/dialogs/experience-dialog";
// import PdfViewerDialog from "@/components/PdfViewerDialog";

const DATA = [
  { id: 1, title: "Certificate 1.pdf", img: require("../../assets/pdf.svg") },
  { id: 1, title: "Certificate 2.pdf", img: require("../../assets/png.svg") },
  { id: 1, title: "Certificate 3.pdf", img: require("../../assets/jpg.svg") },
];
const Page = () => {
  const { i18n } = useTranslation();
  const title = "Certificate";
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
  //pdf Model
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
          borderTopLeftRadius: 25,
          borderBottomLeftRadius: 25,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
            {dictionary(title as TranslatedWord)}
          </Typography>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                onClick={handleOpenAdd}
                variant="contained"
                color="warning"
                sx={{ borderRadius: 8 }}
              >
                {t("Upload")}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={0} sx={{ p: 3 }}>
                <CardContent sx={{ p: 1 }}>
                  <Grid container spacing={2} justifyContent={"space-between"}>
                    {DATA.map((certificate: any) => {
                      return (
                        <Grid key={certificate.id} item xs={12}>
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
                                px: 1,
                                borderRadius: 1,
                                bgcolor: "primary.lightest",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="h6" fontWeight="bold" color="primary">
                                {certificate.title}
                              </Typography>
                              <Box>
                                <IconButton sx={{ mx: 1 }} >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Box>
                            </Grid>
                          </Grid>
                          <Box
                            sx={{
                              border: "1px solid #C4C4C4",
                              width: "180px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              px: 1,
                              m: 2,
                              height: "100px",
                              borderRadius: "20px",
                              cursor: "pointer",
                              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.08)",
                            }}
                            onClick={handleOpenDialog}
                          >
                            <Image
                              alt={certificate.title}
                              src={certificate.img}
                              width={70}
                              height={70}
                            />
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </CardContent>
                <CustomTabPanel value={value} index={2}>
                  {" "}
                  three
                </CustomTabPanel>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ExperienceDialog name={dialogName} open={open} handleClose={handleClose} />
      {/* <PdfViewerDialog open={dialogOpen} onClose={handleCloseDialog} pdfUrl={'https://drive.google.com/file/d/105_LItMhs7CqoIGRzY7W2x2c9P-LGUBS/view?usp=sharing'} /> */}
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
