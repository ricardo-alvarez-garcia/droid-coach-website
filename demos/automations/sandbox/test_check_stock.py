import json
from pathlib import Path
import unittest

from check_stock import low_stock


class StockTests(unittest.TestCase):
    def test_empty_inventory(self):
        self.assertEqual(low_stock([]), [])

    def test_threshold(self):
        items = [
            {"name": "Empty", "quantity": 0},
            {"name": "At threshold", "quantity": 2},
            {"name": "Above threshold", "quantity": 3},
        ]
        self.assertEqual(low_stock(items), items[:2])

    def test_practice_inventory(self):
        path = Path(__file__).with_name("inventory.json")
        items = json.loads(path.read_text(encoding="utf-8"))
        self.assertEqual(
            low_stock(items),
            [{"name": "Pens", "quantity": 1}, {"name": "Tape", "quantity": 0}],
        )


if __name__ == "__main__":
    unittest.main()
