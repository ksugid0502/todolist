let todoArray = [];

const createAppTitle =(title) => {
    const appTitle = document.createElement('h1');
    appTitle.innerHTML = title;
    return appTitle;

}

/*функция создания формы и кнопки */

const createTodoForm = () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const addButton = document.createElement('button');
    const wrapper = document.createElement('div');

    addButton.disabled =!input.value.length;

    input.addEventListener('input',()=> {
        addButton.disabled = !input.value.length;

    })

    form.classList.add('input-group','mb-3','bg-info');
    input.classList.add('form-control');
    input.placeholder = 'Введите название задачи';
    addButton.classList.add('btn','btn-primary');
    wrapper.classList.add('input-group-append');
    addButton.textContent = 'Добавить задачу';

    wrapper.append(addButton);
    form.append(input);
    form.append(wrapper);

    return {
        form,
        input,
        addButton

    }




}

const createTodoList = () => {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

const createTodoItem = (name) => {
    const todoItem = document.createElement('li');
    const btnWrapper = document.createElement('div');
    const doneBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');


    const randomId = Math.random() * 15.75;
    todoItem.id = randomId.toFixed(2);

    todoItem.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
    doneBtn.classList.add('btn','btn-success');
    deleteBtn.classList.add('btn','btn-danger');
    todoItem.textContent = name;
    doneBtn.textContent = 'Готово';
    deleteBtn.textContent = 'Удалить';

    btnWrapper.append(doneBtn,deleteBtn);
    todoItem.append(btnWrapper);
    return {
        todoItem,
        doneBtn,
        deleteBtn,
        btnWrapper

    }



}

const changeItemDone = (arr,item) => {
    // arr.map(obj => {
    //     if (obj.id === item.id & obj.done === false) {
    //         obj.done = true;
    //     } else if (obj.id === item.id & obj.done === true){
    //         obj.done = false;
    //     }
    // });
 
    const currentElement = arr.find(obj => obj.id === item.id)
    currentElement.done = !currentElement.document;
}
const completeTodoItem = (item, btn) => {
    btn.addEventListener('click', () => {
        todoArray = JSON.parse(localStorage.getItem(key));
        item.classList.toggle('list-group-item-success');
        changeItemDone(todoArray,item);

        localStorage.setItem(key,JSON.stringify(todoArray));



    });
}

const deleteTodoItem = (item,btn) => {
    btn.addEventListener('click', () => {
        if (confirm('Вы точно уверены???')) {
            todoArray = JSON.parse(localStorage.getItem(key));

             const neaList = todoArray.filter(obj => obj.id !== item.id);
            const index = todoArray.findIndex(obj => obj.id === item.id)
            todoArray.splice(index, 1)
            localStorage.setItem(key, JSON.stringify(neaList));
            item.remove();
        }
    });

}

function createTodoApp (container,title, key) {
    const appTitle = createAppTitle(title);
    const appForm = createTodoForm();
    const appList = createTodoList();
    

    container.append( appTitle,appForm.form, appList );

    if (localStorage.getItem(key)) {
        todoArray = JSON.parse(localStorage.getItem(key));


        for (const obj of todoArray) {
            const todoItem = createTodoItem(appForm.input.value);
            

            todoItem.todoItem.textContent = obj.name;
            todoItem.todoItem.id = obj.id;

            if (obj.done == true) {
                todoItem.todoItem.classList.add('list-group-item-success');
                
            } else {
                todoItem.todoItem.classList.remove('list-group-item-success'); 
            }

            completeTodoItem(todoItem.todoItem, todoItem.doneBtn);
            deleteTodoItem(todoItem.todoItem, todoItem.deleteBtn);


            appList.append(todoItem.todoItem);
            todoItem.todoItem.append(todoItem.btnWrapper);


        }
    }


    appForm.form.addEventListener('submit', e => {
        e.preventDefault();

        const todoItem = createTodoItem(appForm.input.value);
        

        if(!appForm.input.value) {
            return;
        }
        completeTodoItem(todoItem.todoItem, todoItem.doneBtn);
        deleteTodoItem(todoItem.todoItem, todoItem.deleteBtn);
        

        let localStorageData = localStorage.getItem(key);


        if (localStorageData == null) {
            todoArray = [];
        
        } else {
            todoArray = JSON.parse(localStorageData);
        }
        



        const createItemObj = (arr) => {
            const ItemObj = {};
            ItemObj.name = appForm.input.value;
            ItemObj.id = todoItem.todoItem.id;
            ItemObj.done = false;

            arr.push(ItemObj);

        }
        createItemObj(todoArray);
        localStorage.setItem(key,JSON.stringify(todoArray));

        appList.append(todoItem.todoItem);
        appForm.input.value = '';
        appForm.addButton.disabled = !appForm.addButton.disabled;

    });





}