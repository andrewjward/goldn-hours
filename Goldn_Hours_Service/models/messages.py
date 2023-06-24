from pydantic import BaseModel
import datetime
from .pydantic_object import PydanticObjectId


class MessageIn(BaseModel):
    sender: str
    receiver: str
    username: str
    timestamp: datetime.datetime
    content: str

class Message(MessageIn):
    id: PydanticObjectId

class MessageOut(MessageIn):
    id: str
