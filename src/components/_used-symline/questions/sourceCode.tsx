import {
  Radio,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  TextField,
  FormControl,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { RequiredAstrisc } from "@/components/RequiredAstrisc";
import { RequestForProposal } from "@/@types/project";
interface IProps {
  onChange: (event: any, index: number) => void;
  onChangeNumber: (event: any, index: number) => void;
  projects: RequestForProposal[];
  index: number;
}
export default function SourceCode({ onChange, projects, index }: IProps) {
  const { t,i18n} = useTranslation();

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
            {t("How many custom lines of code want to assess?")} <RequiredAstrisc />
          </Typography>
          <TextField
            required
            fullWidth={true}
            variant="outlined"
            name="how_many_custom_lines_of_code"
            value={projects[index]?.how_many_custom_lines_of_code}
            onChange={(e: any) => onChange(e, index)}
            multiline
            rows={3}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", p: 1, pt: 0.5 }, mt: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>
            {t("What is the programming language of the code or frameworks?")} <RequiredAstrisc />
          </Typography>
          <TextField
            required
            fullWidth={true}
            variant="outlined"
            placeholder="java,PHP,etc..."
            name="what_is_programming_language"
            value={projects[index]?.what_is_programming_language}
            onChange={(e: any) => onChange(e, index)}
            multiline
            rows={3}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", p: 1, pt: 0.5 }, mt: 1 }}
          />
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
