import Head from "next/head";
import {
  Box,
  Card,
  Container,
  Grid,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExperienceDialog from "@/components/_used-symline/dialogs/experience-dialog";
import ConfirmDialog from "@/components/_used-symline/dialogs/confirm-dialog";
import useAlert from "@/hooks/use-alert";
import { useAuth } from "@/hooks/use-auth";
import { getLocalTime, showErrorMessage } from "@/utils/helperFunctions";
import Noitems from "@/components/shared/no-items";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { project } from "@/contexts/auth-context";
import ConfirmationPopup from "@/components/confirmation-popup";
import axiosClient from "@/configs/axios-client";
const Page = () => {
  const title = "Experience";
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [dialogName, setDialogName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProject, setSelectedProject] = useState<project| undefined>(undefined);
  const { showAlert, renderForAlert } = useAlert();
  const [confirm, setConfirm] = useState(false);
  const handleCloseConfirm = () => setConfirm(false);

  const handleClose = () => setOpen(false);

  const handleOpenAdd = () => {
    setDialogName("Add experience");
    setSelectedProject(undefined);
    setOpen(true);
  };
  const handleOpenEdit = useCallback(
    (project:project) => {
      setDialogName("Edit experience");
      setSelectedProject(project);
      setOpen(true);
    },
    [],
  )
  

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
                {auth?.providerInfo?.projects?.length ? (
                  <Grid container spacing={2} justifyContent={"space-between"}>
                    {auth?.providerInfo?.projects?.map((project: project) => (
                      <Grid key={project.id} item xs={12}>
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
                              {project?.name}
                            </Typography>
                            <Box>
                              <IconButton sx={{ mx: 1 }}>
                                <DeleteForeverIcon onClick={()=>handleOpenConfirmDeleteProject(project?.id)} />
                              </IconButton>
                              <IconButton>
                                <BorderColorIcon onClick={()=>handleOpenEdit(project)} />
                              </IconButton>
                            </Box>
                          </Grid>
                        </Grid>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }}>
                          {t("Date")}
                        </Typography>
                        <Typography variant="body1" fontWeight="light" sx={{ mb: 4, px: 1 }}>
                          {getLocalTime(project?.start_date).toLocaleDateString(
                            i18n.language == "en" ? "en-US" : "ar-EG",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}{" "}
                          {t("To")}{" "}
                          {getLocalTime(project?.end_date).toLocaleDateString(
                            i18n.language == "en" ? "en-US" : "ar-EG",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, px: 1 }}>
                          {t("About project")}
                        </Typography>
                        <Typography variant="body1" fontWeight="light" sx={{ mb: 1, px: 1 }}>
                          {project.description}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Noitems
                    title={"No Projects yet"}
                    icon={<FolderCopyIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
                  />
                )}
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
