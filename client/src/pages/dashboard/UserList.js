import { sentenceCase, paramCase } from 'change-case';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
// Mui-X
import { DataGrid, 
  GridActionsCellItem, 
  GridToolbar, 
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,  
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
// Moment
import * as moment  from 'moment';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
// import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user/list';
// Services
import UserService from '../../services/user.service';
import TokenService from '../../services/token.service';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function UserList() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const adminId = TokenService.getUser().userInfo.id;

  // ----------------------------------------------

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 10000);
    if (!userList.length) {
      UserService.UserList(adminId).then((response) => {
        // console.log("user list res", response)
        if (response.status) {
          setLoading(false)
          handleUserList(response.data)
        }
      })
    }
  }, [])

  const deleteUser = React.useCallback(
    (id) => () => {
      const userId = id
      setTimeout(() => {
        UserService.UserDelete(userId, adminId).then((response)=>{
          if(response.status)
          setUserList(
            (userList) => userList.filter((row) => row.user_id !== id));
        });
        })
        
    },
    [],
  );

  const toggleAdmin = React.useCallback(
    (id) => () => {
      setUserList((prevRows) =>
        prevRows.map((row) =>
          row.user_id === id ? { ...row, isAdmin: !row.isAdmin } : row,
        ),
      );
    },
    [],
  );

  const handleUser = React.useCallback(
    (params) => () => {
      // console.log("ID",params.row)
      TokenService.setData("currentUser",params.row)
      // console.log("rowToDuplicate",rowToDuplicate)
    //   setUserList((prevRows) => {
    //     const rowToDuplicate = prevRows.find((user) => paramCase(user.user_id) === id);
    //     console.log("prevRows",prevRows,"rowToDuplicate",rowToDuplicate)
    //     // const rowToDuplicate = prevRows.find((row) => row.user_id === id);
    //     // return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
    //   });
    },
    [],
  );

  const getCapData = (params) => {
    // console.log("params",JSON.parse(params.row.capturedData).map((C)=>{return `${C.value} |` }))
    const cdata = JSON.parse(params.row.capturedData).map((C)=>{return `${C.value} |` })
    // console.log("C data", JSON.stringify(cdata))
    return JSON.stringify(cdata[0]);
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

  const GetCapData = (params) => {
    JSON.parse(params.row.capturedData).map((C) => {
      return `${(C.value)} `
    })
  }
  
  const TABLE_HEAD = React.useMemo(
    () => [
    { field: 'user_id', headerName: '#', valueGetter: userList.forEach((user, index)=>{ user.serial=index+1;}), width: 80},
    { field: 'fullName', headerName: 'Full Name', width: 150 },
    { field: 'whatsapp_number', headerName: 'WhatsApp Number', width: 120},
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'DateTime', headerName: 'Date', valueGetter: ({ value }) => value && ( moment.utc(value).local().format('DD-MM-YYYY hh:mm A') ), width: 200 },
    { field: 'CapturedData', headerName: 'Captured Data', width: 220, 
    // renderCell: (params) => JSON.parse(params.row.capturedData).map((C) => {
    //       return `${(C.value)} `
    //     })
        renderCell: (params) => JSON.parse(params.row.capturedData).map((C) => {
          return `${(C.value)} `
        })
      },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<FileCopyIcon />}
          label="View/ Edit User"
          component={RouterLink} 
          to= {`${PATH_DASHBOARD.user.root}/${params.row.user_id}/edit`}
          onClick={handleUser(params)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteUser(params.row.user_id)}
          showInMenu
        />,
        // <GridActionsCellItem
        //   icon={<SecurityIcon />}
        //   label="Toggle Admin"
        //   onClick={toggleAdmin(params.id)}
        //   showInMenu
        // />,
      ],
    },
  ],
  [deleteUser, handleUser],
);

  const handleUserList = (details) => {
    setUserList(details)
  }


  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = userList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteUser = (userId) => {
    const deleteUser = userList.filter((user) => user.id !== userId);
    setSelected([]);
    setUserList(deleteUser);
  };

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = userList.filter((user) => !selected.includes(user.name));
    setSelected([]);
    setUserList(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.newUser}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New User
            </Button>
          }
        />
        <Card>
          {/* <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            // handleExcel = {exportToCSV(userList, 'USER_LIST', wscols)}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          /> */}
          <Box sx={{mt:2}} />
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid 
              rows = {userList} 
              columns = {TABLE_HEAD}
              getRowId={(row) => row.user_id}
              loading={loading} 
              // components={{ Toolbar: CustomToolbar }} 
              components={{ Toolbar: GridToolbar }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              />
          </div>

          {/* OLD DataTable */}
          {/* <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{company}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(status === 'banned' && 'error') || 'success'}
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu onDelete={() => handleDeleteUser(id)} userName={name} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          {/* END OLD DataTable */}
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
