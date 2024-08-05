import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { get, map, cloneDeep, set } from 'lodash';
import BaseFormComponent from '../../BaseFormComponent';
import deletionsOptions, { getNewDatasource } from './constant';
import styles from './index.less';
const cols = [
  {
    dataIndex: 'gender',
    title: '',
    align: 'center',
    editable: false,
    width: 80,
  },
  {
    dataIndex: 'hB',
    title: 'Hb(g/L)',
    align: 'center',
    editable: true,
    width: 80,
  },
  {
    dataIndex: 'mCV',
    title: 'MCV(fl)',
    align: 'center',
    editable: true,
    width: 80,
  },
  {
    dataIndex: 'mCH',
    title: 'MCH(pg)',
    align: 'center',
    editable: true,
    width: 80,
  },
  {
    dataIndex: 'hbA2',
    title: 'HbA2(%)',
    editable: true,
    align: 'center',
    width: 80,
  },
  {
    dataIndex: 'bg',
    title: 'ABO血型',
    align: 'center',
    inputType: 'normal_select',
    inputProps: {
      type: 'aboMapping',
    },
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'rh',
    title: 'RH血型',
    align: 'center',
    inputType: 'normal_select',
    inputProps: {
      type: 'rhMapping',
    },
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'deletions',
    title: '地贫基因型',
    align: 'center',
    editable: true,
    inputType: 'select_tag_with_options',
    inputProps: {
      options: deletionsOptions,
      mode: 'multiple',
    },
    width: 500,
  },
  {
    dataIndex: 'otherNote',
    title: '其它异常',
    align: 'center',
    editable: true,
    width: 300,
  },
];
const pdBloodGroups = ['bg', 'rh'];
const pdThalassemiaExams = ['hB', 'mCV', 'mCH', 'hbA2', 'deletions', 'otherNote'];
export default (props: any) => {
  const { onChange } = props;
  const [columns, setColumns] = useState(cols);
  const [editingRow, setEditingRow] = useState();
  const [editingValue, setEditingValue] = useState();
  const [editingCol, setEditingCol] = useState();
  const [datasource, setDatasource] = useState([]);

  useEffect(() => {
    const newDatasource = getNewDatasource(props?.value);
    setDatasource(newDatasource);
    setColumns(updateColumns());
  }, [props.value, editingRow, editingCol, editingValue]);

  const updateColumns = () => {
    return map(columns, (column, index) => {
      const { editable, inputType, dataIndex, inputProps } = column;
      if (!editable) {
        return column;
      }
      return {
        ...column,
        render: (value, rowData, rowIndex) => {
          if (['normal_select', 'select_tag_with_options'].indexOf(inputType) > -1) {
            return (
              <BaseFormComponent
                {...inputProps}
                key={rowIndex}
                size="small"
                value={value}
                inputType={inputType}
                autoFocus={editingCol === dataIndex}
                // onBlur={handleBlur}
                onChange={handleChange({ dataIndex, inputType, rowIndex })}
              />
            );
          }
          return editingCol === dataIndex && editingRow === rowIndex && editable ? (
            <BaseFormComponent
              {...inputProps}
              key={rowIndex}
              size="small"
              defaultValue={value}
              inputType={inputType}
              autoFocus={editingCol === dataIndex}
              onBlur={handleBlur}
              onChange={handleChange({ dataIndex, inputType, rowIndex })}
            />
          ) : (
            <span
              className={styles["custom-table-cell"]}
              onClick={() => {
                setEditingRow(rowIndex);
                setEditingCol(dataIndex);
                setEditingValue(value);
              }}
            >
              {value}
            </span>
          );
        },
      };
    });
  };

  const handleBlur = () => {
    const outData = cloneDeep(props.value);
    if (pdThalassemiaExams.indexOf(editingCol) > -1) {
      set(outData, `pdThalassemiaExams.${editingRow}.${editingCol}`, editingValue);
    } else if (pdBloodGroups.indexOf(editingCol) > -1) {
      set(outData, `pdBloodGroups.${editingRow}.${editingCol}`, editingValue);
    }
    onChange && onChange(outData);
    setEditingRow(undefined);
    setEditingCol(undefined);
  };

  const handleChange = ({ dataIndex, inputType, rowIndex }) => (event) => {
    let value = get(event, 'target.value');
    switch (inputType) {
      case 'select_tag_with_options':
      case 'normal_select':
      case 'input_number':
        value = event;
        break;
      default:
        break;
    }
    setEditingRow(rowIndex);
    setEditingCol(dataIndex);
    setEditingValue(value);
    if (['normal_select', 'select_tag_with_options'].indexOf(inputType) > -1) {
      const outData = cloneDeep(props.value);
      if (pdThalassemiaExams.indexOf(dataIndex) > -1) {
        set(outData, `pdThalassemiaExams.${rowIndex}.${dataIndex}`, value);
      } else if (pdBloodGroups.indexOf(dataIndex) > -1) {
        set(outData, `pdBloodGroups.${rowIndex}.${dataIndex}`, value);
      }
      onChange && onChange(outData);
    }
  };

  return (
    <Table
      size="small"
      className={styles["blood-and-thalassemia"]}
      bordered
      columns={columns}
      dataSource={datasource}
      pagination={false}
    />
  );
};
