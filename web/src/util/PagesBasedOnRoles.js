export const getPagesBasedonRoles = (category) => {
  switch (category) {
    case 'crm':
      return ['view_crm', 'update_crm', 'mange_crm']
    case 'hr':
      return ['view_users', 'manage_users']
    case 'project':
      return ['manage_project', 'view_project']
    case 'sales':
      return ['view_leads', 'update_leads', 'manage_leads']
    case 'admin':
      return [
        'manage_project',
        'view_project',
        'view_crm',
        'update_crm',
        'mange_crm',
        'view_users',
        'manage_users',
      ]
    case 'legal':
      return []
    default:
      return []
  }
}
