import unittest

from shipping import shipping_cost


class ShippingTests(unittest.TestCase):
    def test_below_threshold(self):
        self.assertEqual(shipping_cost(4999), 500)

    def test_at_threshold(self):
        self.assertEqual(shipping_cost(5000), 0)

    def test_above_threshold(self):
        self.assertEqual(shipping_cost(5001), 0)


if __name__ == "__main__":
    unittest.main()
