// table.js - Activity 6
const products = [
  { name: "Coffee Beans", quantity: 10, price: 25.00 },
  { name: "Espresso Machine", quantity: 5, price: 300.00 },
  { name: "Mug Set", quantity: 8, price: 40.00 },
  { name: "Matcha Powder", quantity: 12, price: 18.50 }
];

const tbody = document.querySelector('#product-table tbody');

function formatPrice(n){
  return '₱' + n.toFixed(2);
}

for (let i = 0; i < products.length; i++) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${products[i].name}</td>
    <td>${products[i].quantity}</td>
    <td>${formatPrice(products[i].price)}</td>
  `;
  tbody.appendChild(row);
  console.log(Activity6: added row for ${products[i].name});
}