async function getHotelData() {
  const getData = await fetch(
    "https://api.jsonbin.io/v3/b/63878f18a3c728450edbb50e",
    {
      method: "GET",
      contentType: "application/json",
      headers: {
        Accept: "application/json",
        "X-Bin-Meta": false,
        "Content-Type": "application/json",
      },
    }
  );

  const hotelJson = await getData.json();

  document.querySelector("#backgroud_home_silder").innerHTML += `
    <div class="slider-item" style="background-image:url(${hotelJson.photo[0].small_p1});">
    <div class="overlay"></div>
    <div class="container">
      <div class="row no-gutters slider-text align-items-center">
      <div class="col-md-8 ftco-animate">
        <div class="text mb-5 pb-5">
        <h1 class="mb-3">The Princess of Arena</h1>
        <h2>More than a hotel... an experience</h2>
        </div>
      </div>
    </div>
    </div>
  </div>
  
  <div class="slider-item" style="background-image:url(${hotelJson.photo[0].small_p2});">
    <div class="overlay"></div>
    <div class="container">
      <div class="row no-gutters slider-text align-items-center">
      <div class="col-md-8 ftco-animate">
        <div class="text mb-5 pb-5">
          <h1 class="mb-3">Experience Epic Beauty</h1>
          <h2>The Princess of Arena</h2>
        </div>
      </div>
    </div>
    </div>
  </div>
    `;

  document.getElementById(
    "special_room"
  ).style.backgroundImage = `url(${hotelJson.photo[0].small_p3})`;
  document.getElementById(
    "swimming_pool"
  ).style.backgroundImage = `url(${hotelJson.photo[0].small_p4})`;
  document.getElementById(
    "event"
  ).style.backgroundImage = `url(${hotelJson.photo[0].small_p5})`;

  document.getElementById(
    "meditation"
  ).style.backgroundImage = `url(${hotelJson.photo[0].small_p6})`;

  document.getElementById(
    "room_image"
  ).style.backgroundImage = `url(${hotelJson.photo[0].small_p7})`;

  console.log(hotelJson);
}

window.addEventListener("load", async () => {
  await getHotelData();
});

const myModal = document.querySelector("#modal");
const detail = document.querySelector("#detail");

async function CheckingPrice() {
  const getData = await fetch(
    "https://api.jsonbin.io/v3/b/638837cda3c728450edc3022",
    {
      method: "GET",
      contentType: "application/json",
      headers: {
        Accept: "application/json",
        "X-Master-Key":
          "$2b$10$k8rL9COMQ941lThLuMJfmOvpAaoUyL7GEvZxRdT7GDsTJoefRP6u6",
        "X-Bin-Meta": false,
        "Content-Type": "application/json",
      },
    }
  );

  const hotelJson = await getData.json();

  const checkin = document.getElementById("inputCheckin").value;
  const checkout = document.getElementById("inputCheckout").value;

  const currentTime = new Date();

  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  const adminTimein = new Date(hotelJson.from);
  const adminTimeout = new Date(hotelJson.to);

  if (currentTime > checkinDate) {
    alert("Checkin date must be greater than current date");
    return;
  }

  if (checkinDate > checkoutDate) {
    alert("Check-out date must be greater than check-in date");
    return;
  }

  if (checkinDate < adminTimein || checkoutDate > adminTimeout) {
    alert("we are not available at this time");
    return;
  }

  const timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const typeChecking = document.querySelector("#room_type").value;

  if (typeChecking == "Suite") {
    const Suite_room = hotelJson.room_checking[0].room_rate;
    const price = parseInt(Suite_room) * diffDays;
    const maxDiscount = parseInt(Suite_room) * 0.2;

    document.querySelector("#name_room").innerHTML = `${hotelJson.room_name}`;
    document.querySelector(
      "#date"
    ).innerHTML = `from ${checkin} to ${checkout}`;
    document.querySelector(
      "#message"
    ).innerHTML = `<del>Stand Rate: ${price} USD</del>`;

    document.querySelector(
      "#real_price"
    ).innerHTML = `<p style={color: red, }>Discount Price: ${
      price - maxDiscount
    } USD</p>`;
    myModal.style.display = "block";
  }

  if (typeChecking == "Deluxe Room") {
    const deluxe = hotelJson.room_checking[1].room_rate;
    const price = parseInt(deluxe) * diffDays;
    const maxDiscount = parseInt(deluxe) * 0.2;

    document.querySelector("#name_room").innerHTML = `${hotelJson.room_name}`;
    document.querySelector(
      "#date"
    ).innerHTML = `from ${checkin} to ${checkout}`;
    document.querySelector(
      "#message"
    ).innerHTML = `<del>Stand Rate: ${price} USD</del>`;

    document.querySelector(
      "#real_price"
    ).innerHTML = `<p style={color: red, }>Discount Price: ${
      price - maxDiscount
    } USD</p>`;
    myModal.style.display = "block";
  }

  if (typeChecking == "Family Room") {
    const family = hotelJson.room_checking[2].room_rate;
    const price = parseInt(family) * diffDays;
    const maxDiscount = parseInt(family) * 0.2;

    document.querySelector("#name_room").innerHTML = `${hotelJson.room_name}`;
    document.querySelector(
      "#date"
    ).innerHTML = `from ${checkin} to ${checkout}`;
    document.querySelector(
      "#message"
    ).innerHTML = `<del>Stand Rate: ${price} USD</del>`;

    document.querySelector(
      "#real_price"
    ).innerHTML = `<p style={color: red, }>Discount Price: ${
      price - maxDiscount
    } USD</p>`;
    myModal.style.display = "block";
  }
}

//User booking details
async function booking() {
  var oldItems = JSON.parse(localStorage.getItem("bookingdetail")) || [];

  var newItem = {
    checkinDate: document.getElementById("inputCheckin").value,
    checkoutDate: document.getElementById("inputCheckout").value,
    type : document.querySelector("#room_type").value,
    name: document.getElementById("inputName").value,
    email: document.getElementById("inputEmail").value,
    phone: document.getElementById("inputPhone").value,
    price: document.getElementById("real_price").innerText,
  };

  oldItems.push(newItem);

  localStorage.setItem("bookingdetail", JSON.stringify(oldItems));

  alert("Booking Success");
}

document.querySelector("#submitCheck").addEventListener("click", CheckingPrice);
document.querySelector("#booking").addEventListener("click", function () {
  myModal.style.display = "none";
  detail.style.display = "block";
});

document.querySelector("#submit_booking").addEventListener("click", booking);

const clickClose = document.querySelector("#error_model_close");

const clickDetailClose = document.querySelector("#detail_model_close");

const clickViewDetail = document.querySelector("#view_detail").addEventListener("click", addType);

async function addType() {
  sessionStorage.removeItem("typechecking");
  sessionStorage.setItem("typechecking", document.querySelector("#room_type").value);
}

clickClose.onclick = function () {
  myModal.style.display = "none";
};

clickDetailClose.onclick = function () {
  detail.style.display = "none";
};
