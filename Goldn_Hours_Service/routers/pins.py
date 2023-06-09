from fastapi import (
    Depends,
    APIRouter,
)
from authenticator import authenticator
from models.pins import PinIn, PinOut
from models.accounts import Account
from queries.pins import PinsQueries


router = APIRouter()


@router.post("/api/pins")
async def create_pin(
    pin: PinIn,
    repo: PinsQueries = Depends(),
    account: Account = Depends(authenticator.try_get_current_account_data),
):
    if account:
        pin = repo.create_pin(pin)
        return pin
    else:
        return None


@router.get("/api/pins")  # ?q= optional query for specific user's pins
async def list_pins(
    username: str | None = None,
    repo: PinsQueries = Depends(),
    long: float | None = None,
    lat: float | None = None,
    radius: float | None = 1,
):
    if username:
        return repo.get_user_pins(username)
    if long and lat:
        return repo.get_by_location(long=long, lat=lat, radius=radius)
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
    account: Account = Depends(authenticator.try_get_current_account_data),
):
    if account:
        repo.delete_pin(pin_id)
        return True
    else:
        return None
