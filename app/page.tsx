"use client"

import { useState, useEffect, useCallback } from "react"
import type { AssetData, CommandState, SidebarState } from "@/types"
import { initialAssets } from "@/data/mockAssets"
import { updateAssetTelemetry } from "@/utils/assetUtils"
import { Header } from "@/components/Header"
import { LeftSidebar } from "@/components/LeftSidebar"
import { MapArea } from "@/components/MapArea"
import { RightSidebar } from "@/components/RightSidebar"

export default function MissionControl() {
  const [assets, setAssets] = useState<AssetData[]>(initialAssets)
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0].id)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [commands, setCommands] = useState<CommandState[]>([
    { id: "detumble", status: "idle" },
    { id: "deploy", status: "idle" },
    { id: "downlink", status: "idle" },
    { id: "safemode", status: "idle" },
  ])

  // Sidebar state
  const [sidebarState, setSidebarState] = useState<SidebarState>({
    leftCollapsed: false,
    rightCollapsed: false,
    leftWidth: 320,
    rightWidth: 384,
  })

  // Resize state
  const [isResizingLeft, setIsResizingLeft] = useState(false)
  const [isResizingRight, setIsResizingRight] = useState(false)

  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId) || assets[0]

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate real-time telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) => prev.map(updateAssetTelemetry))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Resize handlers
  const handleMouseDown = useCallback((side: "left" | "right") => {
    if (side === "left") {
      setIsResizingLeft(true)
    } else {
      setIsResizingRight(true)
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizingLeft) {
        const newWidth = Math.max(200, Math.min(600, e.clientX))
        setSidebarState((prev) => ({ ...prev, leftWidth: newWidth }))
      }
      if (isResizingRight) {
        const newWidth = Math.max(300, Math.min(800, window.innerWidth - e.clientX))
        setSidebarState((prev) => ({ ...prev, rightWidth: newWidth }))
      }
    },
    [isResizingLeft, isResizingRight],
  )

  const handleMouseUp = useCallback(() => {
    setIsResizingLeft(false)
    setIsResizingRight(false)
  }, [])

  useEffect(() => {
    if (isResizingLeft || isResizingRight) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    }
  }, [isResizingLeft, isResizingRight, handleMouseMove, handleMouseUp])

  const executeCommand = (commandId: string) => {
    setCommands((prev) => prev.map((cmd) => (cmd.id === commandId ? { ...cmd, status: "executing" } : cmd)))

    setTimeout(() => {
      setCommands((prev) => prev.map((cmd) => (cmd.id === commandId ? { ...cmd, status: "complete" } : cmd)))

      setTimeout(() => {
        setCommands((prev) => prev.map((cmd) => (cmd.id === commandId ? { ...cmd, status: "idle" } : cmd)))
      }, 2000)
    }, 3000)
  }

  const toggleLeftSidebar = () => {
    setSidebarState((prev) => ({ ...prev, leftCollapsed: !prev.leftCollapsed }))
  }

  const toggleRightSidebar = () => {
    setSidebarState((prev) => ({ ...prev, rightCollapsed: !prev.rightCollapsed }))
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header currentTime={currentTime} />

      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar
          assets={assets}
          selectedAssetId={selectedAssetId}
          onAssetSelect={setSelectedAssetId}
          collapsed={sidebarState.leftCollapsed}
          onToggleCollapse={toggleLeftSidebar}
          width={sidebarState.leftWidth}
          onResizeStart={() => handleMouseDown("left")}
        />

        <MapArea selectedAsset={selectedAsset} />

        <RightSidebar
          selectedAsset={selectedAsset}
          commands={commands}
          onExecuteCommand={executeCommand}
          collapsed={sidebarState.rightCollapsed}
          onToggleCollapse={toggleRightSidebar}
          width={sidebarState.rightWidth}
          onResizeStart={() => handleMouseDown("right")}
        />
      </div>
    </div>
  )
}
