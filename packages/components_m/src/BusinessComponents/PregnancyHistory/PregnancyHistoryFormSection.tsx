import React from 'react';
import { Input, InputNumber, Radio, Row, Col } from 'antd';
import { map, get, isNil, indexOf, isUndefined, isEmpty } from 'lodash';
import RadioWithInput from '../../selects/RadioWithInput';
import SelectWithOptions from '../../selects/SelectWithOptions';
import CheckboxWithInput from '../../ConfigComponents/CheckboxWithInput';
import FilterDateInput from '../../MyForm/components/business/FilterDateInput';

// 逻辑影响因子，1为true，2为false
export const effects = {
  // 是否怀孕
  hasPregnancyEffets: {
    yes: ['hospital', 'gestationalWeek', 'fetalcount', 'deliverWay', 'puerperalFever', 'hemorrhage'],
    no: ['abortionWay', 'badPregnancy'],
  },
};
export const skipItems = [
  'childLiving',
  'childDeathTime',
  'childDeathNote',
  'childGender',
  'sequelaNote',
  'childDeformity',
  'neonateWeight',
  'neonateHeight',
];
interface IProps {
  renderEditItem: (key: any, reactNode: any, options?: any) => any;
  formDescriptions: {};
  id?: Number | String;
  data?: any;
}
export class FormSection extends React.Component<IProps> {
  renderRowAndCol = (formDescriptionArr = []) => {
    return (
      <Row>
        {map(formDescriptionArr, (formDescription, index) => {
          return (
            <Col key={index} span={get(formDescription, 'span')} offset={get(formDescription, 'offset')}>
              {this.renderItem(formDescription)}
            </Col>
          );
        })}
      </Row>
    );
  };

  renderItem = (formDescription: any) => {
    const { renderEditItem, data, events } = this.props;
    const formDescriptionKey = get(formDescription, 'key');
    switch (get(formDescription, 'inputType')) {
      case 'input':
        return renderEditItem(formDescriptionKey, <Input {...get(formDescription, 'inputProps')} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'select_with_options':
        return renderEditItem(formDescriptionKey, <SelectWithOptions config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'single_date_picker':
        return renderEditItem(formDescriptionKey, <FilterDateInput {...get(formDescription, 'inputProps')} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'pregnant_radio':
        return renderEditItem(
          formDescriptionKey,
          <Radio.Group {...get(formDescription, 'inputProps')}>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>,
          { customFormItemLayout: get(formDescription, 'formItemLayout') || {} },
        );
      case 'has_pregnancy':
        return renderEditItem(
          formDescriptionKey,
          <Radio.Group onChange={get(events, 'setFormData')}>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>,
          { customFormItemLayout: get(formDescription, 'formItemLayout') || {} },
        );
      case 'radio_with_input':
        return renderEditItem(formDescriptionKey, <RadioWithInput config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'input_number':
        return renderEditItem(
          formDescriptionKey,
          <InputNumber
            min={0}
            {...get(formDescription, 'inputProps')}
            // onChange={get(events, 'handleFetalcountChange')}
          />,
          { customFormItemLayout: get(formDescription, 'formItemLayout') || {} },
        );
      case 'fetal_count':
        return renderEditItem(
          formDescriptionKey,
          <InputNumber min={0} {...get(formDescription, 'inputProps')} onChange={get(events, 'setFormData')} />,
          { customFormItemLayout: get(formDescription, 'formItemLayout') || {} },
        );
      case 'checkbox_with_input':
        return renderEditItem(formDescriptionKey, <CheckboxWithInput config={formDescription} />, {
          customFormItemLayout: get(formDescription, 'formItemLayout') || {},
        });
      case 'view_only':
        return renderEditItem(formDescriptionKey, <span>{get(data, get(formDescription, 'path'))}</span>);
      default:
        return renderEditItem(formDescriptionKey, <Input {...get(formDescription, 'inputProps')} />);
    }
  };

  renderContent = () => {
    const { formDescriptions = [], formData, tabIndex } = this.props;
    let tempArr = [];
    let tempSpan = 0;
    let formArray = [];

    map(formDescriptions, (formDescription, index) => {
      const hasPregnancy = get(formData, `hasPregnancy_${tabIndex}`);
      const formDescriptionKey = get(formDescription, 'native_key');
      if (indexOf(skipItems, formDescriptionKey) > -1) {
        return;
      }

      if (
        isUndefined(hasPregnancy) &&
        indexOf([...effects.hasPregnancyEffets.no, ...effects.hasPregnancyEffets.yes], formDescriptionKey) > -1
      ) {
        return;
      }

      if (hasPregnancy === false && indexOf(effects.hasPregnancyEffets.yes, formDescriptionKey) > -1) {
        return;
      }

      if (hasPregnancy === true && indexOf(effects.hasPregnancyEffets.no, formDescriptionKey) > -1) {
        return;
      }

      if (!isNil(get(formDescription, 'span')) && !isNil(get(formDescription, 'offset'))) {
        if (get(formDescription, 'isNewRow')) {
          const renderArr = tempArr;
          tempSpan = 0;
          tempArr = [];
          formArray.push(this.renderRowAndCol(renderArr));
        }
        if (tempSpan < 25 && tempSpan + get(formDescription, 'span') + get(formDescription, 'offset') < 25) {
          tempSpan = tempSpan + get(formDescription, 'span') + get(formDescription, 'offset');
          tempArr.push(formDescription);
          if (Number(index) === formDescriptions.length - 1) {
            formArray.push(this.renderRowAndCol(tempArr));
            tempArr = [];
          }
        } else {
          const renderArr = tempArr;
          tempArr = [];
          formArray.push(this.renderRowAndCol(renderArr));
          tempSpan = get(formDescription, 'span') + get(formDescription, 'offset');
          tempArr.push(formDescription);
        }
      } else {
        formArray.push(this.renderItem(formDescription));
      }
    });
    if (!isEmpty(tempArr)) {
      formArray.push(this.renderRowAndCol(tempArr));
    }
    return formArray;
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}
export default FormSection
