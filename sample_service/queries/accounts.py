from queries.client import Queries

# from bson.objectid import ObjectId
from pydantic import BaseModel

from typing import Optional, List
from pymongo.errors import DuplicateKeyError


# class PydanticObjectId(ObjectId):
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.validate

#     @classmethod
#     def validate(cls, value: ObjectId | str) -> ObjectId:
#         if value:
#             try:
#                 ObjectId(value)
#             except:
#                 raise ValueError(f"Not a valid object id: {value}")
#         return value


class DuplicateAccountError(ValueError):
    pass


class SessionOut(BaseModel):
    jti: str
    account_id: str


class AccountIn(BaseModel):
    username: Optional[str]
    email: str
    password: str
    full_name: str


# class Account(AccountIn):
#     # id: PydanticObjectId
#     id: str  # what is PydanticObjectId??
#     # roles: List[str]


class AccountOut(AccountIn):
    id: str


# class AccountOutWithPassword(AccountOut):
#     hashed_password: str


class AccountQueries(Queries):
    DB_NAME = "mongo-data"
    COLLECTION = "accounts"

    def get(self, username: str) -> AccountOut:
        pass

    def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
        props = info.dict()
        props["password"] = hashed_password
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])

        return AccountOut(**props)

    def get_all_accounts(self) -> list[AccountOut]:
        db = self.collection.find()
        accounts = []
        for document in db:
            document["id"] = str(document["_id"])
            accounts.append(AccountOut(**document))
        return accounts
