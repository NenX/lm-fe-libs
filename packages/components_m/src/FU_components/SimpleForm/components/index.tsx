import { Checkbox, DatePicker, Divider, Input, InputNumber, Radio, Rate, Row, Select, Slider, Switch, TimePicker, Tree } from "antd";
import SimpleSelect from './extra/SimpleSelect'
// import HospitalTreeSelect from '@/demain-components/HospitalTreeSelect';
import Custom from './extra/Custom'
import CusDatePicker from "src/GeneralComponents/DatePicker";

// import TabForm from './TabForm'
export const ComponentMapping = {
    Input,
    Select,
    Radio,
    TextArea: Input.TextArea,
    InputNumber,
    Checkbox,
    TimePicker,
    DatePicker,
    MyDatePicker: CusDatePicker,
    Switch,
    Rate,
    Slider,
    Color: Input,
    CheckboxGroup: Checkbox.Group,
    Text,
    Divider,
    Grid: Row,
    // HospitalTreeSelect,
    SwitchSelect: Select,
    SimpleSelect,
    Custom,
    TabForm: (p: any) => { return null; }

}




