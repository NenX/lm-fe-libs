import React, { useEffect, useState } from 'react';
import { AutoComplete, Row, Col, AutoCompleteProps } from 'antd';
import { get, map } from 'lodash';
import { request } from '@lm_fe/utils';
import { mchcEvent } from '@lm_fe/env';
import { getInputStyle } from 'src/utils';
interface IProps extends AutoCompleteProps {
  name?: string,
  urlPath?: string,
  filterKey?: string
  width: any
}
export default function PatientAutoComplete(props: IProps) {
  const { onChange, name = 'unKnown', width, value, urlPath = '/api/pregnancies', filterKey = 'outpatientNO', style, ...inputProps } = props;

  const _style = getInputStyle(props)

  const [options, setOptions] = useState<any[]>([]);
  const [scrollPage, setScrollPage] = useState(0);
  const [data, setData] = useState<string>();

  useEffect(() => {
    setData(value);
    handleSearch(value);
  }, []);

  const handleSearch = async (value?: string) => {
    const result = await request.get(`${urlPath}`, {
      params: {
        size: 10,
        page: 0,
        [`${filterKey}.contains`]: value,
      },
    });
    const res: any[] = result.data ?? []
    setOptions(res);
    return res
  };

  const scrollSearch = async (value?: string, page: number = 0) => {
    const result = await request.get(`${urlPath}`, {
      params: {
        [`${filterKey}.contains`]: value,
        size: 10,
        page,
      },
    });
    setOptions([...options, ...result.data]);
  };
  console.log('PatientAutoComplete value', value)

  const handleChange = async (v: any) => {
    const arr = await handleSearch(v)
    console.log('PatientAutoComplete ???', v)

    if (v) {
      const item = arr.find(_ => _[filterKey] === v)
      mchcEvent.emit('my_form', {
        name,
        type: 'onSearch',
        value: { text: v, data: item }
      })
    }

    setData(v);
    onChange?.(v);
  };

  const handlePopupScroll = (e: any) => {
    e.persist();
    const target = e.target;
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      const nextScrollPage = scrollPage + 1;
      setScrollPage(nextScrollPage);
      scrollSearch(data, nextScrollPage);
    }
  };

  return (
    <AutoComplete
      // bordered={false}
      allowClear
      style={_style}
      {...inputProps}
      value={value}
      dropdownMatchSelectWidth={get(inputProps, 'dropdownMatchSelectWidth') || 350}
      onChange={handleChange}
      // onSearch={handleSearch}
      onPopupScroll={handlePopupScroll}
    >
      {options.length > 0 &&
        map(options, (option) => {
          return (
            <AutoComplete.Option key={`${option.id}`} value={option[filterKey]}>
              <Row>
                <Col span={6}>{option.name}</Col>
                <Col span={9} offset={1}>
                  {option.outpatientNO}
                </Col>
                <Col span={7} offset={1}>
                  {option.telephone}
                </Col>
              </Row>
            </AutoComplete.Option>
          );
        })}
    </AutoComplete>
  );
}
export function usePatientAutoComplete<T>(name: string) {
  const [data, setData] = useState<T>()
  useEffect(() => {
    return mchcEvent.on_rm('my_form', e => {
      if (e.type !== 'onSearch' || e.name !== name || !e.value.data) return
      setData(e.value.data)
    })
  }, [])
  return [data]
}