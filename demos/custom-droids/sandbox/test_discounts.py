import unittest

from discounts import apply_discount


class ApplyDiscountTests(unittest.TestCase):
    def test_ten_percent_off(self):
        self.assertEqual(apply_discount(1000, 10), 900)

    def test_no_discount(self):
        self.assertEqual(apply_discount(1000, 0), 1000)


if __name__ == "__main__":
    unittest.main()
