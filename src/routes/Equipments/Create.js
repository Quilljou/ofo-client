import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EquipmentForm from './components/EquipmentForm';

@connect(({ loading, equipment }) => ({
  equipment,
  loading: loading.effects['equipment/createEquipment'],
}))
export default class Create extends PureComponent {
  componentDidMount() {
  }

  get stationId() {
    return this.props.match.params.id;
  }

  handleCreateSubmit = (values) => {
    this.props.dispatch({
      type: 'equipment/create',
      payload: { stationId: this.stationId, body: values },
    })
      .then(this.gotoEquipments, console.log);
  }

  gotoEquipments = () => {
    this.props.dispatch(routerRedux.push(`/stations/${this.stationId}/equipments/list`));
  }

  render() {
    return (
      <PageHeaderLayout
        title="充电桩创建"
        // breadcrumbNameMap={{
        //   '/equipments': { name: '充电桩管理' },
        //   '/equipments/create': { name: '充电桩创建' },
        // }}
      >
        <Card bordered={false}>
          <EquipmentForm
            onSubmit={this.handleCreateSubmit}
            stationId={this.stationId}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
