import styled from 'styled-components'

export const LoginLayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--background);
`

export const LoginBox = styled.div`
  width: 33.33333rem;
  .card-form {
    padding: 3rem;
  }
  @media (max-width: 900px) {
    .card-form {
      border: none !important;
      padding: 0;
      background: none !important;
    }
  }
`

export const ThemeModeWrapper = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 2rem;
  @media (max-width: 576px) {
    top: 1rem;
    right: 1rem;
  }
`
