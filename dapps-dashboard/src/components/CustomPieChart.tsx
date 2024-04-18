import { Card, CardHeader, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { MalBenCountResult } from "../utils/types";

interface CustomPieChartProps{
    results: MalBenCountResult;
}

export default function CustomPieChart({results}: CustomPieChartProps){
    return(
    <Card>
        <CardHeader title={"Amount of Malicious and Benign Results"} sx={{ mb: 5 }} />
        {results.benign_count || results.malicious_count ?
        <PieChart
                    series={[
                        {
                        data: [
                            { id: 0, value: results.malicious_count, label: 'Malicious' },
                            { id: 1, value: results.benign_count, label: 'Benign' },
                        ],
                        },
                    ]}
                    width={400}
                    height={200}
                    /> : <Typography variant="h6" padding={20}>No Results Found</Typography>}
    </Card>
    )
}