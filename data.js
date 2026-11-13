
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
        name: "School Library",
        lat: 14.77005,
        lng: 121.07655
    },
    {
        id: "gate",
        name: "Main Gate",
        lat: 14.76972,
        lng: 121.07720
    },
    {
        id: "MLQES",
        name: "Manuel L. Quezon Elementary School",
        lat: 14.76936,
        lng: 121.078955
    },
    {
        id: "Purok Dos Court",
        name: "Covered Court",
        lat: 14.766652,
        lng: 121.076939
    }
];

// Replace with an officially designated center.
const CENTERS = [
    {
        id: "Malaria Court",
        name: "Evacuation Center",
        lat: 14.769665,
        lng: 121.079341
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
