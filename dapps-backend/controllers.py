from dal import get_data_by_time
from dal import data as results
from utils.types import MaliciousBenignCountResponse, TopResult, TopResultsResponse
from collections import Counter

def get_malicious_benign_count_controller(start_time: str, end_time: str) -> MaliciousBenignCountResponse:
    if start_time != 'undefined' and end_time != 'undefined':
        data = get_data_by_time(start_time, end_time)
    else:
        data = results
    
    malicious_count = sum(1 for result in data if result.IS_MALICIOUS)
    return MaliciousBenignCountResponse(malicious_count=malicious_count, benign_count=len(data)-malicious_count)

def get_top_results_controller(start_time: str, end_time: str, is_malicious: bool, results_amount: int) -> dict:
    if start_time != 'undefined' and end_time != 'undefined':
        data = get_data_by_time(start_time, end_time)
    else:
        data = results

    url_count = Counter(result.URL for result in data if result.IS_MALICIOUS == is_malicious)
    re_url_count = [{"url":url, "amount":amount} for url, amount in url_count.items()]
    
    top_results = sorted(re_url_count, key=lambda x: x["amount"], reverse=True)[:results_amount]
    
    return top_results
    
        
        
            
