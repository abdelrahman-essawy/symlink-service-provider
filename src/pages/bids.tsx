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
import { DashboardLayout } from "@/layouts/dashboard/layout";
import { DataTable } from "@/components/shared/DataTable";
import { useBid } from "@/hooks/use-bid";
import BidContextProvider from "@/contexts/bid-context";
import { IBid } from "@/@types/bid";
import { useRouter } from "next/navigation";
import { getLocalTime } from "@/utils/helperFunctions";
import { SearchBar } from "@/sections/shared/search-bar";
import Noitems from "@/components/shared/no-items";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import ProjectStatusBadge from "@/sections/projects/project-status";

const Page = () => {
  const title = "Bids";
  const bidContext = useBid();
  const { t } = useTranslation();
  const { push } = useRouter();
  const auth = useAuth();

  const headers = [
    { text: "RFP name", value: "project_name" },
    { text: "Client name", value: "firstFullName" },
    { text: "Status", value: "request_for_proposal_status" },
    { text: "Creation date", value: "created_at" },
    { text: "Expiration date", value: "expiration_date" },
    { text: "Actions", value: "Actions" },
  ];


  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller, setController } =
    usePageUtilities();

  useEffect(() => {
    bidContext?.fetchBids(controller.page, controller.rowsPerPage, controller.SearchString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  const additionalTableProps = {
    onRenderfirstFullName: (item: IBid) =>
      <Link href={item?.user_id}>{item?.firstFullName}</Link>
    ,
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
    onRenderActions: (item: any) => (
      <Button
        variant="contained"
        color="warning"
        sx={{
          borderRadius: '16px',
          backgroundColor: "#FFF8E6",
          border: 1,
          borderColor: "#FFD777",
          px: 4,
        }}
        onClick={() => {push(`/projects/${item?.id}`)}}
      >
        {dictionary("Bid")}
      </Button>
    ),
  };

  return (
    <>
      <Head>
        <title>{t(title)} | Symline</title>
      </Head>
      <Container maxWidth="xl">
        <Grid display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
            {dictionary(title as TranslatedWord)}
          </Typography>
          {auth?.user?.role === "CLIENT" && (
            <RoleBasedRender componentId="button-request-a-bid">
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
              <RoleBasedRender componentId="table-service-provider-bids">
                {bidContext?.countBids == undefined || bidContext?.countBids > 0 ? (
                  <Stack spacing={2}>
                    <SearchBar onSearchChange={handleSearch} />
                    <DataTable
                      headers={headers}
                      name="Bid"
                      items={bidContext?.bids}
                      totalItems={bidContext?.countBids}
                      totalPages={bidContext?.totalPages}
                      page={controller?.page || 1}
                      rowsPerPage={controller?.rowsPerPage}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleRowsPerPageChange}
                      {...additionalTableProps}
                    />
                  </Stack>
                ) : (
                  <Noitems
                    title={"No Bid yet"}
                    icon={<FolderCopyIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
                  />
                )}
              </RoleBasedRender>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <BidContextProvider>{page}</BidContextProvider>
  </DashboardLayout>
);

export default Page;
