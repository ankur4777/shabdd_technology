import React, { useEffect, useRef, useState, useMemo } from 'react';
import './TrustedPartnersGlobe.css';

// --- World Continent Polygons [lon, lat] ---
const CONTINENT_POLYGONS = [
  // North America
  [[-168,65],[-150,61],[-136,58],[-125,48],[-124,40],[-117,32],[-110,24],[-100,16],[-83,10],[-78,9],[-82,15],[-88,20],[-95,19],[-95,28],[-82,25],[-80,32],[-75,35],[-70,42],[-60,46],[-54,47],[-56,53],[-63,60],[-75,68],[-95,73],[-125,73],[-145,70],[-165,68]],
  // Canadian Arctic Islands
  [[-85,66],[-72,64],[-64,66],[-68,73],[-82,73]],
  [[-115,74],[-92,74],[-85,78],[-105,79]],
  // Greenland
  [[-52,60],[-42,60],[-20,70],[-18,77],[-28,82],[-54,82],[-62,76],[-56,68]],
  // South America
  [[-78,9],[-62,10],[-50,2],[-35,-6],[-38,-15],[-42,-23],[-53,-34],[-66,-48],[-68,-54],[-74,-50],[-72,-35],[-71,-18],[-80,-5],[-78,4]],
  // UK & Ireland
  [[-10,51],[-6,52],[-6,58],[-1,58],[1,51],[-5,50]],
  // Europe
  [[-9,36],[-9,43],[-2,43],[-4,48],[2,51],[7,54],[8,58],[5,61],[10,65],[18,70],[28,71],[32,69],[28,65],[22,60],[20,55],[28,55],[40,56],[52,62],[60,65],[60,52],[48,46],[38,46],[30,45],[28,41],[24,36],[20,38],[16,40],[18,42],[14,45],[12,42],[15,38],[12,38],[10,44],[5,43],[3,41],[0,38],[-5,36]],
  // Africa
  [[-17,15],[-15,24],[-6,35],[10,37],[11,33],[24,32],[32,31],[38,20],[43,12],[51,12],[48,5],[41,-2],[40,-11],[35,-24],[27,-34],[18,-34],[14,-22],[12,-12],[13,-4],[9,4],[5,5],[-4,5],[-12,8],[-17,15]],
  // Madagascar
  [[44,-13],[50,-14],[48,-25],[44,-25]],
  // Middle East
  [[32,30],[36,36],[44,38],[50,30],[56,26],[59,22],[54,16],[44,12],[40,18],[35,28]],
  // Asia & India
  [[48,46],[60,52],[60,65],[75,72],[105,74],[135,71],[165,67],[175,62],[160,55],[142,53],[135,44],[129,40],[124,40],[120,38],[122,31],[119,25],[114,22],[108,21],[109,13],[104,2],[100,6],[98,15],[94,20],[89,22],[85,20],[80,13],[78,8],[75,11],[73,17],[72,21],[68,24],[62,25],[56,26],[50,30],[45,38],[40,42]],
  // Sri Lanka
  [[79.5,9.5],[81.8,7.5],[80.5,6.0],[79.5,7.5]],
  // Japan
  [[130,31],[136,34],[140,36],[142,41],[145,44],[140,41],[134,35]],
  // Indonesia & Philippines
  [[95,5],[104,-4],[106,-6],[102,-5],[95,3]],
  [[109,2],[117,5],[117,-3],[110,-3]],
  [[120,18],[125,14],[125,6],[120,10]],
  // Australia
  [[114,-22],[122,-16],[132,-12],[136,-15],[142,-11],[150,-22],[153,-28],[149,-37],[139,-37],[131,-32],[121,-34],[115,-34],[113,-26]]
];

function isPointInPolygon(lon, lat, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi + 0.00001) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isLand(lon, lat) {
  for (let i = 0; i < CONTINENT_POLYGONS.length; i++) {
    if (isPointInPolygon(lon, lat, CONTINENT_POLYGONS[i])) return true;
  }
  return false;
}

const DEG2RAD = Math.PI / 180;

function latLonToVec3(lat, lon, radius = 1) {
  const phi = lat * DEG2RAD;
  const lam = lon * DEG2RAD;
  return {
    x: radius * Math.cos(phi) * Math.sin(lam),
    y: radius * Math.sin(phi),
    z: radius * Math.cos(phi) * Math.cos(lam)
  };
}

function rotateVec3(p, rotY, rotX) {
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;
  const y1 = p.y;

  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y2 = y1 * cosX - z1 * sinX;
  const z2 = y1 * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
}

function build3DArc(startHub, endHub, segments = 110, peakAltitude = 0.28) {
  const v0 = latLonToVec3(startHub.lat, startHub.lon, 1);
  const v1 = latLonToVec3(endHub.lat, endHub.lon, 1);

  const dot = Math.max(-1, Math.min(1, v0.x * v1.x + v0.y * v1.y + v0.z * v1.z));
  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega);

  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    let x, y, z;
    if (sinOmega < 0.001) {
      x = v0.x + (v1.x - v0.x) * t;
      y = v0.y + (v1.y - v0.y) * t;
      z = v0.z + (v1.z - v0.z) * t;
    } else {
      const a = Math.sin((1 - t) * omega) / sinOmega;
      const b = Math.sin(t * omega) / sinOmega;
      x = a * v0.x + b * v1.x;
      y = a * v0.y + b * v1.y;
      z = a * v0.z + b * v1.z;
    }
    const alt = 1 + Math.sin(t * Math.PI) * peakAltitude;
    pts.push({ x: x * alt, y: y * alt, z: z * alt, t });
  }
  return pts;
}

const HUBS = {
  india: {
    id: 'india',
    name: 'India',
    subtitle: 'Engineering & Design',
    timeZone: 'Asia/Kolkata',
    defaultTime: '14:47',
    lat: 22.0,
    lon: 78.5
  },
  sydney: {
    id: 'sydney',
    name: 'Sydney, Australia',
    subtitle: 'Global Maple System',
    timeZone: 'Australia/Sydney',
    defaultTime: '14:17',
    lat: -33.87,
    lon: 151.21
  },
  surrey: {
    id: 'surrey',
    name: 'Surrey, Canada',
    subtitle: 'EduWeb Consulting',
    timeZone: 'America/Vancouver',
    defaultTime: '02:17',
    lat: 49.19,
    lon: -122.85
  }
};

export default function GlobeSection() {
  const BASE_YAW = -0.24;
  const BASE_PITCH = 0.54;

  const canvasRef = useRef(null);
  const badgeRefs = {
    india: useRef(null),
    sydney: useRef(null),
    surrey: useRef(null)
  };

  const rotRef = useRef({
    yaw: BASE_YAW,
    pitch: BASE_PITCH,
    velYaw: 0,
    velPitch: 0,
    targetYaw: null,
    targetPitch: null,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    clock: 0,
    lastDragTime: 0
  });

  const [activeCompany, setActiveCompany] = useState(null);
  const [hoveredHub, setHoveredHub] = useState(null);
  const [clocks, setClocks] = useState({
    india: '14:47',
    sydney: '14:17',
    surrey: '02:17'
  });

  const hoveredHubRef = useRef(hoveredHub);
  useEffect(() => {
    hoveredHubRef.current = hoveredHub;
  }, [hoveredHub]);

  // Update real-time timezone clocks
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const next = {};
      Object.values(HUBS).forEach((h) => {
        try {
          next[h.id] = new Intl.DateTimeFormat('en-GB', {
            timeZone: h.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }).format(now);
        } catch {
          next[h.id] = h.defaultTime;
        }
      });
      setClocks(next);
    };
    updateTimes();
    const id = setInterval(updateTimes, 15000);
    return () => clearInterval(id);
  }, []);

  // Precompute globe dots, polar cap graticule, and 3D elevated arcs
  const globeGeometry = useMemo(() => {
    const landDots = [];
    const latStep = 1.65;

    for (let lat = -62; lat <= 83; lat += latStep) {
      const cosLat = Math.cos(lat * DEG2RAD);
      const lonStep = latStep / Math.max(0.18, cosLat);
      for (let lon = -180; lon < 180; lon += lonStep) {
        if (isLand(lon, lat)) {
          landDots.push(latLonToVec3(lat, lon, 1));
        }
      }
    }

    const polarDots = [];
    for (let lat = 74; lat <= 88; lat += 2.2) {
      const cosLat = Math.cos(lat * DEG2RAD);
      const lonStep = 3.2 / Math.max(0.12, cosLat);
      for (let lon = -180; lon < 180; lon += lonStep) {
        polarDots.push(latLonToVec3(lat, lon, 0.998));
      }
    }

    const arcs = [
      {
        id: 'sydney',
        points: build3DArc(HUBS.india, HUBS.sydney, 120, 0.27),
        speed: 0.26,
        offset: 0.0,
        reverseOffset: 0.52,
        tailLen: 0.26
      },
      {
        id: 'surrey',
        points: build3DArc(HUBS.india, HUBS.surrey, 120, 0.34),
        speed: 0.23,
        offset: 0.38,
        reverseOffset: 0.85,
        tailLen: 0.28
      },
      {
        id: 'northern_relay',
        points: build3DArc(HUBS.india, { lat: 58.0, lon: -112.0 }, 100, 0.21),
        speed: 0.30,
        offset: 0.68,
        reverseOffset: 0.18,
        tailLen: 0.24
      }
    ];

    const hubVecs = {
      india: latLonToVec3(HUBS.india.lat, HUBS.india.lon, 1),
      sydney: latLonToVec3(HUBS.sydney.lat, HUBS.sydney.lon, 1),
      surrey: latLonToVec3(HUBS.surrey.lat, HUBS.surrey.lon, 1)
    };

    return { landDots, polarDots, arcs, hubVecs };
  }, []);

  const handleSelectCompany = (companyId) => {
    const next = activeCompany === companyId ? null : companyId;
    setActiveCompany(next);
    if (next === 'sydney') {
      rotRef.current.targetYaw = 0.08;
      rotRef.current.targetPitch = 0.58;
    } else if (next === 'surrey') {
      rotRef.current.targetYaw = 0.16;
      rotRef.current.targetPitch = 0.60;
    } else {
      rotRef.current.targetYaw = null;
      rotRef.current.targetPitch = null;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let lastTime = performance.now();

    const render = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const elapsed = now * 0.001;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (
        canvas.width !== Math.floor(rect.width * dpr) ||
        canvas.height !== Math.floor(rect.height * dpr)
      ) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const W = rect.width;
      const H = rect.height;
      const cx = W * 0.5;
      const cy = H * 0.48;
      const R = Math.min(W, H) * 0.41;

      ctx.clearRect(0, 0, W, H);

      // Update rotation physics & smooth orbital motion
      const st = rotRef.current;
      if (!st.isDragging) {
        st.yaw += st.velYaw;
        st.pitch += st.velPitch;
        st.velYaw *= 0.92;
        st.velPitch *= 0.92;

        const sinceDrag = (now - st.lastDragTime) * 0.001;
        const blend = Math.min(1, Math.max(0, (sinceDrag - 0.2) * 1.5));

        if (st.targetYaw !== null && blend > 0) {
          st.yaw += (st.targetYaw - st.yaw) * 0.05 * blend;
          st.pitch += (st.targetPitch - st.pitch) * 0.05 * blend;

          if (Math.abs(st.targetYaw - st.yaw) < 0.01) {
            st.targetYaw = null;
            st.targetPitch = null;
          }
        } else if (blend > 0) {
          // Continuous 360-degree rotation around the globe.
          st.yaw += dt * 0.18 * blend;
          st.pitch += (BASE_PITCH - st.pitch) * 0.025 * blend;
        }
      }

      st.pitch = Math.max(-0.6, Math.min(1.15, st.pitch));
      const yaw = st.yaw;
      const pitch = st.pitch;

      // 1. Outer Electric Cyan-Blue Atmospheric Halo
      const outerHalo = ctx.createRadialGradient(cx, cy, R * 0.78, cx, cy, R * 1.29);
      outerHalo.addColorStop(0, 'rgba(0, 140, 255, 0)');
      outerHalo.addColorStop(0.55, 'rgba(0, 162, 255, 0.28)');
      outerHalo.addColorStop(0.76, 'rgba(0, 212, 255, 0.62)');
      outerHalo.addColorStop(0.88, 'rgba(0, 140, 255, 0.22)');
      outerHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = outerHalo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.29, 0, Math.PI * 2);
      ctx.fill();

      // 2. Dark Sphere Body
      const sphereBody = ctx.createRadialGradient(
        cx - R * 0.18,
        cy - R * 0.28,
        R * 0.05,
        cx,
        cy,
        R
      );
      sphereBody.addColorStop(0, '#09223c');
      sphereBody.addColorStop(0.48, '#041020');
      sphereBody.addColorStop(0.86, '#020710');
      sphereBody.addColorStop(1, '#062848');

      ctx.fillStyle = sphereBody;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // 3. Top-Left Warm Horizon Sunrise Glow & Dots
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const horizonSun = ctx.createRadialGradient(
        cx - R * 0.24,
        cy - R * 0.78,
        R * 0.02,
        cx - R * 0.16,
        cy - R * 0.55,
        R * 0.78
      );
      horizonSun.addColorStop(0, 'rgba(255, 240, 200, 0.42)');
      horizonSun.addColorStop(0.28, 'rgba(125, 211, 252, 0.24)');
      horizonSun.addColorStop(0.65, 'rgba(14, 116, 144, 0.08)');
      horizonSun.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = horizonSun;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      // Polar Cap Graticule Rings
      const polarDots = globeGeometry.polarDots;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
      for (let i = 0; i < polarDots.length; i++) {
        const pr = rotateVec3(polarDots[i], yaw, pitch);
        if (pr.z > 0.05) {
          ctx.fillRect(cx + pr.x * R, cy - pr.y * R, 1.15, 1.15);
        }
      }

      // Continent Dots
      const landDots = globeGeometry.landDots;
      const dotRadius = Math.max(1.15, R * 0.0049);
      for (let i = 0; i < landDots.length; i++) {
        const pr = rotateVec3(landDots[i], yaw, pitch);
        if (pr.z > -0.04) {
          const sx = cx + pr.x * R;
          const sy = cy - pr.y * R;
          const depthAlpha = Math.min(1, Math.max(0.18, (pr.z + 0.08) * 1.15));
          ctx.fillStyle = `rgba(56, 204, 255, ${(depthAlpha * 0.92).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 4. Rim Outline
      ctx.strokeStyle = 'rgba(56, 210, 255, 0.72)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // 5. 3D Elevated Arcs & Traveling Laser Comets
      globeGeometry.arcs.forEach((arc) => {
        if (activeCompany && arc.id !== activeCompany && arc.id !== 'northern_relay') {
          return;
        }

        const proj = arc.points.map((pt) => {
          const r = rotateVec3(pt, yaw, pitch);
          return { sx: cx + r.x * R, sy: cy - r.y * R, z: r.z, t: pt.t };
        });

        ctx.beginPath();
        let started = false;
        for (let i = 0; i < proj.length; i++) {
          const pt = proj[i];
          const visible = pt.z > -0.05 || Math.hypot(pt.sx - cx, pt.sy - cy) > R * 0.985;
          if (visible) {
            if (!started) {
              ctx.moveTo(pt.sx, pt.sy);
              started = true;
            } else {
              ctx.lineTo(pt.sx, pt.sy);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        const renderComet = (progress, reverse = false) => {
          const tail = arc.tailLen;
          const len = proj.length;

          for (let i = 1; i < len; i++) {
            const p0 = proj[i - 1];
            const p1 = proj[i];
            const visible = p1.z > -0.08 || Math.hypot(p1.sx - cx, p1.sy - cy) > R * 0.985;
            if (!visible) continue;

            const segT = reverse ? 1 - p1.t : p1.t;
            const diff = progress - segT;

            if (diff >= 0 && diff <= tail) {
              const intensity = Math.pow(1 - diff / tail, 1.45);
              ctx.beginPath();
              ctx.moveTo(p0.sx, p0.sy);
              ctx.lineTo(p1.sx, p1.sy);
              ctx.strokeStyle = `rgba(0, 229, 255, ${(intensity * 0.92).toFixed(2)})`;
              ctx.lineWidth = 1.5 + intensity * 3.6;
              ctx.lineCap = 'round';
              ctx.stroke();

              if (intensity > 0.35) {
                ctx.beginPath();
                ctx.moveTo(p0.sx, p0.sy);
                ctx.lineTo(p1.sx, p1.sy);
                ctx.strokeStyle = `rgba(255, 255, 255, ${intensity.toFixed(2)})`;
                ctx.lineWidth = 1.0 + intensity * 1.9;
                ctx.stroke();
              }
            }
          }

          const headIdx = Math.min(
            len - 1,
            Math.max(0, Math.floor((reverse ? 1 - progress : progress) * (len - 1)))
          );
          const hp = proj[headIdx];
          if (hp && (hp.z > -0.08 || Math.hypot(hp.sx - cx, hp.sy - cy) > R * 0.985)) {
            const headBurst = ctx.createRadialGradient(hp.sx, hp.sy, 0, hp.sx, hp.sy, 13);
            headBurst.addColorStop(0, 'rgba(255, 255, 255, 1)');
            headBurst.addColorStop(0.4, 'rgba(56, 220, 255, 0.85)');
            headBurst.addColorStop(1, 'rgba(0, 200, 255, 0)');
            ctx.fillStyle = headBurst;
            ctx.beginPath();
            ctx.arc(hp.sx, hp.sy, 13, 0, Math.PI * 2);
            ctx.fill();
          }
        };

        const c1 = (elapsed * arc.speed + arc.offset) % 1.32;
        if (c1 <= 1.0) renderComet(c1, false);

        const c2 = (elapsed * arc.speed + arc.reverseOffset) % 1.32;
        if (c2 <= 1.0) renderComet(c2, true);
      });

      // 6. Hub Endpoints & Floating Badges Sync
      Object.keys(HUBS).forEach((key) => {
        const vec = globeGeometry.hubVecs[key];
        const r = rotateVec3(vec, yaw, pitch);
        const sx = cx + r.x * R;
        const sy = cy - r.y * R;
        const isFront = r.z > -0.15;

        if (isFront) {
          const flareRadius = key === 'india' ? 24 : 18;
          const burst = ctx.createRadialGradient(sx, sy, 1, sx, sy, flareRadius);
          burst.addColorStop(0, '#ffffff');
          burst.addColorStop(0.3, 'rgba(165, 243, 252, 0.95)');
          burst.addColorStop(0.65, 'rgba(0, 212, 255, 0.35)');
          burst.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = burst;
          ctx.beginPath();
          ctx.arc(sx, sy, flareRadius, 0, Math.PI * 2);
          ctx.fill();

          if (key === 'india') {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(sx - 12, sy);
            ctx.lineTo(sx + 12, sy);
            ctx.moveTo(sx, sy - 12);
            ctx.lineTo(sx, sy + 12);
            ctx.stroke();
          }

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(sx, sy, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }

        const badgeEl = badgeRefs[key]?.current;
        if (badgeEl) {
          let offsetX = key === 'india' ? 18 : key === 'surrey' ? -195 : -205;
          let offsetY = key === 'india' ? -18 : key === 'surrey' ? -34 : 18;

          const isHovered = hoveredHubRef.current === key || activeCompany === key;
          const opacity =
            key === 'india'
              ? isFront
                ? Math.min(1, Math.max(0.25, (r.z + 0.15) * 2.2))
                : 0
              : isHovered
              ? 1
              : Math.min(1, Math.max(0.28, (r.z + 0.25) * 1.6));

          badgeEl.style.transform = `translate3d(${sx + offsetX}px, ${sy + offsetY}px, 0)`;
          badgeEl.style.opacity = opacity.toFixed(2);
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [globeGeometry, activeCompany]);

  const handlePointerDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    rotRef.current.isDragging = true;
    rotRef.current.targetYaw = null;
    rotRef.current.targetPitch = null;
    rotRef.current.lastX = clientX;
    rotRef.current.lastY = clientY;
    rotRef.current.lastDragTime = performance.now();
  };

  const handlePointerMove = (e) => {
    if (!rotRef.current.isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - rotRef.current.lastX;
    const dy = clientY - rotRef.current.lastY;

    rotRef.current.velYaw = dx * 0.0055;
    rotRef.current.velPitch = dy * 0.0055;
    rotRef.current.yaw += rotRef.current.velYaw;
    rotRef.current.pitch += rotRef.current.velPitch;

    rotRef.current.lastX = clientX;
    rotRef.current.lastY = clientY;
    rotRef.current.lastDragTime = performance.now();
  };

  const handlePointerUp = () => {
    if (rotRef.current.isDragging) {
      rotRef.current.isDragging = false;
      rotRef.current.lastDragTime = performance.now();
    }
  };

  return (
    <div
      className="video-globe-wrapper"
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <div className="video-globe-intro">
        <p className="video-globe-kicker">CANADA · INDIA · AUSTRALIA</p>
        <h2>Three countries. One team.</h2>
        <p className="video-globe-description">
          Strategy and delivery in Sydney, Australia, with our partner <strong>Global Maple System</strong>; colleges across Canada with <strong>EduWeb Consulting</strong>, our education partner since 2017. Engineering and design across India and Australia. When one office signs off, the other picks it up — so your project moves around the clock.
        </p>
      </div>

      {/* Top Company Pills */}
      <div className="video-globe-topbar">
        <button
          onClick={() => handleSelectCompany('sydney')}
          onMouseEnter={() => setHoveredHub('sydney')}
          onMouseLeave={() => setHoveredHub(null)}
          className={`video-company-pill ${activeCompany === 'sydney' ? 'active' : ''}`}
        >
          Global Maple System
        </button>
        <button
          onClick={() => handleSelectCompany('surrey')}
          onMouseEnter={() => setHoveredHub('surrey')}
          onMouseLeave={() => setHoveredHub(null)}
          className={`video-company-pill ${activeCompany === 'surrey' ? 'active' : ''}`}
        >
          EduWeb Consulting
        </button>
      </div>

      {/* Main 3D Globe Stage */}
      <div className="video-globe-stage">
        <canvas
          ref={canvasRef}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          className="video-globe-canvas"
        />

        {/* Floating Synced Badges */}
        <div className="video-globe-badges">
          <div
            ref={badgeRefs.surrey}
            onMouseEnter={() => setHoveredHub('surrey')}
            onMouseLeave={() => setHoveredHub(null)}
            className="video-hub-badge"
          >
            <span className="hub-dot red" />
            <div>
              <div className="hub-title">Surrey, Canada</div>
              <div className="hub-sub">
                EduWeb Consulting • <strong>{clocks.surrey}</strong>
              </div>
            </div>
          </div>

          <div
            ref={badgeRefs.sydney}
            onMouseEnter={() => setHoveredHub('sydney')}
            onMouseLeave={() => setHoveredHub(null)}
            className="video-hub-badge"
          >
            <span className="hub-dot red" />
            <div>
              <div className="hub-title">Sydney, Australia</div>
              <div className="hub-sub">
                Global Maple System • <strong>{clocks.sydney}</strong>
              </div>
            </div>
          </div>

          <div
            ref={badgeRefs.india}
            onMouseEnter={() => setHoveredHub('india')}
            onMouseLeave={() => setHoveredHub(null)}
            className="video-hub-badge"
          >
            <span className="hub-dot amber" />
            <div>
              <div className="hub-title">India</div>
              <div className="hub-sub">
                Engineering &amp; Design • <strong>{clocks.india}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Center DRAG TO TURN Label */}

      </div>
    </div>
  );
}
