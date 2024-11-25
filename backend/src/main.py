from fastapi import FastAPI
import src.api.v1 as v1


app = FastAPI(title="Secret Santa API", version="1.0")

app.include_router(v1.router, prefix='/api/v1')