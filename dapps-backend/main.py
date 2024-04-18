import json
from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS, cross_origin
from pydantic import TypeAdapter
from controllers import get_malicious_benign_count_controller, get_top_results_controller

app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/malicious-benign-count')
@cross_origin(supports_credentials=True)
def get_malicious_benign_count():
    start_time = request.args.get('start_time', "")
    end_time = request.args.get('end_time', "")
        
    return jsonify(get_malicious_benign_count_controller(start_time, end_time).model_dump())

@app.route('/top-results')
@cross_origin(supports_credentials=True)
def get_top_results():
    start_time = request.args.get('start_time', "")
    end_time = request.args.get('end_time', "")
    is_malicious = True if request.args.get('is_malicious').lower() == "true" else False
    results_amount = int(request.args.get('results_amount'))
        
    return jsonify(get_top_results_controller(start_time, end_time, is_malicious, results_amount))
            
        
            
            
    

if __name__ == '__main__':
    app.run(debug=True)