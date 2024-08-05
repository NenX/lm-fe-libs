

export type PartialAll<T> = {
    [P in keyof T]?: T[P] extends Array<any>
    ? Partial<T[P][number]>[]
    : Partial<T[P]>
};

export type PartialSome<T, K extends keyof T> = {
    [P in K]?: T[P]

} & Pick<T, Exclude<keyof T, K>>

// interface IA {
//     a: number
//     b: number
//     c: { d: number }
//     d?: string
//     e: string
// }

// type dd = PartialSome<IA, 'a' | 'b'>

// const d: dd = { c: {d:2} }