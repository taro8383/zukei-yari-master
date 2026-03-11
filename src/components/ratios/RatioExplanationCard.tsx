import { RatioTopicInfo } from '@/lib/ratios';
import { Lightbulb, Target, Calculator, Gamepad2 } from 'lucide-react';

interface RatioExplanationCardProps {
  info: RatioTopicInfo;
}

const RatioExplanationCard = ({ info }: RatioExplanationCardProps) => {
  return (
    <div className="bg-card rounded-2xl shadow-kid p-5 mb-6 border-2 border-primary/20">
      <h3 className="text-xl font-black mb-4 flex items-center gap-2">
        <span className="text-2xl">{info.icon}</span>
        <span>{info.label}</span>
        <span className="text-sm font-normal text-muted-foreground">/ {info.labelEn}</span>
      </h3>

      <div className="space-y-4">
        {/* Goal Section */}
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-kid-blue/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-kid-blue" />
          </div>
          <div>
            <p className="font-bold text-foreground">めあて / Goal:</p>
            <p className="text-foreground">{info.goal}</p>
            <p className="text-sm text-muted-foreground mt-1">{info.goalEn}</p>
          </div>
        </div>

        {/* Method Section */}
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-kid-orange/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-kid-orange" />
          </div>
          <div>
            <p className="font-bold text-foreground">やりかた / How it Works:</p>
            <p className="text-foreground font-mono bg-muted px-2 py-1 rounded inline-block mt-1">
              {info.method}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{info.methodEn}</p>
          </div>
        </div>

        {/* Real Life Section */}
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-kid-green/20 flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-kid-green" />
          </div>
          <div>
            <p className="font-bold text-foreground">生活の中でのつかいみち / Real-Life Example:</p>
            <p className="text-foreground">{info.realLife}</p>
            <p className="text-sm text-muted-foreground mt-1">{info.realLifeEn}</p>
          </div>
        </div>
      </div>

      {/* Visual Formula Summary */}
      <div className="mt-5 pt-4 border-t border-border">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex flex-col items-center bg-primary/10 rounded-lg px-4 py-2">
            <span className="text-xs text-muted-foreground">くらべる数</span>
            <span className="font-bold">Compared</span>
          </div>
          <span className="text-2xl">÷</span>
          <div className="flex flex-col items-center bg-muted rounded-lg px-4 py-2">
            <span className="text-xs text-muted-foreground">もとにする数</span>
            <span className="font-bold">Base</span>
          </div>
          <span className="text-2xl">=</span>
          <div className="flex flex-col items-center bg-accent/20 rounded-lg px-4 py-2">
            <span className="text-xs text-muted-foreground">倍（割合）</span>
            <span className="font-bold text-accent">Ratio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatioExplanationCard;
