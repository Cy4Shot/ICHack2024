from flask import Flask, jsonify
import json
import requests

app = Flask(__name__)

with open('generated_transactions.json') as f:
    data = json.load(f)


@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(data)


@app.route('/api/data/<string:key>', methods=['GET'])
def get_data_item(key):
    if key in data:
        return jsonify(data[key])
    else:
        return jsonify({"error": "Key not found"}), 404


@app.route('/api/crowding/<string:naptan>', methods=['GET'])
def get_crowding(naptan):
    tfl_api_url = f'https://api.tfl.gov.uk/crowding/{naptan}'

    try:
        response = requests.get(tfl_api_url)
        response.raise_for_status()  # Raise an HTTPError for bad responses.
        crowding_data = response.json()
        return jsonify(crowding_data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to fetch data from TFL API: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
