import { Row, Col } from 'react-bootstrap'
import LoadingBox from '../component/LoadingBox'
import MessageBox from '../component/MessageBox'
import { Helmet } from 'react-helmet-async'
import { useGetProductsQuery } from '../hooks/veicoloHooks'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'
import ProductItem from '../component/ProductItem'


export default function HomePage() {
  const {data: veicolo, isLoading, error } = useGetProductsQuery()
  return isLoading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
    ) : (
      <Row>
       <Helmet>
        <title>AutoSkaut12</title>
       </Helmet>
        {veicolo!.map(veicolo => (
          <Col key={veicolo.slug} sm={6} md={4} lg={3}>
            <ProductItem  veicolo={veicolo}/>
          </Col>
        ))}
      </Row>
    )
}
