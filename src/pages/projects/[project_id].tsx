import Head from "next/head";
import { Box, Card, Container, Typography, Button, Grid, CardContent } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import HeaderTabs from "@/components/_used-symline/tabs/headerTabs";
import CustomTabPanel from "@/components/_used-symline/tabs/tabsPanel";
import SharedTable from "@/components/SharedTable";
import { useRouter } from "next/router";
import attachedFiles from "../../../public/attached-files.json";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RoleBasedRender from "@/hocs/RoleBasedRender";
import { useState } from "react";
import { dictionary } from "@/configs/i18next";
import bids from "../../../public/bids.json";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewImagesDialog from "@/components/_used-symline/dialogs/view-images";
import Chat from "@/components/_used-symline/chat/chat";
import ConfirmDialog from "@/components/_used-symline/dialogs/confirm-dialog";
import { useProject } from "@/hooks/use-project";
import ProjectContextProvider from "@/contexts/project-context";
import ProjectStatusBadge from "@/sections/projects/project-status";
import { IProject, RequestForProposal } from "@/@types/project";
import WebAnswers from "@/sections/projects/answers/web-answers";
import NetworkAnswers from "@/sections/projects/answers/network-answers";
import MobileAnswers from "@/sections/projects/answers/mobile-answers";
import SourceCodeAnswers from "@/sections/projects/answers/sourceCode-answers";
import ThreatHuntingAnswers from "@/sections/projects/answers/threatHunting-answers";
import ArchitectureConfigurationReviewAnswer from "@/sections/projects/answers/architectureConfigurationReview-answer.tsx";
import AttachedFilles from "@/sections/projects/project-details/attached-filles";
const Page = () => {
  const title = "Projects";
  const { i18n } = useTranslation();
  const router = useRouter();
  const { project_id } = router.query;
  const projectContext = useProject();
  const [value, setValue] = useState(0);
  const [project, setProject] = useState<IProject>();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleCloseConfirm = () => setConfirm(false);
  const handleOpenConfirm = () => {
    setConfirm(true);
  };
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const fetchProject = async () => {
    if (project_id && typeof project_id === "string") {
      try {
        await projectContext?.getProject(project_id);
      } catch (error) {
        router.push("/projects");
      }
    }
  };

  React.useEffect(() => {
    fetchProject();
  }, [project_id]);

  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
        <Container maxWidth="xl">
          <Grid
            display={"flex"}
            alignItems={"center"}
            justifyContent={"start"}
            gap={5}
            sx={{ mb: 3 }}
          >
            <Typography variant="h3" fontWeight={"bold"}>
              {projectContext?.Selectedproject?.project_name}
            </Typography>
            <RoleBasedRender componentId="tag-project-status">
              <ProjectStatusBadge
                status={projectContext?.Selectedproject?.request_for_proposal_status}
              />
            </RoleBasedRender>
          </Grid>

          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12} md={8}>
              <RoleBasedRender componentId="headertabs-service-provider-projects">
                <HeaderTabs
                  value={value}
                  handleChange={handletabs}
                  tabs={[
                    {
                      title: "Questions",
                    },
                    {
                      title: "Attached filles",
                      amount: 5,
                    },
                    {
                      title: "Discussion",
                      amount: 0,
                    },
                  ]}
                />
              </RoleBasedRender>

              <RoleBasedRender componentId="headertabs-client-projects">
                <HeaderTabs
                  value={value}
                  handleChange={handletabs}
                  tabs={[
                    {
                      title: "Questions",
                    },
                    {
                      title: "Attached filles",
                      amount: 5,
                    },
                    {
                      title: "Discussion",
                      amount: 0,
                    },
                    {
                      title: "List of bids",
                      amount: 6,
                    },
                  ]}
                />
              </RoleBasedRender>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={0}>
                <CustomTabPanel value={value} index={0}>
                  <CardContent sx={{ p: 1, direction: "rtl" }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      sx={{ p: 1, mb: 3, borderRadius: 1, bgcolor: "primary.lightest" }}
                    >
                      General Questions
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      What is preferred testing time ?
                    </Typography>
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                      {projectContext?.Selectedproject?.time_type_meta_data?.name}
                    </Typography>

                    {/* <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
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
                    </Typography> */}
                    {/* <Grid container spacing={0} justifyContent={"space-between"}>
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
                    </Grid> */}

                    {projectContext?.Selectedproject?.request_for_proposal &&
                      projectContext?.Selectedproject?.request_for_proposal?.map(
                        (item: RequestForProposal) =>
                          item?.category?.name === "Web" ? (
                            <WebAnswers key={item?.id} project={item} />
                          ) : item?.category?.name === "Architecture composition review" ? (
                            <ArchitectureConfigurationReviewAnswer key={item?.id} project={item} />
                          ) : item?.category?.name === "the network" ? (
                            <NetworkAnswers project={item} key={item?.id} />
                          ) : item?.category?.name === "the phone" ? (
                            <MobileAnswers project={item} key={item?.id} />
                          ) : item?.category?.name === "Source code" ? (
                            <SourceCodeAnswers project={item} key={item?.id} />
                          ) : item?.category?.name === "Threat hunting" ? (
                            <ThreatHuntingAnswers project={item} key={item?.id} />
                          ) : (
                            <></>
                          )
                      )}
                  </CardContent>
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                      <AttachedFilles />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2} padding={"0"}>
                  <Chat />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={3}>
                  <SharedTable
                    endpoint="http://localhost:3000/bids.json"
                    fakeData={bids}
                    showActions={true}
                    renderRowActions={(row) => (
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{
                          borderRadius: 8,
                          backgroundColor: "#FFF8E6",
                          border: 1,
                          borderColor: "#FFD777",
                        }}
                        onClick={() => {}}
                      >
                        {dictionary("Accept")}
                      </Button>
                    )}
                    muiTableBodyRowProps={(row) => ({
                      onClick: () => router.push(`/bid/rfp-name`),
                      sx: { cursor: "pointer" },
                    })}
                  />
                </CustomTabPanel>
              </Card>
            </Grid>
          </Grid>
        </Container>
      <ViewImagesDialog open={open} handleClose={handleClose} />

      <ConfirmDialog
        open={confirm}
        handleClose={handleCloseConfirm}
        message="Are you sure you want to delete this file ?"
      />
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <ProjectContextProvider>{page}</ProjectContextProvider>
  </DashboardLayout>
);

export default Page;
