import { Button, Grid, Stack, Typography } from "@mui/material";
import CustomPieChart from "../components/CustomPieChart";
import Top10Table from "../components/Top10Table";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useResults from "../utils/resultsApi";
import LoadingCard from "../components/LoadingCard";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import ErrorCard from "../components/ErrorCard";

export default function Home(){
    const [startTimeParam, setStartTimeParam] = useState<Dayjs | null>(null);
    const [endTimeParam, setEndTimeParam] = useState<Dayjs | null>(null);
    const { data: malBenCountResults, isLoading: isLoadingMalBenCount, error: errorMalBenCount } = useResults("malicious-benign-count", `start_time=${startTimeParam?.toISOString()}&end_time=${endTimeParam?.toISOString()}`);
    const { data: topBenignResults, isLoading: isLoadingBenign, error: errorBenign } = useResults("top-results", `&is_malicious=false&results_amount=10&start_time=${startTimeParam?.toISOString()}&end_time=${endTimeParam?.toISOString()}`);
    const { data: topMaliciousResults, isLoading: isLoadingMalicious, error: errorMalicious } = useResults("top-results", `&is_malicious=true&results_amount=10&start_time=${startTimeParam?.toISOString()}&end_time=${endTimeParam?.toISOString()}`);

    const handleStartTimeChange = (value: Dayjs | null) => {
        setStartTimeParam(value);
    };

    const handleEndTimeChange = (value: Dayjs | null) => {
        setEndTimeParam(value);
    };

    const handleClear = () => {
        setEndTimeParam(null)
        setStartTimeParam(null)
    }

    return (
        <Stack spacing={1} padding={2} alignContent="center" justifyItems="center">
            <Typography variant="h4" align="center">DApp Dashboard View</Typography>
            <Stack direction="row" spacing={1}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="Select start time period" format="DD/MM/YYYY hh:mm a" onChange={handleStartTimeChange} value={startTimeParam} />
                    <DateTimePicker label="Select end time period" format="DD/MM/YYYY hh:mm a" onChange={handleEndTimeChange} value={endTimeParam}/>
                    <Button onClick={() => handleClear()}>Clear</Button>
                </LocalizationProvider>
            </Stack>
            <Grid container spacing={2} sx={{  justifyContent:'center', display:'flex'}}>
                <Grid item>
                    {isLoadingBenign && <LoadingCard/>}
                    {errorBenign && <ErrorCard message={(errorBenign as Error).message || "Failed to fetch data"}></ErrorCard>}
                    {topBenignResults && !isLoadingBenign && <Top10Table results={topBenignResults} isMalicious={false}></Top10Table>}
                </Grid>
                <Grid item>
                    {isLoadingMalicious && <LoadingCard/>}
                    {errorMalicious && <ErrorCard message={(errorMalicious as Error).message || "Failed to fetch data"}></ErrorCard>}
                    {topMaliciousResults && !isLoadingMalicious && <Top10Table results={topMaliciousResults} isMalicious={true}></Top10Table>}
                </Grid>
                <Grid item>
                    {isLoadingMalBenCount && <LoadingCard/>}
                    {errorMalBenCount && <ErrorCard message={(errorMalBenCount as Error).message || "Failed to fetch data"}></ErrorCard>}
                    {malBenCountResults && !isLoadingMalBenCount && <CustomPieChart results={malBenCountResults}></CustomPieChart>}
                </Grid>
            </Grid>
        </Stack>
    )
}