// ================================
// script.js - Full Functionality
// ================================

// ----------- HOME PAGE: SEARCH BUSES -----------
alert("js connected")
const searchBtn = document.getElementById('searchBuses');

if (searchBtn) {
    searchBtn.addEventListener('click', function () {

        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const date = document.getElementById('date').value;

        if (!from || !to || !date) {
            alert("Please select From, To, and Date");
            return;
        }

        const busList = [
            { name: "HRTC Express", time: "06:00 AM", fare: "₹250" },
            { name: "HRTC Deluxe", time: "09:00 AM", fare: "₹300" },
            { name: "HRTC Superfast", time: "12:00 PM", fare: "₹350" },
            { name: "HRTC Night Rider", time: "06:00 PM", fare: "₹400" }
        ];

        let resultHTML = `<h3>Available Buses from ${from} to ${to} on ${date}</h3><ul>`;

        busList.forEach(bus => {
            resultHTML += `<li>${bus.name} - ${bus.time} - Fare: ${bus.fare}</li>`;
        });

        resultHTML += `</ul>`;

        document.getElementById("busResults").innerHTML = resultHTML;
    });
}

// ----------- BOOK PAGE: BOOK TICKET CONFIRMATION -----------
const bookBtn = document.getElementById('bookTicketBtn');
if(bookBtn){
    bookBtn.addEventListener('click', function(e){
        e.preventDefault();
        const route = document.getElementById('route').value;
        const time = document.getElementById('time').value;
        const seats = document.getElementById('seats').value;

        if(!route || !time || !seats){
            alert("Please select route, time, and seats!");
            return;
        }

        alert(`🎉 Your ticket for ${route} at ${time}, Seats: ${seats}, is successfully booked!`);
    });
}

// ----------- HELP PAGE: INTERACTIVE SECTIONS -----------
const helpButtons = document.querySelectorAll('.help-card button');
helpButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        if(type === "customer"){
            alert("📞 Contact our customer support at +91-1234567890");
        } else if(type === "faq"){
            alert("❓ FAQ: Visit the FAQ section for common questions.");
        } else if(type === "online"){
            alert("💻 Online Support: Chat with us live from 9AM - 6PM.");
        }
    });
});

// ----------- CONTACT PAGE: SEND MESSAGE CONFIRMATION -----------
const contactForm = document.getElementById('contactForm');
if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        alert("✅ Your message has been sent successfully! We will contact you soon.");
        this.reset();
    });
}

// ----------- SIGNUP PAGE: SIGN-UP CONFIRMATION -----------
const signupForm = document.getElementById('signupForm');
if(signupForm){
    signupForm.addEventListener('submit', function(e){
        e.preventDefault();
        alert("🎉 Sign-up successful! Welcome to our HRTC community.");
        this.reset();
    });
}
document.getElementById("searchBuses").addEventListener("click", function () {

    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let date = document.getElementById("date").value;

    let result = document.getElementById("busResults");

    if (from === "" || to === "" || date === "") {
        result.innerHTML = "<p>Please fill all fields</p>";
        return;
    }

    result.innerHTML = `
        <h3>Available Buses from ${from} to ${to}</h3>

        <div class="bus-card">
            <p><b>HRTC Volvo AC</b></p>
            <p>Time: 08:00 AM</p>
            <p>Fare: ₹1200</p>
            <p>Seats: 12 Available</p>
            <button onclick="bookBus('${from}','${to}')">Book Now</button>
        </div>

        <div class="bus-card">
            <p><b>HRTC Deluxe</b></p>
            <p>Time: 11:30 AM</p>
            <p>Fare: ₹900</p>
            <p>Seats: 20 Available</p>
            <button onclick="bookBus('${from}','${to}')">Book Now</button>
        </div>

        <div class="bus-card">
            <p><b>HRTC Ordinary</b></p>
            <p>Time: 03:00 PM</p>
            <p>Fare: ₹500</p>
            <p>Seats: 30 Available</p>
            <button onclick="bookBus('${from}','${to}')">Book Now</button>
        </div>
    `;
});

function bookBus(from, to) {
    alert(`🎉 Congratulations! Your ticket from ${from} to ${to} is booked. Have a safe journey!`);
}