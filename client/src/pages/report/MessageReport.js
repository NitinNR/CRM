import { sentenceCase, paramCase } from 'change-case';
import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Container,
  Box,
  Button as MuiButton,
} from '@mui/material';
// Mui-X
import { DataGrid, 
  GridActionsCellItem,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
// Ant Design
import "antd/dist/antd.css";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag  } from 'antd';
import Highlighter from 'react-highlight-words';
import { Excel } from "antd-table-saveas-excel";
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
import ReportService from '../../services/report.service';
import TokenService from '../../services/token.service';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function MessageReport() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);

  const adminId = TokenService.getUser().userInfo.id;

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  // ----------------------------------------------

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 10000);
    if (!messageList.length) {
      ReportService.MessageReport(adminId).then((response) => {
        // console.log("user list res", response)
        if (response.status) {
          setLoading(false)
          handleMessageList(response.data)
        }
      })
    }
  }, [])

//   const deleteUser = React.useCallback(
//     (id) => () => {
//       const userId = id
//       setTimeout(() => {
//         UserService.UserDelete(userId, adminId).then((response)=>{
//           if(response.status)
//           setUserList(
//             (userList) => userList.filter((row) => row.user_id !== id));
//         });
//         })
        
//     },
//     [],
//   );

//   const toggleAdmin = React.useCallback(
//     (id) => () => {
//       setUserList((prevRows) =>
//         prevRows.map((row) =>
//           row.user_id === id ? { ...row, isAdmin: !row.isAdmin } : row,
//         ),
//       );
//     },
//     [],
//   );

//   const handleUser = React.useCallback(
//     (params) => () => {
//       // console.log("ID",params.row)
//       TokenService.setData("currentUser",params.row)
//       // console.log("rowToDuplicate",rowToDuplicate)
//     //   setUserList((prevRows) => {
//     //     const rowToDuplicate = prevRows.find((user) => paramCase(user.user_id) === id);
//     //     console.log("prevRows",prevRows,"rowToDuplicate",rowToDuplicate)
//     //     // const rowToDuplicate = prevRows.find((row) => row.user_id === id);
//     //     // return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
//     //   });
//     },
//     [],
//   );

//   const getCapData = (params) => {
//     // console.log("params",JSON.parse(params.row.capturedData).map((C)=>{return `${C.value} |` }))
//     const cdata = JSON.parse(params.row.capturedData).map((C)=>{return `${C.value} |` })
//     // console.log("C data", JSON.stringify(cdata))
//     return JSON.stringify(cdata[0]);
// }


  
//   const TABLE_HEAD = React.useMemo(
//     () => [
//     { field: 'user_id', headerName: '#', valueGetter: userList.forEach((user, index)=>{ user.serial=index+1;}), width: 80},
//     { field: 'fullName', headerName: 'Full Name', width: 150 },
//     { field: 'whatsapp_number', headerName: 'WhatsApp Number', width: 120},
//     { field: 'email', headerName: 'Email', width: 150 },
//     { field: 'DateTime', headerName: 'Date', valueGetter: ({ value }) => value && ( moment.utc(value).local().format('DD-MM-YYYY hh:mm A') ), width: 200 },
//     { field: 'CapturedData', headerName: 'Captured Data', width: 220, valueGetter: (params)=> JSON.parse(params.row.capturedData).map((C)=>{return `${ (C.value) } ` })  },
//     {
//       field: 'actions',
//       type: 'actions',
//       width: 80,
//       getActions: (params) => [
//         <GridActionsCellItem
//           icon={<FileCopyIcon />}
//           label="View/ Edit User"
//           component={RouterLink} 
//           to= {`${PATH_DASHBOARD.user.root}/${params.row.user_id}/edit`}
//           onClick={handleUser(params)}
//           showInMenu
//         />,
//         <GridActionsCellItem
//           icon={<DeleteIcon />}
//           label="Delete"
//           onClick={deleteUser(params.row.user_id)}
//           showInMenu
//         />,
//         // <GridActionsCellItem
//         //   icon={<SecurityIcon />}
//         //   label="Toggle Admin"
//         //   onClick={toggleAdmin(params.id)}
//         //   showInMenu
//         // />,
//       ],
//     },
//   ],
//   [deleteUser, handleUser],
// );


  const handleMessageList = (details) => {
    setMessageList(details)
  }


  // -------------------------------------------------------------

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'ID',
      key: 'messageId',
      render:(text,record,index)=>`${index+1}`,
      width: '10%',
      sorter: (a, b) => a.messageId - b.messageId,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      width: '20%',
      ...getColumnSearchProps('fullName'),
    },
    {
      title: 'Message',
      dataIndex: 'message_content',
      key: 'message_content',
      width: '30%',
      ...getColumnSearchProps('message_content'),
    },
    {
      title: 'Type',
      dataIndex: 'message_type',
      key: 'message_type',
      width: '20%',
      // ...getColumnSearchProps('message_type'),
      filters: [
        {
          text: 'TEXT',
          value: 'application',
        },
        {
          text: 'IMAGE',
          value: 'image',
        },
        {
          text: 'VIDEO',
          value: 'video',
        },
        {
          text: 'PDF',
          value: 'PDF',
        },
        {
          text: 'FILES',
          value: 'application',
        },
        

      ],
      onFilter: (value, record) => record.message_type.includes(value),
    },
    {
      title: 'Date',
      dataIndex: 'DateTime',
      key: 'DateTime',
      width: '20%',
      ...getColumnSearchProps('DateTime'),
      render:(datetime)=>{
        const messageSent = new Date(datetime).getDate()
        const currentDay = new Date().getDate()
        // currentDay.setDate(DateTime.getDate()-1)
        // console.log(messageSent.getDate(), currentDay.getDate())
        // console.log( Date(moment(new Date(datetime)).format('DD-MM-YYYY hh:mm A')) - Date(moment(new Date()).add(1, 'days').format('DD-MM-YYYY hh:mm A')));
      
        // console.log( Date(datetime).getDay() - moment(new Date()).add(1, 'days'));
        if(messageSent!==currentDay) {  return moment(datetime).format('DD-MM-YYYY hh:mm A')}
        return moment(datetime).fromNow()}
      
    },
    {
      title: 'Status',
      dataIndex: 'message_delivery',
      key: 'message_delivery',
      width: '20%',
      filters: [
        {
          text: 'SENT',
          value: 'sent',
        },
        {
          text: 'RECEIVED',
          value: 'received',
        },
      ],
      onFilter: (value, record) => record.message_delivery.startsWith(value),
      // ...getColumnSearchProps('message_delivery'),
      render: (tag ) => (
        <>
          <Tag color={tag!=='sent' ? 'geekblue' : 'green'} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        </>
      ),
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    //   width: '20%',
    //   ...getColumnSearchProps('age'),
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    //   ...getColumnSearchProps('address'),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ['descend', 'ascend'],
    // },
  ];

  const Excelcolumns = [
    {
      title: 'ID',
      key: 'messageId',
      render:(text,record,index)=>`${index+1}`
    },
    {
      title: 'MessageId',
      dataIndex: 'messageId',
      key: 'messageId',
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Message',
      dataIndex: 'message_content',
      key: 'message_content',
    },
    {
      title: 'Type',
      dataIndex: 'message_type',
      key: 'message_type',
    },
    {
      title: 'Date',
      dataIndex: 'DateTime',
      key: 'DateTime',
    },
    {
      title: 'Status',
      dataIndex: 'message_delivery',
      key: 'message_delivery',
    },
  ];

  const handleExportExcel = () => {
    const excel = new Excel();
    console.log("excel", excel)
    const fexcel = excel
      .addSheet("Message Report")
      .addColumns(Excelcolumns)
      .addDataSource(messageList, {
        str2Percent: true
      })
      .saveAs("Message_Report.xlsx")
      console.log("fexcel", fexcel)
    
  };

  // -------------------------------------------------------------


  return (
    <Page title="Message Report: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Message Report"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Report', href: PATH_DASHBOARD.report.root },
            { name: 'Message-List' },
          ]}
          action={
            <MuiButton
              variant="contained"
              onClick={handleExportExcel}
              // component={RouterLink}
              // to={PATH_DASHBOARD.user.newUser}
              startIcon={<Iconify icon={'file-icons:microsoft-excel'} />}
            >
              Export to Excel
            </MuiButton>
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
          {/* <div style={{ height: 720, width: '100%' }}> */}
            {/* <DataGrid 
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
              /> */}
              {/* <Space
                style={{
                  marginBottom: 16,
                }}
              >
                <Button onClick={handleExportExcel}>Export to Excel</Button>
              </Space> */}
              <Table 
              size="small"
              columns={columns} 
              dataSource={messageList} 
              rowKey="messageId"
              // tableHeight = {500}
              scroll={{
                x: 700,
                y: 500,
              }}
              />
          {/* </div> */}

          
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
