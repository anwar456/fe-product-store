export const ReactSelectStyle = {
  control: (styles: any, { isDisabled, isFocused }: any) => ({
    ...styles,
    border: isFocused ? '1px solid var(--primary-400)' : '1px solid var(--black-100)',
    padding: '0.1rem 0.8rem',
    borderRadius: '0.625rem',
    transition: 'none',
    boxShadow: isFocused ? '0 0 0 0.25rem rgba(var(--primary-rgb), 0.25)' : 'none',
    minHeight: '2.9rem',
    '&:focus': {
      ...styles[':focus'],
      backgroundColor: 'var(--primary-25)',
      borderColor: 'var(--primary-400)',
      boxShadow: '0 0 0 0.25rem rgba(var(--primary-rgb), 0.25)',
    },
    ':hover': {
      ...styles[':hover'],
      borderColor: 'var(--primary-400)',
    },
    ':active': {
      ...styles[':active'],
      borderColor: 'var(--primary-400)',
    },
  }),
  input: (styles: any) => ({
    ...styles,
    color: 'var(--black-800)',
    margin: '0',
    minHeight: '2rem',
  }),
  placeholder: (styles: any) => ({
    ...styles,
    color: 'var(--black-800)',
    fontSize: '0.9rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1.25rem',
  }),
  valueContainer: (styles: any) => ({
    ...styles,
    padding: '0',
    textOverflow: 'ellipsis',
    textWrap: 'nowrap',
  }),
  indicatorSeparator: (styles: any) => ({
    ...styles,
    backgroundColor: 'transparent',
    marginTop: '6px',
    marginBottom: '6px',
  }),
  indicatorsContainer: (styles: any) => ({
    ...styles,
    color: 'var(--black)',
    padding: '0',
  }),
  indicatorContainer: (styles: any) => ({
    ...styles,
    padding: '.5rem',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    color: 'var(--black)',
    fontWeight: '500',
  }),
  multiValue: (styles: any) => ({
    ...styles,
    color: 'var(--black-500)',
    backgroundColor: 'var(--black-100)',
    fontWeight: '500',
  }),
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: 'var(--black-500)',
    backgroundColor: 'var(--black-100)',
    fontWeight: '500',
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    color: 'var(--black-500)',
    backgroundColor: 'var(--black-100)',
    ':hover': {
      color: 'var(--black)',
      backgroundColor: 'var(--primary-300)',
    },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: '#fff',
    border: '1px solid var(--black-100)',
    borderRadius: '0.375rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    zIndex: 9999,
  }),
  option: (styles: any, { isDisabled }: any) => ({
    ...styles,
    backgroundColor: isDisabled ? 'var(--black-100)' : 'var(--white)',
    color: isDisabled ? 'var(--black-500)' : 'var(--black)',
    cursor: isDisabled ? 'not-allowed' : 'default',
    ':hover': {
      ...styles[':hover'],
      backgroundColor: isDisabled ? 'var(--black-100)' : 'var(--primary-50)',
    },
    ':focus': {
      ...styles[':focus'],
      backgroundColor: isDisabled ? 'var(--black-100)' : 'var(--primary-50)',
    },
  }),
}
