import unittest

from shipping import shipping_cost


class ShippingTests(unittest.TestCase):
    def test_non_numeric_subtotals(self):
        for subtotal in ("5000", "invalid", "", None, [], {}, True, False):
            with self.subTest(subtotal=subtotal):
                with self.assertRaisesRegex(TypeError, "Subtotal must be a number"):
                    shipping_cost(subtotal)

    def test_fractional_subtotal_remains_supported(self):
        self.assertEqual(shipping_cost(4999.5), 500)
        self.assertEqual(shipping_cost(5000.5), 0)

    def test_negative_subtotal(self):
        with self.assertRaises(ValueError):
            shipping_cost(-1)

    def test_zero(self):
        self.assertEqual(shipping_cost(0), 500)

    def test_below_threshold(self):
        self.assertEqual(shipping_cost(4999), 500)

    def test_at_threshold(self):
        self.assertEqual(shipping_cost(5000), 0)

    def test_above_threshold(self):
        self.assertEqual(shipping_cost(5001), 0)


if __name__ == "__main__":
    unittest.main()
