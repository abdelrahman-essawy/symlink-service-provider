import Head from "next/head";
import {
  Badge,
  Grid,
  Popover,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import AddIcon from "@mui/icons-material/Add";
import GeneralQuestions from "@/sections/bids/create-bids/general-questions";
import InputAdornment from "@mui/material/InputAdornment";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import axiosClient from "@/configs/axios-client";
import RenderAssessments from "@/sections/bids/create-bids/render-assessments";
import { RFP } from "@/@types/assessments";
import CircularProgress from "@mui/material/CircularProgress";
import { ICategory, RequestForProposal } from "@/@types/project";
interface IProps {
  handelsubmit: () => void;
  formRecord: RFP;
  setFormRecord: (formRecord: RFP) => void;
  editMood?: boolean;
  categoriesIds?: ICategory[] | [];
}
export enum TestTime {}
const RfpForm = ({
  handelsubmit,
  formRecord,
  setFormRecord,
  editMood = false,
  categoriesIds = [],
}: IProps) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [inputs, setInputs] = useState<ICategory[]>(categoriesIds);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editMood) {
      setInputs(categoriesIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMood, categoriesIds]);

  // useEffect(() => {
  //   console.log(inputs);
  //   console.log(inputs?.length);
  // }, [inputs]);
  useEffect(() => {
    console.log(formRecord);
  }, [formRecord]);

  const addInput = (itemName: string, itemID: string) => {
    const new_project: RequestForProposal = {
      category_id: itemID,
      category_name: itemName,
    } as RequestForProposal;
    setFormRecord({ ...formRecord, projects: [...formRecord?.projects, new_project] });
    setInputs((prev) => [...prev, { name: itemName, id: itemID }] as ICategory[]);
  };
  const removeInput = (index: number) => {
    //remove from the FormRecord
    const AllProjects: RequestForProposal[] = formRecord.projects;
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
    const AllProjects: RequestForProposal[] = formRecord.projects;
    newProject[event.target.name] = event.target.value;
    AllProjects[index] = newProject;
    setFormRecord({ ...formRecord, projects: AllProjects });
  }

  function handleChangeNumberInProjects(event: any, index: number) {
    const { value } = event.target;
    const numericValue = value.replace(/[^0-9.]/g, "");
    const newProject: any = formRecord.projects[index];
    const AllProjects: RequestForProposal[] = formRecord.projects;
    newProject[event.target.name] = parseFloat(numericValue) || 0;
    AllProjects[index] = newProject;
    setFormRecord({ ...formRecord, projects: AllProjects });
  }

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
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await handelsubmit();
        setIsLoading(false);
      }}
    >
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
            name={"project_name"}
            required
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
                <ListItem key={item?.id} disablePadding divider={index != assessments?.length - 1}>
                  <ListItemButton
                    onClick={() => {
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
                      sx={{
                        "& span": { color: "#000 !important", fontSize: "15px" },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Popover>
        </Grid>

        <GeneralQuestions
          preferred_testing_time={formRecord?.preferred_testing_time}
          expiration_date={formRecord?.expiration_date}
          firstFullName={formRecord?.firstFullName}
          firstEmail={formRecord?.firstEmail}
          firstMobile={formRecord?.firstMobile}
          secondFullName={formRecord?.secondFullName}
          secondEmail={formRecord?.secondEmail}
          secondMobile={formRecord?.secondMobile}
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
            order={inputs?.filter((input) => input?.name == item?.name).indexOf(item)}
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
              width: "200px",
            }}
          >
            {isLoading ? <CircularProgress thickness={1.5} /> : !editMood ? t("Create") : t("Edit")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RfpForm;
