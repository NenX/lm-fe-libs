

import { address_options } from '@lm_fe/env'

const MAINLAND = address_options.MAINLAND
const HKMOTW = address_options.HKMOTW
const OVERSEA = address_options.OVERSEA
const STREETS = address_options.STREETS

const _mainland = Object.keys(MAINLAND).map((provinceName) => {
  const provinceItem =  MAINLAND[provinceName]
  return {
    label: provinceName,
    value: provinceName,
    children: Object.keys(provinceItem).map((cityName) => {
      const cityItem = provinceItem[cityName]
      return {
        label: cityName,
        value: cityName,
        children: cityItem.map((area) => {
          const areaItem = STREETS[provinceName] && STREETS[provinceName][cityName] && STREETS[provinceName][cityName][area]
          return {
            label: area,
            value: area,
            children: areaItem && Object.keys(areaItem).map((streetName) => {
              const streetItem = areaItem[streetName]
              return {
                label: streetName,
                value: streetName,
                children: streetItem.map(village => {
                  return {
                    label: village,
                    value: village
                  }
                }),
              }
            })
          }
        }),
      }
    }),
  }
})

const _hkmotw = Object.keys(HKMOTW).map((provinceName) => {
  const provinceItem = HKMOTW[provinceName]
  return {
    label: provinceName,
    value: provinceName,
    children: Object.keys(provinceItem).map((cityName) => {
      const cityItem = provinceItem[cityName]
      return {
        label: cityName,
        value: cityName,
        children: cityItem.map(area => {
          return {
            label: area,
            value: area
          }
        }),
      }
    }),
  }
})

const _oversea = Object.keys(OVERSEA).map((provinceName) => {
  const provinceItem = OVERSEA[provinceName]
  return {
    label: provinceName,
    value: provinceName,
    children: Object.keys(provinceItem).map((cityName) => {
      const cityItem = provinceItem[cityName]
      return {
        label: cityItem,
        value: cityItem
      }
    }),
  }
})

// 获取街道
export const getStreets = (p, c, a) => {
  // if (a.match(RegExp(/香港|澳门|台湾|海外/))) {
  //   return []
  // }
  const street = STREETS[p] && STREETS[p][c] && STREETS[p][c][a]
  if (!street) {
    return []
  }
  return Object.keys(street).map((streetName) => {
    const streetItem = street[streetName]
    return {
      label: streetName,
      value: streetName,
      children: streetItem.map((village) => {
        return {
          label: village,
          value: village
        }
      }),
    }
  })
}

let options = (function() {
  const result = [].concat(_mainland, _hkmotw, _oversea)
  return result
})()

export default options
