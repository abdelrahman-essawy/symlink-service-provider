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
import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../../../layouts/dashboard/layout";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRouter } from "next/navigation";
import Step1 from "@/components/_used-symline/steps/step1";
import Step2 from "@/components/_used-symline/steps/step2";
import AddIcon from "@mui/icons-material/Add";
import Moblie from "@/components/_used-symline/questions/mobile";
import Web from "@/components/_used-symline/questions/web";
import Network from "@/components/_used-symline/questions/network";
import SourceCode from "@/components/_used-symline/questions/sourceCode";
import ArchitectureConfigurationReview from "@/components/_used-symline/questions/architectureConfigurationReview";
import ThreatHunting from "@/components/_used-symline/questions/threatHunting";
import GeneralQuestions from "@/sections/bids/create-bids/general-questions";
import InputAdornment from "@mui/material/InputAdornment";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import axiosClient from "@/configs/axios-client";
export interface IQuestion {
  id: string;
  type: string;
  name: string;
}
export interface RFP {
  project_name: string;
  time_type_id: string;
  projects: Project[];
}

export interface Project {
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
  const questionsTitles = [
    "Web",
    "Architecture configuration review",
    "Source code",
    "Phone",
    "Network",
    "Threat hunting",
  ];
  const handleClose = () => setOpen(false);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const addInput = (item: any) => {
    setInputs([...inputs, item]);
  };
  const removeInput = (index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const handleNext = () => {
    if (activeStep !== maxSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setTimeout(() => router.push("/"), 2500);
    }
  };

  const handleClickList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseList = () => {
    setAnchorEl(null);
  };

  const openList = Boolean(anchorEl);
  const id = openList ? "simple-popover" : undefined;

  const steps = [
    {
      id: 1,
      step: <Step1 />,
    },
    {
      id: 2,
      step: <Step2 />,
    },
  ];

  function handleChange(event: any) {
    let data: any = { ...formRecord };
    data[event.target.name] = event.target.value;
    setFormRecord(data);
  }
  useEffect(() => {
    console.log(formRecord);
  }, [formRecord]);

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const fetchGernalAssessments = async () => {
    try {
      const res = await axiosClient?.get(`meta-data?status=Type_of_assessment`);
      setQuestions(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGernalAssessments();
  }, []);

  const maxSteps = steps.length;
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
            direction:i18n.language == "ar" ? "ltr" : "rtl"
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
              <Grid item xs={8} justifyContent="flex-end" display="flex">
                <TextField
                  fullWidth={true}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "50px" },
                    mt: 0,
                    "& .muirtl-b3016c-MuiInputAdornment-root.MuiInputAdornment-positionStart.muirtl-b3016c-MuiInputAdornment-root:not(.MuiInputAdornment-hiddenLabel)": {
                      marginTop: 0,
                      marginX: 1,
                      padding:"0",
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
              <Grid item xs={4} justifyContent="flex-end" display="flex">
                <Button
                  variant="contained"
                  onClick={handleClickList}
                  aria-describedby={id}
                  aria-label="add"
                  color="warning"
                  size="large"
                  sx={{ borderRadius: 20,
                    display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                  gap:.5
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
                  <List sx={{ p: 1.5  }}>
                    {questionsTitles.map((item: any, index) => (
                      <ListItem key={item} disablePadding divider={index!=questionsTitles?.length-1}>
                        <ListItemButton
                          onClick={() => addInput(item)}
                          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                          <ListItemText primary={`${t(item)}`}  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}  />
                          <Badge
                            badgeContent={1}
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
                <Grid key={index} item xs={12}>
                  <Card elevation={0} sx={{ p: 3 }}>
                    <CardContent sx={{ p: 1 }}>
                      <Grid
                        container
                        spacing={2}
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
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
                                  <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    color="warning.darkest"
                                  >
                                    {t(`${item}`)}
                                  </Typography>
                                  <Box>
                                    <IconButton
                                      onClick={() => removeInput(index)}
                                      aria-label="delete"
                                    >
                                      <DeleteForeverIcon sx={{ cursor: "pointer" }} />
                                    </IconButton>
                                  </Box>
                                </Box>
                                {item === "Web" && <Web />}
                                {item === "Architecture configuration review" && (
                                  <ArchitectureConfigurationReview />
                                )}
                                {item === "Network" && <Network />}
                                {item === "Threat hunting" && <ThreatHunting />}
                                {item === "Phone" && <Moblie />}
                                {item === "Source code" && <SourceCode />}
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
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
