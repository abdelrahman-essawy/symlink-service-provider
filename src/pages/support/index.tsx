import Head from "next/head";
import {
  Box,
  Card,
  Container,
  Typography,
  Grid,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import SupportModal from "@/components/modals/SupportModal";
import useAlert from "@/hooks/use-alert";
import SupportContextProvider, { useSupportTicket } from "@/contexts/support-context";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import SingleTicket from "@/sections/support/single-ticket";
import SupportCommentForm from "@/sections/support/comment-Form";
import { ISupportTicket } from "@/@types/support-ticket";
import Noitems from "@/components/shared/no-items";
import ForumIcon from "@mui/icons-material/Forum";
import moment from "moment";
import Image from "next/image";
import pdf from "@/assets/pdf.svg";
import document from "@/assets/document.svg";
import ViewerPdf from "@/components/_used-symline/dialogs/pdf-viewer";
import ViewImagesDialog from "@/components/_used-symline/dialogs/view-images";
import { useAuthContext } from "@/contexts/auth-context";

const Page = () => {
  // ----------- hooks ----------------
  const [open, setOpen] = React.useState(false);
  const title = `Support`;
  const { t } = useTranslation();
  const { showAlert, renderForAlert } = useAlert();
  const [selectedTicketId, setSelectedTicketId] = useState<string>("");
  const [selectedTicketStatus, setSelectedTicketStatus] = useState<string>("");
  const auth = useAuthContext();
  const { i18n } = useTranslation();
  const ticketsContext = useSupportTicket();
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller, handleSorting } =
    usePageUtilities();

  useEffect(() => {
    ticketsContext?.getSupportTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  useEffect(() => {
    if (selectedTicketId) ticketsContext?.getCommentsWithinTicket(selectedTicketId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTicketId]);

  // ----------------- functions ---------------
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handelSelectTicket = useCallback(({ id, status }: { id: string; status: string }) => {
    setSelectedTicketId(id);
    setSelectedTicketStatus(status);
  }, []);

  return (
    <>
      <Head>
        <title>{title} | Symlink</title>
      </Head>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{t(title)}</Typography>
          <Button
            size="large"
            color="warning"
            sx={{ borderRadius: "50px", px: 10 }}
            type="submit"
            variant="contained"
            onClick={handleOpen}
          >
            {t("Create ticket")}
          </Button>
        </Box>

        <Card sx={{ mt: 2, p: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <Box>
                <List>
                  {ticketsContext?.tickets?.map((data, index) => {
                    return (
                      <SingleTicket
                        id={data.id}
                        status={data.status}
                        subject={data.subject}
                        description={data.description}
                        key={data.id}
                        ticket_num={data?.ticket_num}
                        active={selectedTicketId}
                        setActive={handelSelectTicket}
                      />
                    );
                  })}
                </List>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={9}
              sx={{
                borderLeft: `${i18n.language === "en" ? 0 : 1}px solid #ddd`,
                borderRight: `${i18n.language === "ar" ? 0 : 1}px solid #ddd`,
                p: 2,
              }}
            >
              <Box>
                <Typography sx={{ mb: 2 }} variant="h6">
                  {t("Privacy Policy")}
                </Typography>
                <Typography variant="body1">{t("TermsAndConditions_Page.Privacy text")}</Typography>
              </Box>
              <Divider variant="middle" sx={{ my: 2 }} />
                <Grid  spacing={1} sx={{ py: 2, px: 3 }} height={500} overflow={"auto"} display={"flex"} flexDirection={"column-reverse"}>
                  {ticketsContext?.ticketMessages?.length != undefined &&
                  ticketsContext?.ticketMessages?.length > 0 ? (
                    <>
                      {ticketsContext?.ticketMessages?.map((message) => (
                        <Grid item xs={12} key={message?.id} >
                          <Message
                            message={message?.comment_text}
                            time={moment
                              .utc(message?.created_at?.slice(0, 19))
                              ?.local()
                              ?.calendar()}
                            avatar={auth?.user?.avatar}
                            attachment={message?.attachment}
                          />
                        </Grid>
                      ))}
                    </>
                  ) : (
                    <Box width={"100%"}>
                      <Noitems
                        title={"No comment yet"}
                        icon={<ForumIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
                      />
                    </Box>
                  )}
                </Grid>
              <Divider variant="middle" sx={{ my: 2 }} />
              <Grid xs={12}>
                <SupportContextProvider>
                  <SupportCommentForm
                    ticketId={selectedTicketId}
                    disabled={!(selectedTicketStatus === "OPEN")}
                    key={selectedTicketId}
                  />
                </SupportContextProvider>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        {renderForAlert()}
      </Container>
      <SupportModal open={open} handleClose={handleClose} showMessage={showAlert} />
    </>
  );
};

Page.getLayout = (page: any) => (
  <SupportContextProvider>
    <DashboardLayout>{page}</DashboardLayout>;
  </SupportContextProvider>
);

export default Page;

const Message = ({ name, avatar, message, time, attachment }: any) => {
  const { t } = useTranslation();
  const [openCertificate, setOpenCertificate] = React.useState(false);
  const [openPdf, setOpenPdf] = React.useState(false);
  const [fileLink, setFileLink] = React.useState<null | string>(null);
  const handleCloseCertificate = () => setOpenCertificate(false);
  const handleOpenCertificate = (imageLink: string) => {
    setFileLink(imageLink);
    setOpenCertificate(true);
  };
  const iconRender = React.useCallback((type: string, src: string) => {
    if (type?.includes("image")) {
      return src;
    } else if (type == "application/pdf") {
      return pdf.src;
    } else {
      return document.src;
    }
  }, []);
  const handleClosePdf = () => setOpenPdf(false);
  const handleOpenPdf = (pdfLink: string) => {
    setFileLink(pdfLink);
    setOpenPdf(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: name === "user" ? "row-reverse" : "row",
        alignItems: "start",
        gap: "30px",
        mb: 3,
      }}
    >
      <Avatar alt="Remy Sharp" src={avatar} />
      <Box
        sx={{
          bgcolor: name === "user" ? "#F6F6F6" : "#adb8ef",
          borderRadius: "10px",
          width:  "50%",
          p: 2,
          position: "relative",
        }}
      >
        <Typography variant="body1">{message}</Typography>
        {attachment ? (
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
            <Image
              alt={"image"}
              src={iconRender(attachment?.file_type, attachment?.file_url)}
              width={attachment?.file_type?.includes("image") ? 250 : 70}
              height={attachment?.file_type?.includes("image") ? 200 : 70}
              onClick={
                attachment?.file_type == "application/pdf"
                  ? () => {
                      handleOpenPdf(attachment?.file_url);
                    }
                  : attachment?.file_type?.includes("image")
                  ? () => {
                      handleOpenCertificate(attachment?.file_url);
                    }
                  : () => {
                      //open the file outside
                      window.open(attachment?.file_url, "_blank");
                    }
              }
            />
          </Grid>
        ) : null}
        <Typography variant="body2">{time}</Typography>
      </Box>
      <ViewerPdf open={openPdf} handleClose={handleClosePdf} document={fileLink} />
      <ViewImagesDialog
        open={openCertificate}
        handleClose={handleCloseCertificate}
        imageLink={fileLink}
      />
    </Box>
  );
};
