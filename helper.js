const calculateTotalPrice = (cartItems, productId) => {
    // Check if there is exactly one item in the cart
    if (cartItems.length === 1) {
      const singleProduct = cartItems[0];
      const totalSingleProductPrice = singleProduct.price * singleProduct.quantity;
      return totalSingleProductPrice;
    }
  
    // Check if there are multiple items in the cart
    if (cartItems.length > 1) {
      // Calculate total price using reduce
      const total = cartItems.reduce((accumulator, item) => {
        // Check if a specific productId is provided
        if (productId) {
          return item.id === productId ? accumulator + item.price * item.quantity : accumulator;
        }
  
        // Calculate total price for all products
        return accumulator + item.price * item.quantity;
      }, 0);
  
      return total;
    }
  
    // Return 0 if the cart is empty
    return 0;
  };


  