export interface IQuestion {
    id: string;
    type: string;
    name: string;
  }
  export interface RFP {
    project_name: string;
    time_type_id: string;
    expiration_date: string;
    firstFullName: string;
    firstEmail: string;
    firstMobile: string;
    secondFullName: string;
    secondEmail: string;
    secondMobile: string;
    projects: IAssessmentProject[];
  }
  
  export interface IAssessmentProject {
    category_id: string;
    assessments_type_id: string;
    apis_size_id: string;
    average_applications_id: string;
    color_mobile_id: string;
    evaluation_is_internal_or_external_id: string;
    internal_applications_num: number;
    external_applications_num: number;
    list_applications_with_scope: string;
    Verify_that_vulnerabilities_are_fixed: boolean;
    necessary_resident_be_on_site: boolean;
    how_many_times_on_site: number;
    How_many_user_roles: number;
    how_to_access_the_application: string;
    how_many_IPS_should_be_tested_in_servers: number;
    how_many_IPS_should_be_tested_in_workstations: number;
    how_many_IPS_should_be_tested_in_network_devices: number;
    vpn_access_to_the_resident: boolean;
    evaluation_approach: string;
    details_evaluation_approach: string;
    active_directory: boolean;
    details_ips_scoped: string;
  }
  