from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Ovo omogućava CORS za sve rute i sve domene


# Učitavanje spremljenog Random Forest modela
model = joblib.load('rf_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = [
        data['Age'],
        data['Height'],
        data['FCVC'],
        data['NCP'],
        data['CH2O'],
        data['FAF'],
        data['TUE'],
        data['Gender_Male'],
        data['family_history_yes'],
        data['FAVC_yes'],
        data['CAEC_Frequently'],
        data['CAEC_Sometimes'],
        data['CAEC_no'],
        data.get('SMOKE_yes', False),
        data.get('SCC_yes', False),
        data.get('CALC_Frequently', False),
        data.get('CALC_Sometimes', False),
        data['CALC_no'],
        data.get('MTRANS_Bike', False),
        data.get('MTRANS_Motorbike', False),
        data.get('MTRANS_Public_Transportation', False),
        data.get('MTRANS_Walking', False)
    ]
    prediction = model.predict([features])[0]
    return jsonify({'BMI': prediction})


if __name__ == '__main__':
    app.run(debug=True)
