import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';

import EnhancedTableHead from '../EnhancedTableHead';
import Preloader from '../../loaders/Preloader';
import { dataFormatter } from '../../../utils/functions';
import { AuthContext } from '../../../utils/AuthContext';
import { DescriptiveTextContext } from '../../../utils/DescriptiveTextContext';
import DescriptiveText from '../../DescriptiveText/DescriptiveText';
import {backend_netloc} from '../../../utils/constants';

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const headCells = [
    //{
    //    id: 'simulationMainId',
    //    numeric: false,
    //    disablePadding: true,
    //    label: 'ID (main)',
    //},
    {
        id: 'simulationDetailId',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'batterySize',
        numeric: false,
        disablePadding: false,
        label: 'Battery size (MWh)',
    },
    {
        id: 'batteryPower',
        numeric: false,
        disablePadding: false,
        label: 'Battery power (MW)',
    },
    {
        id: 'batteryCost',
        numeric: false,
        disablePadding: false,
        label: 'Battery cost ($)',
    },
    {
        id: 'pvSize',
        numeric: false,
        disablePadding: false,
        label: 'PV size (MW)',
    },
    {
        id: 'pvCost',
        numeric: false,
        disablePadding: false,
        label: 'PV cost ($)',
    },
    {
        id: 'gridConnection',
        numeric: false,
        disablePadding: false,
        label: 'Grid connection (MW)',
    },
    {
        id: 'roi',
        numeric: false,
        disablePadding: false,
        label: 'ROI (years)',
    },
];

const DetailsTable = ({
    token,
    email,
    profileName,
    tableData,
    setPlSummaryTable,
    setPlCashFlowGraph,
    setPlDetailsTable,
    setPlDiagram,
    setExampleFilePath,
    setDataFilePath,
    getMainTableSelectedRowData,
    setExecutiveSummaryData,
    setContributionBarGraphData,
    setExecutiveSummaryTableData,
}) => {
    const { setExecutiveSummaryTitle } = useContext(AuthContext);
    const { descriptiveText } = useContext(DescriptiveTextContext);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('simulationMainId');
    const [selectedRow, setSelectedRow] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const getDetailsTableSelectedRowData = async (
        simulationMainId,
        simulationsDetailsId,
        userName
    ) => {
        const response = await fetch(
            `${backend_netloc}/simulation/simulation_details_table_selected_row/?user_name=${profileName}&simulation_main_table_id=${simulationMainId}&simulation_details_table_id=${simulationsDetailsId}&authorization=${token}&username=${email}&selected_row_name=${userName}`,
            {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();
        setPlSummaryTable(Object.values(json[1]));
        setPlCashFlowGraph(Object.values(json[3]));
        setPlDetailsTable(Object.values(json[5]));
        setPlDiagram(Object.values(json[7]));
        setDataFilePath(json[13]);
        setExampleFilePath(json[15]);
        setExecutiveSummaryData({ configuration: json.configuration, results: json.results });
        setContributionBarGraphData(json.contribution_bar_graph);
        setExecutiveSummaryTableData(json.npv_irr);
        setExecutiveSummaryTitle({
            customerName: json.customer_name,
            simulationName: json.simulaiton_name,
            isTablesUpdate: true,
        });
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleRowSelect = (simulationMainId, simulationsDetailsId, userName) => {
        if (selectedRow === simulationsDetailsId) {
            setSelectedRow('');
            getMainTableSelectedRowData();
        } else {
            setSelectedRow(simulationsDetailsId);
            getDetailsTableSelectedRowData(simulationMainId, simulationsDetailsId, userName);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData?.length) : 0;

    if (!tableData) {
       return <Paper sx={{ p: 5 }}>No data to display</Paper>;
    }
    return (
        <Stack direction="column" spacing={2} sx={{ position: 'relative' }}>
            <Typography variant="h3">Details table</Typography>
            <DescriptiveText
                text={descriptiveText.summaryDetailsTableGeneral}
                top="-35px"
                left="125px"
                width="260px"
                l
            />
            <DescriptiveText
                text={descriptiveText.summaryDetailsTableClick}
                top="-35px"
                left="580px"
                width="220px"
                bl
            />
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ maxWidth: '100%', mb: 2, px: 3 }}>
                    <TableContainer>
                        <Table aria-labelledby="tableTitle" size="medium">
                            <EnhancedTableHead
                                headCells={headCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={tableData.length}
                            />
                            <TableBody>
                                {stableSort(tableData, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected =
                                            selectedRow === row.simulationsDetailsId;
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={() =>
                                                    handleRowSelect(
                                                        row.simulationMainId,
                                                        row.simulationsDetailsId,
                                                        row.userName
                                                    )
                                                }
                                                tabIndex={-1}
                                                key={row.simulationsDetailsId}
                                                style={{
                                                    backgroundColor: isItemSelected
                                                        ? '#bace9a'
                                                        : 'white',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <TableCell align="left">
                                                    {row.simulationsDetailsId}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.batterySize}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.batteryPower}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {dataFormatter(row.batteryCost)}
                                                </TableCell>
                                                <TableCell align="left">{row.pvSize}</TableCell>
                                                <TableCell align="left">
                                                    {dataFormatter(row.pvCost)}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.gridConnection}
                                                </TableCell>
                                                <TableCell align="left">{row.roi}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Stack>
    );
};
export default DetailsTable;
