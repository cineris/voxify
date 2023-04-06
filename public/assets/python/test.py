import sys
import json
import pandas as pd
import csv
import pickle

json_input = sys.argv[1]

# Parse JSON input into a Python list of dictionaries
input_data = json.loads(json_input)

# Define output file name
output_file = 'statushistory.csv'

# Define field names for CSV file
fieldnames = ['YTS', 'WIP', 'APPROVED']

# Open output file and write CSV data
with open(output_file, mode='w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for row in input_data:
        writer.writerow(row)

# Load the saved model from disk
with open('load_files/model.pkl', 'rb') as f:
    model = pickle.load(f)

# Load the saved scaler_X from disk
with open('load_files/scaler_X.pkl', 'rb') as f:
    scaler_X = pickle.load(f)

# Load the saved scaler_Y from disk
with open('load_files/scaler_Y.pkl', 'rb') as f:
    scaler_Y = pickle.load(f)

# Load statushistory into a Pandas dataframe
history = pd.read_csv('statushistory.csv')

# Scale the new data using the saved scaler_X
history_X = scaler_X.transform(history)

# Make predictions on the scaled new data using the saved model
predictions = model.predict(history_X)

# Create a new DataFrame that contains the original data and the predicted values
history_with_predictions = pd.concat([history, pd.DataFrame(predictions, columns=['Day'])], axis=1)

# Insert the 'Predicted Day' column after the 'Day' column
history_with_predictions.insert(0, 'Day', history_with_predictions.pop('Day'))

#Reverting Predictions to Original
# Split the DataFrame into two parts based on the columns that need to be transformed differently
Y = ['Day']
Predicted_Day = history_with_predictions[Y]

# Use the respective scaler for each part to invert the scaling
Predicted_Day = pd.DataFrame(scaler_Y.inverse_transform(Predicted_Day), columns=Y)

# Combine the two parts back into a single DataFrame
original_with_predictions = pd.concat([Predicted_Day, history], axis=1)

# Convert the 'Day' column to integer type and round the values
original_with_predictions['Day'] = original_with_predictions['Day'].astype(int).round()

# Print the new DataFrame
#print(original_with_predictions)

output_json = original_with_predictions.to_json(orient='records')
print(output_json)