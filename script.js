
const map = L.map("map").setView(
    [SCHOOL.lat, SCHOOL.lng], 17
);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);

const routeLayer = L.layerGroup().addTo(map);
const markers = L.layerGroup().addTo(map);

L.marker([SCHOOL.lat, SCHOOL.lng])
    .bindPopup("School Reference Point")
    .addTo(markers);

LANDMARKS.forEach(item => {
    L.circleMarker([item.lat, item.lng], {
        radius: 7,
        color: "green",
        fillOpacity: 1
    })
    .bindPopup(item.name)
    .addTo(markers);
});

CENTERS.forEach(item => {
    L.marker([item.lat, item.lng])
        .bindPopup(item.name)
        .addTo(markers);
});

const landmarkSelect = document.getElementById("landmark");
const centerSelect = document.getElementById("center");
const findButton = document.getElementById("findRoute");

LANDMARKS.forEach(item => {
    landmarkSelect.add(new Option(item.name, item.id));
});

CENTERS.forEach(item => {
    centerSelect.add(new Option(item.name, item.id));
});

landmarkSelect.addEventListener("change", () => {
    findButton.disabled = !landmarkSelect.value;
});

function buildGraph(hazardAware) {
    const graph = {};

    ROADS.forEach(road => {
        if (!graph[road.from]) graph[road.from] = [];
        if (!graph[road.to]) graph[road.to] = [];

        const weight = hazardAware
            ? road.distance + road.hazard * HAZARD_PENALTY
            : road.distance;

        graph[road.from].push({
            node: road.to,
            weight,
            distance: road.distance
        });

        graph[road.to].push({
            node: road.from,
            weight,
            distance: road.distance
        });
    });

    return graph;
}

function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const visited = new Set();

    Object.keys(graph).forEach(node => {
        distances[node] = Infinity;
    });

    if (!(start in distances) || !(end in distances)) {
        return null;
    }

    distances[start] = 0;

    while (true) {
        let current = null;
        let minimum = Infinity;

        for (const node in distances) {
            if (
                !visited.has(node) &&
                distances[node] < minimum
            ) {
                minimum = distances[node];
                current = node;
            }
        }

        if (current === null) break;
        if (current === end) break;

        visited.add(current);

        graph[current].forEach(edge => {
            const newDistance =
                distances[current] + edge.weight;

            if (newDistance < distances[edge.node]) {
                distances[edge.node] = newDistance;
                previous[edge.node] = current;
            }
        });
    }

    if (distances[end] === Infinity) return null;

    const path = [];
    let current = end;

    while (current) {
        path.unshift(current);

        if (current === start) break;

        current = previous[current];
    }

    if (path[0] !== start) return null;

    return {
        path,
        cost: distances[end]
    };
}

function calculateDistance(path) {
    let total = 0;

    for (let i = 0; i < path.length - 1; i++) {
        const road = ROADS.find(r =>
            (r.from === path[i] && r.to === path[i + 1]) ||
            (r.to === path[i] && r.from === path[i + 1])
        );

        if (road) total += road.distance;
    }

    return total;
}

function getCoordinates(id) {
    const landmark = LANDMARKS.find(x => x.id === id);
    if (landmark) return [landmark.lat, landmark.lng];

    const center = CENTERS.find(x => x.id === id);
    if (center) return [center.lat, center.lng];

    return null;
}

findButton.addEventListener("click", () => {
    const start = landmarkSelect.value;
    const end = centerSelect.value;

    if (!start || !end) return;

    const hazardAware =
        document.getElementById("hazardMode").checked;

    const graph = buildGraph(hazardAware);
    const result = dijkstra(graph, start, end);

    routeLayer.clearLayers();

    if (!result) {
        document.getElementById("result").textContent =
            "No connected route found. Check the road network.";
        document.getElementById("routeInfo").hidden = true;
        return;
    }

    const coordinates = result.path
        .map(getCoordinates)
        .filter(Boolean);

    L.polyline(coordinates, {
        color: "#2367d1",
        weight: 6
    }).addTo(routeLayer);

    map.fitBounds(coordinates, { padding: [30, 30] });

    const distance = calculateDistance(result.path);

    document.getElementById("result").textContent =
        "Route successfully calculated.";

    document.getElementById("routeInfo").hidden = false;

    document.getElementById("distance").textContent =
        `Distance: ${distance} meters`;

    document.getElementById("routePath").textContent =
        `Route: ${result.path.join(" → ")}`;
});

document.getElementById("resetRoute")
    .addEventListener("click", () => {

        landmarkSelect.value = "";
        findButton.disabled = true;

        routeLayer.clearLayers();

        document.getElementById("routeInfo").hidden = true;

        document.getElementById("result").textContent =
            "Select your nearest landmark.";

        map.setView([SCHOOL.lat, SCHOOL.lng], 17);
    });
