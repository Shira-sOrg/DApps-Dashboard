import { Card, CircularProgress } from "@mui/material";

export default function LoadingCard(){
    return(<Card sx={{height:'30vw', width:'30vw', alignItems:'center', justifyContent:'center', display:'flex'}}><CircularProgress /></Card>)
}