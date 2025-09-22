import { DFlex } from '@app/styled/flex.styled'
import React from 'react'
import { Form } from 'react-bootstrap'
import { Control, Controller } from 'react-hook-form'
import styled from 'styled-components'

interface Option {
  label: string
  value: string
}

interface Props {
  fieldName: string
  control: Control<any>
  options: Option[]
  required?: boolean
}

export default function InputRadio({ fieldName, control, options, required }: Props) {
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={required ? { required: 'Harap pilih salah satu' } : undefined}
      render={({ field, fieldState }) => (
        <div>
          <DFlex>
            {options.map((opt, idx) => (
              <RadioButton key={idx} className={field.value === opt.value ? 'active' : ''} onClick={() => field.onChange(opt.value)}>
                <Form.Check
                  type="radio"
                  inline
                  label={opt.label}
                  name={field.name}
                  value={opt.value}
                  checked={field.value === opt.value}
                  onChange={() => {}}
                  className="mb-0"
                />
              </RadioButton>
            ))}
          </DFlex>
          {fieldState.error?.message && (
            <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
              {fieldState.error.message}
            </div>
          )}
        </div>
      )}
    />
  )
}

const RadioButton = styled.div`
  border: 1px solid var(--card-border-color);
  border-radius: 0.57143rem;
  padding: 0.3rem 0.4rem;
  cursor: pointer;
  margin-right: 0.5rem;

  .form-check-label {
    cursor: pointer !important;
  }

  .form-check-input {
    box-shadow: none !important;
  }

  .form-check-input:checked {
    background-color: var(--primary) !important;
    border-color: var(--primary) !important;
  }

  &:hover {
    border-color: var(--primary);
  }

  &.active {
    border-color: var(--primary);
    background-color: var(--black-25);
  }
`
