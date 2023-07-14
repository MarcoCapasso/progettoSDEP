import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UserInfo } from "../types/UserInfo";



export const useSigninMutation = () => useMutation({
    mutationFn: async ({
        //cosa si aspetta di ottenere
        email,
        password,

        //il tipo corretto di quello che deve ottenere
    } : {
        email: string
        password: string
    }) =>
        (
        //quello che ritorna è il risultato della funzione apiClient.post
            await apiClient.post<UserInfo>(`/user/accesso`, {
                email,
                password,
            })
        ).data,
    })

export const useSignupMutation = () => useMutation({
    mutationFn: async ({
      nome,
      cognome,
      email,
      password,
    }: {
      nome: string
      cognome: string
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`/user/registrazione`, {
          nome,
          cognome,
          email,
          password,
        })
      ).data,
  })