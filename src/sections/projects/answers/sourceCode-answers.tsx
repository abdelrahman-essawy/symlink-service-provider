import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import MultilineTypography from "@/components/multilineTypography";
import { RequestForProposal } from "@/@types/project";
interface IProps {
  project: RequestForProposal;
}
export default function SourceCodeAnswers({ project }: IProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        variant="h6"
        fontWeight="bold"
        color="primary"
        sx={{ p: 1, my: 1, borderRadius: 1, bgcolor: "primary.lightest" }}
      >
        {project?.category?.name}
      </Typography>
      <Container maxWidth={"xl"}>
        <Grid
          container
          spacing={0}
          alignItems="center"
          flexDirection={"row"}
          justifyContent={"end"}
          textAlign={i18n.language == "en" ? "right" : "left"}
        >
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
              {t("How many custom lines of code want to assess?")}
            </Typography>
            <MultilineTypography value={project?.how_many_custom_lines_of_code} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
              {t("What is the programming language of the code or frameworks?")}
            </Typography>
            <MultilineTypography value={project?.what_is_programming_language} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
              {t("Notes")}
            </Typography>
            <MultilineTypography value={project?.notes} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
