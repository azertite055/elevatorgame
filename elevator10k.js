var floor = 1;
var items = [];
var hasEvent = Array(10000).fill([]);
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
function update(d, f){
    var floorText = "";
    el: for (let i = 0; i<d.events.length; i++){
        e = d.events[i];
        for (r of e.req){
            if (!items.includes(r)){
                continue el; //skip to checking next event
            }
        }
        if (e.once && hasEvent[f].includes(i)){
            continue; //skip one-time events
        }
        //event updates run here
        hasEvent[f].push(i);
        floorText += `<br>${e.text}`;
        for (let g of e.give){
            items.push(g);
        }
        for (let t of e.take){
            if (items.indexOf(t) > -1){
            items = items.slice(0, items.indexOf(t)).concat(items.slice(items.indexOf(t)+1, items.length));
            }
        }
    }
    document.getElementById("ddesc").innerHTML = `-=- Floor ${f} -=-${floorText}`;
    document.getElementById("dimage").style.backgroundImage = `url(${d.imgurl})`
}