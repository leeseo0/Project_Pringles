from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import re
import json
import pandas as pd
import mysql.connector
import math
import ast
import geopy.distance

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
sights = cursor.fetchall()

cursor.execute("SELECT sightid, name, type, address1, address2, rating, ratingscore, reviewscore, pricescore, firstimage, latitude, longitude FROM plansight")
plan_sights = cursor.fetchall()

cursor.execute("SELECT hostelid, name, type, address1, address2, tel, homepage, checktime, petinfo, placeinfo, rating, review, theme, themenum, firstimage, latitude, longitude FROM planhostel")
hostels = cursor.fetchall()

class WeightData(BaseModel):
    priceweight: float
    ratingweight: float
    reviewweight: float
    pagenum: int

class ScheduleData(BaseModel):
    title: str
    startdate: str
    enddate: str 
    days: int 
    accommodation: str
    recommendyn:str 
    priceweight: float 
    ratingweight: float
    reviewweight: float 
    sights: str
    transportation: str 

class ScheduleDetailData(BaseModel):
    schedule_id: int
    title: str
    startdate: str
    enddate: str 
    days: int 
    accommodation: str
    recommendyn:str 
    priceweight: float 
    ratingweight: float
    reviewweight: float 
    sights: str
    transportation: str

# 유클리디안 거리 계산 함수
def euclidean_distance(a, b):
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))

@app.post("/recommendations")
def get_recommendations(weightparameter:WeightData):
    # print(weightparameter)
    # 가중치 계산
    # dict(weightparameter)
    priceweight = weightparameter.priceweight
    ratingweight = weightparameter.ratingweight
    reviewweight = weightparameter.reviewweight
    totalweight = priceweight+ratingweight+reviewweight
    
    if totalweight != 0:    
        priceweight /= totalweight
        ratingweight /= totalweight
        reviewweight /= totalweight

    # 총점 가중 계산
    weighted_sights = []
    for row in sights:
        sightid, name, type, address1, address2, rating, ratingscore, reviewscore, pricescore, firstimage, latitude, longitude = row
        weighted_score = priceweight * (1 - pricescore) + ratingweight * ratingscore + reviewweight * reviewscore
        weighted_sights.append((sightid, weighted_score, name, type, address1, address2, rating, ratingscore, reviewscore, pricescore, firstimage, latitude, longitude))

    # 가중 점수가 높은 관광지 찾기
    weighted_sights.sort(key=lambda x: x[1], reverse=True)
    top_destination = weighted_sights[0]

    # ratingscore, reviewscore, pricescore 기준으로 유클리디안 거리 계산
    target_scores = (top_destination[6], top_destination[7], top_destination[8])  # top_destination의 점수

    similar_destinations = []
    for destination in weighted_sights:
        destination_scores = (destination[6], destination[7], destination[8])  # 다른 관광지의 점수
        distance = euclidean_distance(target_scores, destination_scores)
        similar_destinations.append((destination, distance))

    # 거리를 기준으로 정렬
    similar_destinations.sort(key=lambda x: x[1])

    # 상위 50개 유사한 관광지 선택
    top_similar_destinations = similar_destinations[:50]
    len_similar_destinations=len(top_similar_destinations)

    start = weightparameter.pagenum * 10
    end = start + 10
    
    return {'destinations':top_similar_destinations[start:end], 'total_num':len_similar_destinations}

@app.post("/recommendschedule")
def get_recommendschedule(Schedulelist:ScheduleData):
    title = Schedulelist.title
    startdate = Schedulelist.startdate
    enddate = Schedulelist.startdate
    days = Schedulelist.days
    accommodation = Schedulelist.accommodation
    recommendyn = Schedulelist.recommendyn
    priceweight = Schedulelist.priceweight
    ratingweight = Schedulelist.ratingweight
    reviewweight = Schedulelist.reviewweight
    sights = Schedulelist.sights
    transportation = Schedulelist.transportation

    schedule_hostels =[]
    for row in hostels:
        hostelid, name, type, address1, address2, tel, homepage, checktime, petinfo, placeinfo, rating, review, theme, themenum, firstimage, latitude, longitude = row
        schedule_hostels.append((hostelid, name, type, address1, address2, tel, homepage, checktime, petinfo, placeinfo, rating, review, theme, themenum, firstimage, latitude, longitude))

    schedule_hostel = pd.DataFrame.from_dict(schedule_hostels)

    print(ast.literal_eval(accommodation))
    hostel_names = [item['name'] for item in ast.literal_eval(accommodation)]
    print(hostel_names)
    select_hostel = schedule_hostel[schedule_hostel[1].isin(hostel_names)]
    print(select_hostel)
    sight_names = [item[0][2:] for item in ast.literal_eval(sights)]
    print(sight_names)
    select_sights = pd.DataFrame(sight_names)

    jeju_airport = (33.5070537, 126.492776)

    start_locations = []
    start_locations.append(jeju_airport)
    for index, row in select_hostel.iterrows():
        start_location = (row[15], row[16])
        start_locations.append(start_location)
    sight_coordinates = [(row[9], row[10], row[0]) for _, row in select_sights.iterrows()]

    start_names = ['Jeju Airport'] + list(select_hostel[1])
    result_df = pd.DataFrame(columns=['day', 'start_name', 'start_latitude', 'start_longitude', 'sight_name', 'sight_latitude', 'sight_longitude'])
    print(start_names)


    allocated_sights_per_day = set()  

    for i in range(len(start_locations)):
        start_location = start_locations[i]
        start_name = start_names[i]  # 시작 위치의 이름
    
        # 시작 위치에서 모든 관광지까지의 거리 계산
        distances = [(sight[0], sight[1], sight[2], geopy.distance.great_circle(start_location, (sight[0], sight[1])).kilometers) for sight in sight_coordinates]

        # 거리를 기준으로 관광지를 가장 가까운 순으로 정렬
        distances.sort(key=lambda x: x[3])

        # 가장 가까운 4개의 관광지 할당 (중복 제외)
        allocated_count = 0
        for dist in distances:
            if dist[2] not in allocated_sights_per_day:
                result_df = result_df.append({'day': i + 1, 'start_name': start_name, 'start_latitude': start_location[0], 'start_longitude': start_location[1], 'sight_name': dist[2], 'sight_latitude': dist[0], 'sight_longitude': dist[1]}, ignore_index=True)
                allocated_sights_per_day.add(dist[2])
                allocated_count += 1
                if allocated_count >= 3:
                    break
    print(allocated_sights_per_day)
    print(result_df)
    # # dataframe을 json으로 변환
    schedule_result = result_df.to_json(orient="records")
    return json.loads(schedule_result)

@app.post("/scheduleDetail")
def get_recommendschedule(schedule_data:ScheduleDetailData):
    schedule_id_d: schedule_data.schedule_id
    title_d = schedule_data.title
    startdate = schedule_data.startdate
    enddate = schedule_data.startdate
    days = schedule_data.days
    accommodation = schedule_data.accommodation
    recommendyn = schedule_data.recommendyn
    priceweight = schedule_data.priceweight
    ratingweight = schedule_data.ratingweight
    reviewweight = schedule_data.reviewweight
    sights = schedule_data.sights
    transportation = schedule_data.transportation

    schedule_sights = []
    for row in plan_sights:
        sightid, name, type, address1, address2, rating, ratingscore, reviewscore, pricescore, firstimage, latitude, longitude = row
        schedule_sights.append((sightid, name, type, address1, address2, rating, ratingscore, reviewscore, pricescore, firstimage, latitude, longitude))

    schedule_hostels =[]
    for row in hostels:
        hostelid, name, type, address1, address2, tel, homepage, checktime, petinfo, placeinfo, rating, review, theme, themenum, firstimage, latitude, longitude = row
        schedule_hostels.append((hostelid, name, type, address1, address2, tel, homepage, checktime, petinfo, placeinfo, rating, review, theme, themenum, firstimage, latitude, longitude))

    schedule_sight = pd.DataFrame.from_dict(schedule_sights)
    schedule_hostel = pd.DataFrame.from_dict(schedule_hostels)

    hostel_names_str = ast.literal_eval(accommodation)
    hostel_names = re.findall(r'"(.*?)"', hostel_names_str)
    select_hostel = schedule_hostel[schedule_hostel[1].isin(hostel_names)]
    sight_names_str = ast.literal_eval(sights)
    sight_names = re.findall(r'"(.*?)"', sight_names_str)
    select_sights = schedule_sight[schedule_sight[1].isin(sight_names)]

    jeju_airport = (33.5070537, 126.492776)

    start_locations = []
    start_locations.append(jeju_airport)
    for index, row in select_hostel.iterrows():
        start_location = (row[15], row[16])
        start_locations.append(start_location)
    sight_coordinates = [(row[10], row[11], row[1]) for _, row in select_sights.iterrows()]

    start_names = ['Jeju Airport'] + list(select_hostel[1])
    result_df = pd.DataFrame(columns=['day', 'start_name', 'start_latitude', 'start_longitude', 'sight_name', 'sight_latitude', 'sight_longitude'])
    print(start_names)


    allocated_sights_per_day = set()  

    for i in range(len(start_locations)):
        start_location = start_locations[i]
        start_name = start_names[i]  # 시작 위치의 이름
    
        # 시작 위치에서 모든 관광지까지의 거리 계산
        distances = [(sight[0], sight[1], sight[2], geopy.distance.great_circle(start_location, (sight[0], sight[1])).kilometers) for sight in sight_coordinates]

        # 거리를 기준으로 관광지를 가장 가까운 순으로 정렬
        distances.sort(key=lambda x: x[3])

        # 가장 가까운 4개의 관광지 할당 (중복 제외)
        allocated_count = 0
        for dist in distances:
            if dist[2] not in allocated_sights_per_day:
                result_df = result_df.append({'day': i + 1, 'start_name': start_name, 'start_latitude': start_location[0], 'start_longitude': start_location[1], 'sight_name': dist[2], 'sight_latitude': dist[0], 'sight_longitude': dist[1]}, ignore_index=True)
                allocated_sights_per_day.add(dist[2])
                allocated_count += 1
                if allocated_count >= 4:
                    break
    print(allocated_sights_per_day)
    print(result_df)
    # # dataframe을 json으로 변환
    schedule_result = result_df.to_json(orient="records")
    return json.loads(schedule_result)
