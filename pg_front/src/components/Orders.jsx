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
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';

import { getAllOrders, changeOrderStatus, editProduct as editStock, getOrderByUser } from '../redux/action';
import { useSelector, useDispatch } from 'react-redux';

const Orders = () => {
  //const [createModalOpen, setCreateModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order);
  const products = useSelector(state => state.productAdmin)
  const status = ['cancelled', 'completed']

  const handleStatus = (row, value) => {
    row.original.orderStatus = value;
    let { id, orderStatus, email, total, idProduct, titleProduct } = row.original;
    Swal.fire({
      title: `Do you want change at ${row.original.orderStatus} to Order number ${row.original.id}?`,
      text: "You can be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change status!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeOrderStatus(id, orderStatus, email, total))
        setEdit(true);
        if (value === 'completed') {
          idProduct = idProduct.split(', ')
          titleProduct = titleProduct.split(', ')
          var productPurchase = []
          var qtyProduct = []
          for (let i = 0; i < idProduct.length; i++) {
            productPurchase[i] = products.find((e) => e.id === parseInt(idProduct[i]))
            qtyProduct[i] = titleProduct.filter(e => e === productPurchase[i].title).length
            productPurchase[i].stock = productPurchase[i].stock - qtyProduct[i];
            const { id, stock } = productPurchase[i];
            dispatch(editStock(id, stock));
          }
        }
      }
    })
  }

  useEffect(() => {
    if (orders.length === 0 || edit) {
      dispatch(getOrderByUser());
      setEdit(() => false)
    }
  }, [edit])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Order number',
        enableColumnOrdering: false,
        enableFiltering: false,
        enableEditing: false, //disable editing on this column
        size: 40,
      },    
      {
        accessorKey: 'idProduct',
        header: 'Purchase products',
        enableEditing: false,
        Cell: ({ cell, row }) => {
          let idProduct = row.original.idProduct.split(', ')
          let titleProduct = row.original.titleProduct.split(', ')          
          var productPurchase = []
          var qtyProduct = []
          for (let i = 0; i < idProduct.length; i++) {              
            productPurchase[i] = products.find((e) => e.id === parseInt(idProduct[i]))                    
            qtyProduct[i] = titleProduct.filter(e => e === productPurchase[i]?.title).length
          }          
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              {productPurchase.map(e =>
              <Tooltip title={`${e?.title}`} key={e?.id}>
                <img
                  alt="avatar"
                  height={30}
                  src={e?.image}
                  loading="lazy"
                  key = { e?.id }
                  style={{ borderRadius: '50%' }}
                />
                </Tooltip>
              )}
            </Box>
          )
        }
      },
      {
        accessorKey: 'email',
        header: 'User',
        enableEditing: false,
      },
      {
        accessorKey: 'createdAt',
        header: 'Creation Date',
        enableEditing: false,
        Cell: ({ cell }) => {
          let createdAt = new Date(cell.getValue())
          return (
            <>
            {`${createdAt.getMonth() + 1}-${createdAt.getDate()}-${createdAt.getFullYear()}`}
            </>
          )
        }
      },

      {
        accessorKey: 'titleProduct',
        header: 'Product Purchase',
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
        muiTableBodyCellEditTextFieldProps: ({ cell, row }) => ({
          //select: cell.getValue()!=="created"?false:true, //change to select for a dropdown
          select: true,
          children:
            status.map((e) => (
              <MenuItem key={e}
                disabled={cell.getValue() !== "created"}
                value={e}
              >
                {e}
              </MenuItem>
            )),
        }),
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
      enableColumResizing
      initialState={{ columnVisibility: { titleProduct: false } }}
      positionRowActions="right"
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: '#0833A2',
          color: 'white',
        },
      }}
      /*    muiTableBodyCellProps={{
           sx:{
             backgroundColor:'#9c9c9c'
           }
         }} */
      editingMode="cell"
      enableEditing
      enableMultiRowSelection={false}
      enableSelectAll={false}
      onRowSelectionChange={setRowSelection}
      state={{ rowSelection }}
      getRowId={(row) => row.id}
      muiTableBodyCellEditTextFieldProps={({ row }) => ({
        //onBlur is more efficient, but could use onChange instead
        onBlur: (event) => {
          row.original.orderStatus === "created"
            ?
            handleStatus(row, event.target.value)
            :
            null;
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
