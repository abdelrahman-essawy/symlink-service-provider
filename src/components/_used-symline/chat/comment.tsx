import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Box, Button, Divider, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { IAttachment, IComment } from "@/@types/discussion";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import pdf from "@/assets/pdf.svg";
import file from "@/assets/file.svg";
import ViewerPdf from "../dialogs/pdf-viewer";
import ViewImagesDialog from "../dialogs/view-images";
import CommentForm from "./comment-Form";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "@/hooks/use-auth";
import moment from "moment";
import { useDisscussion } from "@/contexts/discussion-context";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ICommentProps {
  message_id: string;
  multi_RFP_id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  replies_count: number;
  reply?: boolean;
  messages: boolean;
  attachment?: IAttachment;
}
export default function Comment({
  message_id,
  multi_RFP_id,
  name,
  avatar,
  message,
  time,
  replies_count=0,
  attachment,
}: ICommentProps) {
  const [expanded, setExpanded] = React.useState(false);
  const { t } = useTranslation();
  const discussionContext = useDisscussion();
  const [openCertificate, setOpenCertificate] = React.useState(false);
  const [openPdf, setOpenPdf] = React.useState(false);
  const [fileLink, setFileLink] = React.useState<null | string>(null);
  const [showReplybox, setShowReplybox] = React.useState(false);
  const [replies, SetReplies] = React.useState<IComment[]>([]);
  const [repliesCount, SetRepliesCount] = React.useState<number>(replies_count);
  const auth = useAuth();
  const handleCloseCertificate = () => setOpenCertificate(false);

  const handleOpenCertificate = (imageLink: string) => {
    setFileLink(imageLink);
    setOpenCertificate(true);
  };
  const handleClosePdf = () => setOpenPdf(false);
  const handleOpenPdf = (pdfLink: string) => {
    setFileLink(pdfLink);
    setOpenPdf(true);
  };
  const handleExpandClick = async () => {
    try {
      const res = await discussionContext?.getDiscussionComments(multi_RFP_id, 100, 0, message_id);
      //TODO: handle pagination of replies
      console.log(res);
      SetReplies(res?.data?.data?.replies);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
    setExpanded(!expanded);
  };
  const iconRender = React.useCallback((type: string, src: string) => {
    if (type?.includes("image")) {
      return src;
    } else if (type == "application/pdf") {
      return pdf.src;
    } else {
      return file.src;
    }
  }, []);
  return (
    <Card sx={{ maxWidth: "100%", border: "1px solid #E8E8E8" }} elevation={1}>
      <CardHeader
        sx={{ padding: "20px 0 10px " }}
        avatar={
          <Avatar
            aria-label="recipe"
            sx={{ bgcolor: name == "You" ? red[500] : "green", ml: 1, p: 0 }}
            src={avatar}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={time}
      />
      <CardContent sx={{ pt: 0.2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary">
              {message}
            </Typography>
          </Grid>
          {attachment ? (
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <Image
                alt={"image"}
                src={iconRender(attachment?.file_type,attachment?.file_url)}
                width={attachment?.file_type?.includes("image") ? 250 : 70}
                height={attachment?.file_type?.includes("image") ? 200 : 70}
                onClick={
                  attachment?.file_type == "application/pdf"
                    ? () => {
                        handleOpenPdf(attachment?.file_url);
                      }
                    : attachment?.file_type?.includes("image")
                    ? () => {
                        handleOpenCertificate(attachment?.file_url);
                      }
                    : () => {
                        //open the file outside
                        window.open(attachment?.file_url, "_blank");
                      }
                }
              />
            </Grid>
          ) : null}
          {showReplybox && (
            <Grid item xs={12} sx={{ background: "#fdfdfd" }}>
              <Divider sx={{ my: 2 }} />
              <IconButton
                onClick={() => setShowReplybox(false)}
                sx={{ position: "relative", top: -2, right: -2, zIndex: 2 }}
              >
                <CloseIcon />
              </IconButton>
              <CommentForm
                repliesCount={repliesCount}
                SetRepliesCount={SetRepliesCount}
                setReplies={SetReplies}
                replies={replies}
                multi_RFP_id={multi_RFP_id}
                message_id={message_id}
                handleClose={() => setShowReplybox(false)}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 0,
        }}
      >
        <Button onClick={() => setShowReplybox((prev) => !prev)}>
          <IconButton aria-label="share">
            <ChatBubbleIcon />
          </IconButton>
          {t("Reply")}
        </Button>
        {repliesCount > 0 && (
          <Box>
            <Typography
              variant="caption"
              color="initial"
            >{`${repliesCount} more replies`}</Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            {replies?.map((comment: IComment, index: number) => (
              <Grid item xs={12} key={comment?.id}>
                <Comment
                  message_id={comment?.id}
                  multi_RFP_id={multi_RFP_id}
                  replies_count={comment?.replies_count}
                  messages={false}
                  attachment={comment?.attachment}
                  name={
                    auth?.user?.id === comment?.user_id
                      ? t("You")
                      : comment?.user?.name || comment?.user?.email
                  }
                  message={comment?.body_text}
                  time={moment.utc(comment?.created_at.slice(0, 19)).local().calendar()}
                  avatar={
                    auth?.user?.id === comment?.user_id ? auth?.user?.avatar : comment?.user?.avatar
                  }
                />
                {index < replies?.length - 1 && <Divider />}
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Collapse>
      <ViewerPdf open={openPdf} handleClose={handleClosePdf} document={fileLink} />
      <ViewImagesDialog
        open={openCertificate}
        handleClose={handleCloseCertificate}
        imageLink={fileLink}
      />
    </Card>
  );
}
