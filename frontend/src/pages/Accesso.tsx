import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Store } from "../Store";
import { useSigninMutation } from "../hooks/userHooks";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { toast } from 'react-toastify'
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import LoadingBox from "../component/LoadingBox";

export default function Accesso() {
    const navigate = useNavigate()
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { state, dispatch } = useContext(Store)
    const { userInfo } = state

    const { mutateAsync: accesso, isLoading } = useSigninMutation()

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const data = await accesso({
                email,
                password,
            })
            dispatch({type: 'USER_SIGNIN', payload: data})
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect || '/')
        } catch (error) {
            toast.error(getError(error as ApiError))
            
        }
    }

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    return (
        <Container className="small-container">
            <Helmet>
                <title>Accesso</title>
            </Helmet>
            <h1 className="my-3">Accesso</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group> 

                <div className="mb-3">
                    <Button disabled={isLoading} type="submit">
                        Accedi
                    </Button>
                    {isLoading &&<LoadingBox />}
                </div>

                <div className="mb-3">
                    Nuovo utente? {' '}
                    <Link to={`/registrazione?redirect=${redirect}`}>Crea adesso il tuo account</Link>
                </div>
            </Form>
        </Container>
    )
}