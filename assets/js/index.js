const apartmentList = [];



  function showForm(){
    document.getElementById("client-form").style.display = "block";
    document.getElementById("apartment-list").style.display = "none";
  }
  
  function showList() {
    const listContainer = document.getElementById("apartment-list");
    listContainer.innerHTML = ""; 
    
    if (apartmentList.length === 0) {
        listContainer.innerHTML = "<li class='list-group-item'>Brak mieszkań na liście.</li>";
    } else {
        apartmentList.forEach((apartment, index) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.innerText = `${index + 1}. ${apartment.street}, mieszkanie nr ${apartment.flatNumber}, ${apartment.city}`;
            listContainer.appendChild(listItem);
        });
    }

    document.getElementById("client-form").style.display = "none";
    listContainer.style.display = "block";
}
  
  function save(event) {
    event.preventDefault();
    let newApartment = new Apartment();
    newApartment.street = document.getElementById("street").value;
    newApartment.flatNumber = document.getElementById("flatNumber").value;
    newApartment.city = document.getElementById("city").value;
    newApartment.surface = document.getElementById("surface").value;
    newApartment.floor = document.getElementById("floor").value;
    newApartment.zipCode = document.getElementById("zipcode").value;
    newApartment.comments = document.getElementById("comments").value;
    newApartment.district = document.getElementById("district").value;
    newApartment.furnished = document.getElementById("furnished").checked;
  
    console.log(newApartment)
    let foundApartment = null;
    for (let i = 0; i < apartmentList.length; i++) {
      if(apartmentList[i].street == newApartment.street && apartmentList[i].flatNumber == newApartment.flatNumber){
        foundApartment = apartmentList[i];
        apartmentList[i] = newApartment;
      }
    }
    if(foundApartment == null){
      apartmentList.push(newApartment);
    }
    console.log(apartmentList)
    showList()
  }
  
  