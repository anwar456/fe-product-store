import XCircleIcon from '@app/components/Icons/XCircleIcon'
import FormInputControl from '@app/components/Input/FormInputControl'
import { DFlex } from '@app/styled/flex.styled'
import { Loader } from '@app/styled/loader.styled'
import { LoginBox, LoginLayoutContainer } from '@app/styled/login.styled'
import { P14Medium } from '@app/styled/text.styled'
import React from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'
import AppsLogo from '../../../../assets/logo/AppsLogo'

interface Props {
  handleSubmit: any
  onSubmitForm: (data: any) => void
  register: any
  errors: any
  loading: boolean
  error: boolean
}

export default function LoginLayout({ handleSubmit, onSubmitForm, register, errors, loading = false, error = false }: Props) {
  return (
    <>
      <LoginLayoutContainer>
        <LoginBox>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <Card className="card-form">
              <Card.Header className="border-0 py-4 px-0 mb-3">
                <div className="d-flex flex-column gap-3">
                  <AppsLogo />
                  <P14Medium className="text-muted">Enter your username and password correctly</P14Medium>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <Row className="g-3">
                  {error && (
                    <Col md={12}>
                      <AlertDanger variant="danger" className="py-2 animate__animated animate__headShake animate__faster">
                        <DFlex className='gap-2'>
                          <XCircleIcon /> <P14Medium>Invalid email or password</P14Medium>
                        </DFlex>
                      </AlertDanger>
                    </Col>
                  )}
                  <Col md={12}>
                    <FormInputControl
                      label="Email"
                      placeholder="Input email"
                      register={register('email')}
                      isInvalid={errors?.email as boolean | undefined}
                      message={errors?.email?.message}
                    />
                  </Col>
                  <Col md={12}>
                    <FormInputControl
                      label="Password"
                      placeholder="Input password"
                      type="password"
                      register={register('password')}
                      isInvalid={errors?.password as boolean | undefined}
                      message={errors?.password?.message}
                    />
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="border-0 bg-transparent py-4 px-0">
                <Button className="w-100" type="submit">
                  <DFlex className="gap-2 justify-content-center">
                    <P14Medium>Sign In</P14Medium>
                    {loading && <Loader color="#fff" size={23} />}
                  </DFlex>
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        </LoginBox>
      </LoginLayoutContainer>
    </>
  )
}

const AlertDanger = styled(Alert)`
  &.alert {
    background-color: #fdecea;
    color: #d93025;
    border: none;
    font-weight: 500;
    /* border: 1px solid var(--danger); */
  }
`
