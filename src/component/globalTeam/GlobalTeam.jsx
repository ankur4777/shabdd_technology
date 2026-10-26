import React, { useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { connectionPairs, globalTeamData } from './globalTeamData'
import './globalTeam.css'

const GLOBE_RADIUS = 2.15

function latLngToVector(latitude, longitude, radius = GLOBE_RADIUS) {
  const lat = THREE.MathUtils.degToRad(latitude)
  const lon = THREE.MathUtils.degToRad(longitude)
  return new THREE.Vector3(
    radius * Math.cos(lat) * Math.sin(lon),
    radius * Math.sin(lat),
    radius * Math.cos(lat) * Math.cos(lon),
  )
}

function useGlobeDots() {
  return useMemo(() => {
    const points = []

    for (let latitude = -80; latitude <= 80; latitude += 5) {
      const latitudeRadius = Math.cos(THREE.MathUtils.degToRad(latitude))
      for (let longitude = -180; longitude < 180; longitude += 5) {
        points.push(latLngToVector(latitude, longitude, GLOBE_RADIUS + 0.012 * latitudeRadius))
      }
    }

    return new Float32Array(points.flatMap((point) => point.toArray()))
  }, [])
}

function GlobeDots() {
  const positions = useGlobeDots()
  const pointsRef = React.useRef()

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.045
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#12e7f2" size={0.018} sizeAttenuation transparent opacity={0.9} />
    </points>
  )
}

function GlobeShell() {
  return (
    <>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 32]} />
        <meshBasicMaterial color="#0b2935" transparent opacity={0.26} wireframe />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 24]} />
        <meshBasicMaterial color="#00d9e8" transparent opacity={0.045} side={THREE.BackSide} />
      </mesh>
    </>
  )
}

function ConnectionArc({ from, to, index }) {
  const points = useMemo(() => {
    const start = latLngToVector(from.latitude, from.longitude, GLOBE_RADIUS + 0.05)
    const end = latLngToVector(to.latitude, to.longitude, GLOBE_RADIUS + 0.05)
    const middle = start.clone().add(end).normalize().multiplyScalar(GLOBE_RADIUS + 0.72)
    const curve = new THREE.QuadraticBezierCurve3(start, middle, end)
    return curve.getPoints(64)
  }, [from, to])

  const lineRef = React.useRef()

  useFrame((state) => {
    if (lineRef.current?.material) {
      lineRef.current.material.dashOffset = -state.clock.elapsedTime * (0.22 + index * 0.04)
    }
  })

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((point) => point.toArray()))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineDashedMaterial color="#a9ffff" dashSize={0.12} gapSize={0.08} transparent opacity={0.9} linewidth={1} />
    </line>
  )
}

function OfficeMarker({ office, active, onSelect }) {
  const point = useMemo(() => latLngToVector(office.latitude, office.longitude, GLOBE_RADIUS + 0.08), [office])

  return (
    <group position={point}>
      <mesh onClick={(event) => { event.stopPropagation(); onSelect(office.id) }}>
        <sphereGeometry args={[active ? 0.09 : 0.065, 16, 16]} />
        <meshBasicMaterial color={office.accent} />
      </mesh>
      <Html distanceFactor={7} center>
        <button
          type="button"
          className={`global-team-marker ${active ? 'is-active' : ''}`}
          style={{ '--marker-accent': office.accent }}
          onClick={() => onSelect(office.id)}
        >
          <span>{office.country}</span>
          <small>{office.city} · {office.timeZone}</small>
        </button>
      </Html>
    </group>
  )
}

function GlobeScene({ offices, selectedId, onSelect }) {
  const officeMap = useMemo(() => Object.fromEntries(offices.map((office) => [office.id, office])), [offices])
  const groupRef = React.useRef()

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.028
  })

  return (
    <group ref={groupRef} rotation={[0.08, -0.38, 0]}>
      <GlobeShell />
      <GlobeDots />
      {connectionPairs.map(([fromId, toId], index) => (
        <ConnectionArc key={`${fromId}-${toId}`} from={officeMap[fromId]} to={officeMap[toId]} index={index} />
      ))}
      {offices.map((office) => (
        <OfficeMarker key={office.id} office={office} active={office.id === selectedId} onSelect={onSelect} />
      ))}
    </group>
  )
}

function GlobalTeam({ data = globalTeamData }) {
  const [selectedId, setSelectedId] = useState(data.offices[1]?.id || data.offices[0]?.id)
  const selectedOffice = data.offices.find((office) => office.id === selectedId) || data.offices[0]

  return (
    <section className="global-team" aria-labelledby="global-team-title">
      <div className="global-team__header">
        <p className="global-team__eyebrow">{data.eyebrow}</p>
        <h2 id="global-team-title">{data.title}</h2>
        <p className="global-team__description">{data.description}</p>
        <div className="global-team__stats" aria-label="Global team locations">
          {data.offices.map((office) => (
            <button key={office.id} type="button" onClick={() => setSelectedId(office.id)}>
              {office.country} · {office.city}
            </button>
          ))}
        </div>
      </div>

      <div className="global-team__visual">
        <Canvas camera={{ position: [0, 0.15, 6.2], fov: 35 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <GlobeScene offices={data.offices} selectedId={selectedId} onSelect={setSelectedId} />
          <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI * 0.28} maxPolarAngle={Math.PI * 0.72} />
        </Canvas>
      </div>

      {selectedOffice && (
        <article className="global-team__office" style={{ '--office-accent': selectedOffice.accent }}>
          <div>
            <p className="global-team__office-label">{selectedOffice.country} · {selectedOffice.city}</p>
            <h3>{selectedOffice.partnerName}</h3>
            <p>{selectedOffice.description}</p>
          </div>
          <div className="global-team__office-meta">
            <span>{selectedOffice.timeZone}</span>
            <a href={selectedOffice.partnerUrl} target="_blank" rel="noreferrer">Visit partner <span aria-hidden="true">→</span></a>
          </div>
        </article>
      )}

    </section>
  )
}

export default GlobalTeam
