export enum PreferredTestingTime {
  DURING_WORKING_HOURS = "DURING_WORKING_HOURS",
  OFF_WORKING_HOURS = "OFF_WORKING_HOURS",
  WEEKEND = "WEEKEND",
  NOT_PREFFERED = "NOT_PREFFERED",
}
export type PreferredTestingTimeStrings = keyof typeof PreferredTestingTime;
//MultiRfp
export interface IProject {
  projects: RequestForProposal[]
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  request_for_proposal_status: string
  project_name: string
  user_id: string
  preferred_testing_time:  PreferredTestingTimeStrings[]
  user: User
  expiration_date: string
  firstFullName: string
  firstEmail: string
  firstMobile: string
  secondFullName: string
  secondEmail: string
  secondMobile: string
  time_type_meta_data: TimeTypeMetaData
  request_for_proposal: RequestForProposal[]
}

export interface User {
  id: string
  name: any
  avatar: string
  phone: any
  email: string
}

export interface TimeTypeMetaData {
  id: string
  type: string
  name: string
}

export interface RequestForProposal {
  id: string
  category_id: string
  category_name: string
  target_ip_address: string
  approach_of_assessment: string
  notes: string
  is_active_directory: boolean
  target_mobile_application_url: string
  how_many_custom_lines_of_code: string
  what_is_programming_language: string
  how_many_server_to_review: string
  how_many_network_devices_to_review: string
  how_many_workstation_to_review: string
  is_hld_lld_available: boolean
  apk_attachment_id: string,
  category: ICategory,
  apk_attachment:ApkAttachment,
}

export type ApkAttachment = {
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  file_type: string
  file_name: string
  file_url: string
  request_for_proposal_id: string
}


export type IMetaData = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export type ICategory = {
    id: string;
    name: string;
}

export interface AssessmentsTypeMetaData {
    id: string
    type: string
    name: string
  }