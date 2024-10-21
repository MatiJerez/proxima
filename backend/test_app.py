import pytest
from fastapi.testclient import TestClient
from app import app, items

client = TestClient(app)

@pytest.fixture(autouse=True)
def reset_items():
    items.clear()
    items.extend([
        {"id": 1, "name": "item1", "description": "description1"},
        {"id": 2, "name": "item2", "description": "description2"}
    ])

def test_get_items():
    response = client.get("/items")
    assert response.status_code == 200
    assert len(response.json()) == 2
    assert response.json()[0]["name"] == "item1"

def test_create_item():
    new_item = {
        "id": 3,
        "name": "item3",
        "description": "description3"
    }
    response = client.post("/items", json=new_item)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == new_item["name"]
    assert len(items) == 3

def test_update_item():
    updated_item = {
        "id": 1,
        "name": "updated_item1",
        "description": "updated_description1"
    }
    response = client.put("/items/1", json=updated_item)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "updated_item1"
    assert items[0]["name"] == "updated_item1"

def test_update_item_not_found():
    updated_item = {
        "id": 999,
        "name": "non_existent_item",
        "description": "non_existent_description"
    }
    response = client.put("/items/999", json=updated_item)
    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"

def test_delete_item():
    response = client.delete("/items/1")
    assert response.status_code == 200
    assert response.json() == {"message": "Item deleted successfully"}
    assert len(items) == 1

def test_delete_item_not_found():
    response = client.delete("/items/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"