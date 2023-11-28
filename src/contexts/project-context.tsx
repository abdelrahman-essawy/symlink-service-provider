import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { IProject } from "@/@types/project";
import { get_Projects,} from "../environment/apis"
export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);
//TODO: move this to types folder

const ProjectContextProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [Selectedproject, setSelectedProject] = useState<IProject>();
  const [count, setCount] = useState<number>(3);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProjects =  (PageNumber: number , PageSize: number ,SearchString?:string) => {
    axiosClient
      .get(get_Projects(PageNumber, PageSize, SearchString))
      .then((res) => {
        setProjects(res.data.data);
        setCount(res.data.meta.total);
        setPageSize(res.data.meta.limit);
        setTotalPages(res.data.meta.totalPages);
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

  return (
    <ProjectContext.Provider
      value={{
        projects,
        Selectedproject,
        count,
        pageSize,
        totalPages,
        fetchProjects,
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
  projects: any[];
  count: number;
  pageSize: number;
  totalPages: number;
  Selectedproject: any;
  fetchProjects: (page: number, rowsPerPage: number, filter?: string) => void;
  AddProject: (project: IProject) => void;
  EditProject: (project: IProject) => void;
  DeleteProject: (project_id: string) => void;
};