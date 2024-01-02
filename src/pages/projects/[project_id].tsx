import Head from "next/head";
import {
  Card,
  Container,
  Typography,
  Button,
  Grid,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import React, { useCallback } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import HeaderTabs from "@/components/_used-symline/tabs/headerTabs";
import CustomTabPanel from "@/components/_used-symline/tabs/tabsPanel";
import { useRouter } from "next/router";
import RoleBasedRender from "@/hocs/RoleBasedRender";
import { useState } from "react";
import { dictionary } from "@/configs/i18next";
import ViewImagesDialog from "@/components/_used-symline/dialogs/view-images";
import Discussion from "@/components/_used-symline/chat/discussion";
import ConfirmDialog from "@/components/_used-symline/dialogs/confirm-dialog";
import { useProject } from "@/hooks/use-project";
import ProjectContextProvider from "@/contexts/project-context";
import ProjectStatusBadge from "@/sections/projects/project-status";
import {
  PreferredTestingTime,
  PreferredTestingTimeStrings,
  RequestForProposal,
} from "@/@types/project";
import WebAnswers from "@/sections/projects/answers/web-answers";
import NetworkAnswers from "@/sections/projects/answers/network-answers";
import MobileAnswers from "@/sections/projects/answers/mobile-answers";
import SourceCodeAnswers from "@/sections/projects/answers/sourceCode-answers";
import ArchitectureConfigurationReviewAnswer from "@/sections/projects/answers/architectureConfigurationReview-answer.tsx";
import AttachedFilles from "@/sections/projects/project-details/attached-filles";
import { convertFromHours, getLocalTime, showErrorMessage } from "@/utils/helperFunctions";
import BidModal from "@/components/modals/BidModal";
import useAlert from "@/hooks/useAlert";
import BidContextProvider from "@/contexts/bid-context";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import { useBid } from "@/hooks/use-bid";
import { DataTable } from "@/components/shared/DataTable";
import { IOffer } from "@/@types/bid";
import axiosClient from "@/configs/axios-client";
import ConfirmationPopup from "@/components/confirmation-popup";
import Noitems from "@/components/shared/no-items";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import Link from "next/link";
import DiscussionContextProvider from "@/contexts/discussion-context";
import { SearchBar } from "@/sections/shared/search-bar";

const listOfBidsHeaders = [
  { text: "Bidder name", value: "BidderName" },
  { text: "Cost", value: "price" },
  { text: "Duration", value: "duration" },
  { text: "Commitment", value: "expiration_date" },
  { text: "Actions", value: "Actions" },
];
const Page = () => {
  const title = "Project-details";
  const { t } = useTranslation();
  const router = useRouter();
  const { project_id } = router.query;
  const projectContext = useProject();
  const bidContext = useBid();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const { showAlert, renderForAlert } = useAlert();
  const [openBidModle, setOpenBidModle] = useState(false);
  const [SelectedOfferId, setSelectedOfferId] = useState("");
  const [confirm, setConfirm] = useState(false);
  const handleCloseConfirm = () => setConfirm(false);
  const handleClose = () => setOpen(false);

  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller, setController } =
    usePageUtilities();

  const fetchAttachedFiles = async () => {
    if (project_id && typeof project_id === "string") {
      try {
        await projectContext?.fetchAttachedFile(
          controller?.page,
          controller?.rowsPerPage,
          project_id
        );
      } catch (error) {
        showAlert(showErrorMessage(error).toString(), "error");
      }
    }
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

  const fetchListBids = async () => {
    if (project_id && typeof project_id === "string") {
      try {
        await bidContext?.fetchlistOffers(
          project_id,
          controller?.page,
          controller?.rowsPerPage,
          controller?.SearchString
        );
      } catch (error) {
        showAlert(showErrorMessage(error).toString(), "error");
      }
    }
  };

  React.useEffect(() => {
    fetchProject();
    fetchAttachedFiles(); //1
    fetchListBids(); //2
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project_id]);

  React.useEffect(() => {
    //depends on tap value
    if (value === 1) {
      fetchAttachedFiles(); //1
    } else if (value === 3) {
      fetchListBids(); //2
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller, value]);

  // React.useEffect(() => {
  //   //depends on tap value
  //   fetchAttachedFiles(); //1
  //   fetchListBids(); //2
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [controller]);

  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handlePageChange(event, 1);
  };

  //for bids table
  const handleAcceptRequest = (offerID: any) => {
    setSelectedOfferId(offerID);
    setConfirm(true);
  };
  const ConfirmAcceptance = async () => {
    try {
      await axiosClient?.post(`/offers/${SelectedOfferId}/${project_id}/acceptOffer`);
      fetchProject();
      showAlert(
        "Offer has been accepted successfully - Let's begin this exciting journey",
        "success"
      );
    } catch (error) {
      showAlert(showErrorMessage(error).toString(), "error");
    }
    setConfirm(false);
  };
  const additionalTablePropsForListOfBids = {
    onRenderBidderName: (item: IOffer) => {
      if (!item?.is_anonymous) {
        return (
          <Link href={`/expert-details/${item?.user_id}`} style={{ textDecoration: "none" }}>
            <Stack alignItems="center" direction="row" gap={0.5}>
              <Avatar src={item?.user?.avatar} />
              <Typography variant="subtitle2" color="initial">
                {item?.user?.name || item?.user?.email}
              </Typography>
            </Stack>
          </Link>
        );
      } else {
        return (
          <Stack alignItems="center" direction="row" gap={0.5}>
            <Avatar />
            <Typography variant="subtitle2" color="initial">
              {t(`Anonymous`)}
            </Typography>
          </Stack>
        );
      }
    },

    onRenderActions: (item: IOffer) => {
      if (projectContext?.Selectedproject?.request_for_proposal_status == "PENDING")
        return (
          <Button
            variant="contained"
            color="warning"
            sx={{
              borderRadius: 8,
              backgroundColor: "#FFF8E6",
              border: 1,
              borderColor: "#FFD777",
            }}
            onClick={() => {
              handleAcceptRequest(item?.id);
            }}
          >
            {dictionary("Accept")}
          </Button>
        );
      if (item?.is_accepted) {
        return <Typography>{t("Accepted")}</Typography>;
      } else {
        return <Typography>{t(" - ")}</Typography>;
      }
    },
    onRenderduration: (item: IOffer) => {
      return <Typography variant="body2">{convertFromHours(item?.number_of_hours)}</Typography>;
    },
  };
  const testingTimeString = useCallback((time: PreferredTestingTime) => {
    switch (time) {
      case PreferredTestingTime.DURING_WORKING_HOURS:
        return "During the working hours";
      case PreferredTestingTime.OFF_WORKING_HOURS:
        return "Off working hours";
      case PreferredTestingTime.WEEKEND:
        return "Weekends";
      case PreferredTestingTime.NOT_PREFFERED:
        return "No preference";
      default:
        return "During the working hours";
    }
  }, []);
  return (
    <>
      <Head>
        <title>{projectContext?.Selectedproject?.project_name || title} | Symline</title>
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
                    amount: projectContext?.countFiles,
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
                    amount: projectContext?.countFiles,
                  },
                  {
                    title: "Discussion",
                    amount: 0,
                  },
                  {
                    title: "List of bids",
                    amount: bidContext?.countOffers,
                  },
                ]}
              />
            </RoleBasedRender>
          </Grid>
          {projectContext?.Selectedproject?.request_for_proposal_status == "PENDING" && (
            <RoleBasedRender componentId="button-bid-rfp">
              <Grid
                ////////// item
                xs={12}
                sm={2}
                sx={{ display: "flex", justifyContent: { sm: "end", xs: "end" } }}
              >
                <Button
                  onClick={() => setOpenBidModle(true)}
                  variant="contained"
                  color="warning"
                  sx={{ borderRadius: 8, px: 6 }}
                  size="large"
                >
                  {dictionary("Bid")}
                </Button>
              </Grid>
            </RoleBasedRender>
          )}
          {/* <RoleBasedRender
              componentId="buttons-accept-reject-rfp"
            >
              <Grid item xs={2} md={2} sx={{ display: "flex", justifyContent: { sm: 'end', xs: 'start' } }}>
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

            </RoleBasedRender> */}
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
                    {t("General Questions")}
                  </Typography>
                  <Container maxWidth={"xl"}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      {t(" What is preferred testing time ?")}
                    </Typography>
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 4 }}>
                      {projectContext?.Selectedproject?.preferred_testing_time?.map(
                        (time: PreferredTestingTimeStrings, index: number) =>
                          `${testingTimeString(PreferredTestingTime[time])} ${
                            index <
                            projectContext?.Selectedproject?.preferred_testing_time?.length - 1
                              ? " - "
                              : ""
                          }`
                      )}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }}>
                      {t("Expire date")}
                    </Typography>
                    <Typography variant="h6" fontWeight="light" sx={{ mb: 4, px: 1 }}>
                      {getLocalTime(
                        projectContext?.Selectedproject.expiration_date || ""
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      {t(`In case of emergency , what is the contact details of the person the assessor
                       should have a contact with :`)}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                      {t("First person:")}
                    </Typography>
                    <Grid container spacing={1} justifyContent={"space-between"}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          {`Name: ${projectContext?.Selectedproject?.firstFullName || " - "}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          {`Email: ${projectContext?.Selectedproject?.firstEmail || " - "}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          {`Mobile Number: ${
                            projectContext?.Selectedproject?.firstMobile || " - "
                          }`}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="body1" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                      {t("Second person:")}
                    </Typography>
                    <Grid container spacing={0} justifyContent={"space-between"}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          {`Name: ${projectContext?.Selectedproject?.secondFullName || " - "}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          {`Email: ${projectContext?.Selectedproject?.secondEmail || " - "}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="light" sx={{ mb: 2 }}>
                          {`Mobile Number: ${
                            projectContext?.Selectedproject?.secondMobile || " - "
                          }`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Container>

                  {projectContext?.Selectedproject?.request_for_proposal &&
                    projectContext?.Selectedproject?.request_for_proposal?.map(
                      (item: RequestForProposal) =>
                        item?.category?.name === "Web Application" ? (
                          <WebAnswers key={item?.id} project={item} />
                        ) : item?.category?.name === "Architecture Configuration" ? (
                          <ArchitectureConfigurationReviewAnswer key={item?.id} project={item} />
                        ) : item?.category?.name === "Network" ? (
                          <NetworkAnswers project={item} key={item?.id} />
                        ) : item?.category?.name === "Mobile Application" ? (
                          <MobileAnswers project={item} key={item?.id} />
                        ) : item?.category?.name === "Security Source Code" ? (
                          <SourceCodeAnswers project={item} key={item?.id} />
                        ) : (
                          <></>
                        )
                    )}
                </CardContent>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                <AttachedFilles
                  RefreshAttachedFiles={fetchAttachedFiles}
                  projectId={project_id}
                  controller={controller}
                  handlePageChange={handlePageChange}
                  handleRowsPerPageChange={handleRowsPerPageChange}
                  attachedFiles={projectContext?.files}
                  userId={projectContext?.Selectedproject?.user_id}
                />
              </CustomTabPanel>

              <CustomTabPanel value={value} index={2} padding={"0"}>
                <DiscussionContextProvider multi_RFP_id={project_id as string}>
                  <Discussion multi_RFP_id={project_id as string} />
                </DiscussionContextProvider>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={3}>
                {bidContext?.countOffers == undefined || bidContext?.countOffers != 0 ? (
                  <>
                    <DataTable
                      headers={listOfBidsHeaders}
                      name="bids"
                      items={bidContext?.offers}
                      totalItems={bidContext?.countOffers}
                      totalPages={bidContext?.totalPages}
                      page={controller?.page || 1}
                      rowsPerPage={controller?.rowsPerPage}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleRowsPerPageChange}
                      {...additionalTablePropsForListOfBids}
                      SearchString={controller?.SearchString}
                    />
                  </>
                ) : (
                  <Noitems
                    title={"No bids yet"}
                    icon={<FolderCopyIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
                  />
                )}
              </CustomTabPanel>
            </Card>
          </Grid>
        </Grid>
        {renderForAlert()}
      </Container>
      <ViewImagesDialog open={open} handleClose={handleClose} />
      <ConfirmationPopup
        open={confirm}
        handleClose={handleCloseConfirm}
        message={t("Are you sure you want to accept this Offer ?")}
        title={t("Offer Accepttance")}
        confirmFuntion={ConfirmAcceptance}
        setOpen={setConfirm}
      />
      <BidModal
        open={openBidModle}
        handleClose={() => {
          setOpenBidModle(false);
        }}
        multi_RFP_id={project_id}
        showMessage={showAlert}
      />
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <BidContextProvider>
      <DiscussionContextProvider>
        <ProjectContextProvider>{page}</ProjectContextProvider>
      </DiscussionContextProvider>
    </BidContextProvider>
  </DashboardLayout>
);

export default Page;
