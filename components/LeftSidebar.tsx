"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, GripVertical } from "lucide-react"
import type { AssetData } from "@/types"
import { AssetCard } from "./AssetCard"
import { getAssetIcon } from "@/utils/assetUtils"

interface LeftSidebarProps {
  assets: AssetData[]
  selectedAssetId: string
  onAssetSelect: (id: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
  width: number
  onResizeStart: () => void
}

export function LeftSidebar({
  assets,
  selectedAssetId,
  onAssetSelect,
  collapsed,
  onToggleCollapse,
  width,
  onResizeStart,
}: LeftSidebarProps) {
  return (
    <motion.div
      className="bg-white border-r border-gray-200 flex-shrink-0 relative"
      style={{ width: collapsed ? 48 : width }}
      animate={{ width: collapsed ? 48 : width }}
      transition={{ duration: 0.125 }}
    >
      {!collapsed && (
        <div className="p-4 h-full overflow-y-auto">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Tracked Assets</h2>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onToggleCollapse}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {assets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                isSelected={selectedAssetId === asset.id}
                onClick={() => onAssetSelect(asset.id)}
              />
            ))}
          </div>
        </div>
      )}

      {collapsed && (
        <div className="p-2 h-full flex flex-col items-center space-y-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mt-2" onClick={onToggleCollapse}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          {assets.map((asset) => {
            const IconComponent = getAssetIcon(asset.type)
            return (
              <Button
                key={asset.id}
                variant={selectedAssetId === asset.id ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onAssetSelect(asset.id)}
              >
                <IconComponent className="h-4 w-4" />
              </Button>
            )
          })}
        </div>
      )}

      {/* Resize Handle */}
      {!collapsed && (
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors group"
          onMouseDown={onResizeStart}
        >
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
            <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
          </div>
        </div>
      )}
    </motion.div>
  )
}