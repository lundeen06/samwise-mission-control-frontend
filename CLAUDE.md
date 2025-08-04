# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Architecture

This is a Next.js 14 mission control application for tracking satellites, balloons, drones, and ground stations. The app uses:

- **Next.js 14** with App Router architecture
- **TypeScript** for type safety
- **Tailwind CSS** with shadcn/ui components for styling
- **Framer Motion** for animations
- **Client-side state management** with React hooks

### Key Architecture Patterns

- **Real-time simulation**: Telemetry data updates every second via `setInterval` in the main page component
- **Asset-centric design**: All components receive `AssetData` objects with position, attitude, orbital parameters, and subsystem telemetry
- **Resizable layout**: Three-panel layout with draggable sidebar boundaries
- **Command execution**: Simulated command system with status tracking (idle → executing → complete)

### Directory Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components including main UI panels
- `components/ui/` - shadcn/ui base components
- `types/` - TypeScript type definitions for assets, commands, sidebar state
- `data/` - Mock data for initial asset configurations
- `utils/` - Utility functions for asset telemetry updates
- `lib/` - Shared utilities (currently just cn() for className merging)

### Component Architecture

The main page (`app/page.tsx`) orchestrates:
- **LeftSidebar**: Asset list and selection
- **MapArea**: Central visualization area for selected asset
- **RightSidebar**: Telemetry data and command controls
- **Header**: Current time display

All components are designed to work with the unified `AssetData` interface that supports multiple asset types (satellites, balloons, drones, stations).

### Asset Type System

The application handles different asset types with conditional properties:
- **Satellites**: Include orbital parameters and attitude data
- **Balloons**: Include ascent rate, burst altitude, and payload mass
- **Stations**: Ground-based assets with fixed positions
- **Drones**: (structure defined but not currently used in mock data)

### Styling Approach

- Uses shadcn/ui design system with CSS variables for theming
- Tailwind classes for layout and spacing
- Framer Motion for smooth animations and transitions
- Consistent spacing and typography patterns throughout

### State Management

- Uses React's built-in state management (useState, useEffect)
- Real-time updates handled through intervals
- Sidebar resize state managed separately from content state
- Command execution uses timeout-based state transitions