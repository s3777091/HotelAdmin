window.addEventListener("load", async () => {
  await getRoomDetail();
  await getRule();
});

async function getRoomDetail() {
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

  const type = sessionStorage.getItem("typechecking");

  const hotelJson = await getData.json();

  document.querySelector("#hotel_description").innerHTML +=
    hotelJson.hotel_description;
  document.querySelector("#room_size").innerHTML += hotelJson.room_size;
  document.querySelector("#number_of_rooms").innerHTML +=
    hotelJson.number_of_rooms;

  if (type == "Suite") {
    document.querySelector("#rooms_type").innerHTML += " (Suite)";
    document.querySelector("#listView").innerHTML += `
    <div class="item">
        <div class="room-img" style="background-image: url(${hotelJson.room_checking[0].photo});"></div>
    </div>
    `;
  }

  if (type == "Deluxe Room") {
    document.querySelector("#rooms_type").innerHTML += " (Deluxe Room)";
    document.querySelector("#listView").innerHTML += `
    <div class="item">
        <div class="room-img" style="background-image: url(${hotelJson.room_checking[1].photo});"></div>
    </div>
    `;
  }

  if (type == "Family Room") {
    document.querySelector("#rooms_type").innerHTML += " (Family Room)";
    document.querySelector("#listView").innerHTML += `
    <div class="item">
        <div class="room-img" style="background-image: url(${hotelJson.room_checking[2].photo});"></div>
    </div>
    `;
  }
}

async function getRule() {
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

  const data = await getData.json();
  const facilitiy = data.utilities;

  for (h in facilitiy) {
    const tag = facilitiy[h];
    document.querySelector("#facilities").innerHTML += `
    <div class="col-lg-6">

    <div class="room-wrap d-md-flex">
        <a class="img" style="background-image: url(${tag.photo});"></a>
        <div class="half left-arrow d-flex align-items-center">
            <div class="text p-4 p-xl-5 text-center">
                <p class="star mb-0"><span class="ion-ios-star"></span><span class="ion-ios-star"></span><span class="ion-ios-star"></span><span class="ion-ios-star"></span><span class="ion-ios-star"></span></p>
                <p class="mb-0"><span class="price mr-1">${tag.facilitie}</p>
            </div>
        </div>
    </div>
</div>`;
  }
}
