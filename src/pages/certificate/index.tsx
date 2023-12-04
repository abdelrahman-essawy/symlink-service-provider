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
import ConfirmDialog from "@/components/_used-symline/dialogs/confirm-dialog";
import axiosClient from "@/configs/axios-client";
import useAlert from "@/hooks/use-alert";

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
  const { showAlert, renderForAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [dialogName, setDialogName] = useState("");
  const [value, setValue] = useState(0);
  const [file, setFile] = React.useState({ name: "Choose File" });

  const [loading, setLoading] = React.useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleCloseConfirm = () => setConfirm(false);
  const handleOpenConfirm = () => {
    setConfirm(true);
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
  //pdf Model
  const [dialogOpen, setDialogOpen] = useState(false);
  //upload files
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      // Call your API endpoint to post the file data
      const formData = new FormData();
      formData.set("file",file );
      const res = await axiosClient.post("/provider/add-certificate", formData,{headers:{'Content-Type': 'multipart/form-data'}});
      if (res.status == 201 || res.status == 200) {
        showAlert("Excel file uploaded successfully", "success");
        //Reset input fields
      } else {
        showAlert("An error happened", "error");
      }
    }
    event.target.value = "";
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
            {dictionary(title as TranslatedWord)}
          </Typography>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "end" }}>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <Button
                // loading={upload}
                
                variant="contained"
                color="warning"
                size="large"
                onClick={() => fileInputRef?.current?.click()}
              >
                <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {t("Upload")}
                </Typography>
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
                                <IconButton sx={{ mx: 1 }}>
                                  <DeleteForeverIcon onClick={handleOpenConfirm} />
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
                            onClick={
                              certificate.title == "Certificate 1.pdf"
                                ? handleOpenPdf
                                : handleOpenCertificate
                            }
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
          {renderForAlert()}
        </Container>
      <ViewerPdf
        open={openPdf}
        handleClose={handleClosePdf}
        document={"https://pdfobject.com/pdf/sample.pdf"}
      />
      <ViewImagesDialog open={openCertificate} handleClose={handleCloseCertificate} />
      <ConfirmDialog
        open={confirm}
        handleClose={handleCloseConfirm}
        message="Are you sure you want to delete this file ?"
      />

      <ExperienceDialog name={dialogName} open={open} handleClose={handleClose} />
      {/* <PdfViewerDialog open={dialogOpen} onClose={handleCloseDialog} pdfUrl={'https://drive.google.com/file/d/105_LItMhs7CqoIGRzY7W2x2c9P-LGUBS/view?usp=sharing'} /> */}
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
