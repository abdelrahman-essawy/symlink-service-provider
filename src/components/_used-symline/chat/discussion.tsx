import {
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ForumIcon from "@mui/icons-material/Forum";
import Noitems from "@/components/shared/no-items";
import { IComment } from "@/@types/discussion";
import { useAuth } from "@/hooks/use-auth";
import moment from "moment";
import Comment from "./comment";
import CommentForm from "./comment-Form";
import { useDisscussion } from "@/contexts/discussion-context";
import { showErrorMessage } from "@/utils/helperFunctions";
import useAlert from "@/hooks/use-alert";
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
export default function Discussion({ multi_RFP_id }: { multi_RFP_id: string }) {
  const discussionContext = useDisscussion();
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const auth = useAuth();
  const [page, setPage] = useState<number>(0);
  const [error,setError] = useState<any>('');
  const {showAlert,renderForAlert} = useAlert();
  
  useEffect(() => {
    if (typeof multi_RFP_id == "string") {
      try {
        discussionContext?.getDiscussionComments(multi_RFP_id, discussionContext?.limit, page);
      } catch (error) {
        setError(showErrorMessage(error).toString());
        showAlert(showErrorMessage(error).toString(), 'error');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multi_RFP_id, page]);
  return (
    <Card elevation={1} sx={{ py: 1 }}>
      <Grid container spacing={0} justifyContent="space-between">
        <Grid
          sx={{
            transition: "120ms cubic-bezier(0.1, 0.7, 0.6, 0.9)",
          }}
          item
          xs={12}
        >
          <Grid item xs={12} p={3}>
            <Box
              maxWidth="xl"
              sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Grid item xs={12}>
                <CommentForm multi_RFP_id={multi_RFP_id} disabled={!!(error)} />
                <Divider sx={{ my: 4 }} />
              </Grid>
            </Box>
          </Grid>
          <Grid container spacing={1.2} sx={{ py: 0, px: 3, mt: -5 }}>
            {discussionContext?.comments?.length != undefined &&
              discussionContext?.comments?.length > 0 ? (
              <>
                {discussionContext?.comments?.map((comment: IComment, index: number) => (
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
                      time={moment.utc(comment?.created_at?.slice(0, 19))?.local()?.calendar()}
                      avatar={
                        auth?.user?.id === comment?.user_id
                          ? auth?.user?.avatar
                          : comment?.user?.avatar
                      }
                    />
                    {/* {index < discussionContext?.comments?.length - 1 && <Divider />} */}
                  </Grid>
                ))}
                {typeof discussionContext?.page != "undefined" &&
                  typeof discussionContext?.totalPages != "undefined" &&
                  discussionContext?.page +1 < discussionContext?.totalPages && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,
                        width: "100%",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="warning"
                        size="large"
                        onClick={() => {
                          if(discussionContext?.page+1 < discussionContext?.totalPages)
                          setPage((prev) => prev + 1)
                        }}
                      >
                        <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {false ? <CircularProgress thickness={1.5} /> : t("Load More")}
                        </Typography>
                      </Button>
                    </Box>
                  )}
              </>
            ) : !error ? (
              <Box width={"100%"}>
                <Noitems
                  title={"No comment yet"}
                  icon={<ForumIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
                />
              </Box>
            ):(
              <Box width={"100%"}>
                <Noitems
                  title={"This discussion has been closed"}
                  icon={<SpeakerNotesOffIcon sx={{ color: "gray", fontSize: "4.2em" }} />}
                />
              </Box>

            )}
          </Grid>
        </Grid>
      </Grid>
      {renderForAlert()}
    </Card>
  );
}
