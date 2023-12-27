import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { IProject } from "@/@types/project";
import { get_Projects, get_Project_id, get_attached_file, delete_RFP } from "../environment/apis";
export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);
//TODO: move this to types folder

const ProjectContextProvider = ({ children }: any) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [Selectedproject, setSelectedProject] = useState<IProject>({} as IProject);
  const [count, setCount] = useState<number>(0);
  const [countFiles, setCountFiles] = useState<number>(0);
  const [pageSize, setPageSize] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProjects = (
    endpoint: string,
    PageNumber: number,
    PageSize: number,
    SearchString?: string
  ) => {
    axiosClient
      .get(get_Projects(endpoint, PageNumber, PageSize, SearchString))
      .then((res) => {
        setProjects(res.data.data);
        setCount(res.data.meta.itemCount);
        setPageSize(res.data.meta.take);
        setTotalPages(res.data.meta.pageCount);
      })
      .catch((error) => {});
  };
  const fetchAttachedFile = (page: number, rowsPerPage: number, projectID: string) => {
    axiosClient
      .get(get_attached_file(page, rowsPerPage, projectID))
      .then((res) => {
        setFiles(res.data.data);
        setCountFiles(res.data.meta.itemCount);
        setPageSize(res.data.meta.take);
        setTotalPages(res.data.meta.pageCount);
      })
      .catch((error) => {});
  };

  const getProject = async (id: string) => {
    try {
      const res = await axiosClient.get(get_Project_id(id));
      setSelectedProject(res?.data?.data as IProject);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
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

  const DeleteProject = async (project_id: string) => {
    try {
      await axiosClient.delete(delete_RFP(project_id));
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const DeleteFile = (FileID: string) => {};

  return (
    <ProjectContext.Provider
      value={{
        projects,
        files,
        Selectedproject,
        count,
        countFiles,
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
  countFiles: number;
  pageSize: number;
  totalPages: number;
  Selectedproject: IProject;
  fetchProjects: (
    endpoint: string,
    PageNumber: number,
    PageSize: number,
    SearchString?: string
  ) => void;
  fetchAttachedFile: (page: number, rowsPerPage: number, projectID: string) => void;
  DeleteFile: (FileID: string) => void;
  getProject: (id: string) => Promise<any>;
  AddProject: (project: IProject) => void;
  EditProject: (project: IProject) => void;
  DeleteProject: (project_id: string) => Promise<any>;
};
