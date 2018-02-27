var itemArray=JSON.parse(localStorage.getItem('data'))||[];
var present=-1;
window.onload=function () {
    console.log(itemArray);
    var listItem=document.getElementById("item");
    var add=document.getElementById("add");
    var list=document.getElementById("list");
    display();
    add.onclick=function () {
        var listValue=listItem.value;
        console.log(listValue);
        var items={
            "itemValue": listValue,
            "done": false
        }
        itemArray.push(items);
        display();
        localStorage.setItem('data',JSON.stringify(itemArray));
        listItem.value="";
    }

}
function display() {
    var data="";
    list.innerHTML="";
    for(var i=0;i<itemArray.length;i++)
    {
        console.log(itemArray);
        if(itemArray[i])
        {
            if(itemArray[i].done==false)
            {
                console.log(i);
                data+='<a href="#" class="list-group-item" id=' + i + ' onclick="check(this)" >'+itemArray[i].itemValue+'<i class="fa fa-window-close fa-pull-right fa-lg  "id='+i+' aria-hidden="true"  onclick="del(this)"> </i> '+'<i class="fa fa-pencil-square-o fa-pull-right fa-lg" id='+ i +' aria-hidden="true" onclick="update(this)">'+'</i> </a>'
            }
            else
            {
                console.log(i);
                data+='<a href="#" class="list-group-item" style="text-decoration: line-through" id=' + i + ' onclick="check(this)" >'+itemArray[i].itemValue+'<i class="fa fa-window-close fa-pull-right fa-lg  "id='+i+' aria-hidden="true"  onclick="del(this)"> </i> '+'<i class="fa fa-pencil-square-o fa-pull-right fa-lg" id='+ i +' aria-hidden="true" onclick="update(this)">'+'</i> </a>'
            }
        }
    }
    list.innerHTML=data;
}

function check(el) {
    //console.log(itemArray[el.id]+" "+id);
    if(present===-1)
    {
        if(itemArray[el.id].done===false)
        {
            itemArray[el.id].done=true;
            el.style.textDecoration="line-through";
        }
        else
        {
            itemArray[el.id].done=false;
            el.style.textDecoration="none"
            console.log("hey");
        }
        localStorage.setItem('data',JSON.stringify(itemArray));
    }
}
function del(el) {
    itemArray.splice(el.id, 1);
    display();
    localStorage.setItem('data',JSON.stringify(itemArray));

}
function update(el) {
    el.style.textDecoration="none";
    present=el.id;
    var dummy = '<div> Update todo list: <input class="form-control" id="updateItem" type="text"><button onclick="actUpdate(this)">Update</button></div>\r\n';
    document.getElementById(el.id).innerHTML += dummy;
}
function actUpdate(el) {
    var updatedValue=document.getElementById("updateItem").value;
    itemArray[present].itemValue=updatedValue;
    itemArray[present].done=false;
    display();
    itemArray[present].done=true;
    localStorage.setItem('data',JSON.stringify(itemArray));
    present=-1;
    el.style.display="none";
}