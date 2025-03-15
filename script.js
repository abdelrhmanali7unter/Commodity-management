
let title = document.getElementById("title");
let price = document.getElementById("price");
let texes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let descount = document.getElementById("descount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'creat';
let tmp;

function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +texes.value + +ads.value) - +descount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}


let datapro = localStorage.product ? JSON.parse(localStorage.product) : [];


submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        texes: texes.value,
        ads: ads.value,
        descount: descount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value

    };
    if (title.value != '' && price.value != '' && category.value != ''
        && newpro.count < 100) {
        if (mood == "creat") {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);
            }
        }
        else {
            datapro[tmp] = newpro
            mood = "create"
            submit.innerHTML = 'create';
            count.style.display = "block"
            this.scroll({
                top: 0,
                behavior: "smooth"
            })
        }
        cleardata();
    }



    localStorage.setItem("product", JSON.stringify(datapro));

    cleardata();
    showdata(
        getTotal()
    );
};

//
function cleardata() {
    title.value = "";
    price.value = "";
    texes.value = "";
    ads.value = "";
    descount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}


function showdata() {
    let table = "";
    for (let i = 0; i < datapro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].texes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].descount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
    }

    document.getElementById("tbody").innerHTML = table;

    let btndelate = document.getElementById("delateAll");
    if (datapro.length > 0) {
        btndelate.innerHTML = `<button onclick="deleteAll()">Delete All</button>`;
    } else {
        btndelate.innerHTML = "";
    }
}


function deleteAll() {
    localStorage.clear();
    datapro = [];
    showdata();
}


function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(datapro));
    showdata();
}

// 
showdata();



//update

function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    texes.value = datapro[i].texes;
    ads.value = datapro[i].ads;
    descount.value = datapro[i].descount;
    getTotal()
    count.style.display = "none";
    submit.innerHTML = "update"
    category.value = datapro[i].category;
    mood = "update";
    tmp = i;
}


//search 

let searchMood = 'title';
let search = document.getElementById("search");
function getSearchMood(id) {
    if (id == "searchtitle") {
        searchMood = 'title';
        search.Placeholder = 'Search By Title';

    } else {
        searchMood = "category"
        search.Placeholder = 'Search By Category';
    }
    search.focus()
    search.value = ''
    showdata()
}

function searchData(value) {
    let table = ""
    if (searchMood == "title") {

        for (let i = 0; i < datapro.length; i++) {

            if (datapro[i].title.includes(value)) {
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].texes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].descount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
            }
        }


    } else {
        for (let i = 0; i < datapro.length; i++) {

            if (datapro[i].category.includes(value)) {
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].texes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].descount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

