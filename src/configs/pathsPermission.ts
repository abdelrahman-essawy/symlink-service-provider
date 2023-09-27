import {
  ExtractValuesFromObjectType,
  permissionSchema,
  PERMISSIONS_ENUM,
  ROLES_ENUM,
} from "./roles";

export const PATH_PERMISSIONS = {
  "/": "canViewLayout",
  "/dashboard": "canViewDashboard",
  "/projects": "canViewProjects",
  "/projects/[project_id]": "canViewProjectsDetails",
  "/bid/create-rfp": "canViewCreateRfp",
  "/bids": "canViewBids",
  "/bid/rfp-name": "canViewBidDetails", // TODO: make it dynamic [bid_Id]
  "/experience": "canViewExperince",
  "/educational-info": "canViewEducationalInfo",
  "/certificate": "canViewCertificate",
  "/support": "canViewSupport",
  "/wallet": "canViewWallet",
  "/expert-name": "canViewExpertName",

  // Settings
  "/profile": "canViewProfile",
  "/settings/about": "canViewSettingsAbout",
  "/settings/terms-and-conditions": "canViewSettingsTermsAndConditions",
  "/settings/contact-us": "canViewSettingsContactUs",
  "/settings/create-company": "canViewSettingsCreateCompany",
  "/settings/deactivate-account": "canViewSettingsDeactivateAccount",
} as const;

export const getPermissionNameFromPath = (path: keyof typeof PATH_PERMISSIONS) => {
  return PATH_PERMISSIONS[path] ?? false;
};

export function hasPermissionToViewPath(role: ROLES_ENUM, permission: PERMISSIONS_ENUM): boolean {
  // Get the role permissions
  const rolePermissions = permissionSchema[role];

  // If the permission is undefined, return false
  if (!permission) {
    return false;
  }

  if (!rolePermissions) {
    return false;
  }

  if (!rolePermissions[permission]) {
    return false;
  }
  // Check if the role has the permission
  return !!rolePermissions[permission];
}