import Head from "next/head";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import SharedTable from "@/components/SharedTable";
import projects from "../../../public/projects.json";
import projectsForSP from "../../../public/projects-for-sp.json";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import router from "next/router";
import RoleBasedRender from "@/hocs/RoleBasedRender";

const Page = () => {
  const { i18n } = useTranslation();
  const title = "Projects";
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

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
        borderTopLeftRadius: i18n.language == 'ar' ? 25 : 0,
        borderBottomLeftRadius: i18n.language == 'ar' ? 25 : 25,
        borderTopRightRadius: i18n.language == 'ar' ? 0 : 25,
        borderBottomRightRadius: i18n.language == 'ar' ? 0 : 25,
        }}
      >
        <Container maxWidth="xl">
          <Grid display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
            <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
              {dictionary(title as TranslatedWord)}
            </Typography>
            <RoleBasedRender
              componentId="button-request-a-project"
            >
              <Button
                onClick={() => router.push("/bid/create-rfp")}
                variant="contained" color="warning" sx={{ borderRadius: 8, mb: 2 }}>
                {dictionary("Create RFP")}
              </Button>
            </RoleBasedRender>
          </Grid>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item xs={12}>
              <Card sx={{ px: 2 }}>
                <RoleBasedRender
                  componentId="table-service-provider-projects">
                  <SharedTable
                    muiTableBodyRowProps={(row) => ({
                      onClick: () => router.push(`/projects/1`),
                      sx: { cursor: "pointer" },
                    })}
                    endpoint={process.env.API_URL + "/multi-rfp"}
                    fakeData={projects}
                  />
                </RoleBasedRender>

                <RoleBasedRender
                  componentId="table-client-projects">
                  <SharedTable
                    muiTableBodyRowProps={(row) => ({
                      onClick: () => router.push(`/projects/1`),
                      sx: { cursor: "pointer" },
                    })}
                    endpoint= {process.env.API_URL + "/multi-rfp"}
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