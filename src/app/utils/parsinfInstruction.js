export const parsingInstruction=`1.Customer Details
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
Sample JSON Output
json
Copy code
{
  "CustomerDetails": {
    "Name": "Jane Smith",
    "Address": "456 Elm Street, Metropolis, NY, 10001",
    "PhoneNumber": "2125557890",
    "Email": "janesmith@example.com"
  },
  "ProductDetails": [
    {
      "ProductName": "Super Widget",
      "Rate": {
        "Amount": "75.00",
        "Currency": "USD"
      },
      "Quantity": "8",
      "TotalAmount": {
        "Amount": "600.00",
        "Currency": "USD"
      }
    },
    {
      "ProductName": "Mega Widget",
      "Rate": {
        "Amount": "150.00",
        "Currency": "USD"
      },
      "Quantity": "3",
      "TotalAmount": {
        "Amount": "450.00",
        "Currency": "USD"
      }
    }
  ],
  "TotalAmount": {
    "AmountInNumeric": {
      "Amount": "1050.00",
      "Currency": "USD"
    },
    "AmountInWords": "One Thousand Fifty Dollars Only"
  }
}`