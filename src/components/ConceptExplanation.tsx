import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ConceptExplanationProps {
  concept: 'perimeter' | 'adjacent-angle' | 'vertical-angle' | 'parallel-lines' | 'diagonal' | 'area';
}

const conceptData: Record<string, { title: string; titleEn: string; content: string; contentEn: string; formula?: string }> = {
  perimeter: {
    title: '周の長さ（まわりの長さ）',
    titleEn: 'Perimeter',
    content: '図形の外側を一周する長さです。すべての辺の長さを足し算すると求められます。',
    contentEn: 'The total length around the outside of a shape. Add up all side lengths to find it.',
    formula: '周の長さ = 辺1 + 辺2 + 辺3 + ...',
  },
  'adjacent-angle': {
    title: 'となり合う角（隣接角）',
    titleEn: 'Adjacent Angle',
    content: '直線上で隣り合う2つの角です。2つの角を足すと180度になります。',
    contentEn: 'Two angles next to each other on a straight line. They add up to 180°.',
    formula: '角A + 角B = 180°',
  },
  'vertical-angle': {
    title: '対頂角',
    titleEn: 'Vertical Angle',
    content: '2本の直線が交わったとき、向かい合う角です。対頂角は常に等しい大きさです。',
    contentEn: 'Opposite angles formed when two lines cross. Vertical angles are always equal.',
    formula: '角A = 角C, 角B = 角D',
  },
  'parallel-lines': {
    title: '平行線',
    titleEn: 'Parallel Lines',
    content: 'どこまで延長しても交わらない2本の直線です。同じ方向を向いています。',
    contentEn: 'Two lines that never meet, no matter how far extended. They point in the same direction.',
  },
  diagonal: {
    title: '対角線',
    titleEn: 'Diagonal',
    content: '多角形の中で、隣り合わない頂点を結ぶ線です。四角形には2本の対角線があります。',
    contentEn: 'A line connecting non-adjacent vertices inside a polygon. A quadrilateral has 2 diagonals.',
  },
  area: {
    title: '面積',
    titleEn: 'Area',
    content: '図形の中にある空間の大きさです。長方形は「たて×よこ」で求められます。',
    contentEn: 'The amount of space inside a shape. For a rectangle: length × width.',
    formula: '面積 = たて × よこ',
  },
};

const ConceptExplanation = ({ concept }: ConceptExplanationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const data = conceptData[concept];

  if (!data) return null;

  return (
    <div className="bg-kid-blue/10 border border-kid-blue/30 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-kid-blue/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <div>
            <p className="font-bold text-sm">{data.title}</p>
            <p className="text-xs text-muted-foreground">{data.titleEn}</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-kid-blue" />
        ) : (
          <ChevronDown className="w-5 h-5 text-kid-blue" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-2 border-t border-kid-blue/20">
          <p className="text-sm mb-1">{data.content}</p>
          <p className="text-xs text-muted-foreground mb-2">{data.contentEn}</p>
          {data.formula && (
            <div className="bg-background/80 rounded-lg px-3 py-2 mt-2">
              <p className="font-mono text-sm font-bold text-primary">{data.formula}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConceptExplanation;
