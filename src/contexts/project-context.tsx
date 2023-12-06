import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { IProject } from "@/@types/project";
import { get_Projects,get_Project_id,get_attached_file} from "../environment/apis"
export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);
//TODO: move this to types folder

const ProjectContextProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [Selectedproject, setSelectedProject] = useState<IProject>({} as IProject);
  const [count, setCount] = useState<number>(3);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProjects =  (PageNumber: number , PageSize: number ,SearchString?:string,userID?:string) => {
    axiosClient
      .get(get_Projects(PageNumber, PageSize, SearchString,userID))
      .then((res) => {
        setProjects(res.data.data);
        setCount(res.data.meta.itemCount);
        setPageSize(res.data.meta.take);
        setTotalPages(res.data.meta.pageCount);
      })
      .catch((error) => {});
  };
  const fetchAttachedFile =  (page: number, rowsPerPage: number,projectID:string) => {
    axiosClient
      .get(get_attached_file(page,rowsPerPage,projectID))
      .then((res) => {
        console.log(res);
        setFiles(res.data.data);
        setCount(res.data.meta.itemCount);
        setPageSize(res.data.meta.take);
        setTotalPages(res.data.meta.pageCount);
      })
      .catch((error) => {});
  };

  const getProject =  (id: string) => {
    axiosClient
      .get(get_Project_id(id))
      .then((res) => {
        setSelectedProject(res.data.data as IProject);
      })
      .catch((error) => {});
  };

  //TODO: replace with BK-end function
  const AddProject = (project: any) => {
    const newProject: IProject = {
      ...project,
      id: (projects?.length + 1).toString(),
    };
    setProjects([...projects, newProject]);
    setCount(count + 1);
  };
  //TODO: replace with BK-end function
  const EditProject = (_project: any) => {
    const restProjects = projects?.filter((project) => project.id !== _project.id);
    const EditedProject: IProject = _project;
    setProjects([EditedProject, ...restProjects]);
  };
  //TODO: replace with BK-end function
  const DeleteProject = (project_id: string) => {
    const restProjects = projects?.filter((project) => project.id !== project_id);
    setProjects([...restProjects]);
    setCount(count - 1);
  };

  const DeleteFile = (FileID:string) => {

  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        files,
        Selectedproject,
        count,
        pageSize,
        totalPages,
        fetchProjects,
        fetchAttachedFile,
        DeleteFile,
        getProject,
        AddProject,
        EditProject,
        DeleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;

export type ProjectContextType = {
  projects: IProject[];
  files: any[];
  count: number;
  pageSize: number;
  totalPages: number;
  Selectedproject: IProject;
  fetchProjects: (page: number, rowsPerPage: number, filter?: string,userID?:string) => void;
  fetchAttachedFile: (page: number, rowsPerPage: number,projectID:string) => void;
  DeleteFile: (FileID:string) => void;
  getProject: ( id: string) => void;
  AddProject: (project: IProject) => void;
  EditProject: (project: IProject) => void;
  DeleteProject: (project_id: string) => void;
};
