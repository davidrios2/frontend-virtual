import authApi from "api/auth-api"
import { GetUserReponse } from "interfaces"

export const getUserById = async (userId: string, token: string): Promise<GetUserReponse> => {
  const { data } = await authApi.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export const updateUser = async (
  userId: string,
  token: string,
  updates: Partial<GetUserReponse>
): Promise<GetUserReponse> => {
  const { data } = await authApi.put(
    `/users/updateUser`,
    {
      userId,
      ...updates,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return data
}
