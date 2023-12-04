import {
  Grid,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {  RequestForProposal } from "@/@types/project";
interface IProps {
  project: RequestForProposal;
}

export default function MobileAnswers({  project }: IProps) {
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
              {t("What is the average size of these apps ?")}
            </Typography>
            <Typography variant="h6" fontWeight="light" >
              {project?.average_applications_meta_data?.name|| "-"}
            </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1, mt: 2 }} gap={1.5} display={"flex"} flexDirection={"column"}>
        <Typography variant="h6" fontWeight="bold" >
            {t(
              "How many user roles you have in this application? i.e normal user, moderator, admin etc"
            )}
          </Typography>
          <Typography variant="h6" fontWeight="light" >
              {project?.How_many_user_roles || "-" }
            </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1, mt: 2 }} gap={1.5} display={"flex"} flexDirection={"column"}>
        <Typography variant="h6" fontWeight="bold" >
            {t("Approach of the assessment (white/grey/black)")}
          </Typography>
          <Typography variant="h6" fontWeight="light" >
              {project?.evaluation_approach}
            </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1, mt: 2 }} gap={1.5} display={"flex"} flexDirection={"column"}>
        <Typography variant="h6" fontWeight="bold" >
              {t(
                "How to access the application: (i.e. link of their Apple/Google stores)"
              )}
            </Typography>
                        <Typography variant="h6" fontWeight="light" >
              {project?.how_to_access_the_application}
            </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1, mt: 2 }} gap={1.5} display={"flex"} flexDirection={"column"}>
        <Typography variant="h6" fontWeight="bold" >
            {t(
              "Is it mandatory that the assessor to be onsite ?"
            )}
          </Typography>
                      <Typography variant="h6" fontWeight="light" >
              {project?.how_many_times_on_site?"Yes":"No"}
            </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1, mt: 2 }} gap={1.5} display={"flex"} flexDirection={"column"}>
        <Typography variant="h6" fontWeight="bold" >
            {t("If yes, how many times ?")}
          </Typography>
                      <Typography variant="h6" fontWeight="light" >
              {project?.how_many_times_on_site}
            </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1, mt: 2 }} gap={1.5} display={"flex"} flexDirection={"column"}>
        <Typography variant="h6" fontWeight="bold" >
            {t("Approach of the assessment (white/grey/black)")}
          </Typography>
                      <Typography variant="h6" fontWeight="light" >
              {project?.evaluation_approach}
            </Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: 1, mt: 2 }} gap={1.5} display={"flex"} flexDirection={"column"}>
        <Typography variant="h6" fontWeight="bold" >
              {t("Is verification required to assess whether the reported vulnerabilities have been fixed?")}
            </Typography>
                        <Typography variant="h6" fontWeight="light" >
              {project?.Verify_that_vulnerabilities_are_fixed?"Yes":"No"}
            </Typography>
      </Grid>
    </Grid>
  </Box>
  );
}