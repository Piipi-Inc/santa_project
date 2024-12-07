from fastapi import FastAPI
import src.api.v1 as v1


app = FastAPI(title="Secret Santa API", version="0.1beta")

app.include_router(v1.router, prefix='/api/v1')