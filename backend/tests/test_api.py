from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Verdict Backend Running"}

def test_research_endpoint_invalid_ticker():
    # Test that providing an invalid ticker yields a 404
    response = client.post("/research", json={"ticker": "INVALID_TICKER_THAT_DOES_NOT_EXIST"})
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()
