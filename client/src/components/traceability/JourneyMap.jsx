import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Wheat } from 'lucide-react';
import indiaGeoJSON from '../../assets/indiaStates.json';

// India geographic bounds [minLng, minLat, maxLng, maxLat]
const BOUNDS = [68, 6, 98, 38];
const MAP_WIDTH = 500;
const MAP_HEIGHT = 560;

function projectCoords(coords) {
  const [minLng, minLat, maxLng, maxLat] = BOUNDS;
  const x = ((coords[0] - minLng) / (maxLng - minLng)) * MAP_WIDTH;
  const y = MAP_HEIGHT - ((coords[1] - minLat) / (maxLat - minLat)) * MAP_HEIGHT;
  return [x, y];
}

function getPathData(geometry) {
  const processRing = (ring) => {
    return ring
      .map((coord, i) => {
        const [x, y] = projectCoords(coord);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ') + ' Z';
  };

  if (geometry.type === 'Polygon') {
    return geometry.coordinates.map(processRing).join(' ');
  }
  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates
      .flatMap((polygon) => polygon.map(processRing))
      .join(' ');
  }
  return '';
}

export default function JourneyMap({ locations, stats, highlightStates = [] }) {
  const [hoveredState, setHoveredState] = useState(null);

  // Precompute SVG path data for each state
  const statesData = useMemo(() => {
    return indiaGeoJSON.features.map((feature) => ({
      name: feature.properties.st_nm,
      path: getPathData(feature.geometry),
      isFarm: highlightStates.includes(feature.properties.st_nm),
    }));
  }, [highlightStates]);

  // Project farm locations to SVG coordinates
  const farmPins = useMemo(() => {
    return locations.map((loc) => {
      const [x, y] = projectCoords([loc.lng, loc.lat]);
      return { ...loc, x, y };
    });
  }, [locations]);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-forest">Farm Network</span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mt-2 text-text-brown">
            Our Farming Clusters Across India
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* India GeoJSON Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-forest/5 to-olive/5 rounded-3xl p-4 md:p-8">
              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className="w-full h-auto max-w-lg mx-auto"
                role="img"
                aria-label="India map showing farm locations"
              >
                {/* State Polygons */}
                {statesData.map((state) => (
                  <motion.path
                    key={state.name}
                    d={state.path}
                    fill={
                      hoveredState === state.name
                        ? '#C6A15B'
                        : state.isFarm
                        ? '#4E6B3C'
                        : '#E7DDCF'
                    }
                    stroke="#FFFFFF"
                    strokeWidth="0.5"
                    className="transition-colors duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredState(state.name)}
                    onMouseLeave={() => setHoveredState(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ))}

                {/* Farm Location Markers */}
                {farmPins.map((pin, i) => (
                  <g key={pin.name}>
                    <motion.circle
                      cx={pin.x}
                      cy={pin.y}
                      r="8"
                      fill="none"
                      stroke="#C6A15B"
                      strokeWidth="1.5"
                      animate={{ r: [6, 14, 6], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <motion.circle
                      cx={pin.x}
                      cy={pin.y}
                      r="5"
                      fill="#C6A15B"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.2, type: 'spring' }}
                    />
                    <text
                      x={pin.x + 9}
                      y={pin.y + 3}
                      fontSize="8"
                      fill="#3B2F2F"
                      fontFamily="Inter, sans-serif"
                      fontWeight="600"
                    >
                      {pin.name.split(',')[0]}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Hovered State Tooltip */}
              {hoveredState && (
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 border border-beige z-10">
                  <p className="text-sm font-semibold text-text-brown">{hoveredState}</p>
                  <p className="text-xs text-text-brown/60">
                    {highlightStates.includes(hoveredState) ? '🌿 Active farm cluster' : 'No active farms'}
                  </p>
                </div>
              )}

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-text-brown/70">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-forest" />
                  <span>Farm States</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-beige border border-white" />
                  <span>Other States</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gold" />
                  <span>Farm Clusters</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Farm Location Cards */}
          <div className="space-y-4">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-cream rounded-xl p-4 gold-border hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-forest" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-text-brown text-sm">{loc.name}</h4>
                  <p className="text-xs text-text-brown/60">{loc.crops.join(' · ')}</p>
                </div>
                <div className="text-xs text-forest font-mono">
                  {loc.lat.toFixed(2)}°N
                </div>
              </motion.div>
            ))}

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="text-center p-4 bg-forest/5 rounded-xl">
                <Users className="w-5 h-5 text-forest mx-auto mb-1" />
                <p className="text-lg font-heading font-bold text-forest">{stats.totalFarmers.toLocaleString()}</p>
                <p className="text-[10px] text-text-brown/60">Farmers</p>
              </div>
              <div className="text-center p-4 bg-forest/5 rounded-xl">
                <MapPin className="w-5 h-5 text-forest mx-auto mb-1" />
                <p className="text-lg font-heading font-bold text-forest">{stats.statesCovered}</p>
                <p className="text-[10px] text-text-brown/60">States</p>
              </div>
              <div className="text-center p-4 bg-forest/5 rounded-xl">
                <Wheat className="w-5 h-5 text-forest mx-auto mb-1" />
                <p className="text-lg font-heading font-bold text-forest">{stats.organicAcres.toLocaleString()}</p>
                <p className="text-[10px] text-text-brown/60">Acres</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
