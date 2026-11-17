// ==========================================
// QUAKEROUTE
// EARTHQUAKE EVACUATION ROUTING SYSTEM
// ==========================================

// MAP INITIALIZATION

const map = L.map("map").setView(
    [SCHOOL.lat, SCHOOL.lng],
    17
);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);

const routeLayer = L.layerGroup().addTo(map);
const markerLayer = L.layerGroup().addTo(map);

// HTML ELEMENTS

const landmarkSelect = document.getElementById("landmark");
const centerSelect = document.getElementById("center");

const findButton = document.getElementById("findRoute");
const resetButton = document.getElementById("resetRoute");

const resultElement = document.getElementById("result");
const routeInfo = document.getElementById("routeInfo");

const distanceElement = document.getElementById("distance");
const routePathElement = document.getElementById("routePath");

// ==========================================
// LOCATION VALIDATION
// ==========================================

function hasCoordinates(item) {
    return (
        item.lat !== null &&
        item.lng !== null &&
        Number.isFinite(item.lat) &&
        Number.isFinite(item.lng) &&
        Math.abs(item.lat) <= 90 &&
        Math.abs(item.lng) <= 180
    );
}

function allNodes() {
    return [...LANDMARKS, ...CENTERS];
}

function getNode(id) {
    return allNodes().find(item => item.id === id);
}

// ==========================================
// DROPDOWN GENERATION
// ==========================================

function populateSelect(select, items, placeholder) {

    select.innerHTML = "";

    select.add(
        new Option(placeholder, "")
    );

    items
        .filter(hasCoordinates)
        .forEach(item => {

            select.add(
                new Option(item.name, item.id)
            );

        });
}

populateSelect(
    landmarkSelect,
    LANDMARKS,
    "Choose a landmark"
);

populateSelect(
    centerSelect,
    CENTERS,
    "Choose an evacuation center"
);

// ==========================================
// MAP MARKERS
// ==========================================

function drawMarkers() {

    markerLayer.clearLayers();

    // School reference point
    L.marker([
        SCHOOL.lat,
        SCHOOL.lng
    ])
    .bindPopup(SCHOOL.name)
    .addTo(markerLayer);

    // Landmark markers
    LANDMARKS
        .filter(hasCoordinates)
        .forEach(item => {

            L.circleMarker(
                [item.lat, item.lng],
                {
                    radius: 7,
                    color: "#16834a",
                    fillColor: "#20a35a",
                    fillOpacity: 0.9,
                    weight: 2
                }
            )
            .bindPopup(
                `<strong>${item.name}</strong><br>
                ${item.verified
                    ? "Location verified"
                    : "Provisional location - verify"}`
            )
            .addTo(markerLayer);

        });

    // Evacuation center markers
    CENTERS
        .filter(hasCoordinates)
        .forEach(item => {

            L.marker([
                item.lat,
                item.lng
            ])
            .bindPopup(
                `<strong>${item.name}</strong><br>
                ${item.verified
                    ? "Designation verified"
                    : "Not confirmed as an official evacuation center"}`
            )
            .addTo(markerLayer);

        });
}

drawMarkers();

// ==========================================
// BUTTON VALIDATION
// ==========================================

function updateButtonState() {

    findButton.disabled = !(
        landmarkSelect.value &&
        centerSelect.value
    );

}

landmarkSelect.addEventListener(
    "change",
    updateButtonState
);

centerSelect.addEventListener(
    "change",
    updateButtonState
);

// ==========================================
// BUILD GRAPH
// ==========================================

function buildGraph(hazardAware) {

    const graph = {};

    allNodes()
        .filter(hasCoordinates)
        .forEach(node => {

            graph[node.id] = [];

        });

    ROADS.forEach(road => {

        if (
            !graph[road.from] ||
            !graph[road.to]
        ) {
            return;
        }

        const distance = Number(road.distance);
        const hazard = Number(road.hazard);

        if (
            !Number.isFinite(distance) ||
            distance <= 0 ||
            !Number.isFinite(hazard) ||
            hazard < 0
        ) {
            return;
        }

        const weight = hazardAware
            ? distance + hazard * HAZARD_PENALTY
            : distance;

        graph[road.from].push({
            node: road.to,
            weight: weight,
            distance: distance
        });

        graph[road.to].push({
            node: road.from,
            weight: weight,
            distance: distance
        });

    });

    return graph;
}

// ==========================================
// DIJKSTRA ALGORITHM
// ==========================================

function dijkstra(graph, start, end) {

    if (!graph[start] || !graph[end]) {
        return null;
    }

    const distances = {};
    const previous = {};
    const visited = new Set();

    Object.keys(graph).forEach(node => {

        distances[node] = Infinity;

    });

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

            if (visited.has(edge.node)) {
                return;
            }

            const candidate =
                distances[current] + edge.weight;

            if (candidate < distances[edge.node]) {

                distances[edge.node] = candidate;
                previous[edge.node] = current;

            }

        });

    }

    if (!Number.isFinite(distances[end])) {
        return null;
    }

    const path = [];

    let current = end;

    while (current !== undefined) {

        path.unshift(current);

        if (current === start) {
            break;
        }

        current = previous[current];

    }

    if (path[0] !== start) {
        return null;
    }

    return {
        path: path,
        cost: distances[end]
    };
}

// ==========================================
// ROAD CONNECTION
// ==========================================

function findRoad(from, to) {

    return ROADS.find(road =>

        (
            road.from === from &&
            road.to === to
        ) ||
        (
            road.from === to &&
            road.to === from
        )

    );

}

// ==========================================
// DISTANCE CALCULATION
// ==========================================

function calculateDistance(path) {

    let total = 0;

    for (
        let i = 0;
        i < path.length - 1;
        i++
    ) {

        const road = findRoad(
            path[i],
            path[i + 1]
        );

        if (road) {
            total += Number(road.distance);
        }

    }

    return total;
}

// ==========================================
// GET ROAD GEOMETRY FROM OSRM
// ==========================================

async function fetchRoadGeometry(fromId, toId) {

    const from = getNode(fromId);
    const to = getNode(toId);

    if (!from || !to) {
        throw new Error("Missing location coordinates.");
    }

    const url =
        "https://router.project-osrm.org/route/v1/driving/" +
        `${from.lng},${from.lat};${to.lng},${to.lat}` +
        "?overview=full&geometries=geojson&steps=false";

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Road service unavailable.");
    }

    const data = await response.json();

    if (
        data.code !== "Ok" ||
        !data.routes ||
        !data.routes[0]
    ) {
        throw new Error("No road geometry available.");
    }

    return data.routes[0].geometry.coordinates.map(
        ([lng, lat]) => [lat, lng]
    );
}

// ==========================================
// DRAW ROAD-FOLLOWING ROUTE
// ==========================================

async function drawRoadFollowingRoute(path) {

    const fullGeometry = [];

    let usedFallback = false;

    for (
        let i = 0;
        i < path.length - 1;
        i++
    ) {

        try {

            const segment = await fetchRoadGeometry(
                path[i],
                path[i + 1]
            );

            if (fullGeometry.length) {
                segment.shift();
            }

            fullGeometry.push(...segment);

        } catch (error) {

            usedFallback = true;

            const a = getNode(path[i]);
            const b = getNode(path[i + 1]);

            if (!fullGeometry.length) {
                fullGeometry.push([
                    a.lat,
                    a.lng
                ]);
            }

            fullGeometry.push([
                b.lat,
                b.lng
            ]);

        }

    }

    L.polyline(fullGeometry, {
        color: "#2367d1",
        weight: 6,
        opacity: 0.9
    }).addTo(routeLayer);

    return usedFallback;
}

// ==========================================
// FIND EVACUATION ROUTE
// ==========================================

findButton.addEventListener(
    "click",
    async function () {

        const start = landmarkSelect.value;
        const end = centerSelect.value;

        if (!start || !end) {
            return;
        }

        findButton.disabled = true;

        routeLayer.clearLayers();

        routeInfo.hidden = true;

        resultElement.textContent =
            "Calculating route...";

        try {

            const hazardAware =
                document.getElementById("hazardMode").checked;

            const graph = buildGraph(hazardAware);

            const result = dijkstra(
                graph,
                start,
                end
            );

            if (!result) {

                resultElement.textContent =
                    "No connected route found. Check your road network.";

                return;
            }

            const usedFallback =
                await drawRoadFollowingRoute(result.path);

            const routeCoordinates = result.path
                .map(getNode)
                .filter(Boolean)
                .map(node => [
                    node.lat,
                    node.lng
                ]);

            if (routeCoordinates.length) {

                map.fitBounds(
                    routeCoordinates,
                    {
                        padding: [30, 30]
                    }
                );

            }

            const distance =
                calculateDistance(result.path);

            const names = result.path.map(id => {

                const node = getNode(id);

                return node ? node.name : id;

            });

            resultElement.textContent = usedFallback
                ? "Route calculated. Some segments use straight-line fallback because road geometry was unavailable."
                : "Route calculated using available road geometry.";

            distanceElement.textContent =
                `Configured network distance: ${distance.toLocaleString()} meters`;

            routePathElement.textContent =
                `Route: ${names.join(" → ")}`;

            routeInfo.hidden = false;

            const destination = getNode(end);

            if (
                destination &&
                !destination.verified
            ) {

                resultElement.textContent +=
                    " WARNING: This destination is not confirmed as an officially designated evacuation center.";

            }

        } catch (error) {

            console.error(error);

            resultElement.textContent =
                "Unable to calculate the route. Check your internet connection.";

        } finally {

            updateButtonState();

        }

    }
);

// ==========================================
// RESET ROUTE
// ==========================================

resetButton.addEventListener(
    "click",
    function () {

        landmarkSelect.value = "";
        centerSelect.value = "";

        routeLayer.clearLayers();

        routeInfo.hidden = true;

        resultElement.textContent =
            "Select your nearest landmark.";

        map.setView(
            [SCHOOL.lat, SCHOOL.lng],
            17
        );

        updateButtonState();

    }
);

// INITIAL BUTTON STATE

updateButtonState();