import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Card, Button, Divider, Table } from 'antd';
// import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from '../List/TableList.less';

const columns = [
  {
    title: '充电站编码',
    dataIndex: 'stationCode',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '地址',
    dataIndex: 'location',
  },
  {
    title: '操作',
    render: record => (
      <Fragment>
        <Link className={styles.login} to={`/stations/${record.id}/equipments/list`}>
          桩列表
        </Link>
        <Divider type="vertical" />
        <Link className={styles.login} to={`/stations/${record.id}/edit`}>
          修改
        </Link>
      </Fragment>
    ),
  },
];


@connect(({ loading, station }) => ({
  station,
  loading: loading.effects['station/fetch'],
}))
export default class Stations extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'station/fetch',
    });
  }

  render() {
    const { station: { stations: { data } }, loading, dispatch } = this.props;
    return (
      <PageHeaderLayout title="充电站管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => dispatch(routerRedux.push('/stations/create'))}>
                新建
              </Button>
            </div>
            <Table
              loading={loading}
              dataSource={data}
              columns={columns}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
