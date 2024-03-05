import { createContext, useState, useContext, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import {
  add_Comment_ticket,
  add_ticket,
  get_ticket_massages,
  get_tickets,
} from "../environment/apis";
import { ISockeTicketCommentData, ISupportTicket, TicketComment } from "@/@types/support-ticket";
import { io } from "socket.io-client";
export const SupportContext = createContext<SupportContextType | undefined>(undefined);
const SupportContextProvider = ({ children }: any) => {
  const [tickets, setTickets] = useState<ISupportTicket[]>([]);
  const [ticketMessages, setTicketMessages] = useState<TicketComment[]>([]);
  const [count, setCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const [selectedTicketId, setSelectedTicketId] = useState<string>("");
  const [totalMessagesPages, setTotalMessagesPages] = useState(0);
  const getSupportTickets = async (limit: number = 10, page: number = 1) => {
    try {
      const res = await axiosClient.get(get_tickets(), { params: { limit, page } });
      setTickets(res.data.data);
      setCount(res.data.meta.total);
      setPageSize(res.data.meta.limit);
      setTotalPages(res.data.meta.totalPage);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const getCommentsWithinTicket = async (ticketId: string, offset: number = 1, limit: number=10) => {
    try {
      const res = await axiosClient.get(`${get_ticket_massages(ticketId)}`,{params:{page:offset, limit}});
      if (ticketId !== selectedTicketId) {
        setSelectedTicketId(ticketId);
        setTicketMessages(res.data.data);
      } else {
        setTicketMessages((prevMessages) => [ ...prevMessages,...res.data.data]);
      }
      // setCount(res.data.meta.itemCount);
      // setPageSize(res.data.meta.take);
      setTotalMessagesPages(res.data.meta.totalPage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const AddSupportTicket = async (ticket: ISupportTicket) => {
    try {
      await axiosClient.post(add_ticket(), ticket);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const AddCommentWithinTicket = async ({
    ticketId,
    formData,
  }: {
    ticketId: string;
    formData: FormData;
  }) => {
    try {
      await axiosClient.post(add_Comment_ticket(ticketId), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const token = sessionStorage.getItem("token");
  let socket:any;
  useEffect(() => {
    if (selectedTicketId) {
       socket?.disconnect();
       // eslint-disable-next-line react-hooks/exhaustive-deps
       socket = io(`https://symlink.live/support-ticket?ticket_id=${selectedTicketId}`, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      socket.on(`support_ticket_${selectedTicketId}`, (data: ISockeTicketCommentData) => {
        const new_message: TicketComment = {
          user_id: data?.ticketComment?.user_id,
          ticket_id: data?.ticketComment?.ticket_id,
          attachment_id: data?.ticketComment?.attachment_id,
          comment_text: data?.ticketComment?.comment_text,
          user: data?.ticketComment?.user,
          ticket: data?.ticketComment?.ticket,
          attachment: data?.ticketComment?.attachment,
          id: data?.ticketComment?.id,
          created_at: data?.ticketComment?.created_at,
          updated_at: data?.ticketComment?.updated_at,
        };
        setTicketMessages((prevMessages) => [new_message, ...prevMessages]);
      });
      
      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTicketId, token]);

  return (
    <SupportContext.Provider
      value={{
        tickets,
        ticketMessages,
        getSupportTickets,
        getCommentsWithinTicket,
        AddSupportTicket,
        AddCommentWithinTicket,
        count,
        pageSize,
        totalPages,
        totalMessagesPages,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export default SupportContextProvider;

export type SupportContextType = {
  tickets: ISupportTicket[];
  ticketMessages: TicketComment[];
  count: number;
  pageSize: number;
  totalPages: number;
  totalMessagesPages: number;
  getSupportTickets: (limit: number, page: number) => Promise<any>;
  getCommentsWithinTicket: (ticketId: string, offset?: number, limit?: number) => Promise<any>;
  AddCommentWithinTicket: ({
    ticketId,
    formData,
  }: {
    ticketId: string;
    formData: FormData;
  }) => Promise<any>;
  AddSupportTicket: (ticket: ISupportTicket) => void;
};

export const useSupportTicket = () => useContext(SupportContext);
