import {
  Radio,
  FormLabel,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import {  IAssessmentProject } from "@/@types/assessments";
import axiosClient from "@/configs/axios-client";
import { IMetaData } from "@/@types/project";
interface IProps {
  onChange: (event: any, index: number) => void;
  onChangeNumber: (event: any, index: number) => void;
  projects: IAssessmentProject[];
  index: number;
}

export default function Mobile({ onChange, onChangeNumber, projects, index }: IProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const router = useRouter();
  const [appSize, setAppSize] = useState<IMetaData[]>([]);
  const fetchGernalApisSize = async () => {
    try {
      const res = await axiosClient?.get(`meta-data?status=average_applications`);
      setAppSize(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGernalApisSize();
  }, []);
  return (
    <>
      <Grid
        container
        spacing={0}
        alignItems="center"
        flexDirection={"row"}
        justifyContent={"end"}
        textAlign={i18n.language == "en" ? "right" : "left"}
      >
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, mt: 3 }}>
              {t("What is the average size of these apps ?")}
            </Typography>
            <RadioGroup
              row
              aria-labelledby="assessments_type_id"
              name="assessments_type_id"
              value={projects[index]?.assessments_type_id}
              onChange={(e: any) => onChange(e, index)}
            >
              <Grid container>
                {appSize?.length &&
                  appSize?.map((question: any) => {
                    return (
                      <Grid item xs={6} md={4} lg={3} key={question?.id}>
                        <FormControlLabel
                          sx={{ width: "100%" }}
                          value={question?.id}
                          control={<Radio color="warning" />}
                          label={t(question?.name)}
                          color="warning"
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
            {t(
              "How many user roles you have in this application? i.e normal user, moderator, admin etc"
            )}
          </Typography>
          <TextField
            fullWidth={true}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" }, mt: 1 }}
            placeholder={`${t("Type here ..")}`}
            variant="outlined"
            name="How_many_user_roles"
            value={projects[index]?.How_many_user_roles}
            onChange={(e: any) => onChangeNumber(e, index)}
            type="text"
            inputProps={{
              pattern: "^\\d+(\\.\\d+)?$", // Enforce numbers only pattern
              inputMode: "numeric", // Show numeric keyboard on mobile devices
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 3 }}>
            {t("Approach of the assessment (white/grey/black)")}
          </Typography>
          <Grid spacing={3} container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12}>
              <FormLabel sx={{ mx: 0.5 }}>
                {t("(If you want to be more specific, please comment in the textbox below)")}
              </FormLabel>
              <TextField
                fullWidth={true}
                multiline
                name="evaluation_approach"
                value={projects[index]?.evaluation_approach}
                onChange={(e: any) => onChange(e, index)}
                rows={3}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" }, mt: 1 }}
                placeholder={`${t("Description")}`}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5, mt: 4 }}>
            {t("How to access the application: (i.e. link of their Apple/Google stores)")}
          </Typography>
          <FormLabel sx={{ mx: 0.5 }}>
            {t(
              "(this option will be hidden from the bidders by default unless you want to be shown in the review page before publishing your proposal)"
            )}
          </FormLabel>
          <TextField
            fullWidth={true}
            placeholder={`${t("Description")}`}
            variant="outlined"
            value={projects[index]?.how_to_access_the_application}
            onChange={(e: any) => onChange(e, index)}
            name="how_to_access_the_application"
            multiline
            rows={3}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" }, mt: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
              {t("Is it mandatory that the assessor to be onsite ?")}
            </Typography>
            <RadioGroup
              row
              aria-labelledby="necessary_resident_be_on_site"
              name="necessary_resident_be_on_site"
              value={projects[index]?.necessary_resident_be_on_site}
              onChange={(e: any) => onChange({target:{
                value: JSON.parse(e?.target?.value),
                name: e?.target?.name,
              }}, index)}
            >
              <Grid container>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={true}
                    control={<Radio color="warning" />}
                    label={t("Yes")}
                    color="warning"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={false}
                    control={<Radio color="warning" />}
                    label={t("No")}
                    color="warning"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
            {t("If yes, how many times ?")}
          </Typography>

          <Grid container alignItems="center" justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth={true}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "50px" } }}
                placeholder={`${t("Type here ..")}`}
                variant="outlined"
                name="how_many_times_on_site"
                value={projects[index]?.how_many_times_on_site}
                onChange={(e: any) => onChangeNumber(e, index)}
                type="text"
                inputProps={{
                  pattern: "^\\d+(\\.\\d+)?$", // Enforce numbers only pattern
                  inputMode: "numeric", // Show numeric keyboard on mobile devices
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
                {t(
                  "Is verification required to assess whether the reported vulnerabilities have been fixed?"
                )}
              </Typography>
              <RadioGroup
                row
                aria-labelledby="Verify_that_vulnerabilities_are_fixed"
                name="Verify_that_vulnerabilities_are_fixed"
                value={projects[index]?.Verify_that_vulnerabilities_are_fixed}
                onChange={(e: any) => onChange({target:{
                  value: JSON.parse(e?.target?.value),
                  name: e?.target?.name,
                }}, index)}
              >
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      sx={{ width: "100%" }}
                      value={true}
                      control={<Radio color="warning" />}
                      label={t("Yes")}
                      color="warning"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      sx={{ width: "100%" }}
                      value={false}
                      control={<Radio color="warning" />}
                      label={t("No")}
                      color="warning"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
