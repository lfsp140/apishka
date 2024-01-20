let postArr = []
let idCounter = 0;
window.localStorage.removeItem('tema');
window.localStorage.removeItem('null');

const startRender = () => {
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then((response) => response.json())
    .then((json) => {
        postArr = json;
        productRender(postArr, 'arrayList');
    });
}

const arrRender = () => {
    idCounter += 1;
    let k = document.getElementById('menuInput');
    if (k.value == '') {
        k.classList.add('highlight');
        setTimeout(function() {
            k.classList.remove('highlight');
        }, 1000);
    }
    else {
        let obj = {
            postId: 101,
            id: idCounter,
            name: 'odio adipisci rerum aut animi',
            email: 'Jayne_Kuhic@sydney.com',
            body: `${k.value}`
        };

        addPostToLocalStorage(idCounter, k.value);

        postArr.push(obj);

        fetch('https://jsonplaceholder.typicode.com/comments', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        /* .then((json) => console.log(json)); */

        productRender(postArr, 'arrayList');
        k.value = '';
    }
    
}

const deleteElement = (event) => {
    let aidi = event.target.id;
    let shortId = Number(aidi.slice(2));
    postArr = postArr.filter(item => item.id !== shortId);
    productRender(postArr, 'arrayList');
    window.localStorage.removeItem(`${shortId}`);
    fetch(`https://jsonplaceholder.typicode.com/comments/${shortId}`, {
        method: 'DELETE',
    });
}

const editElement = (event) => {
    let aidi = event.target.id;
    let shortId = Number(aidi.slice(2));
    let elem = postArr.find(obj => obj.id === shortId);
    let okno = prompt('Введите текст:', `${elem.body}`);
    elem.body = okno;
    fetch(`https://jsonplaceholder.typicode.com/comments/${shortId}`, {
    method: 'PUT',
    body: JSON.stringify({
        postId: 101,
        id: shortId,
        name: 'odio adipisci rerum aut animi',
        email: 'Jayne_Kuhic@sydney.com',
        body: `${okno}`
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    /* .then((json) => console.log(json)); */

    addPostToLocalStorage(`${shortId}`, `${okno}`)

    productRender(postArr, 'arrayList');
}

const addPostToLocalStorage = (key, value) => {
    window.localStorage.setItem(`${key}`, `${value}`)
}

const productRender = (arr,htmlId) => { 
    let renderRow = ''
    arr.map(item => {
         renderRow += `<div class='wrap__content_item' id='${item.id}'>
                            <div class='wrap__content_text'>
                                ${item.body}
                            </div>
                            <div class='wrap__content_btn' onclick="editElement(event)">
                                <button id='${'ed' + item.id}'>Edit</button>
                            </div>
                            <div class='wrap__content_btn' onclick="deleteElement(event)">
                                <button id='${'dl' + item.id}'>Delete</button>
                            </div>
                         </div>`
                        }
    )
    document.getElementById(`${htmlId}`).innerHTML = renderRow
}

const clean = () => {
    postArr = [];
    window.localStorage.clear();
    idCounter = 0;
    productRender(postArr, 'arrayList');
}



const checkLocalStorage = () => {
    if(window.localStorage.length != 0) {
        const lStsize = window.localStorage.length;
        const checklocalArr = [];
        for (let i = 0; i < lStsize; i++) {
            let currentBody = window.localStorage.getItem(localStorage.key(i))
            let obj = {
                "postId": 101,
                "id": Number(localStorage.key(i)),
                "name": 'odio adipisci rerum aut animi',
                "email": 'Jayne_Kuhic@sydney.com',
                "body": `${currentBody}`
            };
            checklocalArr.push(obj);
        }
        postArr = checklocalArr.sort((a, b) => a.id > b.id ? 1 : -1);
        productRender(postArr, 'arrayList');
    }
}


const check = () => {
    if (window.localStorage.length != 0) {
        const l = window.localStorage.length;
        for (let i = 0; i < l; i++) {
            let ke = Number(localStorage.key(i));
            if (ke > idCounter) {
                idCounter = ke;
            }
        }
    }
}

check();
checkLocalStorage();


window.addEventListener('storage', (evn) => {
    addPostToLocalStorage(evn.key, evn.newValue);
    checkLocalStorage();
})
  



/* 1. Что такое контекст вызова функции? Чем определяется?
2. Как изменить this внутри функции? (5 способов)
3. Чем характеризуется функция?
4. Что такое прототип? */



