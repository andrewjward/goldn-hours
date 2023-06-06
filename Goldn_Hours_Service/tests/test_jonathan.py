from fastapi.testclient import TestClient
from main import app
from queries.pins import PinsQueries
from authenticator import authenticator


client = TestClient(app)


class DeletePinQueries:
    def delete_pin(self, id: int):
        result = {f"Pin {id} deleted": True}
        return result


def test_delete_pin():
    app.dependency_overrides[PinsQueries] = DeletePinQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = DeletePinQueries
    response = client.delete("/api/pins/1")
    assert response.status_code == 200


def test_init():
    assert 1 == 1
