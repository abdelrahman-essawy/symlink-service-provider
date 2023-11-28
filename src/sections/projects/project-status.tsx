import React from "react";
import { Typography } from "@mui/material";

export enum CardStatus {
  Active = "ACTIVE",
  Pending = "PENDING",
  In_progress = "IN PROGRESS",
  Waiting_for_selection = "WAITING FOR SELECTION",
  Rejected = "REJECTED",
}

type props = {
  status: string;
};
const ProjectStatusBadge = (props: props): JSX.Element => {
  const { status= "" } = props;
  console.log(status);
  const statusColor = {
    Active: "#0AA630",
    In_progress: "rgb(50, 59, 174)",
    Pending: "#F5A623",
    Waiting_for_selection: "rgb(193, 140, 0)",
    Rejected: "#F53B3B",
  };
  const statusBgColor = {
    Active: "#ecf8ef",
    In_progress: "rgb(216, 225, 254)",
    Pending: "#fff5e6",
    Waiting_for_selection: "rgb(251, 233, 186)",
    Rejected: "#ffe6e6",
  };
  const chooseColor = (status: string) => {
    switch (status) {
      case CardStatus.Active:
        return statusColor.Active;
      case CardStatus.In_progress:
        return statusColor.In_progress;
      case CardStatus.Pending:
        return statusColor.Pending;
      case CardStatus.Rejected:
        return statusColor.Rejected;
      default:
        return statusColor.Active;
    }
  };
  const chooseBgColor = (status: string) => {
    switch (status) {
      case CardStatus.Active:
        return statusBgColor.Active;
      case CardStatus.Pending:
        return statusBgColor.Pending;
      case CardStatus.In_progress:
        return statusBgColor.In_progress;
      case CardStatus.Rejected:
        return statusBgColor.Rejected;
      default:
        return statusBgColor.Active;
    }
  };
  return (
    <Typography
      sx={{
        bgcolor: chooseBgColor(status),
        fontWeight: 400,
        fontSize: 12,
        color: chooseColor(status),
        width: "fit-content",
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
      }}
      overflow={"hidden"}
    >
      {status}
    </Typography>
  );
};
export default ProjectStatusBadge;
