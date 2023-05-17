from bson.objectid import ObjectId
from .client import Queries
from models.accounts import Account, AccountIn, AccountOut
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError
from typing import Union


class DuplicateAccountError(ValueError):
    pass


class AccountQueries(Queries):
    DB_NAME = "cards"
    COLLECTION = "accounts"


    def get_all_accounts(self) -> list[AccountOut]:
        db = self.collection.find()
        accounts = []
        for document in db:
            document["id"] = str(document["_id"])
            accounts.append(AccountOut(**document))
        return accounts

    def get_account(self, username: str) -> AccountOut:
        props = self.collection.find_one({"username": username})
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


    def update_account(self, id: str, info: AccountIn, hashed_password: Union[None, str]):
        props = info.dict()
        if hashed_password is not None:
            props["unhashed_password"] = props["password"]
            props["password"] = hashed_password

        try:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$set": props},
                return_document=ReturnDocument.AFTER,
            )
        except DuplicateKeyError:
            raise DuplicateAccountError()

        return AccountOut(**props, id=id)

    def delete_account(self, username: str) -> bool:
        return self.collection.delete_one({"username": username})
