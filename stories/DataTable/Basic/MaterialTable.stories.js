
import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import differenceBy from 'lodash/differenceBy';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import tableDataItems from '../constants/sampleDesserts';
import DataTable, { memoize } from '../../../src/index';

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
const actions = (
  <IconButton
    color="primary"
  >
    <Add />
  </IconButton>
);
const contextActions = memoize(deleteHandler => (
  <IconButton
    color="secondary"
    onClick={deleteHandler}
  >
    <Delete />
  </IconButton>
));

const columns = memoize(() => [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
    grow: 2,
  },
  {
    name: 'Type',
    selector: 'type',
    sortable: true,
  },
  {
    name: 'Calories (g)',
    selector: 'calories',
    sortable: true,
    right: true,
  },
  {
    name: 'Fat (g)',
    selector: 'fat',
    sortable: true,
    right: true,
  },
  {
    name: 'Carbs (g)',
    selector: 'carbs',
    sortable: true,
    right: true,
  },
  {
    name: 'Protein (g)',
    selector: 'protein',
    sortable: true,
    right: true,
  },
  {
    name: 'Sodium (mg)',
    selector: 'sodium',
    sortable: true,
    right: true,
  },
  {
    name: 'Calcium (%)',
    selector: 'calcium',
    sortable: true,
    right: true,
  },
  {
    name: 'Iron (%)',
    selector: 'iron',
    sortable: true,
    right: true,
  },
]);

class MaterialTable extends PureComponent {
  state = { selectedRows: [], toggleCleared: false, data: tableDataItems };

  handleChange = state => {
    this.setState({ selectedRows: state.selectedRows });
  };

  handleRowClicked = row => {
    // eslint-disable-next-line no-console
    console.log(`${row.name} was clicked!`);
  }

  deleteAll = () => {
    const { selectedRows } = this.state;
    const rows = selectedRows.map(r => r.name);
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to delete:\r ${rows}?`)) {
      this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'name') }));
    }
  }

  render() {
    const { data, toggleCleared } = this.state;

    return (
      <Card style={{ height: '100%' }}>
        <DataTable
          title="Desserts"
          columns={columns()}
          data={data}
          selectableRows
          highlightOnHover
          defaultSortField="name"
          actions={actions}
          contextActions={contextActions(this.deleteAll)}
          sortIcon={sortIcon}
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={selectProps}
          onSelectedRowsChange={this.handleChange}
          clearSelectedRows={toggleCleared}
          onRowClicked={this.handleRowClicked}
          pagination
          expandableRows
        />
      </Card>
    );
  }
}

storiesOf('Material UI', module)
  .add('Override Default Components', () => <MaterialTable />);
