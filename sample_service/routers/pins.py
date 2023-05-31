from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from models.pins import PinIn, PinOut
from queries.pins import PinsQueries


router = APIRouter()


@router.post("/api/pins")
async def create_pin(
    pin: PinIn,
    repo: PinsQueries = Depends(),
):
    pin = repo.create_pin(pin)
    return pin


@router.get("/api/pins")  # ?q= optional query for specific user's pins
async def list_pins(
    username: str | None = None, repo: PinsQueries = Depends()
):
    if username:
        return repo.get_user_pins(username)
    return repo.get_all_pins()


@router.get("/api/pins/{pin_id}", response_model=PinOut)
async def get_pin(
    pin_id: str,
    repo: PinsQueries = Depends(),
):
    pin = repo.get_one_pin(id=pin_id)
    return pin


@router.delete("/api/pins/{pin_id}", response_model=bool | str)
async def delete_pin(
    pin_id: str,
    repo: PinsQueries = Depends(),
):
    repo.delete_pin(pin_id)
    return True
