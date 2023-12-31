import Network from "@/components/_used-symline/questions/network";
import SourceCode from "@/components/_used-symline/questions/sourceCode";
import Web from "@/components/_used-symline/questions/web";
import { Box } from "@mui/material";
import React from "react";
import { Card, Grid, CardContent, Typography, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTranslation } from "react-i18next";
import Mobile from "@/components/_used-symline/questions/mobile";
import ArchitectureConfiguration from "@/components/_used-symline/questions/ArchitectureConfiguration";

type Props = {
  assessment: string;
  projects: any;
  onChange: (event: any, index: number) => void;
  onChangeNumber: (event: any, index: number) => void;
  index: number;
  order: number;
  removeInput: (index: number) => void;
  setDisableSubmitBtn: (status: boolean) => void;
};

const RenderAssessments = ({
  assessment,
  projects,
  onChange,
  onChangeNumber,
  index,
  removeInput,
  order,
  setDisableSubmitBtn
}: Props) => {
  const { t } = useTranslation();
  return (
    <Grid item xs={12}>
      <Card elevation={0} sx={{ p: 3 }}>
        <CardContent sx={{ p: 1 }}>
          <Grid container spacing={2} justifyContent={"space-between"} alignItems="center">
            <Grid item xs={12}>
              <Box sx={{ width: "100%", pa: 0 }}>
                <Grid container spacing={0} justifyContent="center">
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        px: 1,
                        borderRadius: 1,
                        bgcolor: "warning.lightest",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2" fontWeight="bold" color="warning.darkest">
                        {t(`${assessment}`) + ` ${order + 1}`}
                      </Typography>
                      <Box>
                        <IconButton onClick={() => removeInput(index)} aria-label="delete">
                          <DeleteForeverIcon sx={{ cursor: "pointer" }} />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box></Box>{" "}
                    <Box>
                      {assessment === "Web Application" ? (
                        <Web
                          projects={projects}
                          onChange={onChange}
                          index={index}
                          onChangeNumber={onChangeNumber}
                        />
                      ) : assessment === "Network" ? (
                        <Network
                          projects={projects}
                          onChange={onChange}
                          index={index}
                          onChangeNumber={onChangeNumber}
                        />
                      ) : assessment === "Mobile Application" ? (
                        <Mobile
                          projects={projects}
                          onChange={onChange}
                          index={index}
                          onChangeNumber={onChangeNumber}
                          setDisableSubmitBtn={setDisableSubmitBtn}
                        />
                      ) : assessment === "Security Source Code" ? (
                        <SourceCode 
                        projects={projects}
                        onChange={onChange}
                        index={index}
                        onChangeNumber={onChangeNumber}
                        />
                      ) : assessment === "Architecture Configuration" ? (
                        <ArchitectureConfiguration
                        projects={projects}
                        onChange={onChange}
                        index={index}
                        onChangeNumber={onChangeNumber} />
                      ) : null}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default RenderAssessments;
