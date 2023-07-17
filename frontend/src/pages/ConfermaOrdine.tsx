import { useContext, useEffect } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CheckoutSteps from '../component/CheckoutSteps'
import LoadingBox from '../component/LoadingBox'
import { useCreateOrderMutation } from '../hooks/ordiniHooks'
import { Store } from '../Store'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'

export default function PlaceOrderPage() {
  const navigate = useNavigate()

  const { state, dispatch } = useContext(Store)
  const { carrello, userInfo } = state

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100 // 123.2345 => 123.23

  carrello.prezzoProdotto = round2(
    carrello.prodottiCarrello.reduce((a, c) => a + c.quantità * c.prezzo, 0)
  )
  carrello.prezzoSpedizione = carrello.prezzoProdotto > 100 ? round2(0) : round2(10)
  carrello.prezzoTasse = round2(0.15 * carrello.prezzoProdotto)
  carrello.prezzoTotale = carrello.prezzoProdotto + carrello.prezzoSpedizione + carrello.prezzoTasse

  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation()

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: carrello.prodottiCarrello,
        shippingAddress: [carrello.indirizzoConsegna],
        paymentMethod: carrello.metodoPagamento,
        itemsPrice: carrello.prezzoProdotto,
        shippingPrice: carrello.prezzoSpedizione,
        taxPrice: carrello.prezzoTasse,
        totalPrice: carrello.prezzoTotale,
      })
      dispatch({ type: 'CART_CLEAR' })
      localStorage.removeItem('prodottiCarrello')
      navigate(`/ordine/${data.order._id}`)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  useEffect(() => {
    if (!carrello.metodoPagamento) {
      navigate('/pagamento')
    }
  }, [carrello, navigate])

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Conferma Ordine</title>
      </Helmet>
      <h1 className="my-3">Anteprima Ordine</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Spedizione</Card.Title>
              <Card.Text>
                <strong>Città:</strong> {carrello.indirizzoConsegna.città} <br />
                <strong>Indirizzo: </strong> {carrello.indirizzoConsegna.indirizzo},
                {carrello.indirizzoConsegna.città}, {carrello.indirizzoConsegna.codicePostale},
              </Card.Text>
              <Link to="/spedizione">Modifica</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pagamento</Card.Title>
              <Card.Text>
                <strong>Metodo di pagamento:</strong> {carrello.metodoPagamento}
              </Card.Text>
              <Link to="/pagamento">Modifica</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Ordine: </Card.Title>
              <ListGroup variant="flush">
                {carrello.prodottiCarrello.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.immagine}
                          alt={item.marca}
                          className="img-fluid rounded thumbnail"
                        ></img>{' '}
                        <Link to={`/veicolo/${item.slug}`}>{item.marca}{item.modello}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantità}</span>
                      </Col>
                      <Col md={3}>€{item.prezzo}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/carrello">Modifica</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Ordine</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Prodotto</Col>
                    <Col>€{carrello.prezzoProdotto.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Spedizione</Col>
                    <Col>€{carrello.prezzoSpedizione.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tasse</Col>
                    <Col>€{carrello.prezzoTasse.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Totale: </strong>
                    </Col>
                    <Col>
                      <strong>€{carrello.prezzoTotale.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={carrello.prodottiCarrello.length === 0 || isLoading}
                    >
                      Conferma Ordine
                    </Button>
                    {isLoading && <LoadingBox></LoadingBox>}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}