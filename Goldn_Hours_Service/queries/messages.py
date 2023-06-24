from bson.objectid import ObjectId
from .client import Queries
import pymongo
import os
from typing import List
from pymongo import ReturnDocument, ASCENDING
from pymongo.errors import DuplicateKeyError
from models.messages import MessageIn, MessageOut


class MessagesQueries(Queries):
    DB_NAME = "Gold'n-Hours"
    COLLECTION = "messages"

    def create_message(self, message: MessageIn) -> MessageOut:
        props = message.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return MessageOut(**props)
    
    def get_all_messages(self) -> List[MessageOut]:
        db = self.collection.find()
        messages = []
        for message in db:
            message["id"] = str(message["_id"])
            messages.append(MessageOut(**message))
        return messages

    def get_user_messages(self, username: str) -> List[MessageOut]:
        db = self.collection.find({"username": username})
        messages = []
        for message in db:
            message["id"] = str(message["_id"])
            messages.append(MessageOut(**message))
        return messages
    
    def get_one_message(self, id: str) -> MessageOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return MessageOut(**props)
    
    def delete_message(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})