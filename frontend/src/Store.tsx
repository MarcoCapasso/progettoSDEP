import React from 'react'
import { Carrello, CartItem, indirizzoConsegnaConcessionaria } from './types/carrello'
import { UserInfo } from './types/UserInfo'


type AppState = {
    mode: string
    carrello: Carrello
    userInfo?: UserInfo
}

const initialState: AppState = {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,

    mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
    carrello:{
        prodottiCarrello: localStorage.getItem('cartItems')
            ?JSON.parse(localStorage.getItem('cartItems')!)
            : [],
        indirizzoConsegna: localStorage.getItem('indirizzoConsegna')
            ?JSON.parse(localStorage.getItem('indirizzoConsegna')!)
            : {},
        metodoPagamento: localStorage.getItem('metodoPagamento')
            ?localStorage.getItem('metodoPagamento')!
            : 'Finanziamento',
        prezzoProdotto: 0,
        prezzoSpedizione: 0,
        prezzoTasse: 0,
        prezzoTotale: 0,
    },
}

type Action = 
    | {type: 'SWITCH_MODE' }   
    | {type: 'CART_ADD_ITEM'; payload: CartItem} 
    | {type: 'CART_REMOVE_ITEM'; payload: CartItem } 
    | {type: 'USER_SIGNIN'; payload: UserInfo}
    | {type: 'USER_SIGNOUT'}
    | {type: 'SAVE_SHIPPING_ADDRESS'; payload: indirizzoConsegnaConcessionaria}
    | { type: 'SAVE_PAYMENT_METHOD'; payload: string }
    | { type: 'CART_CLEAR' }

function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SWITCH_MODE':
            //se lo sfondo è scuro, impostalo chiaro, altrimenti scuro.
            localStorage.setItem('mode', state.mode === 'dark' ? 'light' : 'dark')
            return {...state, mode: state.mode === 'dark' ? 'light' : 'dark' }

        case 'CART_ADD_ITEM':
            const newItem = action.payload
            const existItem = state.carrello.prodottiCarrello.find(
                (item: CartItem) => item._id === newItem._id
            )
            const cartItems = existItem
                ? state.carrello.prodottiCarrello.map((item: CartItem) =>
                    item._id === existItem._id ? newItem : item
                )
                : [...state.carrello.prodottiCarrello, newItem]
        
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            return { ...state, carrello: { ...state.carrello, prodottiCarrello: cartItems } }

        case 'CART_REMOVE_ITEM': {
            const cartItems = state.carrello.prodottiCarrello.filter(
                (item: CartItem) => item._id !== action.payload._id
            )
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
                return {...state, carrello: {...state.carrello, prodottiCarrello: cartItems}}
              }
        
        case 'CART_CLEAR':
            return { ...state, carrello: { ...state.carrello, prodottiCarrello: [] } }
          

        case 'USER_SIGNIN': {
            return {...state, userInfo: action.payload }
        }

        case 'USER_SIGNOUT': 
            return{
                mode:
                    window.matchMedia &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light',
                carrello: {
                    prodottiCarrello: [],
                    metodoPagamento: 'Finanziamento',
                    indirizzoConsegna: {
                        citta: '',
                        codicePostale: '',
                        nome: '',
                        indirizzo: '',
                    },
                    prezzoProdotto: 0,
                    prezzoSpedizione: 0,
                    prezzoTasse: 0,
                    prezzoTotale: 0,
                },
            }

            case 'SAVE_SHIPPING_ADDRESS':
                return {
                  ...state,
                  carrello: {
                    ...state.carrello,
                    indirizzoConsegna: action.payload,
                  },
                }

            case 'SAVE_PAYMENT_METHOD':
                return {
                  ...state,
                  carrello: { ...state.carrello, metodoPagamento: action.payload },
                }

        default:
            return state
    }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
    state: initialState,
    dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren<{}>){
    const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
        reducer,
        initialState
    )

    return <Store.Provider value={{state, dispatch}} {...props} />
}

export { Store, StoreProvider}
