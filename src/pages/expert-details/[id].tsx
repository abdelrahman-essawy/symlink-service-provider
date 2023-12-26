import Head from "next/head";
import { Box, Card, Container, Grid, Typography, TextField, Avatar } from "@mui/material";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import axiosClient from "@/configs/axios-client";
import ProviderProjects from "@/sections/Profile/provider-projects";
import Noitems from "@/components/shared/no-items";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import pdf from "@/assets/pdf.svg";
import png from "@/assets/png.svg";
import jpg from "@/assets/jpg.svg";
import ViewerPdf from "@/components/_used-symline/dialogs/pdf-viewer";
import ViewImagesDialog from "@/components/_used-symline/dialogs/view-images";
import LoadingSkeleton from "./loading";
import { Certifcate, IProviderInfo } from "@/@types/user";
const Page = () => {
  const { i18n } = useTranslation();
  const title = "Expert details";
  const [expert, setExpert] = useState<IProviderInfo>();
  const router = useRouter();
  const { id } = router.query;
  const [isloading, setIsLoading] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [fileLink, setFileLink] = useState<null | string>(null);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    (async () => {
      setIsLoading(true);
      try {
        const res = await axiosClient.get(`/provider/info?user_id=${id}`, { signal });
        await setExpert(res.data.data);
      } catch (error) {
        // return(<error></error>);
      }
      setIsLoading(false);
    })();
    return () => {
      abortController.abort();
    };
  }, [id]);
  //certificates
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
        <title>{expert?.user?.name} | Symline</title>
        <meta name="description" content={expert?.user?.name} />
      </Head>
      {!isloading ? (
        <Container maxWidth="xl">
          <Box display={"flex"} alignItems={"center"} gap={2} sx={{ mb: 2 }}>
            <Box>
              <IconButton
                onClick={() => router.back()}
                sx={{
                  borderRadius: "50%",
                  bgcolor: "#faacd",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  color: "#949494",
                  boxShadow: ".5px 0px 3px .5px #ababab",
                }}
                size="small"
              >
                {i18n.language === "ar" ? <ArrowForwardIcon /> : <ArrowBackIcon />}
              </IconButton>
            </Box>
            <Typography variant="h3" fontWeight={"bold"}>
              {dictionary(title as TranslatedWord)}
            </Typography>
          </Box>
          <Card elevation={1} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 5, p: 1.5 }}>
              <Avatar src={expert?.user?.avatar} sx={{ width: 100, height: 100 }} />
              <Box>
                <Typography variant="h5" sx={{ mb: 2 }} fontWeight={"bold"}>
                  {expert?.user?.name}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", columnGap: 5, flexWrap: "wrap" }}>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                  >
                    <EmailIcon sx={{ mx: 1 }} />
                    {expert?.user?.email}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                  >
                    <LocalPhoneIcon sx={{ mx: 1 }} />
                    {expert?.user?.phone || " - "}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                  >
                    <LinkedInIcon sx={{ mx: 1 }} />
                    {expert?.user?.linkedin || " - "}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ m: 1 }}>
                  {
                    //show the city depend on the language
                    i18n.language == "en"
                      ? `${expert?.user?.city?.country?.name_en ?? ""} - ${
                          expert?.user?.city?.name_en ?? ""
                        }`
                      : `${expert?.user?.city?.country?.name_ar ?? ""} - ${
                          expert?.user?.city?.name_ar ?? ""
                        }`
                  }
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
                <Box>
                  {expert?.info ? (
                                <Box>
                                <TextField
                                  sx={{
                                    direction: "rtl",
                                    "& .MuiInputBase-root ,& .MuiInputBase-input,& .MuiFilledInput-input,& .Mui-disabled": {
                                      borderRadius: "0px !important",
                                      padding: "0px !important",
                                      border:"none",
                                      color:"#000  !important"
                                    },
                                    "&  .muirtl-w5cbyv-MuiInputBase-input-MuiFilledInput-input.Mui-disabled ,& .MuiInputBase-input,& .MuiFilledInput-input,& .Mui-disabled ":{
                                      opacity: 1,
                                      "-webkit-text-fill-color": "#000",
                                  },
                                    "&  textarea":{
                                      opacity: 1,
                                      "-webkit-text-fill-color": "#000 !important",
                                  },

                                  }}
                                  fullWidth
                                  value={expert?.info}
                                  multiline
                                  minRows={2}
                                  maxRows={7}
                                  disabled
                                />
                              </Box>
                  ) : (
                    <Noitems
                      title={"No Educational info"}
                      icon={<FolderCopyIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
                      minHeight={220}
                    />
                  )}
                </Box>
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
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {dictionary("Experience")}
                    </Typography>
                  </Grid>
                </Grid>
                <ProviderProjects canCrud={false} projects={expert?.projects} />
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
                      gap: 2,
                      minWidth: "100%",
                    }}
                  >
                    {expert?.certifcate?.length ? (
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"start"}
                        flexWrap={"nowrap"}
                        sx={{ minWidth: "100%", overflowX: "auto" }}
                      >
                        {expert?.certifcate?.map((certificate: Certifcate) => {
                          return (
                            <Box
                              key={certificate.id}
                              sx={{
                                cursor: "pointer",
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
                                width={80}
                                height={80}
                              />
                            </Box>
                          );
                        })}
                      </Grid>
                    ) : (
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minWidth: "100%",
                        }}
                      >
                        <Noitems
                          title={"No Certificates yet"}
                          icon={<FolderCopyIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
                          minHeight={220}
                        />
                      </Grid>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Card>
          <ViewerPdf open={openPdf} handleClose={handleClosePdf} document={fileLink} />
          <ViewImagesDialog
            open={openCertificate}
            handleClose={handleCloseCertificate}
            imageLink={fileLink}
          />
        </Container>
      ) : (
        <LoadingSkeleton />
      )}
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
