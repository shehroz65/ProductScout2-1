import pickle
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify
from datetime import datetime
from sklearn.utils import all_estimators
from sklearn.metrics import accuracy_score, mean_squared_error
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

with open(r'model.pkl', 'rb') as f:
    model = pickle.load(f)  

with open(r'cat_encoder.pkl', 'rb') as f:
    cat_encoder = pickle.load(f)

with open(r'sub_cat_encoder.pkl', 'rb') as f:
    sub_cat_encoder = pickle.load(f) 

with open(r'subsub_cat_encoder.pkl', 'rb') as f:
    subsub_cat_encoder = pickle.load(f)

with open(r'categories.pkl', 'rb') as f:
    categories = pickle.load(f)

with open(r'category_embeddings.pkl', 'rb') as f:
    category_query_embeddings = pickle.load(f)

model = SentenceTransformer('sentence-transformers/all-MiniLM-L12-v1')

app = Flask(__name__)
cors = CORS(app)

@app.route('/search', methods = ['POST'])
def get_cat():
    r = request.json
    user_query = r["name"]

    category_scores = []
    user_query_embedding = model.encode([user_query])[0]
    for i, category in enumerate(categories):
        score = cosine_similarity(user_query_embedding.reshape(1, -1), category_query_embeddings[i].reshape(1, -1))
        category_scores.append((category, score))

    sorted_scores = sorted(category_scores, key=lambda x: x[1], reverse=True)
    return {"mapping":sorted_scores[0][0]}

@app.route('/get_text', methods = ['POST'])    
def get_text():
    r = request.json

    # lists = [
    #     ['Bags and Travel', 'Men Bags', 'Business Bags', 2023, 2, 11, 6],
    #     ['Bags and Travel', 'Men Bags', 'Business Bags', 2023, 2, 12, 7],
    #     ['Bags and Travel', 'Men Bags', 'Business Bags', 2023, 2, 13, 1],
    #     ['Bags and Travel', 'Men Bags', 'Business Bags', 2023, 2, 14, 2],
    #     ['Bags and Travel', 'Men Bags', 'Business Bags', 2023, 2, 15, 3],
    #     ['Bags and Travel', 'Men Bags', 'Business Bags', 2023, 2, 16, 4],
    #     ['Bags and Travel', 'Men Bags', 'Business Bags', 2023, 2, 17, 5],
    # ]   

    lists = r["lists"]

    indices_to_transform = [0, 1, 2]

    for lst in lists:
        for i in indices_to_transform:
            if i == 0:
                lst[i] = cat_encoder.transform([lst[i]])[0]
            elif i == 1:
                lst[i] = sub_cat_encoder.transform([lst[i]])[0]
            elif i == 2:
                lst[i] = subsub_cat_encoder.transform([lst[i]])[0]

            

    predictions = []
    for i in range(len(lists)):
        predictions.append(model.predict([lists[i]]))
    predictions = [float(arr[0]) for arr in predictions]

    return predictions
    
if __name__ == "__main__":
    app.run(port = 5000,debug = True,)