import { Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import LoadingBox from '../component/LoadingBox'
import MessageBox from '../component/MessageBox'
import { useGetOrderHistoryQuery } from '../hooks/ordiniHooks'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import { Store } from "./Store";
import { useContext, useEffect } from 'react'
import apiClient from '../apiClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function OrderHistoryPage() {
  const navigate = useNavigate()
  const { data: order, isLoading, error } = useGetOrderHistoryQuery()

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (
      !userInfoString ||
      !JSON.parse(userInfoString).isAdmin
    ) {
      window.location.href = "/accesso";
    }
  }, []);

  const deleteOrder = (id: string) => async () => {
    if (window.confirm('Sei sicuro di voler eliminare questo ordine?')) {
      await apiClient.delete(`/ordini/` + id)
      window.location.reload()
    }
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard - Cronologia acquisti</title>
      </Helmet>

      <h1>Cronologia acquisti</h1>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATA</th>
              <th>TOTALE</th>
              <th>PAGATO</th>
              <th>SPEDITO</th>
              <th>AZIONI</th>
            </tr>
          </thead>
          <tbody>
            {order!.map((order) => (
              <tr key={order._id}>
                <td>#{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.prezzoTotale.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/ordini/${order._id}`)
                    }}
                  >
                    Dettagli
                  </Button>

                  <Button className="ms-2"
                    type="button"
                    variant="light"
                    onClick={deleteOrder(order._id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}