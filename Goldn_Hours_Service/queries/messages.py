from bson.objectid import ObjectId
from .client import Queries
import pymongo
import os
from pymongo import ReturnDocument, ASCENDING
from pymongo.errors import DuplicateKeyError
from models.messages import MessageIn, MessageOut


class MessagesQueries(Queries):
    DB_NAME = "Gold'n-Hours"

    def __init__(self, id: str):
        self.COLLECTION = id
