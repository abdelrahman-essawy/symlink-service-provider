import React, { HtmlHTMLAttributes, useEffect, useState } from "react";
import { Card, Grid, CardContent, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axiosClient from "@/configs/axios-client";
export interface IQuestion {
  id: string;
  type: string;
  name: string;
}
export interface IProps {
  time_type_id: string;
  handleonchange: (event:any) => void;
}
function GeneralQuestions({time_type_id,handleonchange}:IProps) {
  const { t } = useTranslation();

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const fetchGernalQuestions = async () => {
    try {
      const res = await axiosClient?.get(`meta-data?status=times`);
      setQuestions(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGernalQuestions();
  }, []);
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
                  {t("General questions")}
                </Typography>
              </Grid>
              <FormControl required fullWidth>
                  <Typography variant="body1" fontWeight="bold" sx={{ mb: 1, mt: 3, px: 1 }} id="time_type_id">
                    {t("What is the allowed  testing time ?")}
                  </Typography>
                <RadioGroup
                  row
                  aria-labelledby="time_type_id"
                  name="time_type_id"
                  value={time_type_id}
                  onChange={handleonchange}
                >
                  <Grid container>
                    {questions?.length &&
                      questions?.map((question: IQuestion) => {
                        return (
                          <Grid item xs={6} md={4} lg={3} key={question?.id}>
                            <FormControlLabel
                              sx={{ width: "100%" }}
                              value={question?.id}
                              control={<Radio color="warning" />}
                              label={question?.name}
                              color="warning"
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default GeneralQuestions;
