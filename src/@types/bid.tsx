import { UserType } from "./user";

export interface IBid {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  request_for_proposal_status: string;
  project_name: string;
  user_id: string;
  preferred_testing_time: string;
  expiration_date: string;
  firstFullName: string;
  firstEmail: string;
  firstMobile: string;
  secondFullName: string;
  secondEmail: string;
  secondMobile: string;
  offers: any[];
}

export interface IOffer {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  multi_RFP_id: string;
  price: string;
  duration: string;
  duration_num: number;
  is_accepted: boolean;
  acceptedAt: any;
  is_anonymous: boolean;
  user_id: string;
  number_of_hours: number;
  user: UserType;
}




