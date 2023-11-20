import Head from "next/head";
import { Box, Card, Container, Typography, Grid, Button, Avatar } from "@mui/material";
import React, { useState } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import SupportModal from "@/components/modals/SupportModal";

const DATA = [
  {
    id: 1,
    name: "رقم 123456",
    status: "نشط",
  },
  {
    id: 2,
    name: "رقم 123456",
    status: "متوقف",
  },
  {
    id: 3,
    name: "رقم 123456",
    status: "متوقف",
  },
  {
    id: 4,
    name: "رقم 123456",
    status: "متوقف",
  },
];

const Page = () => {
  // ----------- hooks ----------------
  const [open, setOpen] = React.useState(false);
  const title = `Support`;
  const { t } = useTranslation();
  const [active, setActive] = useState<number | null>(DATA[0].id);
  const { i18n } = useTranslation();

  // ----------------- functions ---------------
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              sx={{ mt: 3, borderRadius: "50px", px: 10 }}
              type="submit"
              variant="contained"
              onClick={handleOpen}
            >
              {t("Create ticket")}
            </Button>
          </Box>

          <Card sx={{ mt: 3, p: 3 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box>
                  <List>
                    {DATA.map((data, index) => {
                      return (
                        <ListItem
                          onClick={() => {
                            setActive(data.id);
                          }}
                          key={index + data?.name}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            alignItems: "flex-start",
                            py: 1,
                            my: 1,
                            backgroundColor: `${active === data.id ? "#ECECEC" : "#FFFFFF"}`,
                            cursor: "pointer",
                          }}
                        >
                          <Typography component="p" sx={{ fontWeight: "bold" }}>
                            {data.name}
                          </Typography>
                          <Typography component="p">{data.status}</Typography>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box>
                  <Typography sx={{ mb: 2 }} variant="h6">
                    {t("Privacy Policy")}
                  </Typography>
                  <Typography variant="body1">
                    {t("TermsAndConditions_Page.Privacy text")}
                  </Typography>
                </Box>
                <Divider variant="middle" sx={{ my: 2 }} />
                <Box
                  sx={{
                    height: "500px",
                  }}
                >
                  <Message
                    name="احمد حسن"
                    message="هل لديك أي حماية في التطبيق؟"
                    time="8:19 pm"
                    avatar={require("../../assets/icons/done-icon")}
                  />
                  <Message
                    name="user"
                    message="هل لديك أي حماية في التطبيق؟"
                    time="8:19 pm"
                    avatar={require("../../assets/icons/done-icon")}
                  />
                </Box>
                <Divider variant="middle" sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingX: 2,
                    gap: 1,
                  }}
                >
                  <input
                    type="text"
                    style={{ width: "100%", height: "50px", border: "unset", outline: "unset" }}
                    placeholder="اكتب رسالة هنا ..."
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #ECECEC",
                        color: "#373737",
                        transform: "rotate(45deg)",
                      }}
                    >
                      <AttachFileIcon sx={{cursor: 'pointer'}}/>
                    </Avatar>
                    <Avatar
                      sx={{
                        backgroundColor: "#FFD777",
                        color: "#ffffff",
                        transform: "rotate(-45deg)",
                      }}
                    >
                      <SendIcon sx={{cursor: 'pointer'}}/>
                    </Avatar>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
      <SupportModal open={open} handleClose={handleClose} />
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

const Message = ({ name, avatar, message, time }: any) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: name === "user" ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: "30px",
        mb: 3,
      }}
    >
      <Avatar alt="Remy Sharp" src={avatar} />
      <Box
        sx={{
          bgcolor: name === "user" ? "#F6F6F6" : "#adb8ef",
          borderRadius: "10px",
          width: name === "user" ? "70%" : "50%",
          p: 2,
          position: "relative",
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h6">
          {name}
        </Typography>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="body2">{time}</Typography>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: name === "user" ? "#F6F6F6" : "#adb8ef",
            transform: name === "user" ? "skewX(-35deg)" : "skewX(35deg)",
            right: name === "user" ? "unset" : "-5px",
            left: name === "user" ? "-5px" : "unset",
            width: "40px",
            height: "20px",
          }}
        ></div>
      </Box>
    </Box>
  );
};
