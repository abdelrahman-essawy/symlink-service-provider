import { User } from "./project"

export interface ISupportTicket {
    id: string
    subject: string
    description: string
    status: string
    ticket_num: string
    created_at: string
    updated_at: string
    user_id: string
  }


  export interface TicketComment {
    id: string
    comment_text: string
    attachment: Attachment
    created_at: string
    updated_at: string
    user_id: string
    ticket_id: string
    user: User
  }
  
  export interface Attachment {
    id: string
    file_url: string
    file_name: string
    file_type: string
    created_at: string
    updated_at: string
  }
  

  export interface ISockeTicketCommentData {
    supportTicket: SupportTicket
    ticketComment: TicketComment
    action: string
  }
  
  export interface SupportTicket {
    id: string
    created_at: string
    updated_at: string
    deleted_at: any
    user_id: string
    attachment_id: any
    subject: string
    description: string
    status: string
    ticket_num: string
  }
  
  export interface TicketComment {
    user_id: string
    ticket_id: string
    attachment_id: string
    comment_text: string
    user: User
    ticket: Ticket
    attachment: Attachment
  }
  
  export interface Ticket {
    id: string
    created_at: string
    updated_at: string
    deleted_at: any
    user_id: string
    attachment_id: any
    subject: string
    description: string
    status: string
    ticket_num: string
  }
  