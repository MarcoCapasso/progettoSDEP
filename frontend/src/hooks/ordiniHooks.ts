import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { CartItem, indirizzoConsegnaConcessionaria } from '../types/carrello'
import { Order } from '../types/ordini'

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['ordini', id],
    queryFn: async () => (await apiClient.get<Order>(`api/ordini/${id}`)).data,
  })


export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItem[]
      shippingAddress: indirizzoConsegnaConcessionaria []
      paymentMethod: string
      itemsPrice: number
      shippingPrice: number
      taxPrice: number
      totalPrice: number
    }) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/ordini`,
          order
        )
      ).data,
  })