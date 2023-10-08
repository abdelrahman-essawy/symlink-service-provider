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
import ViewerPdf from "@/components/_used-symline/dialogs/pdf-viewer";
import ViewImagesDialog from "@/components/_used-symline/dialogs/view-images";
import { LoadingButton } from "@mui/lab";
// import PdfViewerDialog from "@/components/PdfViewerDialog";

const DATA = [
  { id: 1, title: "Certificate 1.pdf", img: require("../../assets/pdf.svg") },
  { id: 1, title: "Certificate 2.png", img: require("../../assets/png.svg") },
  { id: 1, title: "Certificate 3.jpg", img: require("../../assets/jpg.svg") },
];
const Page = () => {
  const { i18n } = useTranslation();
  const title = "Certificate";
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [dialogName, setDialogName] = useState("");
  const [value, setValue] = useState(0);
  const [file, setFile] = React.useState({ name: "Choose File" });
  const [loading, setLoading] = React.useState(false);
  const [upload, setUpload] = React.useState(false);


  const update = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1600));

    setLoading(false);
    handleClose();
  };
  const uploading = async () => {
    setUpload(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setUpload(false);
    
  };
   // handle file selection
   const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleCloseCertificate = () => setOpenCertificate(false);
  const handleOpenCertificate = () => {
    setOpenCertificate(true);
  };
  const handleClosePdf = () => setOpenPdf(false);
  const handleOpenPdf = () => {
    setOpenPdf(true);
  };
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
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "end" }}>
            <LoadingButton
                  component="label"
                  loading={upload}
                  onChange={uploading}

             
                  variant="contained"
                  color="warning"
                  size="medium"
                >
                  <Typography sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word',  }}>  {t("Upload")}</Typography>
                  <input type="file" onChange={handleFileSelect} hidden />
                </LoadingButton>
           
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
                            onClick={certificate.title == 'Certificate 1.pdf'? handleOpenPdf : handleOpenCertificate}

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
      <ViewerPdf open={openPdf} handleClose={handleClosePdf} document={"https://pdfobject.com/pdf/sample.pdf"}/>
      <ViewImagesDialog open={openCertificate} handleClose={handleCloseCertificate}/>

      <ExperienceDialog name={dialogName} open={open} handleClose={handleClose} />
      {/* <PdfViewerDialog open={dialogOpen} onClose={handleCloseDialog} pdfUrl={'https://drive.google.com/file/d/105_LItMhs7CqoIGRzY7W2x2c9P-LGUBS/view?usp=sharing'} /> */}
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
