export type NotificationSliceType = {
  notifications: Notification[]
  counter: number
  status: 'fetching' | 'posting' | 'fetched'
  errorMessage: string |undefined
}

export type Notification = {
  id?: number
  idreceiver?: number
  rutReceiver?: string
  nameReceiver?: string | null
  last_nameReceiver?: null,
  emailReceiver?: string,
  photoReceiver?: string | null,
  idsender?: number,
  rutSender?: string,
  nameSender?: string | null,
  last_nameSender?: string | null,
  emailSender?: string,
  photoSender?: string | null,
  title?: string,
  details?: string,
  idview?: number,
  nameView?: string,
  url?: string,
  date_sent?: string,
  date_seen?: string,
  status?: string
}
