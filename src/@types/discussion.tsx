import { IProject } from "./project";
import { IUserProfile } from "./user";

export interface IComment {
  id: string;
  body_text: string;
  replies_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  multi_rfp_id: string;
  user_id: string;
  attachment_id: any;
  user: IUserProfile;
  attachment: IAttachment;
  message?:IComment;
  replies?: IComment[];
}

export interface IAttachment {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  file_type: string;
  file_name: string;
  file_url: string;
}
// ----------soket---------------
export interface ISocketMsgData {
  multi_RFP: IProject
  action: string
  entity_type: string
  entity: IComment
}

