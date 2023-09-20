import { getRolesThatCanAccessComponentId } from "@/configs/roles";
import { useAuth } from "@/hooks/use-auth";

type RoleBasedRenderProps = {
  children: JSX.Element;
  componentId: string;
};

const RoleBasedRender = ({ children, componentId }: RoleBasedRenderProps) => {
  const auth = useAuth();
  const ROLE = auth?.user?.role;

  if (getRolesThatCanAccessComponentId(componentId).includes(ROLE)) return children;

  return null;
};
export const ISRoleBased = (componentId: string) => {
  const auth = useAuth();
  const ROLE = auth?.user?.role;

  if (getRolesThatCanAccessComponentId(componentId).includes(ROLE)) return true;

  return false;
};

export default RoleBasedRender;