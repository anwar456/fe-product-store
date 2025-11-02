import { PRIVILEGES } from '@app/config/privileges.config'
import { find } from 'lodash'

interface ICheckingPermissionAccess {
  permissionId: string
  id: string
  access: string
}

export function usePermission() {
  const checkingPermissionAccess = ({ permissionId, id, access }: ICheckingPermissionAccess) => {
    const role = find(PRIVILEGES, { id: permissionId })
    if (!role) return false

    const menuPrivilege = find(role.privileges, { id })
    if (!menuPrivilege) return false

    return menuPrivilege.privileges.includes(access)
  }

  return { checkingPermissionAccess }
}
