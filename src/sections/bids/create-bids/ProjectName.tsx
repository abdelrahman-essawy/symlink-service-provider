import React from "react";
import { Card, Grid, CardContent, Typography, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import FormLabel from "@mui/material/FormLabel";
export interface IProps {
  project_name: string;
  handleonchange: (event: any) => void;
}
function ProjectName({ project_name, handleonchange }: IProps) {
  const { t } = useTranslation();

  return (
    <Grid item xs={12}>
      <Card elevation={1} sx={{ p: 3 }}>
        <CardContent sx={{ p: 1 }}>
          <Grid container spacing={0} justifyContent={"space-between"} alignItems="center">
            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                sx={{
                  p: 1,
                  px: 1,
                  borderRadius: 1,
                  bgcolor: "warning.lightest",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  
                }}
              >
                <Typography variant="body2" fontWeight="bold" color="warning.darkest">
                  {t("Project Name")}
                </Typography>
              </Grid>
              <Grid container spacing={0} sx={{
                  display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height:"100%",
                mt:2
              }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    value={project_name}
                    onChange={handleonchange}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
                    placeholder={`${t("Type here ..")}`}
                    variant="outlined"
                    InputProps={{
                      required: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProjectName;
