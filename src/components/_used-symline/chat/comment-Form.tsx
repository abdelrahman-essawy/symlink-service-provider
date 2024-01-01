import { Box, Avatar, TextField, Button, Divider } from "@mui/material";
import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import { SvgIcon, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import CheckIcon from "@mui/icons-material/Check";
import { useAuth } from "@/hooks/use-auth";
import { useDisscussion } from "@/contexts/discussion-context";
import { showErrorMessage } from "@/utils/helperFunctions";
import { IComment } from "@/@types/discussion";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
interface IProps {
  multi_RFP_id: string;
  message_id?: string | undefined;
  handleClose?: () => void;
  disabled?: boolean;
}
function CommentForm({ multi_RFP_id, message_id = undefined, handleClose,disabled}: IProps) {
  const discussionContext = useDisscussion();
  const auth = useAuth();
  const { t } = useTranslation();
  const [comment, setComment] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  // handle file selection
  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploaded(true);
    event.target.value = "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.set("file", selectedFile);
    formData.set("body_text", comment);
    try {
     const res:IComment = await discussionContext?.MakeComment(multi_RFP_id, formData, message_id);
     //if it was a comment 
     setComment("");
      setSelectedFile(null);
      setUploaded(false);

      //if it was a reply
      if(handleClose){
        handleClose();
      }  
    } catch (error:any) {
      setError(showErrorMessage(error).toString());
    }
    setIsLoading(false); 
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 0,
          alignItems: "start",
          
          gap: 1,
          width: "100%",
        }}
      >
        <Avatar
          src={auth?.user?.avatar}
        />
        <TextField
          autoFocus
          type="text"
          value={comment}
          onChange={(e: any) => setComment(e?.target?.value)}
          placeholder={`${t("What are your thoughts?")}`}
          minRows={1}
          maxRows={2}
          error={!!error}
          helperText={error}
          disabled={disabled}
          multiline
          sx={{
            direction: "rtl",
            width: "100%",
            border: "unset",
            outline: "unset",
            flexGrow: "1",
            "&  .MuiInputBase-root": {
              borderRadius: "12px !important",
              padding: "0px !important",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            p: 2,
          }}
        >
          <Badge
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginleft: 2,
            }}
            invisible={!uploaded}
            badgeContent={<SvgIcon component={CheckIcon} fontSize="small" />}
            color="primary"
          >
            <Avatar
              component="label"
              sx={{
                border: "2px solid #ECECEC",
                color: "#373737",
                transform: "rotate(45deg)",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                bgcolor: false ? "warning" : "white",
              }}
            >
              <VisuallyHiddenInput type="file" name="file" onChange={handleFileSelect} />
              <AttachFileIcon />
            </Avatar>
          </Badge>
          <Button
            type="submit"
            disabled={!(!isLoading && comment.trim()?.length)}
            sx={{
              m: 0,
              p: 0,
              cursor: !isLoading && comment.trim()?.length ? "pointer" : "not-allowed",
              "&:hover": {
                background: "none !important",
              },
            }}
          >
            <Avatar
              component="label"
              sx={{
                backgroundColor:
                  !isLoading && comment.trim()?.length ? "#FFD777 !important" : "#ddd !important",
                color: "#ffffff",
                transform: "rotate(-45deg)",
              }}
              
            >
              <SendIcon
                sx={{ cursor: !isLoading && comment.trim()?.length ? "pointer" : "not-allowed" }}
              />
            </Avatar>
          </Button>
          {/* <Box ><Typography variant="caption" color="initial">{selectedFile?.name}</Typography></Box> */}
        </Box>
      </Box>
    </form>
  );
}

export default CommentForm;
