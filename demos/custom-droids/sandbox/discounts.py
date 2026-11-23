def apply_discount(price_cents, percent):
    """Return the price after a percent discount, rounded down to whole cents."""
    return price_cents - price_cents * percent // 100
