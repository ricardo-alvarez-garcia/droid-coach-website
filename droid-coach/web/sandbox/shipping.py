def shipping_cost(subtotal_cents):
    """Calculate fictional shipping in cents."""
    if subtotal_cents > 5000:
        return 0
    return 500
