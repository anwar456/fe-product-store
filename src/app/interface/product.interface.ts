interface IProduct {
  id: string
  category: string
  description: string
  images: any[]
  name: string
  price: number
  status: string
  stock: number
  unit: string
}

export const ProductField: IProduct = {
  id: '',
  category: '',
  description: '',
  images: [],
  name: '',
  price: 0,
  status: 'active',
  stock: 0,
  unit: '',
}

export type { IProduct }
