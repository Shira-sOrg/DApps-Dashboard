from datetime import datetime
from pydantic import BaseModel

class Result(BaseModel):
    URL: str
    IS_MALICIOUS: bool
    LATENCY: int
    STARTED_AT: datetime

class MaliciousBenignCountResponse(BaseModel):
    malicious_count: int
    benign_count: int
    
class TopResult(BaseModel):
    url: str
    amount: int 
    
TopResultsResponse = list[TopResult]