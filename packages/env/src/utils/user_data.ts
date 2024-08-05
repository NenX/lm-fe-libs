import { mchcStore } from "src/state"


interface IMchc_User {
  activated: true
  authorities: null
  config: null
  createdBy: string
  createdDate: string
  email: string
  firstName: string
  groups: any[]
  id: number
  imageUrl: null
  langKey: string
  lastModifiedBy: string
  lastModifiedDate: string
  lastName: null
  login: string
  overdueDate: string
  password: null
  userType: null
  wards: null
}
export function getUserData() {
  const store = mchcStore.state
  return store?.user?.userData as IMchc_User | undefined
};
