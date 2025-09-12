import { Button } from "@/components/ui/button";

interface TimeRangeButtonsProps {
  selectedRange: string;
  onChange: (range: string) => void;
}

export function TimeRangeButtons({ selectedRange, onChange }: TimeRangeButtonsProps) {
  const ranges = ["7D", "28D", "3M", "1Y", "Max"];
  
  return (
    <div className="flex space-x-2">
      {ranges.map((range) => (
        <Button
          key={range}
          variant={selectedRange === range ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(range)}
          disabled={!["7D", "28D", "Max"].includes(range)}
          title={
            !["7D", "28D", "Max"].includes(range) ? "Data not available" : ""
          }
        >
          {range}
        </Button>
      ))}
    </div>
  );
}
