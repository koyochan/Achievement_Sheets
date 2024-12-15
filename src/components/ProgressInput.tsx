import React from "react"
import { Slider } from "@/components/ui/slider"

interface ProgressInputProps {
  id: string
  name: string
  value: number
  onChange: (value: number) => void
}

export const ProgressInput: React.FC<ProgressInputProps> = ({ id, name, value, onChange }) => {
  return (
    <div className="space-y-2">
      <Slider
        id={id}
        name={name}
        min={0}
        max={100}
        step={1}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        className="slider w-full" // カスタムクラス名を指定
      />
      <div className="text-sm text-gray-500 text-right">{value}%</div>
      <style>{`
        .slider {
          --slider-track-bg: #d1d5db; /* トラックの背景色 (gray-300) */
          --slider-progress-bg: #6b7280; /* プログレスバーの色 (gray-500) */
          --slider-thumb-bg: #4b5563; /* つまみの色 (gray-600) */
        }
        .slider .slider-thumb {
          background-color: var(--slider-thumb-bg);
        }
        .slider .slider-track {
          background-color: var(--slider-track-bg);
        }
        .slider .slider-progress {
          background-color: var(--slider-progress-bg);
        }
      `}</style>
    </div>
  )
}