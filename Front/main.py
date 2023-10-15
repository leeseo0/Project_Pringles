from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import math
# from pydantic import BaseModel

app = FastAPI()

# MySQL 연결 설정
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="qwer1234",
    database="finaldb"
)
cursor = db.cursor()

# 데이터 조회
cursor.execute("SELECT sightid, name, type, address1, address2, rating, ratingscore, reviewscore, pricescore, firstimage, latitude, longitude FROM plansight")
# cursor.execute("SELECT * FROM plansight")
results = cursor.fetchall()

# 가격,별점,리뷰 순
priceweight = 0.2
ratingweight = 0.3
reviewweight = 0.5
user_weight = [priceweight,ratingweight,reviewweight]

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# 총점 가중 계산
weighted_results = []
for row in results:
    sightid, name, type, address1, address2, rating, ratingscore, reviewscore, pricescore, firstimage, latitude, longitude = row
    weighted_score = (ratingscore + reviewscore + pricescore) / 3
    weighted_results.append((sightid, weighted_score, name, type, address1, address2, rating, ratingscore, reviewscore, pricescore, firstimage, latitude, longitude))

# 가중 점수가 높은 관광지 찾기
weighted_results.sort(key=lambda x: x[1], reverse=True)
top_destination = weighted_results[0]

# 유클리디안 거리 계산 함수
def euclidean_distance(a, b):
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))

# ratingscore, reviewscore, pricescore 기준으로 유클리디안 거리 계산
target_scores = (top_destination[6], top_destination[7], top_destination[8])  # top_destination의 점수

similar_destinations = []
for destination in weighted_results:
    destination_scores = (destination[6], destination[7], destination[8])  # 다른 관광지의 점수
    distance = euclidean_distance(target_scores, destination_scores)
    similar_destinations.append((destination, distance))

# 거리를 기준으로 정렬
similar_destinations.sort(key=lambda x: x[1])

# 상위 40개 유사한 관광지 선택
top_similar_destinations = similar_destinations[:40]

@app.get("/recommendations")
def get_recommendations():
    return top_similar_destinations
    # return weighted_results

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
