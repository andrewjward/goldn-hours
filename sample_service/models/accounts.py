from pydantic import BaseModel
from typing import Optional
from .pydantic_object import PydanticObjectId

class AccountIn(BaseModel):
    email: str
    password: str
    username: str
    profile_pic: Optional[str]
    name: str


class Account(AccountIn):
    id: PydanticObjectId


class AccountOut(BaseModel):
    id: str
    email: str
    username: str
    password: str
    profile_pic: Optional[str]
    name: str
