import Head from "next/head";
import {
  Box,
  Card,
  Container,
  Grid,
  CardContent,
  Typography,
  Button,
  Divider,
  Avatar,
  SvgIcon,
} from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import CustomTabPanel from "@/components/_used-symline/tabs/tabsPanel";
import HeaderTabs from "@/components/_used-symline/tabs/headerTabs";
import SharedTable from "@/components/SharedTable";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import BidModal from "@/components/modals/BidModal";
import attachedFiles from "../../../../public/attached-files.json";
import VisibilityIcon from '@mui/icons-material/Visibility';
import RoleBasedRender from "@/hocs/RoleBasedRender";

const Page = () => {
  const { i18n } = useTranslation();
  const title = "RFP name";
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  // ----------------- functions ---------------
  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          <Grid container spacing={2} justifyContent={"space-between"} alignItems={"end"} >
          <Grid item xs={12} sm={10}>

            <HeaderTabs
              value={value}
              handleChange={handletabs}
              tabs={
                [{
                  title: "Discussion",
                  amount: 0
                }, {
                  title: "Attached files",
                  amount: 5
                },
                {
                  title: "Questions",
                  amount: 3
                },
                ]
              }
            />
          </Grid>

            <RoleBasedRender
              componentId="button-bid-rfp"
            >
              <Grid item xs={12} sm={2} sx={{ display: "flex", justifyContent:{sm: 'end', xs:'start'}}}>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 8 }}
                >
                  {dictionary("Bid")}
                </Button>
              </Grid>
            </RoleBasedRender>
            <RoleBasedRender
              componentId="buttons-accept-reject-rfp"
            >
              <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent:{sm: 'end', xs:'start'} }}>
                <Button
                 
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 8 }}
                >
                  {dictionary("Accept")}
                </Button>
                <Button
                 
                  variant="contained"
                  sx={{
                    borderRadius: 8,
                    color: "#ffffff",
                    backgroundColor: "#6576d9",
                  }}
                >
                  {dictionary("Reject")}
                </Button>
              </Grid>

            </RoleBasedRender>

            <Grid item xs={12}>
              <Card elevation={0}>
              <CustomTabPanel value={value} index={0}>
                  {" "}
                  <Grid container spacing={1} justifyContent="space-between">

                  <Grid sx={{ p: 1 }} item xs={12} md={6.5}>
                    <Box
                      sx={{
                        height: "500px",
                      }}
                    >
                      <Message
                        name="احمد حسن"
                        message="هل لديك أي حماية في التطبيق؟"
                        time="8:19 pm"
                        avatar={require("../../../assets/icons/done-icon")}
                      />

                      <Message
                        name="user"
                        message="هل لديك أي حماية في التطبيق؟"
                        time="8:19 pm"
                        avatar={require("../../../assets/icons/done-icon")}
                      />
                      <Message
                        name="احمد حسن"
                        message="هل لديك أي حماية في التطبيق؟"
                        time="8:19 pm"
                        avatar={require("../../../assets/icons/done-icon")}
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
                          <AttachFileIcon sx={{cursor: 'pointer'}} />
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
                 

                  <Divider variant="fullWidth"  orientation="vertical" flexItem={true} sx={{ mx: 2, borderColor: 'lightgrey' }} />

                 

                  <Grid sx={{ p: 1 }} item xs={12} md={4.5}>
                    <Box
                      sx={{
                        pr: 2,
                        height: "500px",
                        position: 'relative',
                        overflow: 'auto'
                      }}
                    >
                      <Message
                        name="احمد حسن"
                        message="هل لديك أي حماية في التطبيق؟"
                        time="8:19 pm"
                        avatar={require("../../../assets/icons/done-icon")}
                      />

                      <Message
                        name="user"
                        message="هل لديك أي حماية في التطبيق؟"
                        time="8:19 pm"
                        avatar={require("../../../assets/icons/done-icon")}
                      />
                      <Message
                        name="احمد حسن"
                        message="هل لديك أي حماية في التطبيق؟"
                        time="8:19 pm"
                        avatar={require("../../../assets/icons/done-icon")}
                      />
                        <Message
                        name="احمد حسن"
                        message="هل لديك أي حماية في التطبيق؟"
                        time="8:19 pm"
                        avatar={require("../../../assets/icons/done-icon")}
                      />
                        <Message
                        name="احمد حسن"
                        message="هل لديك أي حماية في التطبيق؟"
                        time="8:19 pm"
                        avatar={require("../../../assets/icons/done-icon")}
                      />
                        <Message
                        name="احمد حسن"
                        message="هل لديك أي حماية في التطبيق؟"
                        time="8:19 pm"
                        avatar={require("../../../assets/icons/done-icon")}
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
                          <AttachFileIcon sx={{cursor: 'pointer'}} />
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
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <SharedTable endpoint="http://localhost:3000/attached-files.json"
                    showActions={true}
                    renderRowActions={(row: any) => {
                      return (
                        <SvgIcon style={{
                          cursor: "pointer",
                          color: "#6161d9",
                        }} viewBox="0 0 24 24">
                          <VisibilityIcon />
                        </SvgIcon>
                      )
                    }}

                    fakeData={attachedFiles} />

                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                  <CardContent sx={{ p: 1 , direction: 'rtl'}}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      sx={{ p: 1, mb: 3, borderRadius: 1, bgcolor: "primary.lightest" }}
                    >
                      General Questtions
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      What is preferred testing time ?
                    </Typography>
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                      During the working hours
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      In case of emergency , what is the contact details of the person the assessor
                      should have a contact with :
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                      First person:
                    </Typography>
                    <Grid container spacing={1} justifyContent={"space-between"}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Name: Jone Doe
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Email: johndoel@gmail.com
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Mobile Number: 9876543210
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                      First person:
                    </Typography>
                    <Grid container spacing={0} justifyContent={"space-between"}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Name: Jone Doe
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Email: johndoel@gmail.com
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Mobile Number: 9876543210
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      sx={{ p: 1, mb: 3, borderRadius: 1, bgcolor: "primary.lightest" }}
                    >
                      Web
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      What is preferred testing time ?
                    </Typography>
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                      Vulnerability assessment
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      ow many web applications you want to assess ?
                    </Typography>
                    <Grid container spacing={0} justifyContent={"space-start"}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          Internal applications: 7
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                          External applications: 4
                        </Typography>
                      </Grid>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        List the scoped applications: (i.e.domain.com)
                      </Typography>
                      <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                        parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
                        pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                        pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
                        mollis pretium. Integer tincidunt.
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        4 Is verification required to assess whether the reported Vulnerability have
                        been fixed ?
                      </Typography>
                    </Grid>
                  </CardContent>
                </CustomTabPanel>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <BidModal open={open} handleClose={handleClose} />
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