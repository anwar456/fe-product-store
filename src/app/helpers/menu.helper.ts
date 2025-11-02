import { MENU } from '@app/config/menu.config'
import { PRIVILEGES } from '@app/config/privileges.config'
import { useNavigate } from 'react-router-dom'

export const goTo = (auth: any, navigate: ReturnType<typeof useNavigate>) => {
  const rolePrivileges = PRIVILEGES?.find((role: any) => role.id === auth?.permissionId)

  if (!rolePrivileges) {
    return
  }

  const accessibleMenus = MENU.filter((menu: any) => {
    const privilege = rolePrivileges?.privileges.find((p: any) => p.id === menu.id)
    return privilege && privilege?.privileges.includes('view')
  })

  if (accessibleMenus.length > 0) {
    const firstMenu = accessibleMenus[0]
    navigate(firstMenu.path)
  } else {
    console.warn('Tidak ada menu yang bisa diakses untuk user ini.')
  }
}
