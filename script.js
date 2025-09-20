const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let cryptoData = [];

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    cryptoData = await response.json();
    renderTable(cryptoData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderTable(data) {
  const tableBody = document.querySelector("#cryptoTable tbody");
  tableBody.innerHTML = "";

  data.forEach(coin => {
    const row = `
      <tr>
        <td><img src="${coin.image}" width="30"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td>${coin.total_volume.toLocaleString()}</td>
        <td>${coin.market_cap.toLocaleString()}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

document.getElementById("search").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = cryptoData.filter(
    coin =>
      coin.name.toLowerCase().includes(keyword) ||
      coin.symbol.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});

function sortByMarketCap() {
  const sorted = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sorted);
}

function sortByPriceChange() {
  const sorted = [...cryptoData].sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0));
  renderTable(sorted);
}

fetchData();
