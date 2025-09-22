interface IModalData {
  show?: boolean;
  approved?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | any;
  icon?: any;
  title?: string;
  prefixTitle?: boolean;
  description?: string;
  subDescriotion?: string;
  textApproved?: string;
  classDecline?: string;
  classApproved?: string;
  textDecline?: string;
  scrollable?: boolean;
  data?: any;
  type?: string;
  centered?: boolean;
  dialogClassName?: string;
  justify?: any;
  path?: string;
  id?: string;
}

export type { IModalData };
