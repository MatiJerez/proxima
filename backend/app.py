from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open('items.json', 'r') as f:
    items = json.load(f)

class Item(BaseModel):
    id: int
    name: str
    description: str

def save_items():
    with open('items.json', 'w') as f:
        json.dump(items, f)

@app.get("/items", response_model=List[Item])
def get_items():
    return items

@app.post("/items", response_model=Item)
def create_item(item: Item):
    items.append(item.dict())
    save_items() 
    return item

@app.put("/items/{item_id}", response_model=Item)
def update_item(item_id: int, updated_item: Item):
    for i, item in enumerate(items):
        if item["id"] == item_id:
            items[i] = updated_item.dict()
            save_items()
            return updated_item
    raise HTTPException(status_code=404, detail="Item not found")

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    for i, item in enumerate(items):
        if item["id"] == item_id:
            del items[i]
            save_items()
            return {"message": "Item deleted successfully"}
    raise HTTPException(status_code=404, detail="Item not found")