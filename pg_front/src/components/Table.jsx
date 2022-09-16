import React, { useCallback, useMemo, useState, useEffect } from 'react';
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
import { Delete, Edit } from '@mui/icons-material';
// import { data } from './data';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, editProduct, getProduct, deleteProduct } from '../redux/action'
import FormProduct from './FormProduct';

function validate(input) {
  let errors = {};
  console.log('En funcion validate')
  console.log(input);
  if (!input.title) errors.title = 'Required Field';

  if(input.title.length > 50) errors.title = 'Title very long'

  //let extensionImage = input.image.split('.')?.length
  //if(input.image.split('.')[extensionImage-1]!=='jpg') errors.image = 'Invalid image format'

  if (input.stock < 0) errors.stock = "Stock can't be smaller than 0";

  if (input.discount < 0) errors.discount = "Discount can't be smaller than 0";

  if (input.discount > 100) errors.discount = "Discount can't be larger than 100"

  if (input.price < 0) errors.price = "Price can't be smaller than 0";

  if(input.description?.length > 250)errors.description = "Description very long";
  console.log(errors);
  return errors;
}


const Example = () => {
  const listProducts = useSelector((state)=>state.productAdmin);
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => listProducts)
                                    
  const [edit, setEdit ] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };



  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      console.log(values)
      setEdit(()=>true);
      setTableData([...tableData]);
      const { id,...body } = values;      
      dispatch(editProduct(id,body));
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue('title')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);      
      setTableData([...tableData]);
      const id = row.getValue("id")
      console.log(id);
      dispatch(deleteProduct(id));
      setEdit(()=>true);
    },
    [tableData],
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      console.log(cell.column);
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
       /*  onBlur: (event) => {
          const isValid = 
             cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value); 
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header}`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        }, */
      };
    },
    [validationErrors],
  );

  const columns = useMemo(
    () => [
    {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: true,
      }, 
      {
        accessorKey: 'title', //accessorFn used to join multiple data into a single cell
        id: 'title', //id is still required when using accessorFn instead of accessorKey
        header: 'Title',
        size: 120,
        Cell: ({ cell, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt="avatar"
              height={30}
              src={row.original.image}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            <Typography>{cell.getValue()}</Typography>
          </Box>
        ),
      },
      {
        accessorKey: 'brand',
        header: 'Brand',
        size: 40,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'genre',
        header: 'Gender',
        size:40,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'sport',
        header: 'Sport',
        size:40,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 30,
        Cell: ({ cell }) => (
          <Box
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() < 15
                  ? theme.palette.error.dark
                  : cell.getValue() >= 15 && cell.getValue() < 50
                  ? theme.palette.warning.dark
                  : theme.palette.success.dark,
              borderRadius: '0.25rem',
              color: '#fff',
              maxWidth: '9ch',
              p: '0.25rem',
            })}
          >
            {cell.getValue()?.toLocaleString?.('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'discount',
        header: 'Discount',
        size: 30,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        size: 20,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 60,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      }
     /*  {
        accessorKey: 'state',
        header: 'State',
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        },
      }, */
    ],
    [getCommonEditTextFieldProps],
  );

  useEffect(() => {
    if (listProducts.length === 0||edit) 
      dispatch(getProduct());
      setEdit(false);
    },[edit]);

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Edit', //change "Actions" to "Edit"
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 60,
          },
        }}
        columns={columns}
        data={listProducts}
        initialState={{ columnVisibility: { id: false } }}
        editingMode="modal" //default
        enableColumnOrdering
        enableColumnResizing
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            + Create Product
          </Button>
        )}
      />
      <FormProduct
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}  
        setEdit={setEdit}      
      />
    </>
  );
};


const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default Example;