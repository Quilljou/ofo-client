import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
} from 'antd';

@Form.create()
export default class BasicForm extends Component {
  static propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    initialValue: {},
  }
  componentWillReceiveProps(nextProps) {
    const { initialValue } = this.props;
    const { setFieldsValue } = this.props.form;
    if (nextProps.initialValue !== initialValue) {
      setFieldsValue(nextProps.initialValue);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }

  render() {
    const { children } = this.props;
    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        {children}
      </Form>
    );
  }
}
