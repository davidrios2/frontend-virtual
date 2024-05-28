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

export const getAllUser = async (token: string): Promise<GetUserReponse[]> => {
  const { data } = await authApi.get('/users/listUsers', {
    headers:{
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

export const updatePassword = async (
  userId: string,
  token: string,
  currentPassword: string,
  newPassword: string
): Promise<any> => {
  const { data } = await authApi.put(
    `/users/updatePassword`,
    {
      userId,
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return data
}

export const updateRole = async (
  token: string,
  userId: string,
  userRole: number
): Promise<any> => {
  const { data } = await authApi.put(
    `/users/updateUserRole`,
    {
      userId,
      userRole
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return data
}
