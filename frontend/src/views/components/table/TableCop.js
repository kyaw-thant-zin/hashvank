import React from "react";

// MUI
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  gridClasses,
  GridToolbarContainer, 
  GridToolbarExport,
  GridToolbarFilterButton,
  gridPaginatedVisibleSortedGridRowIdsSelector
} from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import { Box, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// REDUX
import { useSelector, useDispatch } from "react-redux"


export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  fontFamily: [
    '"GothamMedium"',
    'sans-serif'
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#F1F3F9'
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    justifyContent: 'center',
    fontSize: 11,
    color: '#8898AA'
  },
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
    '&:focus, &:focus-within': {
      outline: 'unset !important'
    }
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
    '&:focus, &:focus-within': {
      outline: 'unset !important'
    }
  },
  '& .MuiDataGrid-cell': {
    fontFamily: 'GothamBook, sans-serif',
    fontWeight: 350,
    justifyContent: 'center',
    fontSize: 13,
    color: '#172B4D',
    border: 'unset !important',
    '&:focus, &:focus-within': {
      outline: 'unset !important'
    }
  },
  '& .MuiDataGrid-row': {
    padding: '15px 0px'
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
  '& .MuiDataGrid-cell.MuiDataGrid-cell--editing': {
    boxShadow: 'unset !important',
    backgroundColor: 'unset !important',
    '& div': {
      margin: '0px 5px',
      '& input': {
        padding: '5px 16px',
        border: '2px solid #172B4D',
        borderRadius: '5px',
        fontFamily: 'GothamBook, sans-serif',
        fontSize: 16,
        fontWeight: 350,
      }
    }
  },
  '& .MuiDataGrid-cell--editing': {
    '& .Mui-error': {
      '& input': {
        borderColor: 'rgb(239, 83, 80) !important'
      }
    },
  },
  
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton sx={{ marginRight: '20px', marginLeft: '20px' }} />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const getRowsFromCurrentPage = ({ apiRef }) => gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);


const TableCop = (props) => {

  const dispatch = useDispatch()

  // const { campaignTablePagiPage } = useSelector((state) => state.campaign)
  const { campaignTablePagiPage } = ''

  function CustomTablePagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    React.useEffect(() => {
      if(campaignTablePagiPage > 0) {
        apiRef.current.setPage(campaignTablePagiPage)
      }
    }, [apiRef])

    const handleOnChangePagination = ((event, value) => {
      apiRef.current.setPage(campaignTablePagiPage > 0 ? campaignTablePagiPage : value - 1)
    //   dispatch(setCampaignPagiPage(value - 1))
    })
  
    return (
      <Pagination
        page={ campaignTablePagiPage > 0 ? campaignTablePagiPage + 1 : page + 1}
        count={pageCount}
        renderItem={(props2) => <PaginationItem {...props2} components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} sx={{ borderRadius: '50% !important', fontFamily: '"GothamMedium", sans-serif' }}  />}
        onChange={handleOnChangePagination}
      />
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <StripedDataGrid 
        columnVisibilityModel={{
          id: false
        }}
        autoHeight={true}
        getRowHeight={() => 'auto'}
        pageSize={props.pageSize} 
        rowsPerPageOptions={props.rowsPerPageOptions} 
        components={{
          Pagination: CustomTablePagination,
          Toolbar: CustomToolbar,
          ColumnSortedDescendingIcon: SortedDescendingIcon,
          ColumnSortedAscendingIcon: SortedAscendingIcon,
        }}
        componentsProps= {{
          toolbar: {
            printOptions: {
              getRowsToExport:() => getRowsFromCurrentPage
            }
          }
        }}
        rows={props.rows}
        columns={props.columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even'
        }
        disableSelectionOnClick
        disableColumnMenu
        editRowsModel={props.editRowsModel}
        onEditRowsModelChange={props.onEditRowsModelChange}
        initialState={props.initialState}
        filterModel={props.filterModel}
        processRowUpdate={props.processRowUpdate}
        experimentalFeatures={props.experimentalFeatures}
        />
    </Box>
  )
}

  
export default TableCop;