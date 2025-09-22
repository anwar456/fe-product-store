import React from 'react'

type Props = {
  message?: string | 'Required'
  placement?: any | 'auto'
} /* could also use interface */

const RequiredInfo = ({ message = 'Wajib diisi', placement = 'top' }: Props) => (
  <span className="text-danger" data-html data-place={placement} data-tip={`<p class='m-0 p-0' style="max-width:220px">${message}</p>`} title={message}>
    *
  </span>
)

export default RequiredInfo
