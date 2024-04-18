import { Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TopResult } from "../utils/types";

interface Top10TableProps {
    results: TopResult[];
    isMalicious: boolean;
}

export default function Top10Table({results, isMalicious}: Top10TableProps){
    return(
        <Card>
            <CardHeader title={`Top 10 requested ${isMalicious ? "Malicious": "Benign"} DApps`} sx={{ mb: 5 }} />
            {results.length > 0 ? <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>URL</TableCell>
                        <TableCell align="right">Searched Amount</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {results.map((result) => (
                        <TableRow
                        key={result.url}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {result.url}
                            </TableCell>
                            <TableCell align="right">{result.amount}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> : <Typography variant="h6" padding={20}>No Results Found</Typography>}
        </Card> 
    )
}