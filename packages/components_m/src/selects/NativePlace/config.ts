import { address_options } from '@lm_fe/env'

const mainlandData = address_options.MAINLAND


interface IData {
  label: string;
  value: string;
  children: IData[];
}
let provinceCityOptions: IData[] = [];


Object.keys(mainlandData).forEach(provinceKey => {
  const cityItem = mainlandData[provinceKey]
  const cityKeys = cityItem.市辖区 ? cityItem.市辖区 : Object.keys(cityItem)
  const option = {
    label: provinceKey,
    value: provinceKey,
    children: cityKeys.map(_ => ({ label: _, value: _, children: [] })),
  };
  provinceCityOptions.push(option);

})


export default provinceCityOptions;
