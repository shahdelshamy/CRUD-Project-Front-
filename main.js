// get total 
// create
// save localStorage
// clean inputs after
// read
// count (لما يعمل العدد 10 يكريت 10صفوف من النوع دا)
// delete
// delete all data
// update
// search
// clean data (Empty inputs || not needed data =>بيانات غلط)



let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let searchText = document.getElementById('search');
let searchTitle = document.getElementById('search-title');
let searchCategory = document.getElementById('search-category');
let tbody = document.getElementById('tbody');
let deleteAll = document.getElementById('delete-all');






function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'rgb(107 57 155)';
    }
    else {
        total.innerHTML = '';
        total.style.backgroundColor = 'rgb(214, 28, 28)';
    }
}


let dataProduct;

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
}
else {
    dataProduct = [];
}

let mood = 'create';
let temp;

submit.onclick = function createProduct() {

    let product = {
        title: title.value.toLowerCase(),
        price: price.value.toLowerCase(),
        taxes: taxes.value.toLowerCase(),
        ads: ads.value.toLowerCase(),
        discount: discount.value.toLowerCase(),
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    if (title.value != '' && price.value != '' && category.value != '' && count.value < 20) {
        if (mood == 'create') {
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    dataProduct.push(product);
                }
            }
            else {
                dataProduct.push(product);
            }
        }
        else {               // update
            dataProduct[temp] = product;
            submit.innerHTML = 'Create';
            count.style.display = "block";
        }
        clearData();

    }
    localStorage.setItem('product', JSON.stringify(dataProduct));

   
    readData();

    deleteAll.style.display = 'block';

}

if (dataProduct.length != 0) {
    deleteAll.innerHTML = `Delete All (${dataProduct.length})`;
    deleteAll.style.display = 'block';
}


function clearData() {

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    getTotal();
}


function readData() {
    let table = '';

    for (let i = 0; i < dataProduct.length; i++) {
        table += `
    <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].count}</td>
            <td>${dataProduct[i].category}</td>
            <td><button  onclick="updateData(${i})" >Update</button></td>
            <td><button  onclick="deleteData(${i})">Delete</button></td>
    </tr>
    `
    }

    tbody.innerHTML = table;
}

readData();



function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataProduct));
    readData();
};



deleteAll.onclick = function deleteData() {
    localStorage.clear();
    dataProduct.splice(0);
    // localStorage taken from array if the array is empty,localStorage is empty
    readData();
    console.log(dataProduct.length);
    deleteAll.style.display = 'none';
}

function updateData(i) {

    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    count.style.display = "none";
    getTotal();
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;

}

let search = 'title';
function searchMood(id) {

    if (id == 'search-title') {
        search = 'title';
        searchText.placeholder = 'Search By Title';
    }
    else {
        search = 'category';
        searchText.placeholder = 'Search By Category';
    }

    searchText.focus();
    searchText.value = '';
}



function searchData(value) {
    let table = '';

    for (let i = 0; i < dataProduct.length; i++) {
        if (search == 'title') {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].count}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button  onclick="updateData(${i})" >Update</button></td>
                        <td><button  onclick="deleteData(${i})">Delete</button></td>
                </tr>
                `
            }
        }

        if (search == 'category') {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].count}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button  onclick="updateData(${i})" >Update</button></td>
                        <td><button  onclick="deleteData(${i})">Delete</button></td>
                </tr>
                `

            }

        }

    }

    tbody.innerHTML = table;
    if (searchText.value == '') {
        searchText.placeholder = 'Search';
    }


}




