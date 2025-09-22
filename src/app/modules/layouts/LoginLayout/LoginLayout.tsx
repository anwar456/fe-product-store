import Button from '@app/components/Buttons/Button'
import FormInputControl from '@app/components/Input/FormInputControl'
import { DFlex, DFlexColumn } from '@app/styled/flex.styled'
import { LoginBox, LoginLayoutContainer, ThemeModeWrapper } from '@app/styled/login.styled'
import { P14Medium, P20Medium } from '@app/styled/text.styled'
import React from 'react'
import { Alert, Card, Col, Form, Row } from 'react-bootstrap'
import ModeTheme from '../ModeTheme'

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
        <ThemeModeWrapper>
          <DFlex className="gap-2">
            <ModeTheme isLabel />
          </DFlex>
        </ThemeModeWrapper>
        <LoginBox>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <Card className="card-form">
              <Card.Header className="border-0 py-4">
                <DFlexColumn className="align-items-center gap-2">
                  <P20Medium className="font-weight-700 text-center">Signin to application</P20Medium>
                  <P14Medium className="text-muted text-center">Sign in to explore all application’s features.</P14Medium>
                </DFlexColumn>
              </Card.Header>
              <Card.Body>
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
              <Card.Footer className="border-0 bg-transparent py-4">
                <Button text="Sign In" className="w-100" type="submit" loading={loading} />
              </Card.Footer>
            </Card>
          </Form>
        </LoginBox>
      </LoginLayoutContainer>
    </>
  )
}
