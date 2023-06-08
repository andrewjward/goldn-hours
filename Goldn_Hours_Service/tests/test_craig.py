from fastapi.testclient import TestClient
from main import app
from queries.pins import PinsQueries, PinOut


client = TestClient(app)


class GetOnePinQueries:
    def get_one_pin(self, id):
        return PinOut(
            id=1,
            username="username",
            location_name="location_name",
            longitude=69,
            latitude=69,
            cloudy=0,
            windy=0,
            crowded=0,
            date="string",
            image_url="string",
        )


def test_get_pin():
    expected = {
        "id": "1",
        "username": "username",
        "location_name": "location_name",
        "longitude": 69,
        "latitude": 69,
        "cloudy": 0,
        "windy": 0,
        "crowded": 0,
        "date": "string",
        "image_url": "string",
    }

    app.dependency_overrides[PinsQueries] = GetOnePinQueries
    response = client.get("/api/pins/1")
    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
