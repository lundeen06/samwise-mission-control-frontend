"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { AssetData } from "@/types"
import { getAssetIcon, getStatusColor, getStatusBadgeVariant } from "@/utils/assetUtils"
import { cn } from "@/lib/utils"

interface AssetCardProps {
  asset: AssetData
  isSelected: boolean
  onClick: () => void
}

export function AssetCard({ asset, isSelected, onClick }: AssetCardProps) {
  const IconComponent = getAssetIcon(asset.type)

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-md",
          isSelected ? "ring-2 ring-blue-500 shadow-md" : "",
        )}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <IconComponent className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-gray-900">{asset.name}</span>
            </div>
            <div className={cn("w-2 h-2 rounded-full", getStatusColor(asset.status))}></div>
          </div>

          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Type:</span>
              <span>{asset.subtype}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge variant={getStatusBadgeVariant(asset.status)} className="text-xs">
                {asset.status.toUpperCase()}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Altitude:</span>
              <span>{asset.position.altitude.toFixed(1)} km</span>
            </div>
            {asset.balloon && (
              <div className="flex justify-between">
                <span>Ascent Rate:</span>
                <span>{asset.balloon.ascentRate.toFixed(1)} m/s</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
