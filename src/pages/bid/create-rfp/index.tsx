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
export interface IQuestion {
  id: string;
  type: string;
  name: string;
}
export interface RFP {
  project_name: string;
  time_type_id: string;
  projects: IProject[];
}

export interface IProject {
  category_id: string;
  assessments_type_id: string;
  apis_size_id: string;
  average_applications_id: string;
  color_mobile_id: string;
  evaluation_is_internal_or_external_id: string;
  internal_applications_num: number;
  external_applications_num: number;
  list_applications_with_scope: string;
  Verify_that_vulnerabilities_are_fixed: boolean;
  necessary_resident_be_on_site: boolean;
  how_many_times_on_site: number;
  How_many_user_roles: number;
  how_to_access_the_application: string;
  how_many_IPS_should_be_tested_in_servers: number;
  how_many_IPS_should_be_tested_in_workstations: number;
  how_many_IPS_should_be_tested_in_network_devices: number;
  vpn_access_to_the_resident: boolean;
  evaluation_approach: string;
  details_evaluation_approach: string;
  active_directory: boolean;
  details_ips_scoped: string;
}

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
  const [inputs, setInputs] = useState<any[]>([]);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const addInput = (itemName: string,itemID:string) => {
    const new_project: IProject = {
      category_id: itemID,
    } as IProject;
    setFormRecord({ ...formRecord, projects: [...formRecord?.projects, new_project] });
    setInputs([...inputs, {name:itemName,id:inputs?.length}]);
  };
  const removeInput = (index: number) => {
    //remove from the FormRecord
    const AllProjects:IProject[] = formRecord.projects; 
    AllProjects.splice(index, 1);
    setFormRecord({...formRecord, projects:AllProjects})
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

  function handleChangeProjects(event: any,index: number) {
    const newProject:any = formRecord.projects[index];
    const AllProjects:IProject[] = formRecord.projects; 
    newProject[event.target.name]  = event.target.value;
    AllProjects[index] = newProject;
    setFormRecord({...formRecord, projects:AllProjects});
  }

  function handleChangeNumberInProjects(event: any,index: number) {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9.]/g, "");
    const newProject:any = formRecord.projects[index];
    const AllProjects:IProject[] = formRecord.projects; 
    newProject[event.target.name]  = numericValue;
    AllProjects[index] = newProject;
    setFormRecord({...formRecord, projects:AllProjects});
  }
  //TODO: remove this function
  useEffect(() => {
    console.log(formRecord);
  }, [formRecord]);

  const [assessments, setAssessments] = useState<IQuestion[]>([]);
  const fetchGernalAssessments = async () => {
    try {
      const res = await axiosClient?.get(`meta-data?status=Type_of_assessment`);
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

  return (
    <>
      <Head>
        <title>{title} | Symline</title>
      </Head>
      <form onSubmit={() => {}}>
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
              <Grid item md={4} xs={12} sx={{justifyContent:{xs:"center",md:"end"}}} display="flex">
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
                          onClick={() => addInput(item?.name_en,item.id)}
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
                            badgeContent={countAssessments(item?.name_en)}
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
                  order={inputs?.filter((input)=>input.name == item.name).indexOf(item)}
                />
              ))}
            </Grid>
          </Container>
        </Box>
      </form>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
