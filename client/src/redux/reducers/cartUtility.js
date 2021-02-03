// calculate total items in cart
export const getCartQty = items => {
    return items.reduce((a, b) => {
        return a + b.qty
    }, 0)
};

// calculate total cart amount
export const getCartTotal = items => {
    return items.reduce((a, b) => {
        return a + (b.qty * b.price)
    }, 0)
}