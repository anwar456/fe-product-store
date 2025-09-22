import RequiredInfo from '@app/components/Info/RequiredInfo'
import FormInputControl from '@app/components/Input/FormInputControl'
import InputRadio from '@app/components/Radio/InputRadio'
import { TInput } from '@app/interface/input.interface'
import { P14Medium } from '@app/styled/text.styled'
import React from 'react'
import { Col } from 'react-bootstrap'

const FormTypeComponents: any = {
  form: FormInputControl,
  radio: InputRadio,
}

const FormTypeComponent = ({ ...props }: any) => {
  const type = props?.typeForm
  const TagName = FormTypeComponents[type]

  return <TagName {...props} />
}

export default function SettingColInput({
  label,
  value,
  isEdit,
  as,
  rows,
  type = 'text',
  placeholder = 'Input',
  typeForm = 'form',
  options = [],
  fieldName,
  control,
  isInvalid,
  register,
  message,
  errorDiv = true,
  required = false,
}: Props) {
  return (
    <>
      <Col md={2}>
        <P14Medium className="font-weight-500">
          {label} {required && <RequiredInfo />}
        </P14Medium>
      </Col>
      <Col md={10}>
        {isEdit ? (
          <FormTypeComponent
            label={label}
            placeholder={placeholder}
            type={type}
            as={as}
            rows={rows}
            labelShow={false}
            typeForm={typeForm}
            options={options}
            fieldName={fieldName}
            control={control}
            isInvalid={isInvalid}
            register={register}
            message={message}
            errorDiv={errorDiv}
          />
        ) : (
          <P14Medium>{value}</P14Medium>
        )}
      </Col>
    </>
  )
}

interface Option {
  label: string
  value: string
}

interface Props {
  label: string
  value: any
  isEdit: boolean
  fieldName: string
  control: any
  placeholder?: string
  as?: 'textarea' | any
  rows?: any
  type?: TInput
  typeForm?: 'form' | 'radio' | 'check' | 'select'
  options?: Option[]
  isInvalid?: any
  register?: any
  message?: any
  errorDiv?: boolean
  required?: boolean
}
