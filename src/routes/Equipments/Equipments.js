import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Card, Button, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../List/TableList.less';


@connect(({ loading, equipment, station }) => ({
  equipment,
  station,
  loading: loading.effects['equipment/fetch'],
}))
export default class Equipments extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'station/getStationById',
      payload: { id: this.stationId },
    });
    dispatch({
      type: 'equipment/fetch',
      payload: { stationId: this.stationId },
    });
  }

  get columns() {
    return [
      {
        title: '充电桩编码',
        dataIndex: 'equipmentCode',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '模块数',
        dataIndex: 'moduleCount',
      },
      {
        title: '操作',
        render: record => (
          <Fragment>
            {/* <Link to={`/equipments/${record.id}/equipments`}>
              桩列表
            </Link>
            <Divider type="vertical" /> */}
            <Link to={`/stations/${this.stationId}/equipments/${record.id}/edit`}>
              修改
            </Link>
          </Fragment>
        ),
      },
    ];
  }

  get stationId() {
    return this.props.match.params.id;
  }

  render() {
    const {
      equipment: { equipments: { data } },
      station: { station },
      loading,
      dispatch } = this.props;
    return (
      <PageHeaderLayout title={`${station && station.name ? station.name : '-'} - 充电桩管理`}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => dispatch(routerRedux.push(`/stations/${this.stationId}/equipments/create`))}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={data}
              columns={this.columns}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
