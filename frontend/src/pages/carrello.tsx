import { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import MessageBox from '../component/MessageBox'
import { Store } from '../Store'
import { CartItem } from '../types/carrello'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function Carrello() {
  const navigate = useNavigate()

  const {
    state: {
      mode,
      carrello: { prodottiCarrello },
    },
    dispatch,
  } = useContext(Store)

  const updateCartHandler = (item: CartItem, quantità: number) => {
    if (prodottiCarrello.length < quantità) {
      toast.warn("E' possibile aggiungere un solo veicolo per modello")
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantità },
    })
  }

  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const checkoutHandler = () => {
    navigate('/accesso?redirect=/spedizione')
  }

  return (
    <div>
      <Helmet>
        <title>Carrello</title>
      </Helmet>
      <h1>Carrello</h1>
      <Row>
        <Col md={8}>
          {prodottiCarrello.length === 0 ? (
            <MessageBox>
              Il carrello è vuoto, <Link to="/">Visualizza Annunci</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {prodottiCarrello.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.immagine}
                        alt={item.slug}
                        className="img-fluid rounded thumbnail"
                      ></img>{' '}
                      <Link to={`/veicolo/${item.slug}`}>{item.slug}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantità - 1)
                        }
                        variant={mode}
                        disabled={item.quantità === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantità}</span>
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantità + 1)
                        }
                        disabled={item.quantità === item.quantità}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>€{item.prezzo}</Col>
                    <Col md={2}>
                      <Button onClick={() => removeItemHandler(item)} variant={mode}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotale ({prodottiCarrello.reduce((a, c) => a + c.quantità, 0)}{' '}
                    items) : €
                    {prodottiCarrello.reduce((a, c) => a + c.prezzo * c.quantità, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={prodottiCarrello.length === 0}
                    >
                      Procedi con il pagamento
                    </Button>
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