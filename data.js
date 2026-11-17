
const SCHOOL = {
    lat: 14.769397,
    lng: 121.076768,
    name: "MLQHS"
};

const LANDMARKS = [
    {
        id: "library",
        name: "Purok dos Court",
        lat: 14.766733,
        lng: 121.076872
    },
    {
        id: "gate",
        name: "123",
        lat: 14.76972,
        lng: 121.07720
    },
    {
        id: "canteen",
        name: "1234",
        lat: 14.76905,
        lng: 121.07635
    },
    {
        id: "gym",
        name: "12345",
        lat: 14.76882,
        lng: 121.07705
    }
];

const CENTERS = [
    {
        id: "center",
        name: "MALARIA COURT",
        lat: 14.76968,
        lng: 121.07934
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
