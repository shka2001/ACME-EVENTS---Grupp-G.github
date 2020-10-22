

class EventList {
    constructor() {
        this.eventArray = []; // array som ska innehålla alla eventobjekt. 
        this.filter_btn = document.getElementById("category");
        this.filter_btn.addEventListener("change", () => {
            this.filter();
        });
        this.sort_btn = document.getElementById("date-button");
        this.sort_btn.addEventListener("click", () => {
            this.sort();
        })
    }

    //lägger till eventet i den synliga listan och i arrayen.
    addEvent(event) {

        this.eventArray.push(event);

    }
    //  sparar array av eventobjekten i local storage 
    storeEvent() {
        let event_string = JSON.stringify(this.eventArray);
        localStorage.setItem("event_array", event_string);
    }

    //hämta data från local storage och skriv ut som lista
    printEvent(key) {

        let event_obj;

        if (key === "filtered") {
            this.clearTable();
            event_obj = JSON.parse(localStorage.getItem("filtered_array"));
        } else if (key === "sorted") {
            this.clearTable();
            event_obj = JSON.parse(localStorage.getItem("sorted_array"));
        } else {
            event_obj = JSON.parse(localStorage.getItem("event_array"));
            console.log("Array med alla objekt:")
            console.log(event_obj);
        }

        let list = document.getElementById("event-list");

        for (event of event_obj) {
            let row = document.createElement("tr");
            row.classList.add("event-item")
            let td_date = document.createElement("td");
            let td_name = document.createElement("td");
            let td_location = document.createElement("td");
            let td_avaliable = document.createElement("td");
            td_date.innerText = event.date;
            td_name.innerText = event.name;
            td_location.innerText = event.location;

            list.append(row);
            row.append(td_date);
            row.append(td_name);
            row.append(td_location);

            if (!event.isAvaliable) {
                td_avaliable.innerText = "cancelled"
                td_avaliable.classList.add("cancelled");
                row.append(td_avaliable);
                //hämta class som gör texten röd
            } else {
                let more_info_btn = document.createElement("button");
                more_info_btn.innerText = "More info";
                more_info_btn.setAttribute("onclick", "window.location.href='eventdetails.html';")
                td_avaliable.append(more_info_btn);
                row.append(td_avaliable);
            }
        }
    }

    // filtrerar ut event med valfri kategori
    filter() {
        //loopa igenom alla object i local storage. om objektets egenskap category har samma värde som vald kategori så ska de filtreras ut med filterfunktion
        let event_obj = JSON.parse(localStorage.getItem("event_array"));
        let filtered_array = event_obj.filter((obj) => {
            return obj.category === this.filter_btn.options[this.filter_btn.selectedIndex].text;
        });
        console.log("Array som filtrerats:");
        console.log(filtered_array);

        //spara till local storage
        let event_string = JSON.stringify(filtered_array);
        localStorage.setItem("filtered_array", event_string);

        let key = "filtered";
        this.printEvent(key);
    }

    //sortera listan i datum-ordning. 
    sort() {

        //loopa igenom objects i local storage och sortera dom utefter datum
        let event_obj = JSON.parse(localStorage.getItem("event_array"));
        let sorted_array = event_obj.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        })

        //spara till local storage
        let event_string = JSON.stringify(sorted_array);
        localStorage.setItem("sorted_array", event_string)

        let key = "sorted";
        this.printEvent(key);
    }

    clearTable() {
        let events = document.querySelectorAll("tr");
        events.forEach(function (event) {
            event.remove();
        })
    }
}

class Event {
    constructor(date, name, location, category, isAvaliable) { // eventuellt kommer varje objekt behöva ett id.
        this.date = date; // hur ska vi hantera datum för att det ska gå att sortera sedan?
        this.name = name;
        this.location = location;
        this.category = category;
        this.isAvaliable = isAvaliable; // tänker att om det är true betyder det att det kommer vara en knapp här som tar en till detaljsidan
        //men om  det är false så kommer det istället stå cancelled. 
    }

}

// Några Eventobjekt som ska finnas från början när sidan har laddats.
let event1 = new Event("August 17, 13:00", "Milan vs PSG", "Le Parc des Princes", "Sport", false)
let event2 = new Event("August 13, 23:00", "Nina Simone", "Fasching", "Music", false)
let event3 = new Event("July 3, 22:00", "Anthony Jeselnik", "Civic Auditorium", "Stand Up", false)
let event4 = new Event("July 7, 20:00", "James Blake", "L'Olympia", "Music", true)
let eventlist = new EventList;
eventlist.addEvent(event1);
eventlist.addEvent(event2);
eventlist.addEvent(event3);
eventlist.addEvent(event4);

eventlist.storeEvent(event1);
eventlist.storeEvent(event2);
eventlist.storeEvent(event3);
eventlist.storeEvent(event4);

eventlist.printEvent();




