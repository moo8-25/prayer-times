
let cities = [
    {
        arName: "الشرقية",
        eName: "Ash Sharqīyah",
        state: false
    },
    {
        arName: "مكة المكرمة",
        eName: "Makkah al Mukarramah",
        state: false
    },
    {
        arName: "الرياض",
        eName: "Ar Riyāḑ",
        state: false
    },
    {
        arName: "المدينة المنورة",
        eName: "Al Madīnah al Munawwarah",
        state: false
    },

    {
        arName: "جازان",
        eName: "Jāzān",
        state: false
    },
    {
        arName: "القصيم",
        eName: "Al Qaşīm",
        state: false
    },
    {
        arName: "حايل",
        eName: "Ḩā'il",
        state: false
    },
    {
        arName: "تبوك",
        eName: "Tabūk",
        state: false
    },
    {
        arName: "نجران",
        eName: "Najrān",
        state: false
    },
    {
        arName: "الجوف",
        eName: "Al Jawf",
        state: false
    },
    {
        arName: "الباحه",
        eName: "Al Bāḩah",
        state: false
    },
    {
        arName: "عسير",
        eName: "Asīr",
        state: false
    }
]

window.onload = (event) => {
    getHeaderData("Ash Sharqīyah")
    document.getElementById("city").innerHTML = "الشرقية"
};

function checkState() {
    for (let city of cities) {
        if (city.state == true) {
            var cityNa = city.eName;
            return cityNa
        }
    }
}

function fillSelector() {
    document.getElementById("sele").innerHTML = ""
    for (var city of cities) {
        var content = `<option>${city.arName}</option>`
        document.getElementById("sele").innerHTML += content
    }

}

fillSelector()
document.getElementById("sele").addEventListener("change", () => {
    document.getElementById("city").innerHTML = document.getElementById("sele").value
    //#####################################
    getHeaderData(cityName(document.getElementById("sele").value))
})


function cityName(cityNAme) {
    var Name = ""
    for (let city of cities) {
        city.state = false
        setData()
    }

    for (let city of cities) {
        if (city.arName == cityNAme) {
            city.state = true
            setData()
            Name = city.eName
            return Name
        }
    }
}

function getHeaderData(cityName) {
    let params = {
        country: "SA",
        city: cityName
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity?country=SA&city=	Makkah al Mukarramah', { params: params })
        .then((response) => {
            let day = response.data
            document.getElementById("day").innerHTML = day.data.date.hijri.weekday.ar
            document.getElementById("Mdat").innerHTML = day.data.date.gregorian.date
            document.getElementById("Hdat").innerHTML = day.data.date.hijri.date
            //###################################################
            document.getElementById("times").innerHTML = `
                <div class="time">
                    <h3>الفجر</h3>
                    <h5>${day.data.timings.Fajr}</h5>
                </div>
                <div class="time">
                    <h3>الشروق</h3>
                    <h5>${day.data.timings.Sunrise}</h5>
                </div>
                <div class="time">
                    <h3>الظهر</h3>
                    <h5>${day.data.timings.Dhuhr}</h5>
                </div>
                <div class="time">
                    <h3>العصر</h3>
                    <h5>${day.data.timings.Asr}</h5>
                </div>
                <div class="time">
                    <h3>المغرب</h3>
                    <h5>${day.data.timings.Maghrib}</h5>
                </div>
                <div class="time">
                    <h3>العشاء</h3>
                    <h5>${day.data.timings.Isha}</h5>
                </div>
            `
        })
        .catch(error => {
            alert(error)
        })
}



function setData() {
    let Newcities = JSON.stringify(cities)
    localStorage.setItem("cities", Newcities)
}