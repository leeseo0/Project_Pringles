from sqlalchemy import create_engine, Table, MetaData, select

SQL_URL = "mysql+pymysql://root:qwer1234@localhost:3306/finaldb"
engine = create_engine(SQL_URL, echo=True)

metadata_obj = MetaData(bind=engine)

# 데이터베이스에서 테이블 가져오기
user_table = Table("modeluser", metadata_obj, autoload_with=engine)

# 데이터 불러오기 (Read, Select)
with engine.connect() as connection:
    select_query = select([user_table])
    results = connection.execute(select_query)
    for row in results:
        print(row.price_weight, row.rating_weight, row.review_weight)
