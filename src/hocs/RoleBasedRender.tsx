import { getRolesThatCanAccessComponentId } from "@/configs/roles";
import { useAuth } from "@/hooks/use-auth";

type RoleBasedRenderProps = {
  children: JSX.Element;
  componentId: string;
};

const RoleBasedRender = ({ children, componentId }: RoleBasedRenderProps) => {
  const auth = useAuth();
  const ROLE = auth?.user?.role;

  console.log("RoleBasedRender", ROLE);
  // if user is admin, return children
  if (ROLE === "admin") return children;

  if (getRolesThatCanAccessComponentId(componentId).includes(ROLE)) return children;

  return null;
};


export default RoleBasedRender;