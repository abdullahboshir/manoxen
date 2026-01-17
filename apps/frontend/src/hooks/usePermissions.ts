export function usePermissions() {
  // TODO: Integrate with backend permission API
  const hasPermission = (permissionKey: string) => {
    // Parse permission key like "THEME.READ" to "theme" and "read"
    const [resource, action] = permissionKey.toLowerCase().split('.');
    // For now, allow all permissions (should come from user context)
    return true;
  };

  return { hasPermission };
}
