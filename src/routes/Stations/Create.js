import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StationForm from './components/StationForm';

@connect(({ loading, station }) => ({
  station,
  loading: loading.effects['station/createStation'],
}))
export default class Create extends PureComponent {
  componentDidMount() {
  }

  handleCreateSubmit = (values) => {
    this.props.dispatch({
      type: 'station/create',
      payload: { ...values },
    })
      .then(this.gotoStations, console.log);
  }

  gotoStations = () => {
    this.props.dispatch(routerRedux.push('/stations/list'));
  }
  render() {
    return (
      <PageHeaderLayout
        title="充电站创建"
        breadcrumbNameMap={{
          '/stations': { name: '充电站管理' },
          '/stations/create': { name: '充电站创建' },
        }}
      >
        <Card bordered={false}>
          <StationForm
            onSubmit={this.handleCreateSubmit}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
