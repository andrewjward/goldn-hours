from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from models.pins import PinIn
from queries.pins import PinsQueries


router = APIRouter()


@router.post("/api/pins")
async def create_pin(
    pin: PinIn,
    repo: PinsQueries = Depends(),

):
    pin = repo.create_pin(pin)
    return pin


@router.get("/api/pins")
async def list_pins(repo: PinsQueries = Depends()):
    return repo.get_all_pins()


@router.delete("/api/pins/{pin_id}", response_model=bool | str)
async def delete_pin(
    pin_id: str,
    repo: PinsQueries = Depends(),
):
    repo.delete_pin(pin_id)
    return True