import { IUserProfile } from "./user";

export interface IComment {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  body_text: string;
  multi_rfp_id: string;
  user_id: string;
  attachment_id: any;
  replies_count: number;
  user: IUserProfile;
  attachment: IAttachment;
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
