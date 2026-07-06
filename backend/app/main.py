from fastapi import FastAPI
<<<<<<< HEAD
=======
from fastapi.middleware.cors import CORSMiddleware
>>>>>>> bc7f3ac (Continue Verdict v1.0 development)
from app.api.routes import router
from app.config.settings import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

<<<<<<< HEAD
=======
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

>>>>>>> bc7f3ac (Continue Verdict v1.0 development)
app.include_router(router)