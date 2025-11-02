interface IUser {
  id: string
  email: string
  image: string
  name: string
  password: string
  permissionId: string
  phoneNumber: string
  privileges: any[]
  status: string
}

export const UserField = {
  id: 'pk',
  email: '',
  image: '',
  name: '',
  password: '',
  permissionId: '64b9f5e3a2b4c3d5e6f7a8c0',
  phoneNumber: '',
  privileges: [],
  status: 'active',
}

export type { IUser }
