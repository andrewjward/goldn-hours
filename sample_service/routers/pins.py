from fastapi import APIRouter
from queries.pins import PinIn

router = APIRouter()
@router.post("/pins")
def create_pin(pin: PinIn):
    print('pin', pin)
    return pin