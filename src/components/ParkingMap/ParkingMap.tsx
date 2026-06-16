import React, { memo } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import type { ParkingMapProps } from "./ParkingMap.types";

const DEFAULT_SLOT_WIDTH = 80;
const DEFAULT_SLOT_HEIGHT = 120;

export const ParkingMap: React.FC<ParkingMapProps> = memo(({
  slots,
  selectedSlotId,
  onSlotSelect,
  width = 800,
  height = 500,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const colors = {
    available: {
      fill: isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.08)",
      stroke: "#10b981",
      text: isDark ? "#a7f3d0" : "#047857",
    },
    occupied: {
      fill: isDark ? "rgba(244, 63, 94, 0.15)" : "rgba(244, 63, 94, 0.08)",
      stroke: "#f43f5e",
      text: isDark ? "#fecdd3" : "#be123c",
    },
    selected: {
      fill: isDark ? "rgba(99, 102, 241, 0.35)" : "rgba(99, 102, 241, 0.15)",
      stroke: "#6366f1",
      text: isDark ? "#c7d2fe" : "#4338ca",
    },
    disabled: {
      fill: isDark ? "rgba(71, 85, 105, 0.05)" : "rgba(148, 163, 184, 0.08)",
      stroke: isDark ? "#475569" : "#94a3b8",
      text: isDark ? "#94a3b8" : "#475569",
    },
  };

  return (
    <div className="bg-slate-100/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-4 flex items-center justify-center shadow-xl w-full">
      <div className="overflow-auto w-full max-w-full flex justify-start md:justify-center">
        <Stage width={width} height={height}>
          <Layer>
          {slots.map((slot) => {
            const isSelected = slot.id === selectedSlotId && !slot.disabled;
            const stateTheme = slot.disabled 
              ? colors.disabled 
              : isSelected 
                ? colors.selected 
                : colors[slot.status];

            const slotW = slot.width || DEFAULT_SLOT_WIDTH;
            const slotH = slot.height || DEFAULT_SLOT_HEIGHT;

            const handleInteraction = () => {
              if (onSlotSelect && !slot.disabled) {
                onSlotSelect(slot.id);
              }
            };

            return (
              <React.Fragment key={slot.id}>
                <Rect
                  x={slot.x}
                  y={slot.y}
                  width={slotW}
                  height={slotH}
                  fill={stateTheme.fill}
                  stroke={stateTheme.stroke}
                  strokeWidth={isSelected ? 3 : 1.5}
                  cornerRadius={6}
                  onClick={handleInteraction}
                  onTap={handleInteraction}
                  onMouseEnter={(e) => {
                    const stage = e.target.getStage();
                    if (stage) {
                      stage.container().style.cursor = slot.disabled ? "not-allowed" : "pointer";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const stage = e.target.getStage();
                    if (stage) {
                      stage.container().style.cursor = "default";
                    }
                  }}
                />
                <Text
                  x={slot.x}
                  y={slot.y + (slotH / 2) - 10}
                  width={slotW}
                  text={slot.id}
                  fontSize={14}
                  fontFamily="monospace"
                  fontStyle="bold"
                  fill={stateTheme.text}
                  align="center"
                  listening={false}
                />
                <Rect
                  x={slot.x + slotW / 2 - 4}
                  y={slot.y + 10}
                  width={8}
                  height={8}
                  fill={stateTheme.stroke}
                  cornerRadius={4}
                  listening={false}
                />
              </React.Fragment>
            );
          })}
        </Layer>
      </Stage>
      </div>
    </div>
  );
});

ParkingMap.displayName = "ParkingMap";
