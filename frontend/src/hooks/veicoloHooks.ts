import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Veicolo } from "../types/Veicolo";
import { useEffect } from "react";
import axios from "axios";


//definisco un "Hook" e invio una richiesta ajax al backend all'indirizzo api/veicolo per ottenere una lista di tutti i prodotti
export const useGetProductsQuery = () =>
useQuery({
    queryKey: ['veicolo'],
    queryFn: async () => (await apiClient.get<Veicolo[]>('/veicolo')).data,
})

export const useGetProductDetailsBySlugQuery = (slug: string) =>
    useQuery({
        queryKey: ['veicolo', slug], 
        queryFn: async () =>
            (await apiClient.post<Veicolo>(`/veicolo/${ slug }`)).data,
    })

    // useEffect(( ) =>{
    //     async function fetchData() {
    //         try {
    //             const data = (await axios.post('/veicolo/slug', {slug})).data
    //             console.log(data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     fetchData()
    // }, [])


    