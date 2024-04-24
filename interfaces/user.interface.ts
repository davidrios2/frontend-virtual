export interface UserInterface {
  name: string
  lastName: string
  identificationType: string
  identificationNumber: string
  email: string
  password: string
  telephonePrefix: string
  telephoneNumber: string
  termsAndConditions: boolean
  privacyPolicy: boolean
}

export const identificationTypes = [
  { value: "CC", label: "CC" },
  { value: "PA", label: "PA" },
  { value: "CE", label: "CE" },
  { value: "RC", label: "RC" },
]
