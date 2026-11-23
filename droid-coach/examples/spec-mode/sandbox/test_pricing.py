import unittest

from pricing import apply_discount


class ApplyDiscountTest(unittest.TestCase):
    def test_ten_percent_off(self):
        self.assertEqual(apply_discount(50.0, 10), 45.0)

    def test_no_discount(self):
        self.assertEqual(apply_discount(19.99, 0), 19.99)


if __name__ == "__main__":
    unittest.main()
