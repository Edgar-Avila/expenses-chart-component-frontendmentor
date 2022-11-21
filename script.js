const chart = document.getElementById("chart-diagram");
const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

async function getData() {
    let res = await fetch("./data.json");
    let data = await res.json();
    return data;
}

window.addEventListener("load", async () => {
    let data = await getData();
    let max = Math.max(...data.map(e => e.amount));
    let today = days[new Date().getDay()];
    for(let el of data) {
        // Create entry
        let entry = document.createElement("div");
        entry.classList.add("entry");

        // Create bar container
        let barContainer = document.createElement("div");
        barContainer.classList.add("bar-container");

        // Create bar
        let bar = document.createElement("div");
        bar.style.height = `${el.amount/max * 100}%`
        bar.classList.add("bar");
        if(today == el.day) {
            bar.classList.add("today");
        }

        // Create label
        let label = document.createElement("span");
        label.textContent = el.day;

        // Add all to chart
        barContainer.appendChild(bar);
        entry.appendChild(barContainer);
        entry.appendChild(label)
        chart.appendChild(entry);
    }
});