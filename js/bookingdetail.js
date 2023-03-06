async function getBookingdetail() {
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

  const dataView = await getData.json();
  const tas = JSON.parse(localStorage.getItem("bookingdetail"));


  for (h in tas) {
    const value = tas[h];

    var photoChecking = "";

    if(value.type == "Suite"){
      photoChecking = dataView.room_checking[0].photo;
    } 
  
    if (value.type == "Deluxe Room"){
      photoChecking = dataView.room_checking[1].photo;
    }

    if (value.type == "Family Room"){
      photoChecking = dataView.room_checking[2].photo;
    }



    document.querySelector("#listBooking").innerHTML += `
        <div class="col-lg-6">
        <div class="room-wrap d-md-flex">
            <a href="rooms-single.html" class="img" style="background-image: url(${photoChecking});"></a>
            <div class="half left-arrow d-flex align-items-center">
                <div class="text p-4 p-xl-5 text-center">
                    <p class="mb-0"><span class="price mr-1">${value.email}</p>
                    <p class="mb-0">user phone: ${value.phone}</p>
                    <p class="mb-0">${value.price}</p>
                    <p class="mb-0">From ${value.checkinDate} to ${value.checkoutDate}</p>
                    <h3 class="mb-3"><a href="rooms-single.html">${value.type}</a></h3>

                </div>
            </div>
        </div>
    </div>`;
  }
}

window.addEventListener("load", async () => {
  await getBookingdetail();
});
