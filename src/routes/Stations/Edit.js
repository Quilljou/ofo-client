import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StationForm from './components/StationForm';

@connect(({ loading, station }) => ({
  station,
  loading: loading.effects['station/createStation'],
}))
export default class Edit extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'station/getStationById',
      payload: { id: this.Id },
    });
  }

  get Id() {
    return this.props.match.params.id;
  }

  handleUpdateSubmit = (values) => {
    this.props.dispatch({
      type: 'station/update',
      payload: { id: this.Id, body: values },
    })
      .then(this.gotoStations, e => e);
  }

  gotoStations = () => {
    this.props.dispatch(routerRedux.push('/stations/list'));
  }
  render() {
    const { station: { station } } = this.props;
    console.log(station);
    return (
      <PageHeaderLayout
        title="充电站编辑"
        breadcrumbNameMap={{
          '/stations': { name: '充电站管理' },
          '/stations/:id/edit': { name: '充电站编辑' },
        }}
      >
        <Card bordered={false}>
          <StationForm
            onSubmit={this.handleUpdateSubmit}
            initialValue={station}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
