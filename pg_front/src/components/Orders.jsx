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
import { useSelector, useDispatch } from 'react-redux';

const Orders = () => {
  //const [createModalOpen, setCreateModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();
  const orders = useSelector(state=>state.order);

  useEffect(() => {
    if (edit) {
      //dispatch(getAllUsers());
    }
    setEdit(() => false)
  }, [edit])

  
   const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accesorKey: 'orderStatus', //accessorFn used to join multiple data into a single cell        
        header: 'Status',
        size: 50,       
      },
      {
        accessorKey: 'adressShipping',
        header: 'Address Shipping',
        enableEditing: false,
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
      initialState={{ columnVisibility: { id: false } }}
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
      getRowId={(row) => row.id}
      muiSelectCheckboxProps={({ row }) => ({
        color: 'secondary',
        disabled: row.original.isAccountLocked,
      })}
      enableColumnOrdering
      renderTopToolbarCustomActions={({ table }) => {
        const handleLock = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            console.log(row.index);
            alert('Lock ' + row.getValue('name'));
          });
        };

        const handleRole = () => {
          table.getSelectedRowModel().flatRows.map((row, values) => {
            if (row.original.rol !== 'admin') row.original.rol = "admin";
            else row.original.rol = 'user';
            //Guarda los datos a enviar al back;
            const { id, ...body } = row.original;
            //setTableData([...tableData]);
            Swal.fire({
              title: `Do you want change ${row.original.rol} to ${row.getValue('name')}?`,
              text: "You can be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, change role!'
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(changeRoleUser(id, body))
                setEdit(() => true);
                Swal.fire(
                  'Role changed!',
                  `${row.original.name} now is ${row.original.rol}`,
                  'success'
                )
              }
            })
          });
        };

        const handleOrder = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
          });
        };

        return (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Button
              color="error"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleRole}
              variant="contained"
            >
              CHANGE ROLE
              </Button>
            <Button
              color="info"
              disabled={table.getSelectedRowModel().flatRows.length === 0}
              onClick={handleOrder}
              variant="contained"
            >
              USER'S ORDERS
              </Button>
          </Box>
        );
      }}      
    />
    </>
  );
};

export default Orders;
