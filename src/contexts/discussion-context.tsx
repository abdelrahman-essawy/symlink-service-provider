import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { IComment } from "@/@types/discussion";
export const DiscussionContext = createContext<DiscussionContextType | undefined>(undefined);
import { useContext } from "react";

const DiscussionContextProvider = ({ children }: any) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState<IComment>();
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
      if(message_id==undefined){
        //for comments
          setComments([...comments, ...res?.data?.data?.messages]);
          setTotalPages(res.data?.data?.totalPages);
          setPage(res.data?.data?.currentPage);
    }else{
        return res
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
      if(message_id==undefined){
          setNewComment(res?.data?.data);
      }
      else{
        return(res?.data?.data);
      }
    } catch (error) {
      return Promise?.reject(error);
    }
  };

  useEffect(() => {
    if (newComment) {
      setComments([newComment, ...comments]);
    }
  }, [newComment]);

  return (
    <DiscussionContext.Provider
      value={{
        getDiscussionComments,
        MakeComment,
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
  comments: IComment[];
  totalPages: number;
  page: number;
  limit: number;
};
