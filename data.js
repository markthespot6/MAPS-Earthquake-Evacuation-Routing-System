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
        id: "library",
        name: "Purok Dos Court",
        lat: 14.766733,
        lng: 121.076872,
        verified: false
    },
    {
        id: "gate",
        name: "Landmark 2 - Verify Location",
        lat: 14.769720,
        lng: 121.077200,
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
        name: "Landmark 4 - Verify Location",
        lat: 14.768820,
        lng: 121.077050,
        verified: false
    },
    {
        id: "landmark5",
        name: "Landmark 5 - Verify Location",
        lat: 14.768820,
        lng: 121.073700,
        verified: false
    },
    {
        id: "landmark6",
        name: "Landmark 6 - Add Coordinates",
        lat: null,
        lng: null,
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
        name: "Evacuation Center 2",
        lat: 14.766687,
        lng: 121.0769,
        verified: false
    },
    {
        id: "center3",
        name: "Evacuation Center 3",
        lat: null,
        lng: null,
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
        from: "library",
        to: "gate",
        distance: 105,
        hazard: 1
    },
    {
        from: "library",
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
