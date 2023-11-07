from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pymysql
# import recommend
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# # MySQL 연결 설정
# db = pymysql.connect(
#     host="localhost",
#     user="root",
#     password="qwer1234",
#     db="finaldb",
# )


class WeightData(BaseModel):
    priceWeight: float
    ratingWeight: float
    reviewWeight: float


@app.get("/api/recommend")
def recommend(weights: WeightData):
    price_weight = weights.priceWeight
    rating_weight = weights.ratingWeight
    review_weight = weights.reviewWeight

    new_user = [price_weight,rating_weight,review_weight]

    recommended_tourist_data = recommend.get_recommendations(db, priceweight, ratingweight, reviewweight)
    return {"recommended_tourist_data": recommended_tourist_data}
# @app.get("/api/plansight")
# def get_plansight():
#     with db.cursor() as cursor:
#         cursor.execute("SELECT * FROM modelsight")
#         result = cursor.fetchall()
#         return {"modelsight_data": result}