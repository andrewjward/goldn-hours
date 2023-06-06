from fastapi.testclient import TestClient
from authenticator import authenticator
from main import app
from queries.pins import PinsQueries

client = TestClient(app)


class EmptyPostQueries:
    def get_all_pins(self):
        return [mock_data]


mock_data = {
        "username": "bob",
        "location_name": "New York, NY",
        "longitude": 69.69,
        "latitude": 69.69,
        "cloudy": 6,
        "windy": 9,
        "crowded": 6,
        "date": "6-22-2023",
        "image_url": "https://cdn.vox-cdn.com/thumbor/EtesRJ6lRBSoivaHZMdv9L8C8ro=/0x0:2000x1330/1200x800/filters:focal(840x505:1160x825)/cdn.vox-cdn.com/uploads/chorus_image/image/66852958/MGMGrand_hearts.0.jpg",
        "id": "1",
}

mock_user = {
  "id": "1",
  "username": "bob",
  "hashed_password": "$2b$12$IW8oG69il",
  "email": "bob@bob.com"
}


def account_override():
    return mock_user


def test_get_all_posts():
    app.dependency_overrides[PinsQueries] = EmptyPostQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override
    response = client.get('api/pins')
    assert response.status_code == 200
    app.dependency_overrides = {}


def test_init():
    assert 1 == 1
