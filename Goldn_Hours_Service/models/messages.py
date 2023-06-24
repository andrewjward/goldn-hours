from pydantic import BaseModel
import datetime


class MessageIn(BaseModel):
    sender: str
    receiver: str
    username: str
    timestamp: datetime.datetime
    content: str


class MessageOut(MessageIn):
    id: str
