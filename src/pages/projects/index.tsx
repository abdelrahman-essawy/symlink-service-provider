import Head from "next/head";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import router from "next/router";
import RoleBasedRender from "@/hocs/RoleBasedRender";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import useAlert from "@/hooks/useAlert";
import { DashboardLayout } from "@/layouts/dashboard/layout";
import { DataTable } from "@/components/shared/DataTable";
import { useProject } from "@/hooks/use-project";
import ProjectContextProvider from "@/contexts/project-context";
import { IProject } from "@/@types/project";
import { useRouter } from "next/navigation";
import { getLocalTime, showErrorMessage } from "@/utils/helperFunctions";
import ProjectStatusBadge from "@/sections/projects/project-status";
import { TActionMenuButton } from "@/components/shared/MenuItems";
import { sharedStyles } from "@/utils/sharedStyles";
import { CardTableActions } from "@/sections/projects/Project-table-actions";
import { SearchBar } from "@/sections/shared/search-bar";
import { useAuth } from "@/hooks/use-auth";
import MenuButton from "@/components/shared/ButtonMenu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ConfirmationPopup from "@/components/confirmation-popup";

const Page = () => {
  const { i18n } = useTranslation();
  const title = "Projects";
  const projectContext = useProject();
  const { t } = useTranslation();
  const { push } = useRouter();
  const { showAlert, renderForAlert } = useAlert();
  const [editMood, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleCloseConfirm = () => setOpenConfirm(false);
  const [showView, setShowView] = useState(false);
  const auth = useAuth();
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const headers = [
    { text: "RFP name", value: "project_name" },
    { text: "Status", value: "request_for_proposal_status" },
    { text: "Creation date", value: "created_at" },
    { text: "Expiration date", value: "expiration_date" },
    { text: "Actions", value: "Actions" },
  ];

  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller, handleSorting } =
    usePageUtilities();

  const fetchProjects = async () => {
    if (auth?.user?.role === "PROVIDER") {
      setIsLoadingProjects(true);
      await projectContext?.fetchProjects(
        "provider-All-MultiRFP",
        controller.page,
        controller.rowsPerPage,
        controller.SearchString
      );
      setIsLoadingProjects(false);
    } else if (auth?.user?.role === "CLIENT") {
      setIsLoadingProjects(true);
      await projectContext?.fetchProjects(
        "client-All-MultiRFP",
        controller.page,
        controller.rowsPerPage,
        controller.SearchString
      );
      setIsLoadingProjects(false);
    }
  };
  useEffect(() => {
    fetchProjects();
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

  const handleDeleteProject = (ProjectId: string) => {
    setSelectedProjectId(ProjectId);
    setOpenConfirm(true);
  };

  const DeleteProject = async () => {
    if (selectedProjectId != undefined) {
      try {
        await projectContext?.DeleteProject(selectedProjectId);
        showAlert(t("Project has been deleted successfully").toString(), "success");
        fetchProjects();
      } catch (error) {
        showAlert(showErrorMessage(error).toString(), "error");
      }
      setOpenConfirm(false);
      setSelectedProjectId(undefined);
    }
  };

  const additionalTableProps = {
    onRendercreated_at: (item: any) =>
      getLocalTime(item.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    onRenderexpiration_date: (item: any) =>
      getLocalTime(item.expiration_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    onRenderrequest_for_proposal_status: (item: any) => {
      return item?.request_for_proposal_status ? (
        <ProjectStatusBadge status={item?.request_for_proposal_status} />
      ) : null;
    },
    onRenderActions: (item: any) => {
      return (
        <MenuButton
          actions={menuItemsEmployees}
          id={item?.id}
          sx={sharedStyles("actions")}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
          }}
        >
          <MoreHorizIcon />
        </MenuButton>
      );
    },
    onRowClick: (e: any, item: IProject) => push(`projects/${item.id}`),
  };

  const menuItemsEmployees: TActionMenuButton[] = [
    {
      label: "Edit",
      onClick: (e: any, id: string | undefined) => {
        e.preventDefault();
        e.stopPropagation();
        handleEditProject(id);
      },
      sx: sharedStyles("editButton"),
    },
    {
      label: "Delete",
      onClick: (e: any, id: string | undefined) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(id);
        if (id) {
          handleDeleteProject(id);
        }
      },
      sx: sharedStyles("approveButton"),
    },
  ];

  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
      <Container maxWidth="xl">
        <ConfirmationPopup
          open={openConfirm}
          handleClose={handleCloseConfirm}
          message={t("Are you sure you want to delete this Project ?")}
          title={t("Delete RFP")}
          confirmFuntion={DeleteProject}
          setOpen={setOpenConfirm}
        />
        <Grid display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
            {dictionary(title as TranslatedWord)}
          </Typography>
          {auth?.user?.role === "CLIENT" && (
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
          )}
        </Grid>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
              <Stack spacing={2}>
                <SearchBar onSearchChange={handleSearch} />
                <DataTable
                  headers={headers}
                  name="Projects"
                  items={projectContext?.projects}
                  totalItems={projectContext?.count}
                  totalPages={projectContext?.totalPages}
                  page={controller?.page || 1}
                  rowsPerPage={controller?.rowsPerPage}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  {...additionalTableProps}
                  isLoading={isLoadingProjects}
                  handleSendSortBy={handleSorting}
                  handleSearch={handleSearch}
                  SearchString={controller?.SearchString}
                />
              </Stack>
            </Card>
          </Grid>
        </Grid>
        {renderForAlert()}
      </Container>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <ProjectContextProvider>{page}</ProjectContextProvider>
  </DashboardLayout>
);

export default Page;
