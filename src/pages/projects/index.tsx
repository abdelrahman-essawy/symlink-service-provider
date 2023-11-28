import Head from "next/head";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import projects from "../../../public/projects.json";
import projectsForSP from "../../../public/projects-for-sp.json";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import router from "next/router";
import RoleBasedRender from "@/hocs/RoleBasedRender";
import SharedTable from "@/components/SharedTable";
import axiosClient from "@/configs/axios-client";
import { toFormData } from "axios";

const Page = () => {
  const { i18n } = useTranslation();
  const title = "Projects";
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const endpoint = "/multi-rfp";
  const getDataFn = async (endpointWithPaginationParams: string) => {
    const res = await axiosClient.get(endpointWithPaginationParams);
    return res.data;
  };

  const handletabs = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
              <Card sx={{ px: 2 }}>
                <RoleBasedRender componentId="table-service-provider-projects">
                <SharedTable
              endpoint={endpoint}
              getDataFn={
                ({
                  url: endpoint + "/index",
                  functionToPassUrl: getDataFn,
                })
              }
              addRowMutationFn={(values) => {
                return axiosClient.post(`${endpoint}/store`, toFormData(values));
              }}
              editRowMutationFn={({ id, newData }) => {
                return axiosClient.post(`${endpoint}/update/${id}`,
                  toFormData({
                    ...newData,
                    _method: "PATCH",
                  }),
                );
              }}
              deleteRowMutationFn={(itemToDelete) => {
                return axiosClient.delete(`${endpoint}/delete/${itemToDelete.id}`);
              }}
              identifyItemToBeDeletedBy="title_ar"
              pageIndexParam="page"
              pageSizeParam="paginate"
              enableRowActions
              enableAddNewRow
              easyColumns={[
                "id",
                "title_ar",
                "title_en",
                "is_active",
                "created_at",
                "updated_at",
              ]}
              modalCreateColumns={[
                {
                  header: "Title ar",
                  accessorKey: "title_ar",
                  formElementType: "text",
                },
                {
                  header: "Title en",
                  accessorKey: "title_en",
                  formElementType: "text",
                },
                {
                  header: "Is active",
                  accessorKey: "is_active",
                  formElementType: "switch",
                },
              ]}
              initialState={{
                columnVisibility: {
                  id: false,
                }
              }}
            />
                </RoleBasedRender>

                <RoleBasedRender componentId="table-client-projects">
                  <SharedTable
                    muiTableBodyRowProps={(row) => ({
                      onClick: () => router.push(`/projects/1`),
                      sx: { cursor: "pointer" },
                    })}
                    endpoint={process.env.API_URL + "/multi-rfp"}
                    fakeData={projectsForSP}
                    enableRowSelection
                    enableMultiRowSelection
                    showActions
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

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
