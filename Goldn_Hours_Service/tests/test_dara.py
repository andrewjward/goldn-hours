from fastapi.testclient import TestClient
from main import app
from queries.pins import PinsQueries
from authenticator import authenticator

client = TestClient(app)

class CreatePin:
    def create_pin(self, pin):
        result = {
            "username": "bob",
            "location_name": "New York, NY",
            "longitude": 49.65,
            "latitude": 12.88,
            "cloudy": 6,
            "windy": 9,
            "crowded": 2,
            "date": "6-22-2023",
            "image_url": "https://cdn.vox-cdn.com/thumbor/EtesRJ6lRBSoivaHZMdv9L8C8ro=/0x0:2000x1330/1200x800/filters:focal(840x505:1160x825)/cdn.vox-cdn.com/uploads/chorus_image/image/66852958/MGMGrand_hearts.0.jpg",
            "id": "1",
        }
        result.update(pin)
        return result

mock_data = {
    "username": "bob",
    "location_name": "New York, NY",
    "longitude": 49.65,
    "latitude": 12.88,
    "cloudy": 6,
    "windy": 9,
    "crowded": 2,
    "date": "6-22-2023",
    "image_url": "https://cdn.vox-cdn.com/thumbor/EtesRJ6lRBSoivaHZMdv9L8C8ro=/0x0:2000x1330/1200x800/filters:focal(840x505:1160x825)/cdn.vox-cdn.com/uploads/chorus_image/image/66852958/MGMGrand_hearts.0.jpg",

}


def account_override():
    return mock_data


def test_create_pin():
    app.dependency_overrides[PinsQueries] = CreatePin
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = account_override
    json = {
        "username": "bob",
        "location_name": "New York, NY",
        "longitude": 49.65,
        "latitude": 12.88,
        "cloudy": 6,
        "windy": 9,
        "crowded": 2,
        "date": "6-22-2023",
        "image_url": "https://cdn.vox-cdn.com/thumbor/EtesRJ6lRBSoivaHZMdv9L8C8ro=/0x0:2000x1330/1200x800/filters:focal(840x505:1160x825)/cdn.vox-cdn.com/uploads/chorus_image/image/66852958/MGMGrand_hearts.0.jpg",
        "id": "1",
    }
    expected = {
        "username": "bob",
        "location_name": "New York, NY",
        "longitude": 49.65,
        "latitude": 12.88,
        "cloudy": 6,
        "windy": 9,
        "crowded": 2,
        "date": "6-22-2023",
        "image_url": "https://cdn.vox-cdn.com/thumbor/EtesRJ6lRBSoivaHZMdv9L8C8ro=/0x0:2000x1330/1200x800/filters:focal(840x505:1160x825)/cdn.vox-cdn.com/uploads/chorus_image/image/66852958/MGMGrand_hearts.0.jpg",
        "id": "1",
        }
    response = client.post("/api/pins", json=json)

    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
