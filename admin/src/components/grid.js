import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    },
}));

function Grid({ endpoint }) {
    const [data, setData] = React.useState([]);
    const [fields, setFields] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);

    const changePage = async (page) => {
        setCurrentPage(page)
        await axios.get(endpoint, { params: { page: currentPage } }).then(res => {
            setData(res.data)
            setFields(Object.keys(res.data[0]))
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get(endpoint)
            if (res.data && res.data.length > 0) {
                setFields(Object.keys(res.data[0]))
                setData(res.data)
            }
        }

        fetchData()
    }, [endpoint])

    return (
        <>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {fields.map((field, k) => (
                                <StyledTableCell key={'field' + k}>{field}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, i) => (<TableRow key={i}>
                            {fields.map((field, j) => (<TableCell key={i + "-" +  j}>{item[field]}</TableCell>))}
                        </TableRow>))}
                        {/* Add more rows as needed */}
                    </TableBody>
                </Table>
            </TableContainer>
            <Paper style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                <Stack spacing={2}>
                    <Pagination
                        onChange={(event, page) => {
                            changePage(page)
                        }}
                        count={data.length} variant="outlined" shape="rounded" />
                </Stack>
            </Paper>
        </>
    );
}

export default Grid;