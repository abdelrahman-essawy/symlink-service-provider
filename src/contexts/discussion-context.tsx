import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { IComment, ISocketMsgData } from "@/@types/discussion";
export const DiscussionContext = createContext<DiscussionContextType | undefined>(undefined);
import { useContext } from "react";
import io from "socket.io-client";

const DiscussionContextProvider = ({ multi_RFP_id, children }: any) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [reply, setReply] = useState<ISocketMsgData | undefined>(undefined);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const limit = 5;

  const getDiscussionComments = async (
    multi_RFP_id: string,
    limit: number,
    offset: number = page,
    message_id?: string
  ) => {
    try {
      const res = await axiosClient?.get(
        `/discussion/${multi_RFP_id}/messages/${offset}/${limit}${
          message_id ? `?message_id=${message_id}` : ""
        }`
      );
      if (message_id == undefined) {
        //for comments
        setComments([...comments, ...res?.data?.data?.messages]);
        setTotalPages(res.data?.data?.totalPages);
        setPage(res.data?.data?.currentPage);
      } else {
        return res;
      }
    } catch (error) {
      return Promise?.reject(error);
    }
  };

  const MakeComment = async (multi_RFP_id: string, formData: FormData, message_id?: string) => {
    try {
      const res = await axiosClient?.post(
        `/discussion/${multi_RFP_id}/messages${message_id ? `?message_id=${message_id}` : ""}`,
        formData,
        {
          headers: { "Content-Type": "application/multipart" },
        }
      );
      //save it if it was comment not a reply
      return res?.data?.data;
    } catch (error) {
      return Promise?.reject(error);
    }
  };

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (multi_RFP_id) {
      const socket = io(`http://164.90.181.17:3000/discussion?multi_rfp_id=${multi_RFP_id}`, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      socket.on("connect", () => {
        console.log("Connected to the server");
      });
      socket.on(`discussion_${multi_RFP_id}`, (data: ISocketMsgData) => {
        //create a new comment object and add it to the comments list if it was comment
        if (data?.entity_type == "Message") {
          const new_comment: IComment = data?.entity;
          setComments((prev) => [new_comment, ...prev]);
        } else {
          setReply(data);
        }
      });
      socket.on("connect_error", (err: any) => {
        console.log("Connection error:", err);
        // Handle connection error here
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from the server");
      });

      return () => {
        socket.disconnect();
        socket.off("connect");
        socket.off("disconnect");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multi_RFP_id, token]);
  return (
    <DiscussionContext.Provider
      value={{
        getDiscussionComments,
        MakeComment,
        setComments,
        comments,
        totalPages,
        page,
        limit,
      }}
    >
      {children}
    </DiscussionContext.Provider>
  );
};

export default DiscussionContextProvider;
export const useDisscussion = () => useContext(DiscussionContext);
export type DiscussionContextType = {
  getDiscussionComments: (
    multi_RFP_id: string,
    limit: number,
    offset: number,
    message_id?: string
  ) => Promise<any>;
  MakeComment: (multi_RFP_id: string, formData: FormData, message_id?: string) => Promise<any>;
  setComments: (comments:IComment[]) => void;
  comments: IComment[];
  totalPages: number;
  page: number;
  limit: number;
};
