from bson.objectid import ObjectId
from .client import Queries
from models.accounts import Account, AccountIn, AccountOut
from pymongo import ReturnDocument, ASCENDING
from pymongo.errors import DuplicateKeyError

# from typing import Union


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = "Gold'n-Hours"
    COLLECTION = "accounts"

    def __init__(self):
        super().__init__()
        self.collection.create_index([("username", ASCENDING)], unique=True)
        self.collection.create_index([("email", ASCENDING)], unique=True)

    def get_all_accounts(self) -> list[AccountOut]:
        db = self.collection.find()
        accounts = []
        for document in db:
            document["id"] = str(document["_id"])
            accounts.append(AccountOut(**document))
        return accounts

    def get_account(self, account_id: str) -> AccountOut:
        props = self.collection.find_one({"_id": ObjectId(account_id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOut(**props)

    def get_account_by_username(self, account_username: str) -> AccountOut:
        props = self.collection.find_one({"username": account_username})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOut(**props)

    def create_account(self, info: AccountIn, hashed_password: str) -> Account:
        props = info.dict()
        props["password"] = hashed_password
        try:
            self.collection.insert_one(props)
        except DuplicateKeyError:
            raise DuplicateAccountError()
        props["id"] = str(props["_id"])
        return AccountOut(**props)

    def update_account(self, id: str, info: AccountIn):
        props = info.dict()
        try:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": props},
                return_document=ReturnDocument.AFTER,
            )
        except DuplicateKeyError:
            raise DuplicateAccountError()

        return AccountOut(**props, id=id)

    def delete_account(self, account_id: str) -> bool:
        username = self.get_account_by_username(account_id)["username"]
        return self.collection.delete_one({"_id": ObjectId(account_id)})
