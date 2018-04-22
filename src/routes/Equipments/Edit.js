import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EquipmentForm from './components/EquipmentForm';

@connect(({ loading, equipment }) => ({
  equipment,
  loading: loading.effects['equipment/updateEquipment'],
}))

export default class Edit extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'equipment/getEquipmentById',
      payload: { equipmentId: this.equipmentId, stationId: this.stationId },
    });
  }

  get equipmentId() {
    return this.props.match.params.equipmentId;
  }

  get stationId() {
    return this.props.match.params.id;
  }

  handleUpdateSubmit = (values) => {
    this.props.dispatch({
      type: 'equipment/update',
      payload: { stationId: this.stationId, equipmentId: this.equipmentId, body: values },
    })
      .then(this.gotoEquipments, console.log);
  }

  gotoEquipments = () => {
    this.props.dispatch(routerRedux.push(`/stations/${this.stationId}/equipments/list`));
  }

  render() {
    const { equipment: { equipment } } = this.props;
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
            onSubmit={this.handleUpdateSubmit}
            stationId={this.stationId}
            initialValue={equipment}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
