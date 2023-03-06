window.addEventListener("load", async () => {
  await adminControll();
});

async function adminControll() {
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

  getData.json().then((data) => {
    localStorage.setItem("data", JSON.stringify(data));

    document.querySelector(
      "#type_rate_suite"
    ).innerText += ` ${data.room_checking[0].room_rate}`;
    document.querySelector(
      "#type_rate_deluxe"
    ).innerHTML += ` ${data.room_checking[1].room_rate}`;
    document.querySelector(
      "#type_rate_family"
    ).innerHTML += ` ${data.room_checking[2].room_rate}`;
  });
}

async function uploadData() {
  const tas = JSON.parse(localStorage.getItem("data"));

  const api_key = document.querySelector("#api_key").value;

  const typeChecking = document.querySelector("#typeChecking").value;
  if (
    api_key == "$2b$10$k8rL9COMQ941lThLuMJfmOvpAaoUyL7GEvZxRdT7GDsTJoefRP6u6"
  ) {
    if (typeChecking == "Suite") {
      const payload = JSON.stringify({
        room_name: tas.room_name,
        room_size: tas.room_size,
        number_of_rooms: tas.number_of_rooms,
        hotel_description: tas.hotel_description,
        photoview: tas.photoview,
        room_checking: [
          {
            room_type: "Suite",
            room_rate: document.querySelector("#room_rate").value + " USD",
            photo: tas.room_checking[0].photo,
          },
          {
            room_type: "Deluxe Room",
            room_rate: tas.room_checking[1].room_rate,
            photo: tas.room_checking[1].photo,
          },
          {
            room_type: "Family Room",
            room_rate: tas.room_checking[2].room_rate,
            photo: tas.room_checking[2].photo,
          },
        ],
        from: document.getElementById("inputfrom").value,
        to: document.getElementById("inputto").value,
      });

      const putData = await fetch(
        "https://api.jsonbin.io/v3/b/638837cda3c728450edc3022",
        {
          method: "PUT",
          contentType: "application/json",
          headers: {
            Accept: "application/json",
            "X-Master-Key": api_key,
            "X-Bin-Meta": false,
            "Content-Type": "application/json",
          },

          body: payload,
        }
      );

      if (putData.ok) {
        alert("Data uploaded successfully");
        localStorage.removeItem("data");
        location.reload();
        adminControll();
      } else {
        alert("error");
      }
    }

    if (typeChecking == "Family Room") {
      const payload = JSON.stringify({
        room_name: tas.room_name,
        room_size: tas.room_size,
        number_of_rooms: tas.number_of_rooms,
        hotel_description: tas.hotel_description,
        photoview: tas.photoview,
        room_checking: [
          {
            room_type: "Suite",
            room_rate: tas.room_checking[0].room_rate,
            photo: tas.room_checking[0].photo,
          },
          {
            room_type: "Deluxe Room",
            room_rate: tas.room_checking[1].room_rate,
            photo: tas.room_checking[1].photo,
          },
          {
            room_type: "Family Room",
            room_rate: document.querySelector("#room_rate").value + " USD",
            photo: tas.room_checking[2].photo,
          },
        ],
        from: document.getElementById("inputfrom").value,
        to: document.getElementById("inputto").value,
      });

      const putData = await fetch(
        "https://api.jsonbin.io/v3/b/638837cda3c728450edc3022",
        {
          method: "PUT",
          contentType: "application/json",
          headers: {
            Accept: "application/json",
            "X-Master-Key": api_key,
            "X-Bin-Meta": false,
            "Content-Type": "application/json",
          },

          body: payload,
        }
      );

      if (putData.ok) {
        alert("Data uploaded successfully");
        localStorage.removeItem("data");
        location.reload();
        adminControll();
      } else {
        alert("error");
      }
    }

    if (typeChecking == "Deluxe Room") {
      const payload = JSON.stringify({
        room_name: tas.room_name,
        room_size: tas.room_size,
        number_of_rooms: tas.number_of_rooms,
        hotel_description: tas.hotel_description,
        photoview: tas.photoview,
        room_checking: [
          {
            room_type: "Suite",
            room_rate: tas.room_checking[0].room_rate,
            photo: tas.room_checking[0].photo,
          },
          {
            room_type: "Deluxe Room",
            room_rate: document.querySelector("#room_rate").value + " USD",
            photo: tas.room_checking[1].photo,
          },
          {
            room_type: "Family Room",
            room_rate: tas.room_checking[2].room_rate,
            photo: tas.room_checking[2].photo,
          },
        ],
        from: document.getElementById("inputfrom").value,
        to: document.getElementById("inputto").value,
      });

      const putData = await fetch(
        "https://api.jsonbin.io/v3/b/638837cda3c728450edc3022",
        {
          method: "PUT",
          contentType: "application/json",
          headers: {
            Accept: "application/json",
            "X-Master-Key": api_key,
            "X-Bin-Meta": false,
            "Content-Type": "application/json",
          },

          body: payload,
        }
      );

      if (putData.ok) {
        alert("Data uploaded successfully");
        localStorage.removeItem("data");
        location.reload();
        adminControll();
      } else {
        alert("error");
      }
    }
  } else {
    alert("Invalid API key");
  }
}

document.querySelector("#startUpload").addEventListener("click", uploadData);
