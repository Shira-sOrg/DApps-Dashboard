import { Alert, Card } from "@mui/material";

interface ErrorCardProps{
    message: String
}

export default function ErrorCard(message: ErrorCardProps){
    return(<Card sx={{height:'30vw', width:'30vw', alignItems:'center', justifyContent:'center', display:'flex'}}>
                <Alert severity="error">{message.message}</Alert>
            </Card>)
}