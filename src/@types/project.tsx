export interface IProject {
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  request_for_proposal_status: string
  project_name: string
  user_id: string
  time_type_id: string
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
  created_at: string
  updated_at: string
  deleted_at: any
  multi_RFP_id: string
  category_id: string
  assessments_type_id: string
  apis_size_id: any
  average_applications_id: any
  color_mobile_id: any
  evaluation_is_internal_or_external_id: any
  internal_applications_num: any
  external_applications_num: any
  list_applications_with_scope: any
  Verify_that_vulnerabilities_are_fixed: boolean
  necessary_resident_be_on_site: any
  how_many_times_on_site: number
  How_many_user_roles: number
  how_to_access_the_application: string
  how_can_the_assessor_access_it: any
  how_many_IPS_should_be_tested_in_servers: any
  how_many_IPS_should_be_tested_in_workstations: any
  how_many_IPS_should_be_tested_in_network_devices: any
  vpn_access_to_the_resident: any
  evaluation_approach: string
  details_evaluation_approach: any
  active_directory: any
  details_ips_scoped: any
  category: ICategory;
  assessments_type_meta_data: AssessmentsTypeMetaData;
  apis_size_meta_data: any
  color_mobile_meta_data: any
  average_applications_meta_data: any
  evaluation_is_internal_or_external_meta_data: any
}

export type IMetaData = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
export type ICategory = {
    id: string
    name: string
}

export interface AssessmentsTypeMetaData {
    id: string
    type: string
    name: string
  }