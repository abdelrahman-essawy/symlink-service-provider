import { createContext, useState, useContext} from "react";
import axiosClient from "../configs/axios-client";
import { add_Comment_ticket, add_ticket, get_ticket_massages, get_tickets } from "../environment/apis";
import { ISupportTicket, TicketComment } from "@/@types/support-ticket";
export const SupportContext = createContext<SupportContextType | undefined>(undefined);
const SupportContextProvider = ({ children }: any) => {
  const [tickets, setTickets] = useState<ISupportTicket[]>([]);
  const [ticketMessages, setTicketMessages] = useState<TicketComment[]>([]);
  const [count, setCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const getSupportTickets = async () => {
    try {
      const res = await axiosClient.get(get_tickets());
      console.log(res?.data?.data)
      setTickets(res.data.data);
      // setCount(res.data.meta.itemCount);
      // setPageSize(res.data.meta.take);
      // setTotalPages(res.data.meta.pageCount);
    } catch (error) {
      return Promise.reject(error);
    }
};
  const getCommentsWithinTicket = async (ticketId:string,offset?:number,limit?:number) => {
    try {
      const res = await axiosClient.get(get_ticket_massages(ticketId,0,10));
      console.log(res);
      setTicketMessages(res.data.data);
      // setCount(res.data.meta.itemCount);
      // setPageSize(res.data.meta.take);
      // setTotalPages(res.data.meta.pageCount);
    } catch (error) {
      return Promise.reject(error);
    }
};

const AddSupportTicket = async(ticket: ISupportTicket) => {
    try {
      await axiosClient.post(add_ticket(),ticket);
      
    } catch (error) {
      return Promise.reject(error);
    }
    
  };
const AddCommentWithinTicket = async({ticketId,formData}:{ticketId : string,formData:FormData}) => {
    try {
      await axiosClient.post(add_Comment_ticket(ticketId),formData,{headers: {'Content-Type': 'multipart/form-data'}});
    } catch (error) {
      return Promise.reject(error);
    }
    
  };
  

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
  getSupportTickets: () => Promise<any>;
  getCommentsWithinTicket: (ticketId:string,offset?:number,limit?:number) => Promise<any>;
  AddCommentWithinTicket: ({ticketId,formData}:{ticketId : string,formData:FormData}) => Promise<any>;
  AddSupportTicket: (ticket: ISupportTicket) => void;

};


export const useSupportTicket = () => useContext(SupportContext);