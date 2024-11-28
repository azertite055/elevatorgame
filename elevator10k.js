var floor = 1;
var items = [];
var hasEvent = Array(10000).fill([]);
var itemData = {};
window.fetch(`items.json`).then((r) => {
    if(!r.ok){
        throw new Error(`erm what the sigma ${r.status}`);
    }
    return r.json()
}).then((idata) => {
    itemData = idata;
});

function goToFloor(f){
    if (typeof f != "number" || f < 1 || f > 10000 || f != Math.floor(f)){
        window.alert("Nice try.");
        items.push(123456789);
        return;
    }
    floor = f;
    window.fetch(`floors/${Math.floor((f-1)/100)}/${f}.json`).then((r) => {
        if(!r.ok){
            throw new Error(`erm what the sigma ${r.status}`);
        }
        return r.json()
    }).then((fdata) => {
        update(fdata, f);
    });
}
function memberCheck(a, x){
    var tracked = Array(a.length).fill(false);
    out: for (let i of x){
        for (let j=0; j<a.length; j++){
            if (a[j] == i && !tracked[j]){
                tracked[j] = true;
                continue out;
            }
        }
        return false;
    }
    return true;
}
function update(d, f){
    var floorText = "";
    var inventoryText = "";
    el: for (let i = 0; i<d.events.length; i++){
        e = d.events[i];
        e.chance = e.chance || 1;
        e.code = e.code || "";
        if (!memberCheck(items, e.req)){
            continue el;
        }
        if (Math.random() > e.chance){
            continue el;
        }
        //event updates run here
        hasEvent[f].push(i);
        floorText += `<br>${e.text}`;
        for (let t of e.take){
            if (items.indexOf(t) > -1){
            items = items.slice(0, items.indexOf(t)).concat(items.slice(items.indexOf(t)+1, items.length));
            }
        }
        for (let g of e.give){
            items.push(g);
        }
        eval(e.code);
    }
    document.getElementById("inventory").innerHTML = "";
    for (let i=0; i<items.length; i++){
        var ib = document.getElementById("inventory").appendChild(document.createElement("div"));
        ib.classList.add("itembox");
        ib.style.backgroundImage = `url(${itemData[items[i]].imgurl})`;
        ib.style.backgroundSize = "100% 100%";
        ib.onmouseenter = () => {
            document.getElementById("itemname").textContent = itemData[items[i]].name;
        }
        ib.onmouseleave = () => {
            document.getElementById("itemname").textContent = "\xa0";
        }
    }
    console.log(inventoryText);
    document.getElementById("ddesc").innerHTML = `-=- Floor ${f} -=-${floorText}`;
    document.getElementById("dimage").style.backgroundImage = `url(${d.imgurl})`;
}
