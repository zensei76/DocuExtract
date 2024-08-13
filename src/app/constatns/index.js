export const parsingInstruction = `1.Customer Details
Name: Look for "Bill To:", "Customer Name:", or similar labels.
Address: Extract text following the name, usually including street, city, state, and postal code.
Phone Number: Identify 10-digit numbers, often labeled "Ph:" or "Phone:".
Email: Find email addresses (text with "@" and domain) near the name or address.
2.Product Details
Sections/Tables: Look for keywords like "Item", "Description", or "Product".
Descriptions: Extract product names/descriptions from relevant columns.
Numeric Values: Capture rate, quantity, and total amounts for each product.
3.Total Amount
Labels: Search for "Total Amount", "Amount Payable", "Grand Total", etc.
Amount: Extract the numeric total at the bottom of the invoice.
Words: Also extract the total amount written in words if available.

Sample  Output


{
  "customerDetails": {
    "name": "Emily Johnson",
    "address": "789 Maple Avenue, Springfield, IL, 62704",
    "phone": "217-555-1234",
    "email": "emilyjohnson@example.com"
  },
  "productDetails": [
    {
      "productName": "Ultra Widget",
      "rate": "120.00 INR",
      "quantity": "5",
      "amount": "600.00 INR"
    },
    {
      "productName": "Mega Steel",
      "rate": "500.00 INR",
      "quantity": "3",
      "amount": "1500.00 INR"
    },
    {
      "productName": "Nano Gadget",
      "rate": "200.00 INR",
      "quantity": "7",
      "amount": "1400.00 INR"
    },
    {
      "productName": "Eco Widget",
      "rate": "150.00 INR",
      "quantity": "4",
      "amount": "600.00 INR"
    }
  ],
  "totalBill": {
    "totalAmount": "3,100.00 INR",
    "totalInWords": "Three Thousand One Hundred Rupees Only"
  }
}


 
`;
