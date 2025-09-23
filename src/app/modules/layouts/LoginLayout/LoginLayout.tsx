import Button from '@app/components/Buttons/Button'
import FormInputControl from '@app/components/Input/FormInputControl'
import { DFlex, DFlexColumn } from '@app/styled/flex.styled'
import { LoginBox, LoginLayoutContainer } from '@app/styled/login.styled'
import { P14Medium, P20Medium } from '@app/styled/text.styled'
import React from 'react'
import { Alert, Card, Col, Form, Row } from 'react-bootstrap'
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
                      <Alert variant="danger" className="py-2">
                        Invalid username or password
                      </Alert>
                    </Col>
                  )}
                  <Col md={12}>
                    <FormInputControl
                      label="Username"
                      placeholder="Input username"
                      register={register('username')}
                      isInvalid={errors?.username as boolean | undefined}
                      message={errors?.username?.message}
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
                <Button text="Sign In" className="w-100" type="submit" loading={loading} />
              </Card.Footer>
            </Card>
          </Form>
        </LoginBox>
      </LoginLayoutContainer>
    </>
  )
}
