import Head from "next/head";
import {
  Box,
  Card,
  Container,
  Grid,
  CardContent,
  Typography,
  Button,
  SvgIcon,
} from "@mui/material";
import React from "react";

import { DashboardLayout } from "../../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import CustomTabPanel from "@/components/_used-symline/tabs/tabsPanel";
import HeaderTabs from "@/components/_used-symline/tabs/headerTabs";
import SharedTable from "@/components/SharedTable";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import BidModal from "@/components/modals/BidModal";
import attachedFiles from "../../../../public/attached-files.json";
import VisibilityIcon from '@mui/icons-material/Visibility';
import RoleBasedRender from "@/hocs/RoleBasedRender";
import Chat from "@/components/_used-symline/chat/chat";

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
              <Grid item xs={12} sm={2} sx={{ display: "flex", justifyContent: { sm: 'end', xs: 'start' } }}>
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
              <Grid item xs={12} md={2} sx={{ display: "flex", justifyContent: { sm: 'end', xs: 'start' } }}>
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

            <Grid item xs={12} >
              <Card elevation={0} >
                <CustomTabPanel value={value} index={0} padding={'0'}>
                 <Chat />
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
                  <CardContent sx={{ p: 1, direction: 'rtl' }}>
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
      <BidModal open={open} handleClose={handleClose} />
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
