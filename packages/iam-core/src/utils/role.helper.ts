import { USER_ROLE } from "../constants/user.constant";


/**
 * Normalizes any role, status, or slug string to a consistent format.
 * (lowercase, trimmed, underscores/spaces replaced with hyphens)
 */
export const normalizeAuthString = (val: string | null | undefined): string => {
  if (!val) return "";
  return val
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-");
};

/**
 * Flexible Comparison Helper
 */
export const matchesRole = (
  source: string | string[] | null | undefined,
  target: string | string[]
): boolean => {
  if (Array.isArray(source)) {
    return source.some((s) => matchesRole(s, target));
  }
  const normSource = normalizeAuthString(source);
  if (Array.isArray(target)) {
    return target.some((t) => normalizeAuthString(t) === normSource);
  }
  return normSource === normalizeAuthString(target);
};

export const isSuperAdmin = (
  role: string | string[] | null | undefined
): boolean => matchesRole(role, USER_ROLE.SUPER_ADMIN);

export const isOrganizationOwner = (
  role: string | string[] | null | undefined
): boolean => matchesRole(role, USER_ROLE.ORGANIZATION_OWNER);



