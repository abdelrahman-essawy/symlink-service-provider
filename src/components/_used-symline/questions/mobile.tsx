import { Radio, FormLabel, Grid, Typography, FormControlLabel, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { RequestForProposal } from "@/@types/project";
import { RequiredAstrisc } from "@/components/RequiredAstrisc";
import { ImageHandler } from "@/components/ImageHandler";
import styles from "@/styles/index.module.scss";
import axiosClient from "@/configs/axios-client";
import { showErrorMessage } from "@/utils/helperFunctions";
interface IProps {
  onChange: (event: any, index: number) => void;
  onChangeNumber: (event: any, index: number) => void;
  projects: RequestForProposal[];
  index: number;
}
export default function Mobile({ onChange, onChangeNumber, projects, index }: IProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<string | Blob>("");
  const [uploadError, setUploadError] = useState<string>("");

  const handleUploadFile = useCallback(async(event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const formData = new FormData();
    formData.set("file", file);
    try {
      const res = await axiosClient.post(`multi-rfp/attach-request-for-proposal`, formData,{headers:{'Content-Type': 'mulitpart/form-data'}})
      //save the attachment id to the assment data 
      onChange({target:{
        name:"apk_attachment_id",
        value:res?.data?.id
      }}, index)
      setUploadError("");
    } catch (error) {
      setUploadError(showErrorMessage(error));
     }//finally{
    //   event.target.value = "";
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

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
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
            {t("Target mobile application URL:")} <RequiredAstrisc />
          </Typography>
          <TextField
            required
            fullWidth={true}
            variant="outlined"
            name="target_mobile_application_url"
            value={projects[index]?.target_mobile_application_url}
            onChange={(e: any) => onChange(e, index)}
            multiline
            rows={3}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", p: 1, pt: 0.5 }, mt: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ mb: 1, mt: 3, display: "flex", gap: 0.5 }}
          >
            {t("Upload mobile application file")}{" "}
            <Typography variant="body1" color="initial">
              {t("(Optional)")}
            </Typography>
          </Typography>
          <ImageHandler
            handleFileSelect={handleUploadFile}
            input={{
              name: "file",
              placeholder: "Upload mobile application file(.apk, .ipa, .hms)",
              type: ".apk, .ipa, .hms",
              required: false,
            }}
            styles={styles}
            selectedFile={selectedFile}
            error={uploadError}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth required>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
              {t("The approach of the assessment:")} <RequiredAstrisc />
            </Typography>
            <RadioGroup
              row
              aria-labelledby="approach_of_assessment"
              name="approach_of_assessment"
              value={projects[index]?.approach_of_assessment}
              onChange={(e: any) => onChange(e, index)}
            >
              <Grid container>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={"WHITE"}
                    control={<Radio color="warning" required />}
                    label={t("Whitebox Approach (i.e., VPN, Whitelisting, etc.)")}
                    color="warning"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={"BLACK"}
                    control={<Radio color="warning" required />}
                    label={t("Blackbox Approach")}
                    color="warning"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth required>
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 4 }}>
              {t("Is active directory part of the assessment?")} <RequiredAstrisc />
            </Typography>
            <RadioGroup
              row
              aria-labelledby="is_active_directory"
              name="is_active_directory"
              value={projects[index]?.is_active_directory}
              onChange={(e: any) =>
                onChange(
                  {
                    target: {
                      value: JSON.parse(e?.target?.value),
                      name: e?.target?.name,
                    },
                  },
                  index
                )
              }
            >
              <Grid container>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={true}
                    control={<Radio color="warning" required />}
                    label={t("Yes")}
                    color="warning"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ width: "100%" }}
                    value={false}
                    control={<Radio color="warning" required />}
                    label={t("No")}
                    color="warning"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
            {t("Notes")}
          </Typography>
          <TextField
            fullWidth={true}
            placeholder={`${t("type here your notes")}`}
            variant="outlined"
            name="notes"
            value={projects[index]?.notes}
            onChange={(e: any) => onChange(e, index)}
            multiline
            minRows={3}
            maxRows={5}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", p: 1, pt: 0.5 }, mt: 1 }}
          />
        </Grid>
      </Grid>
    </>
  );
}
