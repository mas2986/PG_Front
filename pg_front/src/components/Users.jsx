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
import { getAllUsers, changeRoleUser,deleteUser,getOrderByUser, passwordRemember, cleanDetail, getAllOrders } from '../redux/action'
import { data, role } from './data';

const Users = ({setView}) => {
  //const [createModalOpen, setCreateModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    if (users.length === 0 || edit) {
      dispatch(getAllUsers());
      // console.log(edit)
    }
    setEdit(() => false)
  }, [dispatch])

  const handleDelete = (row) => {
    const { id,name } = row.original;
    Swal.fire({
      title: `Do you want delete ${row.original.name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete user!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id,name))
        setEdit(() => true);        
      }
    })
  }

  const handlePassword = (row) => {
    const {email} = row.original;
    console.log(email);
    Swal.fire({
      title: `Do you want to force password reset to ${row.original.name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, password reset user!'
    }).then((result) => {
      if (result.isConfirmed) {        
        dispatch(passwordRemember({email:email}))
        setEdit(() => true);        
      }
    })    
  }

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
        accessorFn: (row) => `${row.name} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
        id: 'name', //id is still required when using accessorFn instead of accessorKey
        header: 'Name',
        enableEditing: false,
        size: 250,
        Cell: ({ cell, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {row.original.image === '' || row.original.image==='ss'
              ?
              <AccountCircle
              sx={{
                color: 'gray',
                fontSize: "large",
                marginBottom: "0.5rem",
                width: "30px",
                height: "30px",
                marginRight: "1rem",
              }}
            />
            :
              <img
                alt="avatar"
                height={30}
                src={row.original.image}
                loading="lazy"
                style={{ borderRadius: '50%' }}
              />
              }
            <Typography>{cell.getValue()}</Typography>
          </Box>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableEditing: false,
      },
      {
        accessorKey: 'rol',
        header: 'Role',
        enableEditing: false,
        Cell: ({ cell }) => (
          <Box
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() === 'admin'
                  ? theme.palette.error.dark
                  : theme.palette.success.dark,
              borderRadius: '0.25rem',
              color: '#fff',
              maxWidth: '9ch',
              p: '0.25rem',
            })}
          >
            {cell.getValue()}
          </Box>
        ),
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
      data={users}
      initialState={{ columnVisibility: { id: false } }}
      positionRowActions="right"
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: '#FF0000',
          color: 'white',
        },
      }}
      /*    muiTableBodyCellProps={{
           sx:{
             backgroundColor:'#9c9c9c'
           }
         }} */
      enableRowSelection
      enableMultiRowSelection={false}
      enableSelectAll={false}
      onRowSelectionChange={setRowSelection}
      state={{ rowSelection }}
      getRowId={(row) => row.id}
      muiSelectCheckboxProps={({ row }) => ({
        color: 'secondary',
        disabled: row.original.isAccountLocked,
      })}
      enableColumnOrdering
      enableEditing
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
              }
            })
          });
        };

        const handleOrder = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            const { id } = row.original;
            // console.log(id)
            dispatch(getOrderByUser(id));
            setView('orders')
            dispatch(cleanDetail())
          });
        };

        const handleAllOrders = () => {
          
            dispatch(getAllOrders());
            setView('orders')
            dispatch(cleanDetail())
          ;
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
              USER ORDERS
              </Button>
              <Button
              color="info"
              
              onClick={handleAllOrders}
              variant="contained"
            >
              ALL ORDERS
            </Button>
          </Box>
        );
      }}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '0.2rem' }}>
          <Tooltip arrow placement="right" title="Delete User">
            <IconButton onClick={() => handleDelete(row)}>
              <Delete sx={{
                color: 'black'
              }} />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="left" title="Password reset">
            <IconButton onClick={() => handlePassword(row)}>
              <Password />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
    </>
  );
};

export default Users;
