import { map, isArray, isPlainObject } from 'lodash'

import PCA_OPTIONS from './pca.json'

/**
 * string[] --> { value: string | number, label: string }[]
 */

function stringArray2ObjectArray(data: string[], hasLabel: boolean = false) {
    return map(data, (_) => ({ value: _, ...(hasLabel && { label: _ }) }))
}

export const MUNICIPALITIES = ['北京市', '天津市', '上海市', '重庆市', '海外']

const PROVINCES = stringArray2ObjectArray(Object.keys(PCA_OPTIONS), true)

const CITIES = (function () {
    const provinces = Object.keys(PCA_OPTIONS)
    let result = {}
    for (let i = 0; i < provinces.length; i++) {
        const element = provinces[i]
        const children = PCA_OPTIONS[element]
        let city: { value: string }[] = []
        if (isArray(children)) {
            city = stringArray2ObjectArray(children)
        }
        if (isPlainObject(children)) {
            city = stringArray2ObjectArray(Object.keys(children))
        }
        result[element] = city
    }
    return result
})()

const AREAS = (function () {
    const provinces = Object.keys(PCA_OPTIONS)
    let result = {}
    for (let i = 0; i < provinces.length; i++) {
        const element = provinces[i]
        const provinceChildren = PCA_OPTIONS[element]
        if (isPlainObject(provinceChildren)) {
            const city = Object.keys(provinceChildren)
            for (let j = 0; j < city.length; j++) {
                const cityChildren = provinceChildren[city[j]]
                result[city[j]] = stringArray2ObjectArray(cityChildren)
            }
        }
    }
    return result
})()

const OPTIONS = Object.entries(PCA_OPTIONS).map(([provinceName, provinceChildren]) => {
    return {
        value: provinceName,
        label: provinceName,
        children: (function () {
            if (isPlainObject(provinceChildren)) {
                return Object.entries(provinceChildren).map(([cityName, cityChildren]) => ({
                    value: cityName,
                    label: cityName,
                    children: stringArray2ObjectArray(cityChildren, true),
                }))
            }
            if (isArray(provinceChildren)) {
                return stringArray2ObjectArray(provinceChildren, true)
            }
            return undefined
        })(),
    }
})

const PC_OPTIONS = Object.entries(PCA_OPTIONS).map(([provinceName, provinceChildren]) => {
    return {
        value: provinceName,
        label: provinceName,
        children: (function () {
            if (isPlainObject(provinceChildren)) {
                return Object.entries(provinceChildren).map(([cityName, cityChildren]) => ({
                    value: cityName,
                    label: cityName,
                }))
            }
            if (isArray(provinceChildren)) {
                return stringArray2ObjectArray(provinceChildren, true)
            }
            return undefined
        })(),
    }
})

export { OPTIONS, PC_OPTIONS, PROVINCES, CITIES, AREAS }
