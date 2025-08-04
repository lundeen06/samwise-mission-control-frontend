"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Battery,
  Thermometer,
  Signal,
  Zap,
  RotateCcw,
  Download,
  Shield,
  Play,
  CheckCircle,
  Loader2,
  Navigation,
  Camera,
} from "lucide-react"
import type { AssetData, CommandState } from "@/types"
import { TelemetryCard } from "./TelemetryCard"

interface RightSidebarProps {
  selectedAsset: AssetData
  commands: CommandState[]
  onExecuteCommand: (commandId: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
  width: number
  onResizeStart: () => void
}

export function RightSidebar({
  selectedAsset,
  commands,
  onExecuteCommand,
  collapsed,
  onToggleCollapse,
  width,
  onResizeStart,
}: RightSidebarProps) {
  const getCommandIcon = (commandId: string, status: string) => {
    if (status === "executing") return <Loader2 className="h-4 w-4 animate-spin" />
    if (status === "complete") return <CheckCircle className="h-4 w-4" />

    switch (commandId) {
      case "detumble":
        return <RotateCcw className="h-4 w-4" />
      case "deploy":
        return <Zap className="h-4 w-4" />
      case "downlink":
        return <Download className="h-4 w-4" />
      case "safemode":
        return <Shield className="h-4 w-4" />
      default:
        return <Play className="h-4 w-4" />
    }
  }

  return (
    <motion.div
      className="bg-white border-l border-gray-200 flex-shrink-0 relative"
      style={{ width: collapsed ? 48 : width }}
      animate={{ width: collapsed ? 48 : width }}
      transition={{ duration: 0.2 }}
    >
      {!collapsed && (
        <div className="p-4 h-full overflow-y-auto">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onToggleCollapse}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold text-gray-900">Telemetry</h2>
            </div>
            <p className="text-sm text-gray-600 ml-10">{selectedAsset.name}</p>
          </div>

          <div className="space-y-6">
            {/* Position */}
            <TelemetryCard title="Position">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Latitude:</span>
                  <span className="font-mono">{selectedAsset.position.latitude.toFixed(6)}°</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Longitude:</span>
                  <span className="font-mono">{selectedAsset.position.longitude.toFixed(6)}°</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Altitude:</span>
                  <span className="font-mono">{selectedAsset.position.altitude.toFixed(1)} km</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ground Speed:</span>
                  <span className="font-mono">{selectedAsset.position.groundSpeed.toFixed(2)} km/s</span>
                </div>
              </div>
            </TelemetryCard>

            {/* Attitude (for satellites) */}
            {selectedAsset.attitude && (
              <TelemetryCard title="Attitude">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Roll</div>
                      <div className="font-mono text-sm">{selectedAsset.attitude.roll.toFixed(1)}°</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Pitch</div>
                      <div className="font-mono text-sm">{selectedAsset.attitude.pitch.toFixed(1)}°</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Yaw</div>
                      <div className="font-mono text-sm">{selectedAsset.attitude.yaw.toFixed(1)}°</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">Angular Velocity (°/s)</div>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                      <div>X: {selectedAsset.attitude.angularVelocity.x.toFixed(3)}</div>
                      <div>Y: {selectedAsset.attitude.angularVelocity.y.toFixed(3)}</div>
                      <div>Z: {selectedAsset.attitude.angularVelocity.z.toFixed(3)}</div>
                    </div>
                  </div>
                </div>
              </TelemetryCard>
            )}

            {/* Orbital Elements (for satellites) */}
            {selectedAsset.orbital && (
              <TelemetryCard title="Orbital Elements">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Semi-major Axis:</span>
                    <span className="font-mono">{selectedAsset.orbital.semiMajorAxis.toFixed(1)} km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Eccentricity:</span>
                    <span className="font-mono">{selectedAsset.orbital.eccentricity.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Inclination:</span>
                    <span className="font-mono">{selectedAsset.orbital.inclination.toFixed(1)}°</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Next AOS:</span>
                    <span className="font-mono">{selectedAsset.orbital.nextAOS}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Next LOS:</span>
                    <span className="font-mono">{selectedAsset.orbital.nextLOS}</span>
                  </div>
                </div>
              </TelemetryCard>
            )}

            {/* Balloon Data (for balloons) */}
            {selectedAsset.balloon && (
              <TelemetryCard title="Balloon Data">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ascent Rate:</span>
                    <span className="font-mono">{selectedAsset.balloon.ascentRate.toFixed(1)} m/s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Burst Altitude:</span>
                    <span className="font-mono">{selectedAsset.balloon.burstAltitude.toFixed(1)} km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payload Mass:</span>
                    <span className="font-mono">{selectedAsset.balloon.payloadMass.toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Balloon Volume:</span>
                    <span className="font-mono">{selectedAsset.balloon.balloonVolume.toFixed(0)} m³</span>
                  </div>
                </div>
              </TelemetryCard>
            )}

            {/* Subsystems */}
            <TelemetryCard title="Subsystems">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Battery</span>
                    </div>
                    <span className="text-sm font-mono">{selectedAsset.subsystems.battery.toFixed(0)}%</span>
                  </div>
                  <Progress value={selectedAsset.subsystems.battery} className="h-2" />
                </div>

                {selectedAsset.subsystems.solarPanels !== undefined && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Solar Panels</span>
                    </div>
                    <Badge variant={selectedAsset.subsystems.solarPanels ? "default" : "secondary"}>
                      {selectedAsset.subsystems.solarPanels ? "DEPLOYED" : "STOWED"}
                    </Badge>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Temperature</span>
                  </div>
                  <span className="text-sm font-mono">{selectedAsset.subsystems.temperature.toFixed(1)}°C</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Signal className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Signal Strength</span>
                  </div>
                  <span className="text-sm font-mono">{selectedAsset.subsystems.signalStrength.toFixed(0)}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Data Rate</span>
                  <span className="text-sm font-mono">{selectedAsset.subsystems.dataRate} bps</span>
                </div>

                {selectedAsset.subsystems.gps && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">GPS</span>
                    </div>
                    <Badge variant="default">ACTIVE</Badge>
                  </div>
                )}

                {selectedAsset.subsystems.camera !== undefined && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Camera</span>
                    </div>
                    <Badge variant={selectedAsset.subsystems.camera ? "default" : "secondary"}>
                      {selectedAsset.subsystems.camera ? "ACTIVE" : "INACTIVE"}
                    </Badge>
                  </div>
                )}
              </div>
            </TelemetryCard>

            {/* Commands */}
            {selectedAsset.type !== "station" && (
              <TelemetryCard title="Commands">
                <div className="space-y-3">
                  {selectedAsset.type === "satellite" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => onExecuteCommand("detumble")}
                        disabled={commands.find((c) => c.id === "detumble")?.status !== "idle"}
                      >
                        {getCommandIcon("detumble", commands.find((c) => c.id === "detumble")?.status || "idle")}
                        <span className="ml-2">Initiate Detumble</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => onExecuteCommand("deploy")}
                        disabled={commands.find((c) => c.id === "deploy")?.status !== "idle"}
                      >
                        {getCommandIcon("deploy", commands.find((c) => c.id === "deploy")?.status || "idle")}
                        <span className="ml-2">Deploy Solar Panels</span>
                      </Button>
                    </>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => onExecuteCommand("downlink")}
                    disabled={commands.find((c) => c.id === "downlink")?.status !== "idle"}
                  >
                    {getCommandIcon("downlink", commands.find((c) => c.id === "downlink")?.status || "idle")}
                    <span className="ml-2">Downlink Telemetry</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => onExecuteCommand("safemode")}
                    disabled={commands.find((c) => c.id === "safemode")?.status !== "idle"}
                  >
                    {getCommandIcon("safemode", commands.find((c) => c.id === "safemode")?.status || "idle")}
                    <span className="ml-2">Enter Safe Mode</span>
                  </Button>
                </div>
              </TelemetryCard>
            )}
          </div>
        </div>
      )}

      {collapsed && (
        <div className="p-2 h-full flex flex-col items-center space-y-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mt-2" onClick={onToggleCollapse}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex flex-col items-center space-y-2">
            <Battery className="h-4 w-4 text-gray-500" />
            <Thermometer className="h-4 w-4 text-gray-500" />
            <Signal className="h-4 w-4 text-gray-500" />
            <Zap className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      )}

      {/* Resize Handle */}
      {!collapsed && (
        <div
          className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors group"
          onMouseDown={onResizeStart}
        >
          {/* <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-3/2">
            <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
          </div> */}
        </div>
      )}
    </motion.div>
  )
}