import Head from "next/head";
import {
  Card,
  Container,
  Grid,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import ExperienceDialog from "@/components/_used-symline/dialogs/experience-dialog";
import useAlert from "@/hooks/use-alert";
import { useAuth } from "@/hooks/use-auth";
import {  showErrorMessage } from "@/utils/helperFunctions";
import ConfirmationPopup from "@/components/confirmation-popup";
import axiosClient from "@/configs/axios-client";
import ProviderProjects from "@/sections/Profile/provider-projects";
import { project } from "@/@types/user";
const Page = () => {
  const title = "Experience";
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [dialogName, setDialogName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProject, setSelectedProject] = useState<project | undefined>(undefined);
  const { showAlert, renderForAlert } = useAlert();
  const [confirm, setConfirm] = useState(false);
  const handleCloseConfirm = () => setConfirm(false);

  const handleClose = () => setOpen(false);

  const handleOpenAdd = () => {
    setDialogName("Add experience");
    setSelectedProject(undefined);
    setOpen(true);
  };
  const handleOpenEdit = useCallback((project: project) => {
    setDialogName("Edit experience");
    setSelectedProject(project);
    setOpen(true);
  }, []);

  const getProviderInfo = async () => {
    try {
      await auth?.getProviderInfo();
    } catch (error) {
      showAlert(showErrorMessage(error), "error");
    }
  };

  useEffect(() => {
    getProviderInfo();
  }, []);

  const handleOpenConfirmDeleteProject = useCallback((id: string) => {
    setSelectedProjectId(id);
    setConfirm(true);
  }, []);

  const handleDeleteProject = useCallback(
    async () => {
      console.log(selectedProjectId);
      try {
        await axiosClient.delete(`/provider/project/${selectedProjectId}`);
        showAlert("Certificate deleted successfully", "success");
        getProviderInfo();
      } catch (error) {
        showAlert(showErrorMessage(error).toString(), "error");
      }
      setConfirm(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedProjectId]
  );
  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
      <Container maxWidth="xl">
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
        >
          <Grid item xs={6} md={8} sx={{ display: "flex", justifyContent: "start" }}>
            <Typography variant="h4" fontWeight={"bold"}>
              {dictionary(title as TranslatedWord)}
            </Typography>
          </Grid>

          <Grid item xs={6} md={3} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              size="large"
              color="warning"
              sx={{ borderRadius: "34px", px: 5 }}
              type="submit"
              variant="contained"
              onClick={handleOpenAdd}
            >
              {t("Add")}
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={12}>
            <Card elevation={1} sx={{ p: 2.5 }}>
              <CardContent sx={{ p: 0 }}>
                <ProviderProjects
                  canCrud={true}
                  handleOpenConfirmDeleteProject={handleOpenConfirmDeleteProject}
                  handleOpenEdit={handleOpenEdit}
                  projects={auth?.providerInfo?.projects}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {renderForAlert()}
        <ConfirmationPopup
          open={confirm}
          handleClose={handleCloseConfirm}
          message={t("Are you sure you want to delete this Project ?")}
          title={t("Delete Project")}
          confirmFuntion={handleDeleteProject}
          setOpen={setConfirm}
        />
        <ExperienceDialog
          title={dialogName}
          open={open}
          handleClose={handleClose}
          showAlert={showAlert}
          refreshProviderInfo={getProviderInfo}
          editValues={selectedProject}
        />
      </Container>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
