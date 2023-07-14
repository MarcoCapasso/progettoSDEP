import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"
import { useGetProductDetailsBySlugQuery } from "../hooks/veicoloHooks";
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { convertVeicoloToCartItem, getError } from '../utils';
import { ApiError } from '../types/ApiError';
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { toast } from 'react-toastify'
import { useContext } from "react";
import { Store } from "../Store";

export default function PaginaVeicolo() {
  const params = useParams();
  const { slug } = params;
  const {
    data: veicolo,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!)

const { state, dispatch} = useContext(Store)
const { carrello } = state

const navigate = useNavigate()

//aggiungere veicolo al carrello e reinderizzamento
const addToCartHandler = () => {
  const existItem = carrello.prodottiCarrello.find((x) => x._id === veicolo!._id)
  const quantità = existItem ? existItem.quantità + 1 : 1
  if (veicolo!.disponibilita < quantità) {
    toast.warn('Possibile aggiungere un solo veicolo per modello')
    return
  }
  dispatch({
    type: 'CART_ADD_ITEM',
    payload: {...convertVeicoloToCartItem(veicolo!), quantità},
  })
  toast.success('Veicolo aggiunto al carrello')
  navigate('/carrello')
}

  return (
    isLoading ? (
      <LoadingBox />)
      : 
      error ? (
        <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox>
      )
      : !veicolo ? (
        <MessageBox variant='danger'>Veicolo non trovato.</MessageBox>
      )
      :
    (<div>
      <Row>
        <Col md={6}>
          <img className="large" src={veicolo.immagine} alt={veicolo.marca && veicolo.modello}/>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{veicolo.marca} {veicolo.modello}</title>
              </Helmet>
              <h1>{veicolo.marca} {veicolo.modello}</h1>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Prezzo:</Col>
                    <Col>{veicolo.prezzo}€</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Condizioni: </Col>
                      <Col>
                        <Badge>{veicolo.condizioni}</Badge>
                      </Col>
                      <Col>Disponibilità: </Col>
                      <Col>
                        {veicolo.disponibilita > 0 ? (
                          <Badge bg="success">Disponibile</Badge>
                        ) : (
                          <Badge bg="danger">Esaurito</Badge>
                        )}
                      </Col>
                  </Row>
                </ListGroup.Item>
                {veicolo.disponibilita > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">Aggiungi al carrello</Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card>
            <ListGroup>
              <ListGroup.Item>
              Descrizione:
              <p>{veicolo.descrizione}</p>
            </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>)
  )
}
