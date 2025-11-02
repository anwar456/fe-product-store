import { ReactSelectStyle } from '@app/styled/react-select.styled'
import { get, isArray } from 'lodash'
import React from 'react'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import RequiredInfo from '../Info/RequiredInfo'

export default function SelectStatic({
  control,
  errors,
  fieldName,
  placeholder = 'Pilih...',
  options,
  defaultValue = '',
  className = '',
  required = false,
  isClearable = true,
  additionalOptions = {},
  isMulti,
  styles = ReactSelectStyle,
  onChangeValue,
  labelName,
}: ISelectStatic) {
  return (
    <>
      <Form.Group>
        {labelName && (
          <Form.Label>
            {labelName} {required && <RequiredInfo />}
          </Form.Label>
        )}
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={fieldName}
          rules={{
            required: required,
          }}
          render={({ field: { onChange, value, ref } }) => (
            <>
              {isMulti ? (
                <Select
                  isMulti={true}
                  placeholder={placeholder}
                  ref={ref}
                  value={isArray(value) ? value?.map((x: any) => options?.filter((y: any) => x == y.value)[0]) : []}
                  onChange={(val: any) => {
                    onChange(val?.map((x: any) => x.value))
                    if (onChangeValue) {
                      onChangeValue(val)
                    }
                  }}
                  className={className}
                  styles={styles}
                  classNamePrefix={`${get(errors, fieldName) ? 'is-invalid' : ''}`}
                  options={options}
                  isClearable={isClearable}
                  {...additionalOptions}
                />
              ) : (
                <>
                  <Select
                    placeholder={placeholder}
                    ref={ref}
                    value={options?.filter((c: any) => c.value == value)}
                    onChange={(val: any) => {
                      onChange(val?.value ? val?.value : null)
                      if (onChangeValue) {
                        onChangeValue(val)
                      }
                    }}
                    className={className}
                    styles={styles}
                    classNamePrefix={`${get(errors, fieldName) ? 'is-invalid' : ''}`}
                    options={options}
                    isClearable={isClearable}
                    {...additionalOptions}
                  />
                </>
              )}
            </>
          )}
        />
      </Form.Group>
      {get(errors, fieldName) && <div className="invalid-feedback d-block">{get(errors, fieldName)?.message}</div>}
    </>
  )
}

type OptionSelect = {
  label: string
  value: string | number | any
}
interface ISelectStatic {
  control: any
  errors: any
  fieldName: string
  placeholder?: string
  options: OptionSelect[]
  defaultValue?: any
  className?: string
  required?: boolean
  isClearable?: boolean
  additionalOptions?: any
  isMulti?: any
  styles?: any
  onChangeValue?: any
  labelName?: string
}
