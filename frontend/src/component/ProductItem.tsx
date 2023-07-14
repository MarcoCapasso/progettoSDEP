import { Button, Card } from "react-bootstrap"
import { Veicolo } from "../types/Veicolo";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { CartItem } from "../types/carrello";
import { toast } from 'react-toastify'
import { useContext } from "react";
import { convertVeicoloToCartItem } from "../utils";

function ProductItem({ veicolo }: { veicolo: Veicolo }) {
    const { state, dispatch } = useContext(Store)
    const {
        carrello: { prodottiCarrello },
    } = state

     const addToCartHandler = (item: CartItem) => {
        const existItem = prodottiCarrello.find((x) => x._id === veicolo._id)
        const quantità = existItem ? existItem.quantità + 1 : 1
        if (veicolo.disponibilita < quantità) {
            alert('Non puoi aggiungere più di un veicolo per modello.')
            return
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {...item, quantità}
        })
        toast.success('Veicolo aggiunto al carrello.')
    }
    return (    
    <Card>
        <Link to={`/veicolo/${veicolo.slug}`}>
            <img src={veicolo.immagine} className="card-img-top" alt={veicolo.modello} />
        </Link>
        <Card.Body>
            <Link to={`/veicolo/${veicolo.slug}`}>
                <Card.Title>{veicolo.marca} {veicolo.modello}</Card.Title>
            </Link>
            <Card.Text>{veicolo.prezzo}€</Card.Text>
            {veicolo.disponibilita === 0 ? (
                <Button variant="light" disabled>
                    Esaurito
                </Button>
            ) : (
                <Button onClick={() => addToCartHandler(convertVeicoloToCartItem(veicolo))}>Aggiungi al carrello</Button>
            )}
        </Card.Body>
    </Card>
    )
}

export default ProductItem