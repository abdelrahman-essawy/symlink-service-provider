import Head from "next/head";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SharedTable from "@/components/SharedTable";
import projects from "../../../public/projects.json";
import projectsForSP from "../../../public/projects-for-sp.json";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import router from "next/router";
import RoleBasedRender from "@/hocs/RoleBasedRender";
import { useEffect, useMemo, useState } from "react";
import { Stack, Tooltip, Avatar, Switch } from "@mui/material";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import useAlert from "@/hooks/useAlert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import IconButton from "@mui/material/IconButton";
import { DashboardLayout } from "@/layouts/dashboard/layout";
import { DataTable } from "@/components/shared/DataTable";
import Link from "next/link";
import ConfirmationPopup from "@/components/confirmation-popup";
import projectContextProvider from "@/contexts/project-context";
import { useProject } from "@/hooks/use-project";
import ProjectContextProvider from "@/contexts/project-context";
import { IProject } from "@/@types/project";
import { useRouter } from "next/navigation";
import { getLocalTime } from "@/utils/helperFunctions";
import ProjectStatusBadge from "@/sections/projects/project-status";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MenuButton } from "@/components/button-menu";
import { TActionMenuButton } from "@/components/shared/MenuItems";
import { sharedStyles } from "@/utils/sharedStyles";
import { CardTableActions } from "@/sections/projects/Project-table-actions";
const Page = () => {
  const { i18n } = useTranslation();
  const title = "Projects";
  const projectContext = useProject();
  const { t } = useTranslation();
  const { push } = useRouter();
  const [value, setValue] = React.useState(0);
  const { showAlert, renderForAlert } = useAlert();
  const [editMood, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [showView, setShowView] = useState(false);
  const headers = [
    { text: "RFP name", value: "project_name" },
    { text: "Status", value: "request_for_proposal_status" },
    { text: "Creation date", value: "created_at" },
    { text: "Updated date", value: "updated_at" },
    { text: "Actions", value: "Actions" },
  ];

  const onClose = () => {
    setOpen(false);
    setShowView(false);
  };
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller, setController } =
    usePageUtilities();


  useEffect(() => {
    projectContext?.fetchProjects(controller.page, controller.rowsPerPage, controller.filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  const handleSubmit = async (formdata: any) => {
    if (editMood) {
      projectContext?.EditProject(formdata);
      showAlert(t("Edited", { name: t("Project") }).toString(), "success");
    } else {
      projectContext?.AddProject(formdata);
      showAlert(t("Added", { name: t("Project") }).toString(), "success");
    }
    (async () => {
      await setEditMode(false);
      await setRecord({});
    })();
    // setOpen(false);
  };

  const handleEditProject = (Project: any) => {
    setRecord(Project);
    setEditMode(true);
    setOpen(true);
  };

  const handleAddProject = () => {
    setEditMode(false);
    setRecord({});
    setOpen(true);
  };

  const handleDeleteProject = (ProjectId: string) => {
    setSelectedProjectId(ProjectId);
    setOpenConfirm(true);
  };
  const DeleteProject = () => {
    setOpenConfirm(false);
    projectContext?.DeleteProject(selectedProjectId);
    showAlert(t("Project has been deleted successfully").toString(), "success");
  };

  const handleViewProject = (Project: IProject) => {
    setRecord(Project);
    setShowView(true);
  };

  const additionalTableProps = {
    onRendercreated_at: (item: any) =>
      getLocalTime(item.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    onRenderupdated_at: (item: any) =>
      getLocalTime(item.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    onRenderrequest_for_proposal_status: (item: any) => {
      return item?.request_for_proposal_status ? (
        <ProjectStatusBadge status={item?.request_for_proposal_status} />
      ) : null;
    },
    onRenderActions: (item: any) => {
      return (
        <CardTableActions
          card={item}
        />
      );
    },
    onRowClick: (e: any, item: IProject) => push(`projects/${item.id}`),
  };

  const menuItemsEmployees:TActionMenuButton[] = [
    {
      label: "Edit",
      onClick: (e: any, id: string | undefined) => {
        e.stopPropagation();
        handleEditProject(id);
      },
      sx: sharedStyles("editButton"),
    },
  ];
  const handleSorting = (sortingObj: any) => {
    setController({
      ...controller,
      OrderBy: sortingObj,
    });
  };
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
          borderTopLeftRadius: i18n.language == "ar" ? 25 : 0,
          borderBottomLeftRadius: i18n.language == "ar" ? 25 : 25,
          borderTopRightRadius: i18n.language == "ar" ? 0 : 25,
          borderBottomRightRadius: i18n.language == "ar" ? 0 : 25,
        }}
      >
        <Container maxWidth="xl">
          <ConfirmationPopup
            message={"Are you sure to delete this College?"}
            confirmFuntion={DeleteProject}
            open={openConfirm}
            setOpen={setOpenConfirm}
          />
          <Grid display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
              {dictionary(title as TranslatedWord)}
            </Typography>
            <RoleBasedRender componentId="button-request-a-project">
              <Button
                onClick={() => router.push("/bid/create-rfp")}
                variant="contained"
                color="warning"
                sx={{ borderRadius: 8, mb: 2 }}
              >
                {dictionary("Create RFP")}
              </Button>
            </RoleBasedRender>
          </Grid>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <RoleBasedRender componentId="table-service-provider-projects">
                  <DataTable
                    headers={headers}
                    name="Project"
                    items={projectContext?.projects}
                    totalItems={projectContext?.count}
                    totalPages={projectContext?.totalPages}
                    page={controller?.page||1}
                    rowsPerPage={controller?.rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    {...additionalTableProps}
                  />
                </RoleBasedRender>

                <RoleBasedRender componentId="table-client-projects">
                  <DataTable
                    headers={headers}
                    name="Project"
                    items={projectContext?.projects}
                    totalItems={projectContext?.count}
                    totalPages={projectContext?.totalPages}
                    page={controller?.page||1}
                    rowsPerPage={controller?.rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    {...additionalTableProps}
                  />
                </RoleBasedRender>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <ProjectContextProvider>{page}</ProjectContextProvider>
  </DashboardLayout>
);

export default Page;
