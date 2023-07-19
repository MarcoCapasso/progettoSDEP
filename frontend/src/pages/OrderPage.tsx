import { useContext } from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import LoadingBox from '../component/LoadingBox'
import MessageBox from '../component/MessageBox'
import { useGetOrderDetailsQuery } from '../hooks/ordiniHooks'
import { Store } from '../Store'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'

export default function OrderPage() {
  const { state } = useContext(Store)
  const { userInfo } = state

  const params = useParams()
  const { id: orderId } = params

  const { data: order ,isLoading, error } = useGetOrderDetailsQuery(orderId!)
  return isLoading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !order ? (
    <MessageBox variant="danger">Ordine non trovato.</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Ordine #{orderId}</title>
      </Helmet>
      <h1 className="my-3">Ordine #{orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Spedizione</Card.Title>
              <Card.Text>
                <strong>città:</strong> {order.indirizzoConsegna.citta} <br />
                <strong>Indirizzo: </strong> {order.indirizzoConsegna.indirizzo},
                {order.indirizzoConsegna.codicePostale}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Spedito a: {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Non spedito</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pagamento</Card.Title>
              <Card.Text>
                <strong>Metodo di pagamento:</strong> {order.metodoPagamento}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Pagato{order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Non pagato</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.prodotti.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.immagine}
                          alt={item.slug}
                          className="img-fluid rounded thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.marca}{item.modello}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantità}</span>
                      </Col>
                      <Col md={3}>${item.prezzo}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Resoconto</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Veicolo</Col>
                    <Col>€{order.prezzoProdotto.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Spedizione</Col>
                    <Col>€{order.prezzoSpedizione.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tasse</Col>
                    <Col>€{order.prezzoTasse.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Totale</strong>
                    </Col>
                    <Col>
                      <strong>€{order.prezzoTotale.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}