import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  baselinePoints,
  gulfOfTonkinTreatyPoints,
  hoangSaIslands,
  truongSaIslands,
  dk1AndSouthernShelf,
  coastalIslands,
  internationalStraits,
  portsAndOilfields,
  GisPoint,
} from '../data/gisRealData';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Compass,
  MapPin,
  Shield,
  Anchor,
  Flame,
  Ship,
  Info,
  Maximize2,
  Minimize2,
  Crosshair,
  Search,
  X,
  Navigation,
  Check,
  Globe2,
  Mountain,
  Car,
  ChevronRight,
  Copy,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export type MapMode = 'default' | 'satellite' | 'terrain' | 'traffic' | 'ocean';

interface RealGisMapProps {
  onSelectPoint?: (point: GisPoint) => void;
}

export const RealGisMap: React.FC<RealGisMapProps> = ({ onSelectPoint }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Map Mode State
  const [activeMapMode, setActiveMapMode] = useState<MapMode>('satellite');
  const [showLabels, setShowLabels] = useState(true);
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mouseCoords, setMouseCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<GisPoint | null>(null);
  const [copiedCoords, setCopiedCoords] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Layer Toggles
  const [visibleLayers, setVisibleLayers] = useState({
    baseline: true,
    tonkin: true,
    hoangsa: true,
    truongsa: true,
    dk1: true,
    coastal: true,
    shipping: true,
    ports: true,
    eez: true,
    marineTraffic: true,
  });

  // Layer Groups References
  const layerGroupsRef = useRef<{
    baseline: L.LayerGroup;
    tonkin: L.LayerGroup;
    hoangsa: L.LayerGroup;
    truongsa: L.LayerGroup;
    dk1: L.LayerGroup;
    coastal: L.LayerGroup;
    shipping: L.LayerGroup;
    ports: L.LayerGroup;
    eez: L.LayerGroup;
  }>({
    baseline: L.layerGroup(),
    tonkin: L.layerGroup(),
    hoangsa: L.layerGroup(),
    truongsa: L.layerGroup(),
    dk1: L.layerGroup(),
    coastal: L.layerGroup(),
    shipping: L.layerGroup(),
    ports: L.layerGroup(),
    eez: L.layerGroup(),
  });

  // Tile Layers References
  const baseTileRef = useRef<L.TileLayer | null>(null);
  const labelTileRef = useRef<L.TileLayer | null>(null);
  const seamarkTileRef = useRef<L.TileLayer | null>(null);

  // All searchable locations
  const allLocations: GisPoint[] = useMemo(() => {
    return [
      ...hoangSaIslands,
      ...truongSaIslands,
      ...coastalIslands,
      ...baselinePoints,
      ...dk1AndSouthernShelf,
      ...portsAndOilfields,
      ...internationalStraits,
      ...gulfOfTonkinTreatyPoints.map((p) => ({
        id: `tonkin-${p.pt}`,
        name: `Điểm ${p.pt} - Ranh giới Vịnh Bắc Bộ`,
        lat: p.lat,
        lng: p.lng,
        type: 'tonkin' as const,
        desc: p.desc,
        province: 'Ranh giới phân định Việt - Trung 2000',
        significance: 'Mốc tọa độ pháp lý phân định theo Hiệp định 25/12/2000',
      })),
    ];
  }, []);

  // Filtered search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allLocations
      .filter((loc) => {
        return (
          loc.name.toLowerCase().includes(q) ||
          (loc.province && loc.province.toLowerCase().includes(q)) ||
          loc.desc.toLowerCase().includes(q)
        );
      })
      .slice(0, 7);
  }, [searchQuery, allLocations]);

  // Fix leaflet default icon URLs
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [14.0, 112.5],
      zoom: 5.5,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Mouse coordinate tracker
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setMouseCoords({
        lat: Number(e.latlng.lat.toFixed(4)),
        lng: Number(e.latlng.lng.toFixed(4)),
      });
    });

    // Close layer drawer on map click
    map.on('click', () => {
      setIsLayerMenuOpen(false);
      setIsSearchFocused(false);
    });

    // Add vector layer groups
    Object.values(layerGroupsRef.current).forEach((grp) => {
      grp.addTo(map);
    });

    // Build vector geometries
    buildVectorGeometries(map);

    // Initial tile configuration
    applyTileMode('satellite', true, map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Tile Switching Logic
  const applyTileMode = (mode: MapMode, labels: boolean, targetMap?: L.Map) => {
    const map = targetMap || mapInstanceRef.current;
    if (!map) return;

    // Remove existing tile layers
    if (baseTileRef.current) {
      map.removeLayer(baseTileRef.current);
      baseTileRef.current = null;
    }
    if (labelTileRef.current) {
      map.removeLayer(labelTileRef.current);
      labelTileRef.current = null;
    }
    if (seamarkTileRef.current) {
      map.removeLayer(seamarkTileRef.current);
      seamarkTileRef.current = null;
    }

    let baseUrl = '';
    let attribution = '';
    let maxZoom = 18;

    switch (mode) {
      case 'default':
        // Google Maps-like clean road, city and geographical map
        baseUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
        attribution = '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors';
        maxZoom = 19;
        break;

      case 'satellite':
        // True optical satellite imagery (Esri World Imagery)
        baseUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        attribution = '&copy; Esri, Maxar, Earthstar Geographics, USDA, USGS';
        maxZoom = 18;
        break;

      case 'terrain':
        // Topographical map with contour relief, elevation and hillshading
        baseUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
        attribution = '&copy; Esri, HERE, Garmin, Intermap, USGS, METI/NASA';
        maxZoom = 18;
        break;

      case 'traffic':
        // Traffic & Marine Navigation: Base street map + OpenSeaMap seamark navigation overlay
        baseUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
        attribution = '&copy; OpenStreetMap &copy; CARTO &copy; OpenSeaMap';
        maxZoom = 19;
        break;

      case 'ocean':
        // Esri Ocean Basemap with oceanic bathymetric contours & underwater trenches
        baseUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}';
        attribution = '&copy; Esri, GEBCO, NOAA, National Geographic, DeLorme';
        maxZoom = 16;
        break;
    }

    // Add Base Tile Layer
    const baseTile = L.tileLayer(baseUrl, {
      maxZoom,
      attribution,
      crossOrigin: true,
    });
    baseTile.addTo(map);
    baseTileRef.current = baseTile;

    // Optional Hybrid Label Tile Layer (for Satellite or Ocean)
    if (labels && (mode === 'satellite' || mode === 'ocean')) {
      const labelUrl =
        mode === 'satellite'
          ? 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
          : 'https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}';

      const labelTile = L.tileLayer(labelUrl, {
        maxZoom,
        opacity: 0.9,
        crossOrigin: true,
      });
      labelTile.addTo(map);
      labelTileRef.current = labelTile;
    }

    // Marine navigation seamark overlay for Traffic mode
    if (mode === 'traffic' && visibleLayers.marineTraffic) {
      const seamarkTile = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        maxZoom: 18,
        opacity: 0.9,
        crossOrigin: true,
      });
      seamarkTile.addTo(map);
      seamarkTileRef.current = seamarkTile;
    }

    setActiveMapMode(mode);
  };

  // Toggle Map Mode
  const handleSelectMapMode = (mode: MapMode) => {
    applyTileMode(mode, showLabels);
  };

  // Toggle Labels
  const handleToggleLabels = () => {
    const nextLabels = !showLabels;
    setShowLabels(nextLabels);
    applyTileMode(activeMapMode, nextLabels);
  };

  // Build All Real Vector Geometry
  const buildVectorGeometries = (map: L.Map) => {
    const groups = layerGroupsRef.current;
    Object.values(groups).forEach((g) => g.clearLayers());

    // 1. Vietnam EEZ 200 Nautical Mile Approximate Polygon
    const eezCoords: [number, number][] = [
      [21.48, 108.05],
      [20.0, 108.0],
      [17.12, 108.05],
      [17.0, 110.5],
      [16.5, 114.5],
      [15.0, 116.5],
      [12.0, 117.2],
      [9.5, 117.0],
      [7.5, 116.0],
      [6.5, 113.5],
      [6.5, 109.5],
      [7.5, 105.5],
      [8.0, 103.5],
      [9.25, 103.45],
      [8.38, 104.88],
      [8.63, 106.63],
      [9.97, 109.08],
      [12.65, 109.47],
      [15.38, 109.15],
      [17.17, 107.33],
    ];

    const eezPolygon = L.polygon(eezCoords, {
      color: '#0284c7',
      weight: 2,
      dashArray: '6, 6',
      fillColor: '#38bdf8',
      fillOpacity: 0.12,
    }).bindPopup(
      `<div class="p-3 font-sans text-slate-800">
        <span class="px-2 py-0.5 bg-sky-100 text-sky-800 font-bold rounded text-[10px]">Luật Biển Việt Nam 2012</span>
        <h4 class="font-extrabold text-sm text-sky-900 mt-1">Vùng Đặc Quyền Kinh Tế & Thềm Lục Địa Việt Nam</h4>
        <p class="text-xs text-slate-600 mt-1">Rộng trên 1.010.274 km² (gấp hơn 3 lần diện tích đất liền) theo Công ước UNCLOS 1982.</p>
      </div>`
    );
    groups.eez.addLayer(eezPolygon);

    // 2. Baseline 1982 Polyline
    const baselineLatLngs = baselinePoints.map((p) => [p.lat, p.lng] as [number, number]);
    const baselineLine = L.polyline(baselineLatLngs, {
      color: '#dc2626',
      weight: 3.5,
      opacity: 0.95,
      lineCap: 'round',
    }).bindPopup(
      `<div class="p-3 font-sans text-slate-800">
        <span class="px-2 py-0.5 bg-red-100 text-red-800 font-bold rounded text-[10px]">Tuyên bố 12/11/1982</span>
        <h4 class="font-extrabold text-sm text-red-700 mt-1">Đường Cơ Sở Thẳng Của Việt Nam</h4>
        <p class="text-xs text-slate-600 mt-1">Nối 11 điểm mốc từ điểm 0 (vùng nước lịch sử Tây Nam) đến mốc A11 (Đảo Cồn Cỏ).</p>
      </div>`
    );
    groups.baseline.addLayer(baselineLine);

    // Baseline marker milestones
    baselinePoints.forEach((pt) => {
      const icon = L.divIcon({
        className: 'custom-baseline-icon',
        html: `<div style="background-color: #ef4444; width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.6);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([pt.lat, pt.lng], { icon }).bindPopup(
        `<div class="p-3 font-sans text-slate-800 max-w-[260px]">
          <span class="px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded text-[10px]">Mốc Đường Cơ Sở</span>
          <h4 class="font-extrabold text-sm text-slate-900 mt-1">${pt.name}</h4>
          <p class="text-xs text-slate-500 font-semibold">${pt.province || ''}</p>
          <div class="mt-1.5 p-1.5 bg-slate-100 rounded-lg text-[11px] text-slate-700 font-mono">
            Tọa độ: ${pt.lat.toFixed(4)}°B, ${pt.lng.toFixed(4)}°Đ
          </div>
          <p class="mt-1.5 text-xs text-slate-700 leading-relaxed">${pt.desc}</p>
        </div>`
      );

      marker.on('click', () => {
        setSelectedPoint(pt);
        onSelectPoint?.(pt);
      });

      groups.baseline.addLayer(marker);
    });

    // 3. Gulf of Tonkin Treaty Line 2000 (21 Points)
    const tonkinLatLngs = gulfOfTonkinTreatyPoints.map((p) => [p.lat, p.lng] as [number, number]);
    const tonkinLine = L.polyline(tonkinLatLngs, {
      color: '#10b981',
      weight: 3,
      dashArray: '5, 5',
      opacity: 0.95,
    }).bindPopup(
      `<div class="p-3 font-sans text-slate-800">
        <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">Hiệp Định 25/12/2000</span>
        <h4 class="font-extrabold text-sm text-emerald-700 mt-1">Đường Phân Định Vịnh Bắc Bộ</h4>
        <p class="text-xs text-slate-600 mt-1">Gồm 21 điểm tọa độ phân định ranh giới lãnh hải, vùng đặc quyền kinh tế và thềm lục địa giữa Việt Nam và Trung Quốc.</p>
      </div>`
    );
    groups.tonkin.addLayer(tonkinLine);

    // Key points along Gulf of Tonkin
    [1, 9, 21].forEach((ptNum) => {
      const ptData = gulfOfTonkinTreatyPoints.find((p) => p.pt === ptNum);
      if (ptData) {
        const marker = L.circleMarker([ptData.lat, ptData.lng], {
          radius: 5,
          color: '#ffffff',
          weight: 2,
          fillColor: '#10b981',
          fillOpacity: 1,
        }).bindPopup(
          `<div class="p-2.5 font-sans text-slate-800">
            <h5 class="font-bold text-xs text-emerald-700">Điểm ${ptData.pt} - Phân Định Vịnh Bắc Bộ</h5>
            <p class="text-xs text-slate-600">${ptData.desc}</p>
            <p class="text-[11px] font-mono text-slate-500 mt-1">${ptData.lat}°B, ${ptData.lng}°Đ</p>
          </div>`
        );
        groups.tonkin.addLayer(marker);
      }
    });

    // 4. Hoàng Sa Archipelago Layer
    const hoangSaPolygon = L.polygon(
      [
        [17.3, 111.0],
        [17.3, 113.1],
        [15.5, 113.1],
        [15.5, 111.0],
      ],
      {
        color: '#f59e0b',
        weight: 2,
        dashArray: '4, 4',
        fillColor: '#f59e0b',
        fillOpacity: 0.15,
      }
    );
    groups.hoangsa.addLayer(hoangSaPolygon);

    hoangSaIslands.forEach((isl) => {
      const isCenter = isl.type === 'archipelago';
      const icon = L.divIcon({
        className: 'custom-hoangsa-icon',
        html: isCenter
          ? `<div style="background: linear-gradient(135deg, #ea580c, #b45309); color: white; font-weight: 800; font-size: 11px; padding: 5px 10px; border-radius: 14px; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); white-space: nowrap; display: flex; align-items: center; gap: 4px;">
              <span>🇻🇳</span><span>QĐ. HOÀNG SA</span>
            </div>`
          : `<div style="background: #ea580c; width: 12px; height: 12px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.5);"></div>`,
        iconSize: isCenter ? [125, 26] : [12, 12],
        iconAnchor: isCenter ? [62, 13] : [6, 6],
      });

      const marker = L.marker([isl.lat, isl.lng], { icon }).bindPopup(
        `<div class="p-3 font-sans text-slate-800 max-w-[260px]">
          <span class="px-2 py-0.5 bg-orange-100 text-orange-800 font-bold rounded-full text-[10px] flex items-center gap-1 w-fit">
            🇻🇳 Chủ quyền Việt Nam
          </span>
          <h4 class="font-extrabold text-sm text-slate-900 mt-1">${isl.name}</h4>
          <p class="text-orange-700 font-bold text-xs">${isl.province || 'TP. Đà Nẵng'}</p>
          <div class="mt-1.5 p-1.5 bg-slate-100 rounded-lg text-[11px] font-mono text-slate-700">
            Tọa độ: ${isl.lat.toFixed(4)}°B, ${isl.lng.toFixed(4)}°Đ
          </div>
          <p class="mt-1.5 text-xs text-slate-700 leading-relaxed">${isl.desc}</p>
        </div>`
      );

      marker.on('click', () => {
        setSelectedPoint(isl);
        onSelectPoint?.(isl);
      });

      groups.hoangsa.addLayer(marker);
    });

    // 5. Trường Sa Archipelago Layer
    const truongSaPolygon = L.polygon(
      [
        [11.8, 111.4],
        [11.8, 117.4],
        [7.2, 117.4],
        [7.2, 111.4],
      ],
      {
        color: '#f59e0b',
        weight: 2,
        dashArray: '4, 4',
        fillColor: '#f59e0b',
        fillOpacity: 0.12,
      }
    );
    groups.truongsa.addLayer(truongSaPolygon);

    truongSaIslands.forEach((isl) => {
      const isCenter = isl.type === 'archipelago';
      const icon = L.divIcon({
        className: 'custom-truongsa-icon',
        html: isCenter
          ? `<div style="background: linear-gradient(135deg, #c2410c, #9a3412); color: white; font-weight: 800; font-size: 11px; padding: 5px 10px; border-radius: 14px; border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); white-space: nowrap; display: flex; align-items: center; gap: 4px;">
              <span>🇻🇳</span><span>QĐ. TRƯỜNG SA</span>
            </div>`
          : `<div style="background: #f97316; width: 12px; height: 12px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.5);"></div>`,
        iconSize: isCenter ? [130, 26] : [12, 12],
        iconAnchor: isCenter ? [65, 13] : [6, 6],
      });

      const marker = L.marker([isl.lat, isl.lng], { icon }).bindPopup(
        `<div class="p-3 font-sans text-slate-800 max-w-[260px]">
          <span class="px-2 py-0.5 bg-orange-100 text-orange-800 font-bold rounded-full text-[10px] flex items-center gap-1 w-fit">
            🇻🇳 Chủ quyền Việt Nam
          </span>
          <h4 class="font-extrabold text-sm text-slate-900 mt-1">${isl.name}</h4>
          <p class="text-orange-700 font-bold text-xs">${isl.province || 'Tỉnh Khánh Hòa'}</p>
          <div class="mt-1.5 p-1.5 bg-slate-100 rounded-lg text-[11px] font-mono text-slate-700">
            Tọa độ: ${isl.lat.toFixed(4)}°B, ${isl.lng.toFixed(4)}°Đ
          </div>
          <p class="mt-1.5 text-xs text-slate-700 leading-relaxed">${isl.desc}</p>
        </div>`
      );

      marker.on('click', () => {
        setSelectedPoint(isl);
        onSelectPoint?.(isl);
      });

      groups.truongsa.addLayer(marker);
    });

    // 6. DK1 Platforms & Southern Continental Shelf
    dk1AndSouthernShelf.forEach((dk) => {
      const icon = L.divIcon({
        className: 'custom-dk1-icon',
        html: `<div style="background: #3b82f6; width: 16px; height: 16px; border-radius: 4px; border: 2px solid white; box-shadow: 0 2px 8px rgba(59,130,246,0.8); display: flex; align-items: center; justify-content: center; color: white; font-size: 8px; font-weight: 900;">DK1</div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker([dk.lat, dk.lng], { icon }).bindPopup(
        `<div class="p-3 font-sans text-slate-800 max-w-[260px]">
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded-full text-[10px]">
            Nhà giàn DK1 & Thềm lục địa
          </span>
          <h4 class="font-extrabold text-sm text-slate-900 mt-1">${dk.name}</h4>
          <div class="mt-1.5 p-1.5 bg-slate-100 rounded-lg text-[11px] font-mono text-slate-700">
            Tọa độ: ${dk.lat.toFixed(4)}°B, ${dk.lng.toFixed(4)}°Đ
          </div>
          <p class="mt-1.5 text-xs text-slate-700 leading-relaxed">${dk.desc}</p>
        </div>`
      );

      marker.on('click', () => {
        setSelectedPoint(dk);
        onSelectPoint?.(dk);
      });

      groups.dk1.addLayer(marker);
    });

    // 7. Coastal Islands
    coastalIslands.forEach((isl) => {
      const icon = L.divIcon({
        className: 'custom-coastal-icon',
        html: `<div style="background: #10b981; width: 11px; height: 11px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>`,
        iconSize: [11, 11],
        iconAnchor: [5.5, 5.5],
      });

      const marker = L.marker([isl.lat, isl.lng], { icon }).bindPopup(
        `<div class="p-3 font-sans text-slate-800">
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">Đảo Ven Bờ</span>
          <h4 class="font-extrabold text-sm text-slate-900 mt-1">${isl.name}</h4>
          <p class="text-xs text-slate-500 font-semibold">${isl.province || ''}</p>
          <div class="mt-1.5 p-1.5 bg-slate-100 rounded-lg text-[11px] font-mono text-slate-700">
            Tọa độ: ${isl.lat.toFixed(4)}°B, ${isl.lng.toFixed(4)}°Đ
          </div>
          <p class="mt-1.5 text-xs text-slate-700 leading-relaxed">${isl.desc}</p>
        </div>`
      );

      marker.on('click', () => {
        setSelectedPoint(isl);
        onSelectPoint?.(isl);
      });

      groups.coastal.addLayer(marker);
    });

    // 8. International Shipping Lane
    const shippingLineCoords: [number, number][] = [
      [1.3, 103.8],
      [3.0, 106.0],
      [6.0, 109.0],
      [9.0, 111.5],
      [12.0, 114.0],
      [16.0, 116.5],
      [19.0, 118.5],
      [22.0, 120.0],
    ];

    const shippingLine = L.polyline(shippingLineCoords, {
      color: '#ef4444',
      weight: 3,
      dashArray: '8, 6',
      opacity: 0.85,
    }).bindPopup(
      `<div class="p-3 font-sans text-slate-800">
        <span class="px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded text-[10px]">Giao thông hàng hải thế giới</span>
        <h4 class="font-extrabold text-sm text-red-700 mt-1">Tuyến Hàng Hải Quốc Tế Huyết Mạch</h4>
        <p class="text-xs text-slate-600 mt-1">Vận chuyển hơn 1/3 hàng hóa và 50% dầu mỏ thương mại toàn cầu qua trung tâm Biển Đông.</p>
      </div>`
    );
    groups.shipping.addLayer(shippingLine);

    // 9. Ports and Oilfields
    portsAndOilfields.forEach((pt) => {
      const isPort = pt.type === 'port';
      const icon = L.divIcon({
        className: 'custom-poi-icon',
        html: `<div style="background: ${isPort ? '#0284c7' : '#d97706'}; color: white; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">${
          isPort ? '⚓' : '🛢️'
        }</div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      const marker = L.marker([pt.lat, pt.lng], { icon }).bindPopup(
        `<div class="p-3 font-sans text-slate-800">
          <span class="px-2 py-0.5 ${isPort ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'} font-bold rounded text-[10px]">
            ${isPort ? 'Cảng Biển Nước Sâu' : 'Mỏ Dầu Khí Chiến Lược'}
          </span>
          <h4 class="font-extrabold text-sm text-slate-900 mt-1">${pt.name}</h4>
          <p class="mt-1.5 text-xs text-slate-600 leading-relaxed">${pt.desc}</p>
        </div>`
      );

      marker.on('click', () => {
        setSelectedPoint(pt);
        onSelectPoint?.(pt);
      });

      groups.ports.addLayer(marker);
    });
  };

  // Toggle Vector Layers
  const handleToggleLayer = (key: keyof typeof visibleLayers) => {
    const nextState = !visibleLayers[key];
    setVisibleLayers((prev) => ({ ...prev, [key]: nextState }));

    const map = mapInstanceRef.current;
    if (!map) return;

    if (key === 'marineTraffic') {
      if (activeMapMode === 'traffic') {
        if (nextState && !seamarkTileRef.current) {
          const seamarkTile = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
            maxZoom: 18,
            opacity: 0.9,
            crossOrigin: true,
          });
          seamarkTile.addTo(map);
          seamarkTileRef.current = seamarkTile;
        } else if (!nextState && seamarkTileRef.current) {
          map.removeLayer(seamarkTileRef.current);
          seamarkTileRef.current = null;
        }
      }
      return;
    }

    const grp = layerGroupsRef.current[key];
    if (nextState) {
      map.addLayer(grp);
    } else {
      map.removeLayer(grp);
    }
  };

  // Navigation Helpers
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetCenter = () => {
    mapInstanceRef.current?.flyTo([14.0, 112.5], 5.5, { duration: 1.2 });
  };
  const handleFlyTo = (coords: [number, number], zoom = 9) => {
    mapInstanceRef.current?.flyTo(coords, zoom, { duration: 1.5 });
  };

  // Select Location from search
  const handleSelectLocation = (loc: GisPoint) => {
    setSelectedPoint(loc);
    onSelectPoint?.(loc);
    setSearchQuery('');
    setIsSearchFocused(false);
    handleFlyTo([loc.lat, loc.lng], loc.type === 'archipelago' ? 7.5 : 9.5);
  };

  // Copy coordinates
  const handleCopyCoords = (lat: number, lng: number) => {
    navigator.clipboard.writeText(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-300 font-sans ${
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen bg-slate-950'
          : 'rounded-3xl border border-slate-300/80 shadow-xl bg-slate-900 h-[620px] sm:h-[720px]'
      }`}
    >
      {/* Leaflet Map DOM Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0 cursor-grab active:cursor-grabbing" />

      {/* ================= TOP-LEFT GOOGLE MAPS FLOATING SEARCH BAR ================= */}
      <div className="absolute top-4 left-4 z-20 w-full max-w-sm sm:max-w-md pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden transition-all">
          <div className="flex items-center px-3.5 py-2.5 gap-2">
            <div className="p-1 text-slate-500">
              <Search className="w-4 h-4 text-orange-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Tìm kiếm địa danh trên Biển Đông (Trường Sa, Hoàng Sa...)"
              className="w-full text-xs sm:text-sm text-slate-800 bg-transparent placeholder-slate-400 focus:outline-hidden font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="h-4 w-px bg-slate-200 mx-1"></div>
            <button
              onClick={handleResetCenter}
              className="p-1 text-slate-500 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
              title="Toàn cảnh Biển Đông"
            >
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter Suggestion Chips */}
          <div className="flex items-center gap-1.5 px-3.5 pb-2.5 pt-1 overflow-x-auto whitespace-nowrap scrollbar-none text-[11px]">
            <span className="text-slate-400 font-bold shrink-0 text-[10px] uppercase">Gợi ý:</span>
            {[
              { name: '🇻🇳 Hoàng Sa', coords: [16.5, 112.0] as [number, number], zoom: 8 },
              { name: '🇻🇳 Trường Sa', coords: [9.5, 114.0] as [number, number], zoom: 7.5 },
              { name: '🏗️ Bãi Tư Chính & DK1', coords: [7.8, 110.0] as [number, number], zoom: 8 },
              { name: '🌊 Vịnh Bắc Bộ', coords: [19.5, 107.5] as [number, number], zoom: 7.5 },
              { name: '🏝️ Đảo Phú Quốc', coords: [10.2, 103.5] as [number, number], zoom: 9 },
              { name: '⚓ Cảng Hải Phòng', coords: [20.86, 106.68] as [number, number], zoom: 10 },
              { name: '🚢 Eo Malacca', coords: [2.5, 101.5] as [number, number], zoom: 7 },
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleFlyTo(chip.coords, chip.zoom)}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-900 border border-slate-200 transition-colors font-semibold shrink-0"
              >
                {chip.name}
              </button>
            ))}
          </div>

          {/* Search Autocomplete Results Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="border-t border-slate-100 max-h-64 overflow-y-auto divide-y divide-slate-100 bg-white">
              {searchResults.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => handleSelectLocation(loc)}
                  className="p-3 hover:bg-orange-50/80 cursor-pointer flex items-start gap-2.5 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 truncate">{loc.name}</h5>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {loc.lat.toFixed(2)}°B, {loc.lng.toFixed(2)}°Đ
                      </span>
                    </div>
                    {loc.province && <p className="text-[11px] text-orange-600 font-medium">{loc.province}</p>}
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{loc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= BOTTOM-LEFT GOOGLE MAPS LAYERS SWITCHER ================= */}
      <div className="absolute bottom-6 left-4 z-20 pointer-events-auto">
        {/* Expanded Google Maps Layer Drawer */}
        {isLayerMenuOpen && (
          <div className="mb-3 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-slate-200/90 w-80 sm:w-96 animate-in slide-in-from-bottom-2 duration-200 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-600" />
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Chế độ hiển thị bản đồ</h4>
              </div>
              <button
                onClick={() => setIsLayerMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Base Map Mode Thumbnails Grid */}
            <div className="grid grid-cols-4 gap-2 pt-3">
              {/* 1. Default (Mặc định) */}
              <button
                onClick={() => handleSelectMapMode('default')}
                className={`group flex flex-col items-center text-center p-1 rounded-2xl border-2 transition-all ${
                  activeMapMode === 'default'
                    ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                    : 'border-transparent hover:border-slate-300'
                }`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden relative border border-slate-200 bg-slate-100 shadow-xs flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-sky-50 to-amber-100" />
                  <Globe2 className="w-6 h-6 text-emerald-600 relative z-10" />
                  {activeMapMode === 'default' && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-orange-600 text-white rounded-full flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-bold mt-1 text-slate-800">Mặc định</span>
              </button>

              {/* 2. Satellite (Vệ tinh) */}
              <button
                onClick={() => handleSelectMapMode('satellite')}
                className={`group flex flex-col items-center text-center p-1 rounded-2xl border-2 transition-all ${
                  activeMapMode === 'satellite'
                    ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                    : 'border-transparent hover:border-slate-300'
                }`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden relative border border-slate-200 bg-slate-900 shadow-xs flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-800 to-emerald-950" />
                  <span className="text-xl relative z-10">🛰️</span>
                  {activeMapMode === 'satellite' && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-orange-600 text-white rounded-full flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-bold mt-1 text-slate-800">Vệ tinh</span>
              </button>

              {/* 3. Terrain (Địa hình) */}
              <button
                onClick={() => handleSelectMapMode('terrain')}
                className={`group flex flex-col items-center text-center p-1 rounded-2xl border-2 transition-all ${
                  activeMapMode === 'terrain'
                    ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                    : 'border-transparent hover:border-slate-300'
                }`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden relative border border-slate-200 bg-amber-50 shadow-xs flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-stone-200 to-emerald-100" />
                  <Mountain className="w-6 h-6 text-amber-800 relative z-10" />
                  {activeMapMode === 'terrain' && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-orange-600 text-white rounded-full flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-bold mt-1 text-slate-800">Địa hình</span>
              </button>

              {/* 4. Traffic (Giao thông) */}
              <button
                onClick={() => handleSelectMapMode('traffic')}
                className={`group flex flex-col items-center text-center p-1 rounded-2xl border-2 transition-all ${
                  activeMapMode === 'traffic'
                    ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                    : 'border-transparent hover:border-slate-300'
                }`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden relative border border-slate-200 bg-sky-50 shadow-xs flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-sky-100 to-amber-100" />
                  <div className="flex items-center gap-0.5 relative z-10">
                    <Car className="w-4 h-4 text-red-600" />
                    <Ship className="w-4 h-4 text-sky-700" />
                  </div>
                  {activeMapMode === 'traffic' && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-orange-600 text-white rounded-full flex items-center justify-center text-[8px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-bold mt-1 text-slate-800">Giao thông</span>
              </button>
            </div>

            {/* Sub-layers & Map Details Checklist */}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <h5 className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider mb-2">
                Chi tiết & Lớp dữ liệu
              </h5>

              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
                {/* Labels toggle */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
                  <input
                    type="checkbox"
                    checked={showLabels}
                    onChange={handleToggleLabels}
                    className="rounded accent-orange-600 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-medium text-slate-700">Nhãn địa danh</span>
                </label>

                {/* Hoang Sa */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
                  <input
                    type="checkbox"
                    checked={visibleLayers.hoangsa}
                    onChange={() => handleToggleLayer('hoangsa')}
                    className="rounded accent-orange-600 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-bold text-orange-700">QĐ. Hoàng Sa 🇻🇳</span>
                </label>

                {/* Truong Sa */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
                  <input
                    type="checkbox"
                    checked={visibleLayers.truongsa}
                    onChange={() => handleToggleLayer('truongsa')}
                    className="rounded accent-orange-600 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-bold text-orange-700">QĐ. Trường Sa 🇻🇳</span>
                </label>

                {/* Baseline */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
                  <input
                    type="checkbox"
                    checked={visibleLayers.baseline}
                    onChange={() => handleToggleLayer('baseline')}
                    className="rounded accent-red-600 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-medium text-slate-700">Đường cơ sở 1982</span>
                </label>

                {/* Tonkin */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
                  <input
                    type="checkbox"
                    checked={visibleLayers.tonkin}
                    onChange={() => handleToggleLayer('tonkin')}
                    className="rounded accent-emerald-600 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-medium text-slate-700">Vịnh Bắc Bộ 2000</span>
                </label>

                {/* EEZ */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
                  <input
                    type="checkbox"
                    checked={visibleLayers.eez}
                    onChange={() => handleToggleLayer('eez')}
                    className="rounded accent-sky-600 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-medium text-slate-700">Ranh giới EEZ (1M km²)</span>
                </label>

                {/* DK1 */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
                  <input
                    type="checkbox"
                    checked={visibleLayers.dk1}
                    onChange={() => handleToggleLayer('dk1')}
                    className="rounded accent-blue-600 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-medium text-slate-700">Nhà giàn DK1 & Tư Chính</span>
                </label>

                {/* Shipping & OpenSeaMap */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
                  <input
                    type="checkbox"
                    checked={visibleLayers.shipping}
                    onChange={() => handleToggleLayer('shipping')}
                    className="rounded accent-red-600 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-medium text-slate-700">Luồng tàu quốc tế</span>
                </label>

                {/* Ports & Oilfields */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
                  <input
                    type="checkbox"
                    checked={visibleLayers.ports}
                    onChange={() => handleToggleLayer('ports')}
                    className="rounded accent-amber-600 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-medium text-slate-700">Cảng & Mỏ dầu khí</span>
                </label>

                {/* Coastal islands */}
                <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded-lg">
                  <input
                    type="checkbox"
                    checked={visibleLayers.coastal}
                    onChange={() => handleToggleLayer('coastal')}
                    className="rounded accent-emerald-600 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] font-medium text-slate-700">Đảo ven bờ</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Thumbnail Layer Trigger Button (Google Maps Style) */}
        <button
          onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
          className="group flex items-center gap-2.5 bg-white/95 backdrop-blur-md hover:bg-white p-1.5 pr-3 rounded-2xl shadow-xl border border-slate-200 transition-all hover:scale-105 active:scale-95"
          title="Mở bảng chọn lớp bản đồ: Vệ tinh, Địa hình, Giao thông, Mặc định"
        >
          <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-300 relative shadow-xs flex items-center justify-center bg-slate-900">
            {activeMapMode === 'satellite' ? (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-emerald-950 flex items-center justify-center text-base">
                🛰️
              </div>
            ) : activeMapMode === 'terrain' ? (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center">
                <Mountain className="w-5 h-5 text-amber-800" />
              </div>
            ) : activeMapMode === 'traffic' ? (
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-sky-100 flex items-center justify-center">
                <Ship className="w-5 h-5 text-sky-700" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-emerald-700" />
              </div>
            )}
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">Chế độ</div>
            <div className="text-xs font-black text-slate-800 capitalize leading-tight">
              {activeMapMode === 'default'
                ? 'Mặc định'
                : activeMapMode === 'satellite'
                ? 'Vệ tinh 🛰️'
                : activeMapMode === 'terrain'
                ? 'Địa hình 🏔️'
                : activeMapMode === 'traffic'
                ? 'Giao thông 🚢'
                : 'Hải dương 🌊'}
            </div>
          </div>
        </button>
      </div>

      {/* ================= BOTTOM-RIGHT GOOGLE MAPS NAVIGATION CONTROLS ================= */}
      <div className="absolute bottom-6 right-4 z-20 flex flex-col items-center gap-2 pointer-events-auto">
        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2.5 bg-white/95 backdrop-blur-md hover:bg-white text-slate-700 hover:text-orange-600 rounded-2xl shadow-xl border border-slate-200 transition-all hover:scale-105 active:scale-95"
          title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Toàn màn hình'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Re-center / Location Button */}
        <button
          onClick={handleResetCenter}
          className="p-2.5 bg-white/95 backdrop-blur-md hover:bg-white text-slate-700 hover:text-orange-600 rounded-2xl shadow-xl border border-slate-200 transition-all hover:scale-105 active:scale-95"
          title="Quay về trung tâm Biển Đông [14.0°B, 112.5°Đ]"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        {/* Zoom Controls (Google Maps Vertical Pill) */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
          <button
            onClick={handleZoomIn}
            className="p-2.5 hover:bg-slate-100 text-slate-700 hover:text-orange-600 transition-colors"
            title="Phóng to (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-200 w-full" />
          <button
            onClick={handleZoomOut}
            className="p-2.5 hover:bg-slate-100 text-slate-700 hover:text-orange-600 transition-colors"
            title="Thu nhỏ (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= BOTTOM STATUS BAR (COORDINATES & SCALE) ================= */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden sm:flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/80 text-[10px] text-slate-300 font-mono shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          {mouseCoords
            ? `WGS84: ${mouseCoords.lat >= 0 ? `${mouseCoords.lat}°B` : `${Math.abs(mouseCoords.lat)}°N`}, ${
                mouseCoords.lng >= 0 ? `${mouseCoords.lng}°Đ` : `${Math.abs(mouseCoords.lng)}°W`
              }`
            : 'Hệ quy chiếu quốc tế WGS84 • Chuẩn thực tế Địa lý 11'}
        </span>
      </div>

      {/* ================= SELECTED LOCATION GOOGLE MAPS DETAIL DRAWER ================= */}
      {selectedPoint && (
        <div className="absolute top-4 right-4 z-20 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in slide-in-from-right-4 duration-300 pointer-events-auto">
          {/* Hero Banner Header */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-4 text-white relative">
            <button
              onClick={() => setSelectedPoint(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/20 text-white tracking-wider">
              {selectedPoint.type === 'archipelago'
                ? '🇻🇳 Quần đảo chủ quyền'
                : selectedPoint.type === 'baseline'
                ? 'Mốc đường cơ sở 1982'
                : selectedPoint.type === 'dk1'
                ? 'Cụm Nhà giàn DK1'
                : selectedPoint.type === 'port'
                ? 'Cảng biển chiến lược'
                : selectedPoint.type === 'oilfield'
                ? 'Mỏ dầu khí thềm lục địa'
                : 'Thực thể Địa lý'}
            </span>
            <h3 className="font-black text-lg sm:text-xl mt-1 tracking-tight">{selectedPoint.name}</h3>
            {selectedPoint.province && (
              <p className="text-xs text-orange-100 font-semibold">{selectedPoint.province}</p>
            )}
          </div>

          {/* Body Content */}
          <div className="p-4 space-y-3 text-xs">
            {/* Coordinate Box with Copy Action */}
            <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tọa độ thực tế (WGS84)</span>
                <span className="font-mono text-xs font-extrabold text-slate-900">
                  {selectedPoint.lat.toFixed(4)}°B, {selectedPoint.lng.toFixed(4)}°Đ
                </span>
              </div>
              <button
                onClick={() => handleCopyCoords(selectedPoint.lat, selectedPoint.lng)}
                className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 hover:bg-orange-50 hover:text-orange-600 text-slate-600 font-semibold text-[11px] flex items-center gap-1 transition-colors"
              >
                {copiedCoords ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCoords ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>
            </div>

            {/* Description */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Thông tin chi tiết</span>
              <p className="text-slate-700 leading-relaxed">{selectedPoint.desc}</p>
            </div>

            {/* Significance */}
            {selectedPoint.significance && (
              <div className="p-2.5 bg-orange-50 border border-orange-200 rounded-2xl text-orange-950">
                <span className="text-[10px] uppercase font-bold text-orange-700 block mb-0.5">
                  ⭐ Ý nghĩa Chuyên đề Địa lí 11
                </span>
                <p className="text-xs font-semibold leading-relaxed">{selectedPoint.significance}</p>
              </div>
            )}

            {/* Zoom To Button */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => handleFlyTo([selectedPoint.lat, selectedPoint.lng], 10)}
                className="flex-1 py-2 px-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/20 transition-all"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Phóng to vị trí</span>
              </button>
              <button
                onClick={handleResetCenter}
                className="py-2 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Toàn cảnh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
