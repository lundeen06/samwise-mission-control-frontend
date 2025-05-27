export interface AssetData {
  id: string
  name: string
  type: "satellite" | "balloon" | "drone" | "station"
  subtype: string // e.g., "CubeSat 3U", "Weather Balloon", "Ground Station"
  status: "active" | "standby" | "commissioning" | "offline" | "ascending" | "descending"
  position: {
    latitude: number
    longitude: number
    altitude: number
    groundSpeed: number
  }
  attitude?: {
    roll: number
    pitch: number
    yaw: number
    angularVelocity: {
      x: number
      y: number
      z: number
    }
  }
  orbital?: {
    semiMajorAxis: number
    eccentricity: number
    inclination: number
    raan: number
    argOfPerigee: number
    trueAnomaly: number
    nextAOS: string
    nextLOS: string
  }
  balloon?: {
    ascentRate: number
    burstAltitude: number
    payloadMass: number
    balloonVolume: number
  }
  subsystems: {
    battery: number
    solarPanels?: boolean
    temperature: number
    dataRate: number
    signalStrength: number
    gps?: boolean
    camera?: boolean
  }
}

export interface CommandState {
  id: string
  status: "idle" | "executing" | "complete"
}

export interface SidebarState {
  leftCollapsed: boolean
  rightCollapsed: boolean
  leftWidth: number
  rightWidth: number
}
