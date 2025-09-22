import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { Form } from 'react-bootstrap'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import RequiredInfo from '../Info/RequiredInfo'

interface Props {
  label: string
  fieldName: string
  control: Control<any>
  required?: boolean
  errors?: FieldErrors
}

export default function AntDatePicker({ label, fieldName, control, required = false, errors }: Props) {
  const error = errors?.[fieldName]

  return (
    <Form.Group>
      <Form.Label>
        {label} {required && <RequiredInfo />}
      </Form.Label>
      <Controller
        control={control}
        name={fieldName}
        rules={{ required: required ? 'Tanggal wajib diisi' : false }}
        render={({ field }) => (
          <DatePicker
            {...field}
            className={`w-100 form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Pilih tanggal"
            value={field.value ? dayjs(field.value) : null}
            onChange={(date: any) => {
              field.onChange(date ? date?.valueOf() : null)
            }}
          />
        )}
      />
      {error && <div className="invalid-feedback d-block">{error.message?.toString()}</div>}
    </Form.Group>
  )
}
