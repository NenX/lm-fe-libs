import { ICommonOption, getPresetOptions, getSameOptions } from '@lm_fe/env';
import { SLocal_State } from '@lm_fe/service';
import { getSearchParamsValue, request } from '@lm_fe/utils';
import React, { useEffect, useRef, useState } from 'react';
import { IMemoriseItem, MyAutoCompleteProps } from './types';


const defaultOptions: ICommonOption[] = []

export function useConfig_MyAutoComplete(props: MyAutoCompleteProps) {

    const {
        optionKey,
        options = defaultOptions,
        searchKey,
        value,
        memorable,
        memorieskey,
        memoriesname,
        formName,
        name,
        onChange,
        onBlur,
    } = props;

    const [__options, set__options] = useState<ICommonOption[]>([])


    const _memorieskey = memorieskey ?? `${formName}.${name}`
    const _memoriesname = memoriesname ?? SLocal_State.getUserData()?.login

    const _memorable = memorable || !!memorieskey

    useEffect(() => {
        init()

        return () => { }
    }, [])

    function safeOnChange(str?: string) {
        onChange?.(str)
    }

    function init() {
        const preOptions = optionKey ? getPresetOptions(optionKey as any) : null
        const searchValue = searchKey ? getSearchParamsValue(searchKey) : null

        const _options = preOptions ?? (typeof options === 'string' ? getSameOptions(options) : options.map(value => typeof value === 'string' ? { value, label: value } : value))

        if (searchValue) {
            _options.push({ value: searchValue, label: searchValue })
        }
        if (_memorable) {

            request.get<IMemoriseItem[]>(`/api/text-memories?key.equals=${_memorieskey}`)
                .then(r => {
                    const arr = r.data ?? [];
                    _options.push(...arr.map(_ => ({ label: _.value, value: _.value, id: _.id })))
                    set__options(_options)

                })
        } else {
            set__options(_options)
        }
    }


    function _OnBlur(e: React.FocusEvent<HTMLElement>) {
        onBlur?.(e)
        setTimeout(() => {
            const thisValue = value
            if (!_memorable || !thisValue || __options.some(_ => _.value === thisValue)) return

            request.post<IMemoriseItem>(`/api/text-memories`, { key: _memorieskey, name: _memoriesname, value: thisValue })
                .then(init)
        }, 10);
    };

    function remove(item: ICommonOption) {
        request.delete<IMemoriseItem>(`/api/text-memories/${item.id}`, { params: {} })
            .then(r => {
                init()
                if (value === item.label) {
                    safeOnChange('')
                }
            })
    }
    return (
        {
            safeOnChange,
            onBlur: _OnBlur,
            init,
            options: __options,
            remove
        }

    );
}
