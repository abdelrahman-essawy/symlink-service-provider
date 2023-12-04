import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { RequestForProposal } from "@/@types/project";
interface IProps {
  project: RequestForProposal;
}

export default function NetworkAnswers({ project }: IProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        sx={{ p: 1, mb: 2, borderRadius: 1, bgcolor: "primary.lightest" }}
      >
        {project?.category?.name}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} gap={1.5} display={"flex"} flexDirection={"column"}>
          <Typography variant="h6" fontWeight="bold">
            {t("Assessment Type?")}
          </Typography>
          <Typography variant="h6" fontWeight="light">
            {project?.assessments_type_meta_data?.name}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mb: 1, mt: 2 }}
          gap={1.5}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("How many IPs to be tested ?")}
          </Typography>
          <Grid spacing={1} container alignItems="baseline" justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={4} display={"flex"} alignItems={"baseline"}>
              <Typography variant="h6" fontWeight="bold">
                {t("Servers")}
              </Typography>
              <Typography variant="h6" fontWeight={"bold"} color="initial">
                {":  "}
              </Typography>
              <Typography variant="h6" fontWeight="light">
                {project?.how_many_IPS_should_be_tested_in_servers}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} display={"flex"} alignItems={"baseline"}>
              <Typography variant="h6" fontWeight="bold">
                {t("Workstations")}
              </Typography>
              <Typography variant="h6" fontWeight={"bold"} color="initial">
                {": "}
              </Typography>
              <Typography variant="h6" fontWeight="light">
                {project?.how_many_IPS_should_be_tested_in_workstations}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} display={"flex"} alignItems={"baseline"}>
              <Typography variant="h6" fontWeight="bold">
                {t("Network devices")}
              </Typography>
              <Typography variant="h6" fontWeight={"bold"} color="initial">
                {": "}
              </Typography>
              <Typography variant="h6" fontWeight="light">
                {project?.how_many_IPS_should_be_tested_in_network_devices}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mb: 1, mt: 2 }}
          gap={1.5}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("Is the assessment internal/external ?")}
          </Typography>
          <Typography variant="h6" fontWeight="light">
            {project?.evaluation_is_internal_or_external_meta_data?.name}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mb: 1, mt: 2 }}
          gap={1.5}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("For internal testing, will you provide VPN access to the assessor ?")}
          </Typography>
          <Typography variant="h6" fontWeight="light">
            {project?.vpn_access_to_the_resident? "Yes" : "No"}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ mb: 1, mt: 2 }}
          gap={1.5}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("Approach of the assessment (white/grey/black)")}
          </Typography>
          <Typography variant="h6" fontWeight="light">
            {project?.evaluation_approach}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ mb: 1, mt: 2 }}
          gap={1.5}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("List the scoped IPs: (i.e. 1.1.1.1)")}
          </Typography>
          <Typography variant="h6" fontWeight="light">
            {project?.details_ips_scoped}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mb: 1, mt: 2 }}
          gap={1.5}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("Is active directory part of the assessment ?")}
          </Typography>
          <Typography variant="h6" fontWeight="light">
            {project?.active_directory}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mb: 1, mt: 2 }}
          gap={1.5}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("Is it mandatory that the assessor to be onsite ?")}
          </Typography>
          <Typography variant="h6" fontWeight="light">
            {project?.how_many_times_on_site ? "Yes" : "No"}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mb: 1, mt: 2 }}
          gap={1.5}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h6" fontWeight="bold">
            {t("If yes, how many times ?")}
          </Typography>
          <Typography variant="h6" fontWeight="light">
            {project?.how_many_times_on_site}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mb: 1, mt: 2 }}
          gap={1.5}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h6" fontWeight="bold">
            {t(
              "Is verification required to assess whether the reported vulnerabilities have been fixed?"
            )}
          </Typography>
          <Typography variant="h6" fontWeight="light">
            {project?.Verify_that_vulnerabilities_are_fixed ? "Yes" : "No"}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
