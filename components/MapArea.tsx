import { MapPin } from "lucide-react"
import type { AssetData } from "@/types"

interface MapAreaProps {
  selectedAsset: AssetData
}

export function MapArea({ selectedAsset }: MapAreaProps) {
  return (
    <div className="flex-1 bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Asset Tracking Map</h3>
          <p className="text-gray-600 mb-4">Mapbox GL JS integration ready</p>
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
            <h4 className="font-medium text-gray-900 mb-2">Selected: {selectedAsset.name}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Type:</span>
                <span>{selectedAsset.subtype}</span>
              </div>
              <div className="flex justify-between">
                <span>Position:</span>
                <span>
                  {selectedAsset.position.latitude.toFixed(4)}°, {selectedAsset.position.longitude.toFixed(4)}°
                </span>
              </div>
              <div className="flex justify-between">
                <span>Altitude:</span>
                <span>{selectedAsset.position.altitude.toFixed(1)} km</span>
              </div>
              <div className="flex justify-between">
                <span>Ground Speed:</span>
                <span>{selectedAsset.position.groundSpeed.toFixed(2)} km/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
