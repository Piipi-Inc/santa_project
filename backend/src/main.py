from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import src.api.v1 as v1


app = FastAPI(title="Secret Santa API", version="0.1beta")

origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1.router, prefix="/api/v1")
