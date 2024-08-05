const BASE_NUMBERS = {
    住院: 2000,
    门诊: 3000,
}

export function calcNumber(k: keyof typeof BASE_NUMBERS, v: number) {
    const base = BASE_NUMBERS[k]
    return base + v
}