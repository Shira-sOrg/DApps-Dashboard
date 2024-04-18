from datetime import datetime, timezone
import json 
from pydantic import TypeAdapter
from utils.types import Result

def get_data() -> list[Result]:
    with open('results.json', 'r') as file:
        return TypeAdapter(list[Result]).validate_python(json.load(file))

data = get_data()
    
def get_data_by_time(start_time: str, end_time: str) -> list[Result]:
    # start_time = start_time.astimezone(tzinfo=timezone.utc).isoformat()
    # end_time = end_time.astimezone(tzinfo=timezone.utc).isoformat()
    return [result for result in data if datetime.fromisoformat(start_time).replace(tzinfo=None) <= result.STARTED_AT.replace(tzinfo=None) <= datetime.fromisoformat(end_time).replace(tzinfo=None)]
