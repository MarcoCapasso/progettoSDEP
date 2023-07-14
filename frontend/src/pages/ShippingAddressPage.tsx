import { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../component/CheckoutSteps'
import { Store } from '../Store'

export default function ShippingAddressPage() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const {
    userInfo,
    carrello: { indirizzoConsegna },
  } = state

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/spedizione')
    }
  }, [userInfo, navigate])

  const [nome, setNome] = useState(indirizzoConsegna.nome || '')
  const [indirizzo, setIndirizzo] = useState(indirizzoConsegna.indirizzo || '')
  const [città, setCittà] = useState(indirizzoConsegna.città || '')
  const [codicePostale, setCodicePostale] = useState(indirizzoConsegna.codicePostale || '')

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        nome,
        indirizzo,
        città,
        codicePostale,
      },
    })
    localStorage.setItem(
      'indirizzoConsegnaConcessionaria',
      JSON.stringify({
        nome,
        indirizzo,
        città,
        codicePostale,
      })
    )

    navigate('/pagamento')
  }

  return (
    <div>
      <Helmet>
        <title>Spedizione</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>indirizzo</Form.Label>
            <Form.Control
              value={indirizzo}
              onChange={(e) => setIndirizzo(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>città</Form.Label>
            <Form.Control
              value={città}
              onChange={(e) => setCittà(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Codice Postale</Form.Label>
            <Form.Control
              value={codicePostale}
              onChange={(e) => setCodicePostale(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continua
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}