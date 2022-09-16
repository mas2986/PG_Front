import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import { Delete, Password, AccountCircle } from '@mui/icons-material';
import { getAllOrders } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';

const Orders = () => {
  //const [createModalOpen, setCreateModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order);
  const status = ['canceled','completed']

  useEffect(() => {
    if (orders.length === 0 || edit) {
      dispatch(getAllOrders());
    }
    setEdit(() => false)
  }, [edit])


  const handleStatus = (row, value) =>{
    row.original.orderStatus = value
    //const {id, }
    //dispatch(changeStatus())
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Order number',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 20,
      },
      {
        accessorKey: 'email',
        header: 'User',
        enableEditing: false,
      },
      {
        accessorKey: 'adressShipping',
        header: 'Address Shipping',
        enableEditing: false,
      },
      {
        accessorKey: 'orderStatus',
        header: 'Status',
        size: 50,
        Cell: ({ cell }) => (
          <>
          <Tooltip title="Double click for edit">
            <Box
              sx={(theme) => ({
                backgroundColor:
                  cell.getValue() === 'cancelled'
                    ? theme.palette.error.dark
                    : cell.getValue() === 'created'
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                borderRadius: '0.25rem',
                color: '#fff',
                maxWidth: '9ch',
                p: '0.25rem',
              })}
            >
              {cell.getValue()}
            </Box>
          </Tooltip>
          </>
        ),
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: status.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          )),
        },
      },
    ],
    [],
  );

  return (
    <>
    <MaterialReactTable
      displayColumnDefOptions={{
        'mrt-row-actions': {
          muiTableHeadCellProps: {
            align: 'center',
          },
          size: 120,
        },
      }}
      columns={columns}
      data={orders}
      //initialState={{ columnVisibility: { id: false } }}
      positionRowActions="right"
      /* muiTableHeadCellProps={{
        sx: {
          backgroundColor: 'black',
          color: 'white',
        },
      }} */
      /*    muiTableBodyCellProps={{
           sx:{
             backgroundColor:'#9c9c9c'
           }
         }} */
      editingMode="cell"
      enableEditing
      enableRowSelection
      enableMultiRowSelection={false}
      enableSelectAll={false}
      onRowSelectionChange={setRowSelection}
      state={{ rowSelection }}
      getRowId={(row) => row.id}
      getRowId={(row) => row.id}
      muiTableBodyCellEditTextFieldProps={({ row }) => ({
        //onBlur is more efficient, but could use onChange instead
        onBlur: (event) => {
          handleStatus(row, event.target.value);
        },
      })}
      muiSelectCheckboxProps={({ row }) => ({
        color: 'secondary',
        disabled: row.original.isAccountLocked,
      })}
      enableColumnOrdering
    />
    </>
  );
};

export default Orders;
