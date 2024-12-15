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
      />
      <div className="text-sm text-gray-500 text-right">{value}%</div>
    </div>
  )
}

