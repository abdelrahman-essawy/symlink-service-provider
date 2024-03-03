//generate filtersString
import { Filter } from "@/@types/filter";
import { filtersString } from "@/utils/generate-filter-string";
import { orderByToString } from "@/utils/helperFunctions";
// Contact Messages API
export const get_contact_messages = (page: number = 1, rowsPerPage: number = 10,  filter?:Filter[]) =>
  `/contacts?page=${page + 1}&limit=${rowsPerPage}&${filtersString(filter)}`;

export const get_contact_message = (id: string) => `/contacts/${id}`;
//Offices API
export const get_offices = (page: number = 1, rowsPerPage: number = 10, filter?: Filter[]) =>
  `/shipping-offices?page=${page + 1}&limit=${rowsPerPage}&${filtersString(filter)}`;
export const suspend_office = (id: string) => `/shipping-offices/${id}`;
export const restore_office = (id: string) => `/shipping-offices/restore/${id}`;
export const add_office = () => "/shipping-offices";
export const get_office = (id: string) => `/shipping-offices/${id}`;

// Financials API
export const get_transactions = (page: number = 1, rowsPerPage: number = 10, filter?: string) =>
  `/financials/transactions?page=${page + 1}&limit=${rowsPerPage}`;

export const get_financials_offices_balance = (
  page: number = 1,
  rowsPerPage: number = 10,
  filter?: string
) =>
  `/financials/offices-balance?page=${page + 1}&limit=${rowsPerPage}&filters=${
    filter != undefined
      ? `username<>${filter}&filters=name<>${filter}&filters=phone<>${filter}`
      : ""
  }`;
export const get_financials_account_balance = () => `/financials/account-balance`;

export const reset_balance = (id: string) => `/financials/reset-balance/${id}`;
export const get_financials_drivers_balance = (
  page: number = 1,
  rowsPerPage: number = 10,
  filter?: string
) =>
  `/financials/drivers-balance?page=${page + 1}&limit=${rowsPerPage}&filters=${
    filter != undefined
      ? `username<>${filter}&filters=name<>${filter}&filters=phone<>${filter}`
      : ""
  }`;

//-----------------------------------------------------SYMLINK----------------------------------------------------
//RFP----------------------------------------------------
export const get_Project_id = (id: string) => `/multi-rfp/${id}`;
export const get_Projects = (
  endpoint: string,
  page: number = 1,
  rowsPerPage: number = 10,
  searchString?: string,
  orderBy?: { [key: string]: string}
) => `/multi-rfp/${endpoint}?page=${page}&limit=${rowsPerPage}${searchString?`&search_by_name=${searchString}` : ""}${orderBy? orderByToString(orderBy) : `&sort_by_date=ASC`}`;
export const get_attached_file = (page: number, limit: number, id?: string) =>
  `/attached-files/${id}?limit=${limit}&page=${page}`;
export const delete_RFP = (id: string) => `/multi-rfp/${id}`
//Bids----------------------------------------------------
export const get_Bids = (page: number = 1, rowsPerPage: number = 10, searchString?: string,orderBy?: { [key: string]: string}) =>
`/multi-rfp/provider-all-offers?page=${page}&limit=${rowsPerPage}${searchString?`&search_by_name=${searchString}` : ""}${orderBy? orderByToString(orderBy) : `&sort_by_date=ASC`}`;
export const get_list_of_offer = (
  multi_RFP_id: string,
  page: number = 1,
  rowsPerPage: number = 10,
  searchString?: string,
  orderBy?: { [key: string]: string}
  ) =>
  `/offers/${multi_RFP_id}/all-offers-for-project?page=${page}&limit=${rowsPerPage}${searchString?`&search_by_name=${searchString}` : ""}${orderBy? orderByToString(orderBy) : `&sort_by_date=ASC`}`;
  export const get_Bid_id = (id: string) => `/multi-rfp/${id}`;
  
  //SupportTicket----------------------------------------------------
  export const add_ticket = () => `/support-ticket`;
  export const add_Comment_ticket = (ticketId:string) => `/support-ticket/comment/${ticketId}`;
  export const get_ticket_massages = (ticketId:string,offset:number,limit:number) => `/support-ticket/comments/${ticketId}/${offset}/${limit}`;
  export const get_tickets = () => `/support-ticket`;
  
  
  
  