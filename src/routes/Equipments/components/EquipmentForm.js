import React, { PureComponent } from 'react';
import { Input, Form, Button } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { BasicForm } from '../../../components';

const FormItem = Form.Item;
const InputGroup = Input.Group;

@connect(({ loading, equipment, station }) => ({
  equipment,
  station,
  submitting: loading.effects['equipment/create'] || loading.effects['equipment/update'],
}))
@Form.create()
class EquipmentForm extends PureComponent {
  static defaultProps = {
    initialValue: {
      location: '',
      equipmentCode: '',
      name: '',
    },
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'station/getStationById',
      payload: { id: this.props.stationId },
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting, station: { station } } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <BasicForm
        {...this.props}
      >
        <FormItem
          {...formItemLayout}
          label="充电桩编码"
        >
          <InputGroup compact>
            <Input style={{ width: '50%' }} value={station.stationCode} disabled />
            {getFieldDecorator('equipmentCode', {
              rules: [{
                required: true, message: '充电桩编码必填',
              }],
            })(
              <Input style={{ width: '50%' }} placeholder="请输入16位充电桩编码" />
            )}
          </InputGroup>

        </FormItem>
        <FormItem
          {...formItemLayout}
          label="充电桩名称"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '充电桩名称必填',
            }],
          })(
            <Input placeholder="充电桩名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="充电桩模块数"
        >
          {getFieldDecorator('moduleCount', {
            rules: [{
              required: true, message: '充电桩模块个数必填',
            }],
          })(
            <Input placeholder="充电桩模块个数" />
          )}
        </FormItem>

        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            提交
          </Button>
        </FormItem>
      </BasicForm>
    );
  }
}

export default withRouter(EquipmentForm);
