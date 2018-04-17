import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { BasicForm } from '../../../components';
import { Row, Col, Card, Input, Form, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message, Badge, Divider } from 'antd';
const FormItem = Form.Item;

@connect(({ loading, station }) => ({
  station,
  submitting: loading.effects['station/create'] || loading.effects['station/update'],
}))
@Form.create()
export default class StationForm extends PureComponent {
  static defaultProps = {
    initialValue: {
      location: '',
      stationCode: '',
      name: '',
    },
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting } = this.props;

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
          label="充电站编码"
        >
          {getFieldDecorator('stationCode', {
            rules: [{
              required: true, message: '充电站编码必填',
            }],
          })(
            <Input placeholder="请输入16位充电站编码" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="充电站名称"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '充电站名称必填',
            }],
          })(
            <Input placeholder="充电站名称" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="充电站地址"
        >
          {getFieldDecorator('location')(
            <Input placeholder="充电站详细地址" />
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
