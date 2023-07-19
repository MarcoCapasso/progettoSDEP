import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { CartItem, indirizzoConsegnaConcessionaria } from '../types/carrello'
import { Order } from '../types/ordini'

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['ordini', id],
    queryFn: async () => (await apiClient.post<Order>(`/ordini/${id}`)).data,
  })


export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      /*prodotti: CartItem[]
      indirizzoConsegna: indirizzoConsegnaConcessionaria
      metodoPagamento: string
      user: string
      prezzoProdotto: number
      prezzoTasse: number
      prezzoTasse: number
      prezzoTotale: number*/      
      prodotti: CartItem[],
      indirizzoConsegna: indirizzoConsegnaConcessionaria,
      user: string | undefined,
      metodoPagamento: string
      prezzoTotale: number
      prezzoTasse: number,
      prezzoProdotto: number
      prezzoSpedizione: number
    }) =>
      (await apiClient.post<{ message: string; order: Order }>(`/ordini`, order)).data,
  })


export const useGetOrderHistoryQuery = () =>
useQuery({
  queryKey: ['order-history'],
  queryFn: async () =>
    (await apiClient.get<Order[]>(`/ordini/listaordini`)).data,
})