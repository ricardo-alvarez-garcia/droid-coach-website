import json
from pathlib import Path


def low_stock(items):
    return [item for item in items if item["quantity"] <= 2]


def main():
    inventory = Path(__file__).with_name("inventory.json")
    items = json.loads(inventory.read_text(encoding="utf-8"))
    flagged = low_stock(items)
    print(f"Low-stock items: {len(flagged)}")
    for item in flagged:
        print(f"{item['name']}: {item['quantity']} remaining")


if __name__ == "__main__":
    main()
