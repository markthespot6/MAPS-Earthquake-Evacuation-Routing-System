// ==========================================
// QUAKEROUTE - LOCATION DATABASE
// Barangay 185, Malaria, Caloocan City
// ==========================================

const SCHOOL = {
    lat: 14.769397,
    lng: 121.076768,
    name: "MLQHS"
};

// ==========================================
// 10 LANDMARKS
// ==========================================

const LANDMARKS = [
    {
        id: "mlr road",
        name: "Malaria Road",
        lat: 14.770408,
        lng: 121.077255,
        verified: false
    },
    {
        id: "gate",
        name: "Camia Street",
        lat: 14.769902,
        lng: 121.076447,
        verified: false
    },
    {
        id: "canteen",
        name: "Landmark 3 - Verify Location",
        lat: 14.769050,
        lng: 121.076350,
        verified: false
    },
    {
        id: "gym",
        name: "MLQHS ROAD",
        lat: 14.768839,
        lng: 121.077179,
        verified: false
    },
    {
        id: "landmark5",
        name: "Alfamart Ascoville",
        lat: 14.771962239375409,
        lng: 121.07683772036026,
        verified: false
    },
    {
        id: "landmark6",
        name: "7/11 QUIRINO HIGHWAY",
        lat: 14.774067484598685,
        lng: 121.07723287982336,
        verified: false
    },
    {
        id: "landmark7",
        name: "Landmark 7 - Add Coordinates",
        lat: null,
        lng: null,
        verified: false
    },
    {
        id: "landmark8",
        name: "Landmark 8 - Add Coordinates",
        lat: null,
        lng: null,
        verified: false
    },
    {
        id: "landmark9",
        name: "Landmark 9 - Add Coordinates",
        lat: null,
        lng: null,
        verified: false
    },
    {
        id: "landmark10",
        name: "Landmark 10 - Add Coordinates",
        lat: null,
        lng: null,
        verified: false
    }
];

// ==========================================
// 7 EVACUATION CENTER ENTRIES
// ==========================================

// These are editable records, NOT seven confirmed
// officially designated evacuation centers.

const CENTERS = [
    {
        id: "center",
        name: "Malaria Court - Verify Designation",
        lat: 14.769680,
        lng: 121.079340,
        verified: false
    },
    {
        id: "center2",
        name: "PUROK DOS COURT",
        lat: 14.766687,
        lng: 121.0769,
        verified: true
    },
    {
        id: "center3",
        name: "Ascoville Covered Court",
        lat: 14.771492,
        lng: 121.076892,
        verified: false
    },
    {
        id: "center4",
        name: "Evacuation Center 4",
        lat: null,
        lng: null,
        verified: false
    },
    {
        id: "center5",
        name: "Evacuation Center 5",
        lat: null,
        lng: null,
        verified: false
    },
    {
        id: "center6",
        name: "Evacuation Center 6",
        lat: null,
        lng: null,
        verified: false
    },
    {
        id: "center7",
        name: "Evacuation Center 7",
        lat: null,
        lng: null,
        verified: false
    }
];

// ==========================================
// ROAD NETWORK
// DEMONSTRATION DATA ONLY
// ==========================================

const ROADS = [
    {
        from: "mlr road",
        to: "center",
        distance: 105,
        hazard: 1
    },
    {
        from: "mlr road",
        to: "canteen",
        distance: 125,
        hazard: 2
    },
    {
        from: "gate",
        to: "gym",
        distance: 115,
        hazard: 1
    },
    {
        from: "canteen",
        to: "gym",
        distance: 130,
        hazard: 1
    },
    {
        from: "gym",
        to: "center",
        distance: 155,
        hazard: 1
    },
    {
        from: "canteen",
        to: "center",
        distance: 220,
        hazard: 4
    },
    {
        from: "gate",
        to: "center",
        distance: 285,
        hazard: 2
    }
];

// Hazard penalty for Dijkstra
const HAZARD_PENALTY = 80;
