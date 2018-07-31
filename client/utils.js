//calculate tax and total
export function calculateTaxAndTotal(lineItems) {
  if (lineItems.length) {
    const sumTotal = lineItems.reduce((sum, item) => {
      sum = sum + item.product.price * item.quantity
      return sum
    }, 0)
    const tax = Math.round(0.0875 * sumTotal * 100) / 100
    const total = Math.round((tax + sumTotal) * 100) / 100
    return {tax, total}
  } else console.log(lineItems)
  return null
}
