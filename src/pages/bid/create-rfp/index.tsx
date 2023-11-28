import Head from "next/head";
import {
  Box,
  Card,
  Container,
  Badge,
  Stack,
  Tab,
  Grid,
  Tooltip,
  CardHeader,
  Tabs,
  CardContent,
  Typography,
  Popover,
  Button,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  IconButton,
  Checkbox,
  FormControlLabel,
  ListItemButton,
  ListItemIcon,
  FormLabel,
  Radio,
  TextField,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "../../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import GeneralQuestions from "@/sections/bids/create-bids/general-questions";
import InputAdornment from "@mui/material/InputAdornment";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import axiosClient from "@/configs/axios-client";
import RenderAssessments from "@/sections/bids/create-bids/render-assessments";
import { IAssessmentProject, IQuestion, RFP } from "@/@types/assessments";
import CircularProgress from "@mui/material/CircularProgress";
import useAlert from "@/hooks/useAlert";
import { ICategory } from "@/@types/project";
const Page = () => {
  const { i18n } = useTranslation();
  const title = "Create RFP";
  const [formRecord, setFormRecord] = useState<RFP>({
    project_name: "",
    time_type_id: "",
    projects: [],
  });
  const { t } = useTranslation();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [dialogName, setDialogName] = useState("");
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const [inputs, setInputs] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert, renderForAlert } = useAlert();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const addInput = (itemName: string, itemID: string) => {
    const new_project: IAssessmentProject = {
      category_id: itemID,
    } as IAssessmentProject;
    setFormRecord({ ...formRecord, projects: [...formRecord?.projects, new_project] });
    setInputs([...inputs, { name: itemName, id: inputs?.length }] as ICategory[]);
  };
  const removeInput = (index: number) => {
    //remove from the FormRecord
    const AllProjects: IAssessmentProject[] = formRecord.projects;
    AllProjects.splice(index, 1);
    setFormRecord({ ...formRecord, projects: AllProjects });
    //remove from the UI
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const handleClickList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseList = () => {
    setAnchorEl(null);
  };

  const openList = Boolean(anchorEl);
  const id = openList ? "simple-popover" : undefined;

  function handleChange(event: any) {
    let data: any = { ...formRecord };
    data[event.target.name] = event.target.value;
    setFormRecord(data);
  }

  function handleChangeProjects(event: any, index: number) {
    const newProject: any = formRecord.projects[index];
    const AllProjects: IAssessmentProject[] = formRecord.projects;
    newProject[event.target.name] = event.target.value;
    AllProjects[index] = newProject;
    setFormRecord({ ...formRecord, projects: AllProjects });
  }

  function handleChangeNumberInProjects(event: any, index: number) {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9.]/g, "");
    const newProject: any = formRecord.projects[index];
    const AllProjects: IAssessmentProject[] = formRecord.projects;
    newProject[event.target.name] = parseFloat(numericValue) || 0;
    AllProjects[index] = newProject;
    setFormRecord({ ...formRecord, projects: AllProjects });
  }
  //TODO: remove this function
  useEffect(() => {
    console.log(formRecord);
  }, [formRecord]);

  const [assessments, setAssessments] = useState<ICategory[]>([]);
  const fetchGernalAssessments = async () => {
    try {
      const res = await axiosClient?.get(`category`);
      setAssessments(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGernalAssessments();
  }, []);

  const countAssessments = useCallback(
    (assessment_name: string) => {
      return inputs?.filter((input) => input?.name == assessment_name)?.length;
    },
    [inputs]
  );
  const handelsubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosClient.post("multi-rfp", formRecord);
      if(res.status === 200 || res.status === 201) {
        router.push("/projects")
      }
    } catch (err:any) {
      if (err?.response?.status == 400) {
        if (err?.response?.data?.message) {
          showAlert(err?.response?.data?.message, "error");
        }
      } else if (err.response.status == 400)
        if (Object.keys(err?.response?.data?.errors)?.length > 0) {
          const errors = err?.response?.data?.errors;
          const firstError = Object.keys(errors)[0];
          showAlert(`${firstError}: ${errors[firstError]}`, "error");
        } else if (err.response.status == 500) {
          showAlert(err?.response?.data?.message, "error");
        } else return err;
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
      <form onSubmit={handelsubmit}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
            bgcolor: "primary.lightest",
            borderTopLeftRadius: i18n.language == "ar" ? 25 : 0,
            borderBottomLeftRadius: i18n.language == "ar" ? 25 : 25,
            borderTopRightRadius: i18n.language == "ar" ? 0 : 25,
            borderBottomRightRadius: i18n.language == "ar" ? 0 : 25,
            direction: i18n.language == "ar" ? "ltr" : "rtl",
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="h3" sx={{ mb: 2 }} fontWeight={"bold"}>
              {dictionary(title as TranslatedWord)}
            </Typography>

            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              <Grid item xs={12} md={8} justifyContent="flex-end" display="flex">
                <TextField
                  fullWidth={true}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "50px" },
                    mt: 0,
                    "& .muirtl-b3016c-MuiInputAdornment-root.MuiInputAdornment-positionStart.muirtl-b3016c-MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)":
                      {
                        marginTop: 0,
                        marginX: 1,
                        padding: "0",
                      },
                  }}
                  placeholder={`${t("Project name")}`}
                  variant="filled"
                  size="medium"
                  margin="dense"
                  name={"project_name"}
                  value={formRecord?.project_name}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
                sx={{ justifyContent: { xs: "center", md: "end" } }}
                display="flex"
              >
                <Button
                  variant="contained"
                  onClick={handleClickList}
                  aria-describedby={id}
                  aria-label="add"
                  color="warning"
                  size="large"
                  sx={{
                    borderRadius: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: 0.5,
                  }}
                >
                  {t("Add assessment")} <AddIcon />
                </Button>
                <Popover
                  id={id}
                  open={openList}
                  anchorEl={anchorEl}
                  onClose={handleCloseList}
                  anchorOrigin={{
                    horizontal: "left",
                    vertical: "bottom",
                  }}
                  PaperProps={{ sx: { width: 300, borderRadius: 3 } }}
                >
                  <List sx={{ p: 1.5 }}>
                    {assessments.map((item: any, index) => (
                      <ListItem
                        key={item?.id}
                        disablePadding
                        divider={index != assessments?.length - 1}
                      >
                        <ListItemButton
                          onClick={() => {
                            console.log(item?.name_en || item?.name);
                            addInput(item?.name_en || item?.name, item.id);
                          }}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <ListItemText
                            primary={`${t(item?.name)}`}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          />
                          <Badge
                            badgeContent={countAssessments(item?.name_en || item?.name)}
                            color="warning"
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                          ></Badge>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Popover>
              </Grid>

              <GeneralQuestions
                time_type_id={formRecord?.time_type_id}
                handleonchange={handleChange}
              />

              {inputs.map((item, index) => (
                <RenderAssessments
                  key={item?.id}
                  projects={formRecord?.projects}
                  onChange={handleChangeProjects}
                  onChangeNumber={handleChangeNumberInProjects}
                  assessment={item?.name}
                  index={index}
                  removeInput={removeInput}
                  order={inputs?.filter((input) => input.name == item.name).indexOf(item)}
                />
              ))}
              <Grid item xs={12} display={"flex"} sx={{ justifyContent: { xs: "center", md: "start" } }}>
                <Button
                  variant="contained"
                  type="submit"
                  aria-describedby={id}
                  aria-label="add"
                  color="warning"
                  size="large"
                  disabled={!(formRecord?.projects?.length > 0)}
                  sx={{
                    borderRadius: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: 0.5,
                    width:"200px",
                  }}
                >
                  {isLoading ? <CircularProgress thickness={1.5} /> : t("Create")}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {renderForAlert()}
      </form>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
