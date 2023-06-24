from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)
from models.messages import MessageIn, Message, MessageOut
from models.accounts import Account
from queries.messages import MessagesQueries


router = APIRouter()


@router.post("/api/messages")
async def create_message(
    message: MessageIn,
    repo: MessagesQueries = Depends(),
    account: Account = Depends(authenticator.try_get_current_account_data),
):
    if account:
        message = repo.create_message(message)
        return message
    else:
        return None

@router.get("/api/messages")
async def list_messages(
    username: str | None = None,
    repo: MessagesQueries = Depends(),
    long: float | None = None,
    lat: float | None = None,
    radius: float | None = 1,
):
    if username:
        return repo.get_user_messages(username)
    if long and lat:
        return repo.get_by_location(long=long, lat=lat, radius=radius)
    return repo.get_all_messages()


@router.get("/api/messages/{message_id}", response_model=MessageOut)
async def get_message(
    message_id: str,
    repo: MessagesQueries = Depends(),
):
    message = repo.get_one_message(id=message_id)
    return message


@router.delete("/api/messages/{message_id}", response_model=bool | str)
async def delete_message(
    message_id: str,
    repo: MessagesQueries = Depends(),
    account: Account = Depends(authenticator.try_get_current_account_data),
):
    if account:
        repo.delete_message(message_id)
        return True
    else:
        return None