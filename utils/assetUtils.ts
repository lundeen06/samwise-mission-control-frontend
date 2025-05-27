import type { AssetData } from "@/types"
import { Satellite, BombIcon as Balloon, Radio, Plane } from "lucide-react"

export const getAssetIcon = (type: string) => {
  switch (type) {
    case "satellite":
      return Satellite
    case "balloon":
      return Balloon
    case "station":
      return Radio
    case "drone":
      return Plane
    default:
      return Satellite
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500"
    case "standby":
      return "bg-blue-500"
    case "commissioning":
    case "ascending":
    case "descending":
      return "bg-orange-500"
    case "offline":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "active":
      return "default" as const
    case "standby":
      return "secondary" as const
    case "commissioning":
    case "ascending":
    case "descending":
      return "outline" as const
    case "offline":
      return "destructive" as const
    default:
      return "secondary" as const
  }
}

export const updateAssetTelemetry = (asset: AssetData): AssetData => {
  const updatedAsset = { ...asset }

  // Update position
  updatedAsset.position = {
    ...updatedAsset.position,
    latitude: updatedAsset.position.latitude + (Math.random() - 0.5) * 0.01,
    longitude: updatedAsset.position.longitude + (Math.random() - 0.5) * 0.01,
    altitude: updatedAsset.position.altitude + (Math.random() - 0.5) * 0.1,
    groundSpeed: updatedAsset.position.groundSpeed + (Math.random() - 0.5) * 0.01,
  }

  // Update attitude for satellites
  if (updatedAsset.attitude) {
    updatedAsset.attitude = {
      ...updatedAsset.attitude,
      roll: updatedAsset.attitude.roll + (Math.random() - 0.5) * 0.1,
      pitch: updatedAsset.attitude.pitch + (Math.random() - 0.5) * 0.1,
      yaw: updatedAsset.attitude.yaw + (Math.random() - 0.5) * 0.1,
    }
  }

  // Update balloon-specific data
  if (updatedAsset.balloon && updatedAsset.status === "ascending") {
    updatedAsset.balloon = {
      ...updatedAsset.balloon,
      ascentRate: Math.max(0, updatedAsset.balloon.ascentRate + (Math.random() - 0.5) * 0.2),
    }
    updatedAsset.position.altitude += updatedAsset.balloon.ascentRate / 60 // Convert to km/s
  }

  // Update subsystems
  updatedAsset.subsystems = {
    ...updatedAsset.subsystems,
    battery: Math.max(0, Math.min(100, updatedAsset.subsystems.battery + (Math.random() - 0.5) * 0.5)),
    temperature: updatedAsset.subsystems.temperature + (Math.random() - 0.5) * 0.2,
    signalStrength: Math.max(0, Math.min(100, updatedAsset.subsystems.signalStrength + (Math.random() - 0.5) * 2)),
  }

  return updatedAsset
}
