import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

function Grid({ endpoint }) {
    const [data, setData] = React.useState([]);
    const [fields, setFields] = React.useState([]);

    useEffect(async () => {
        let res = await axios.get(endpoint)
        if(res.data && res.data.length > 0) {
            setFields(Object.keys(res.data[0]))
            setData(res.data)
        }
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table className="table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {fields.map(field => (
                            <StyledTableCell>{field}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(item => (<TableRow>
                        {fields.map(field => (<TableCell>{item[field]}</TableCell>))}
                    </TableRow>))}
                    {/* Add more rows as needed */}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Grid;