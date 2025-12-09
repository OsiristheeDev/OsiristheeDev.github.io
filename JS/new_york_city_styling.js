const map = L.map('map').setView([40.7128, -74.0060], 13);

// Update zoom display when map zooms
map.on('zoomend', function() {
    document.getElementById('zoom-display').textContent = 'Zoom: ' + map.getZoom();
});

// Add a basemap so you can see context
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);

const legend = L.control({position: 'topleft'});
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'legend');
        
        div.innerHTML = '<h4>Comfort Rating</h4>';
        div.innerHTML += '<i style="background: #00FF7F"></i> Comfort 1 : For Children <br>';
        div.innerHTML += '<i style="background: #FCCA46"></i> Comfort 2 : For Most Adults <br>';
        div.innerHTML += '<i style="background: #FE7F2D"></i> Comfort 3 : For Confident Cyclists <br>';
        div.innerHTML += '<i style="background: #942911"></i> Comfort 4 : For No One <br>';
        div.innerHTML += '<i style="background: #009FB7"></i> Comfort Unknown  : Not Enough Information Available  <br>';
        
        return div;
    };

legend.addTo(map);

// Color scale for LTS (Level of Traffic Stress)
const ltsColors = {
    1: '#00FF7F', // Green - Low stress
    2: '#FCCA46', // Yellow
    3: '#FE7F2D', // Orange
    4: '#942911', // Red - High stress
    5: '#009FB7'  // Blue - Unknown
};

function getLTSColor(lts) {
    return ltsColors[lts] || '#009FB7';
}

// Define paint rules with CORRECT camelCase property names
const PAINT_RULES = [
    {
        dataLayer: 'bike_network',
        symbolizer: new protomapsL.LineSymbolizer({
            color: (zoom, feature) => {
                console.log('Feature props:', feature.props);
                const lts = feature.props.lts;
                return getLTSColor(lts);
            },
            width: (zoom, feature) => {
                if (zoom < 12) return 1;
                if (zoom < 14) return 2;
                if (zoom < 16) return 3;
                return 4;
            }
        })
    }
];

// Add PMTiles layer with CORRECT camelCase: paintRules, NOT paint_rules
const pmtilesLayer = protomapsL.leafletLayer({
    url: 'https://pub-8bf68bd2143d475b8224f5d36f72ef9b.r2.dev/nyc_tiles.pmtiles',
    paintRules: PAINT_RULES,
    labelRules: []
});

pmtilesLayer.addTo(map);
console.log('PMTiles layer added with LTS styling');

// Load CSV for markers (same as before)
fetch('cyclist_killed_after_2015_ny.csv')
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
})
.then(csvText => {
    console.log('CSV loaded successfully!');
    const rows = csvText.split(/\r?\n/);
    const columnHeader = rows.shift().split(',');

    const data = rows.map(row => {
        const rowValues = row.split(',');
        const rowObject = rowValues.reduce((obj, value, index) => {
            const header = columnHeader[index];
            obj[header] = value;
            return obj;
        }, {});
        return rowObject;
    });

    const tombstoneIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252129.png',
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25]
    });

    for (const row of data) {
        const lat = parseFloat(row['latitude']);
        const lng = parseFloat(row['longitude']);

        if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
            continue;
        }

        const marker = L.marker([lat, lng], {
            icon: tombstoneIcon
        }).addTo(map);
        marker.bindPopup(`
            <strong>Fatal Incident Details</strong><br>
            Date: ${row['crash_date']}<br>
            Cause: ${row['contributing_factor_vehicle_1']}<br>
        `);
    }
})
.catch(error => {
    console.error('Fetch error:', error);
});
