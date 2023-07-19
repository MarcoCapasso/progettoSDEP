import { useContext, useEffect } from "react";
import { Navbar, Container, Nav, Button, Badge, NavDropdown, DropdownButton } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Store } from "./Store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './index.css'

library.add(faSun, faMoon);


function App() {
  const {
    state: { mode, carrello, userInfo },
    dispatch,
  } = useContext(Store);

  //modifica il tema del body del documento html
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  }

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('indirizzoConsegna')
    localStorage.removeItem('metodoPagamento')
    window.location.href='/accesso'
  }

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>AutoSkaut12</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Button variant="dark" onClick={switchModeHandler}>
              <FontAwesomeIcon icon={mode === 'light' ? 'sun' : 'moon'} />
            </Button>
            <Link to="/carrello" className="nav-link d-flex align-items-center">
              Carrello
              {carrello.prodottiCarrello.length > 0 && (
                <Badge pill bg="danger">
                  {carrello.prodottiCarrello.reduce((a, c) => a + c.quantità, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.nome} id="dropdown-button-drop-start" align="end">
                {userInfo.isAdmin && (
                  <Link className="dropdown-item" to="/Dashboard">Registro Ordini</Link>
                )}
                <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>Esci</Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/accesso">Accedi</Link>
            )}
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">
          Realizzato da Capasso Marco e Monacelli Giacomo.
        </div>
      </footer>
    </div>
  );
}

export default App;
