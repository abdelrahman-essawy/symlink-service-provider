import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { shortenText } from "@/utils/helperFunctions";

type Props = {
  id: string;
  status: string;
  subject: string;
  description: string;
  ticket_num: string;
  setActive: ({id,status}:{id:string,status:string}) => void;
  active: string;
};

export default function SingleTicket({
  id,
  status,
  description,
  subject,
  ticket_num,
  setActive,
  active,
}: Props) {
  return (
    <>
      <ListItem
        onClick={() => {
          setActive({id,status});
        }}
        key={id}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: `${active === id ? "#ECECEC" : "#FFFFFF"}`,
          cursor: "pointer",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "end", width: "100%" }}
        >
          <Typography variant="body1" color="text.secondary">
            {ticket_num}
          </Typography>
          <Typography variant="caption" sx={{ color: `#0AA630`, p: 0.5, bgcolor: "#ecf8ef" }}>
            {status}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1" color="text.primary">
            {subject}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {shortenText(description)}
          </Typography>
        </Box>
      </ListItem>
      <Divider variant="fullWidth"   />
    </>
  );
}
