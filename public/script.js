document.addEventListener("DOMContentLoaded", function() {
    var inrButton = document.getElementById("inrButton");
    var dropdownINR = document.getElementById("dropdownINR");
    var btcButton = document.getElementById("btcButton");
    var dropdownBTC = document.getElementById("dropdownBTC");

    function toggleDropdown(dropdown) {
        dropdown.classList.toggle("show");
        if (dropdown === dropdownINR) {
            dropdownBTC.classList.remove("show"); 
        } else {
            dropdownINR.classList.remove("show"); 
        }
    }

    function setupButtonClickHandler(button, dropdown) {
        button.addEventListener("click", function() {
            toggleDropdown(dropdown);
        });
    }

    setupButtonClickHandler(inrButton, dropdownINR);
    setupButtonClickHandler(btcButton, dropdownBTC);

    window.onclick = function(event) {
        if (!event.target.matches('.buton') && !event.target.matches('.btn-light')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var timerElement = document.getElementById("timer");
    var time = 60;

    function updateTimer() {
        timerElement.textContent = time;
        time--;

        if (time < 0) {
            time = 60;
        }
    }

    setInterval(updateTimer, 1000);
});



const checkbox = document.getElementById('checkbox');
const textd = document.getElementById('textd');
const butt1 = document.getElementById('inrButton');
const butt2 = document.getElementById('btcButton');
const butt3 = document.getElementById('buyBtcButton');
const eachrow = document.getElementById('eachrow');
const body = document.body;

if (checkbox.checked) {
    body.classList.add('black-theme');
    textd.classList.add('stat1-dark');
    textd.classList.remove('stat1');
    butt1.classList.add('buton');
    butt1.classList.remove('btn-light');
    butt2.classList.add('buton');
    butt2.classList.remove('btn-light');
    butt3.classList.add('buton');
    butt3.classList.remove('btn-light');
    const tableRows = document.querySelectorAll('#cryptoTableBody tr');
    tableRows.forEach(row => row.classList.add('tr-dark'));
    tableRows.forEach(row => row.classList.remove('tr-light'));
} else {
    body.classList.remove('black-theme');
    textd.classList.add('stat1');
    textd.classList.remove('stat1-dark');
    butt1.classList.add('btn-light');
    butt1.classList.remove('buton');
    butt2.classList.add('btn-light');
    butt2.classList.remove('buton');
    butt3.classList.add('btn-light');
    butt3.classList.remove('buton');
    const tableRows = document.querySelectorAll('#cryptoTableBody tr');
    tableRows.forEach(row => row.classList.add('tr-light'));
    tableRows.forEach(row => row.classList.remove('tr-dark'));
}

checkbox.addEventListener('change', function() {
    if(this.checked) {
        body.classList.add('black-theme');
        textd.classList.add('stat1-dark');
        textd.classList.remove('stat1');
        butt1.classList.add('buton');
        butt1.classList.remove('btn-light');
        butt2.classList.add('buton');
        butt2.classList.remove('btn-light');
        butt3.classList.add('buton');
        butt3.classList.remove('btn-light');
        const tableRows = document.querySelectorAll('#cryptoTableBody tr');
        tableRows.forEach(row => row.classList.add('tr-dark'));
        tableRows.forEach(row => row.classList.remove('tr-light'));
    } else {
        body.classList.remove('black-theme');
        textd.classList.add('stat1');
        textd.classList.remove('stat1-dark');
        butt1.classList.add('btn-light');
        butt1.classList.remove('buton');
        butt2.classList.add('btn-light');
        butt2.classList.remove('buton');
        butt3.classList.add('btn-light');
        butt3.classList.remove('buton');
        const tableRows = document.querySelectorAll('#cryptoTableBody tr');
        tableRows.forEach(row => row.classList.add('tr-light'));
        tableRows.forEach(row => row.classList.remove('tr-dark'));
    }
});


const fetchData = async () => {
    try {
        const response = await fetch('https://quadb-node-mongo-app.onrender.com/tickers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Crypto Data:', data);

        // Clear existing table rows
        const tableBody = document.getElementById('cryptoTableBody');

        tableBody.innerHTML = '';

        // Populate table with fetched data
        data.forEach(crypto => {
            const row = document.createElement('tr');
            row.classList.add('tr-dark');
            row.innerHTML = `
                <td>${crypto.name}</td>
                <td>${crypto.last}</td>
                <td>${crypto.buy}</td>
                <td>${crypto.sell}</td>
                <td>${crypto.volume}</td>
                <td>${crypto.base_unit}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
};

// Trigger fetchData function on page load or any other event
fetchData();