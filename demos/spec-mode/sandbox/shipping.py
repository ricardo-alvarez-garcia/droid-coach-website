def shipping_cost(subtotal_cents):
    """Return shipping in cents for a nonnegative int or float subtotal."""
    if isinstance(subtotal_cents, bool) or not isinstance(subtotal_cents, (int, float)):
        raise TypeError("Subtotal must be a number")
    if subtotal_cents < 0:
        raise ValueError("Subtotal must not be negative")
    if subtotal_cents >= 5000:
        return 0
    return 500
