
const SCHOOL = {
    lat: 14.769397,
    lng: 121.076768,
    name: "Manuel L. Quezon High School"
};

// DEMO COORDINATES ONLY.
// Replace with actual surveyed landmark coordinates.

const LANDMARKS = [
    {
        id: "library",
        name: " - School Library",
        lat: 14.77005,
        lng: 121.07655
    },
    {
        id: "gate",
        name: "DEMO - Main Gate",
        lat: 14.76972,
        lng: 121.07720
    },
    {
        id: "canteen",
        name: "DEMO - School Canteen",
        lat: 14.76905,
        lng: 121.07635
    },
    {
        id: "gym",
        name: "DEMO - School court",
        lat: 14.76882,
        lng: 121.07705
    }
];

// Replace with an officially designated center.
const CENTERS = [
    {
        id: "center",
        name: "DEMO - Evacuation Center",
        lat: 14.76835,
        lng: 121.07755
    }
];

// Sample road network.
// Hazard scores are illustrative, not actual risk assessments.

const ROADS = [
    { from: "library", to: "gate", distance: 105, hazard: 1 },
    { from: "library", to: "canteen", distance: 125, hazard: 2 },
    { from: "gate", to: "gym", distance: 115, hazard: 1 },
    { from: "canteen", to: "gym", distance: 130, hazard: 1 },
    { from: "gym", to: "center", distance: 155, hazard: 1 },
    { from: "canteen", to: "center", distance: 220, hazard: 4 },
    { from: "gate", to: "center", distance: 285, hazard: 2 }
];

const HAZARD_PENALTY = 80;
