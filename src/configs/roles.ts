import { getPermissionNameFromPath } from "./pathsPermission";
import { PATH_PERMISSIONS } from "./pathsPermission";

export const TROLES = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
  SERVICE_PROVIDER: "SERVICE_PROVIDER",
} as const;

export type ExtractValuesFromObjectType<T> = T extends {}
  ? { [K in keyof T]: T[K] }[keyof T]
  : never;

export type ROLES_ENUM = ExtractValuesFromObjectType<typeof TROLES>;
export type PERMISSIONS_ENUM = ExtractValuesFromObjectType<typeof PATH_PERMISSIONS>;
type Permissions = Readonly<Partial<Record<PERMISSIONS_ENUM, boolean>>>;
type PermissionsSchema = {
  [key in ROLES_ENUM]: Permissions & {
    notAbleToViewComponents: string[];
  };
};

const sharedPermissions: Permissions = {
  canViewLayout: true,
  canViewProjects: true,
  canViewProjectsDetails: true,
  canViewProfile: true,
  canViewExperince: true,
  canViewSupport: true,
  canViewSettingsAbout: true,
  canViewSettingsTermsAndConditions: true,
  canViewSettingsContactUs: true,
  canViewSettingsDeactivateAccount: true,
  canViewWallet: true,
};

export const permissionSchema: PermissionsSchema = {
  ADMIN: {
    notAbleToViewComponents: ["example", "example3"],
  },
  CLIENT: {
    ...sharedPermissions,
    canViewCreateRfp: true,
    canViewServiceProviderProfile: true,

    notAbleToViewComponents: [
      "sidenav-bids",
      "sidenav-educational-info",
      "sidenav-experience",
      "sidenav-certificate",
      "table-service-provider-projects",
      "headertabs-service-provider-projects",
      "button-request-to-review",
      "button-bid-rfp",
      "menu-item-service-provider-receive-orders"
    ],
  },
  SERVICE_PROVIDER: {
    ...sharedPermissions,
    canViewBids: true,
    canViewSettingsCreateCompany: true,
    canViewBidDetails: true,
    notAbleToViewComponents: [
      // "sidenav-educational-info",
      // "sidenav-experience",
      // "sidenav-certificate",
      "button-request-a-project",
      "table-client-projects",
      "headertabs-client-projects",
      "buttons-accept-reject-rfp",
      "button-upload-file",
      // "sidenav-profile",
    ],
  },
};

export const getRolesThatCanAccessPathName = (path: string): ROLES_ENUM[] => {
  const roles = Object.keys(permissionSchema) as ROLES_ENUM[];
  const rolesThatCanAccessPath = roles.filter((role) => {
    const rolePermissions = permissionSchema[role];
    const permissionName = getPermissionNameFromPath(path as any);
    return rolePermissions[permissionName];
  });
  return rolesThatCanAccessPath;
};

export const getRolesThatCanAccessComponentId = (componentId: string): string[] => {
  const roles = Object.keys(permissionSchema) as ROLES_ENUM[];
  const rolesThatCanAccessComponent: string[] = roles.filter((role) => {
    const rolePermissions = permissionSchema[role];
    const components = rolePermissions?.notAbleToViewComponents ?? [];
    return !components.includes(componentId);
  });
  return rolesThatCanAccessComponent;
};