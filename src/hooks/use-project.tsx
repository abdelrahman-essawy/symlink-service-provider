import { ProjectContext } from '@/contexts/project-context';
import { useContext } from 'react';

export const useProject = () => useContext(ProjectContext);
