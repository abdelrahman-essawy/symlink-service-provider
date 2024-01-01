import { ICategory, RequestForProposal } from "./project";

export interface IQuestion {
    id: string;
    type: string;
    name: string;
  }
  export interface RFP {
    project_name: string;
    preferred_testing_time: string[];
    expiration_date: string;
    firstFullName: string;
    firstEmail: string;
    firstMobile: string;
    secondFullName: string;
    secondEmail: string;
    secondMobile: string;
    projects: RequestForProposal[];
    request_for_proposal?: RequestForProposal[]
  }
  
  