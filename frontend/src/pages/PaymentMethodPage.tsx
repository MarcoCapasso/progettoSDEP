import { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../component/CheckoutSteps'
import { Store } from '../Store'

export default function metodoPagamentoPage() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const {
    carrello: { indirizzoConsegna, metodoPagamento },
  } = state

  const [metodoPagamentoName, setmetodoPagamentoName] = useState(
    metodoPagamento || 'Finanziamento'
  )
  useEffect(() => {
    if (!indirizzoConsegna.indirizzo) {
      navigate('/pagamento')
    }
  }, [indirizzoConsegna, navigate])

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: metodoPagamentoName })
    localStorage.setItem('metodoPagamento', metodoPagamentoName)
    navigate('/confermaOrdine')
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Pagamento</title>
        </Helmet>
        <h1 className="my-3">Metodo di pagamento</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Finanziamento"
              label="Finanziamento"
              value="Finanziamento"
              checked={metodoPagamentoName === 'Finanziamento'}
              onChange={(e) => setmetodoPagamentoName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Carta di debito"
              label="Carta di debito"
              value="Carta di debito"
              checked={metodoPagamentoName === 'Carta di debito'}
              onChange={(e) => setmetodoPagamentoName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continua</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}