// import { GetProps } from "react-redux";

type omg = ((...args: any) => any) | (abstract new (...args: any) => any)
export type GetProps<T extends omg> = T extends (abstract new (...args: any) => any) ? ConstructorParameters<T> : (T extends ((...args: any) => any) ? Parameters<T> : any)

