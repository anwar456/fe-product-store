interface ISaving {
  id: string
  nominal: number
  date: number
  description: string
  createdBy: string
}

export const SavingField: ISaving = {
  id: 'pk',
  nominal: 0,
  date: 0,
  description: '',
  createdBy: '',
}

export type { ISaving }
