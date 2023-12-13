import Head from "next/head";
import Image from "next/image";
import { Box, Card, Container, Grid, CardContent, Typography, IconButton } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExperienceDialog from "@/components/_used-symline/dialogs/experience-dialog";
import ViewerPdf from "@/components/_used-symline/dialogs/pdf-viewer";
import ViewImagesDialog from "@/components/_used-symline/dialogs/view-images";
import axiosClient from "@/configs/axios-client";
import useAlert from "@/hooks/use-alert";
import UploadButton from "@/components/shared/upload-button";
import { useAuth } from "@/hooks/use-auth";
import { showErrorMessage } from "@/utils/helperFunctions";
import pdf from "@/assets/pdf.svg";
import png from "@/assets/png.svg";
import jpg from "@/assets/jpg.svg";
import { Certifcate } from "@/contexts/auth-context";
import ConfirmationPopup from "@/components/confirmation-popup";
import Noitems from "@/components/shared/no-items";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";

const Page = () => {
  const title = "Certificate";
  const { t } = useTranslation();
  const auth = useAuth();
  const { showAlert, renderForAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [fileLink, setFileLink] = useState<null | string>(null);
  const [dialogName, setDialogName] = useState("");
  const [value, setValue] = useState(0);
  const [loading, setLoading] = React.useState(false);

  const [confirm, setConfirm] = useState(false);
  const [selectedFile, setSelectedFile] = React.useState("");
  const handleCloseConfirm = () => setConfirm(false);

  const handleOpenConfirmDeleteCirtificate = useCallback((id: string) => {
    setSelectedFile(id);
    setConfirm(true);
  }, []);

  const handleDeleteCirtificate = useCallback(
    async () => {
      try {
        await axiosClient.delete(`/provider/certificate/${selectedFile}`);
        showAlert("Certificate deleted successfully", "success");
        getProviderInfo();
      } catch (error) {
        showAlert(showErrorMessage(error).toString(), "error");
      }
      setConfirm(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedFile]
  );

  const handleCloseCertificate = () => setOpenCertificate(false);

  const handleOpenCertificate = (imageLink: string) => {
    setFileLink(imageLink);
    setOpenCertificate(true);
  };
  const handleClosePdf = () => setOpenPdf(false);
  const handleOpenPdf = (pdfLink: string) => {
    setFileLink(pdfLink);
    setOpenPdf(true);
  };
  const handleClose = () => setOpen(false);

  //upload files
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      // Call your API endpoint to post the file data
      const formData = new FormData();
      formData.set("file", file);
      try {
        await axiosClient.post("/provider/add-certificate", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showAlert("File uploaded successfully", "success");
        getProviderInfo();
      } catch (error) {
        showAlert(showErrorMessage(error), "error");
      }
    }
    event.target.value = "";
    setLoading(false);
  };

  const getProviderInfo = async () => {
    const res = await auth?.getProviderInfo();
    if (res?.status == 200 || res?.status == 201) {
    } else {
      showAlert(res, "error");
    }
  };

  useEffect(() => {
    getProviderInfo();
  }, []);

  const iconRender = useCallback((type: string) => {
    if (type == "image/jpeg" || type == "image/jpg") {
      return jpg.src;
    } else if (type == "image/png") {
      return png.src;
    } else if (type == "application/pdf") {
      return pdf.src;
    } else {
      return pdf.src;
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
      <Container maxWidth="xl">
        <Typography variant="h3" fontWeight={"bold"}>
          {dictionary(title as TranslatedWord)}
        </Typography>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "end" }}>
            <UploadButton loading={loading} handleFileUpload={handleFileUpload} btnTitle="upload" />
          </Grid>
          <Grid item xs={12}>
            <Card elevation={1} sx={{ p: 3 , minHeight:450 }}>
              <CardContent sx={{ p: 1 }}>
                {auth?.providerInfo?.certifcate?.length ? (
                  <Grid container spacing={2} justifyContent={"space-between"}>
                    {auth?.providerInfo?.certifcate?.map((certificate: Certifcate) => {
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
                                {certificate?.name || certificate?.id}
                              </Typography>
                              <Box>
                                <IconButton sx={{ mx: 1 }}>
                                  <DeleteForeverIcon
                                    onClick={() =>
                                      handleOpenConfirmDeleteCirtificate(certificate?.id)
                                    }
                                  />
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
                              certificate.type == "application/pdf"
                                ? () => {
                                    handleOpenPdf(certificate?.file);
                                  }
                                : () => {
                                    handleOpenCertificate(certificate?.file);
                                  }
                            }
                          >
                            <Image
                              alt={certificate.id}
                              src={iconRender(certificate?.type)}
                              width={70}
                              height={70}
                            />
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                ) : (
                  <Noitems
                    title={"No Certificates yet"}
                    icon={<FolderCopyIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {renderForAlert()}
      </Container>
      <ViewerPdf open={openPdf} handleClose={handleClosePdf} document={fileLink} />
      <ViewImagesDialog
        open={openCertificate}
        handleClose={handleCloseCertificate}
        imageLink={fileLink}
      />
      <ConfirmationPopup
        open={confirm}
        handleClose={handleCloseConfirm}
        message={t("Are you sure you want to delete this file ?")}
        title={t("Delete certificate")}
        confirmFuntion={handleDeleteCirtificate}
        setOpen={setConfirm}
      />
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
