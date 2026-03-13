import { FractionTopicInfo } from '@/lib/fractions';
import { Lightbulb, BookOpen, Rocket, Star } from 'lucide-react';

interface FractionsExplanationCardProps {
  info: FractionTopicInfo;
}

const FractionsExplanationCard = ({ info }: FractionsExplanationCardProps) => {
  const sections = [
    { icon: <Star className="w-5 h-5" />, title: 'めあて', titleEn: 'Goal', content: info.goal, contentEn: info.goalEn, color: 'bg-kid-yellow/20 border-kid-yellow/40' },
    { icon: <BookOpen className="w-5 h-5" />, title: 'やりかた', titleEn: 'How it Works', content: info.method, contentEn: info.methodEn, color: 'bg-primary/10 border-primary/30' },
    { icon: <Rocket className="w-5 h-5" />, title: '生活の中でのつかいみち', titleEn: 'Real-Life Use', content: info.realLife, contentEn: info.realLifeEn, color: 'bg-kid-green/20 border-kid-green/40' },
    { icon: <Lightbulb className="w-5 h-5" />, title: 'できるようになると...', titleEn: 'Benefits', content: info.benefit, contentEn: info.benefitEn, color: 'bg-kid-purple/20 border-kid-purple/40' },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-kid p-6 mb-8 border border-border">
      <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
        <span className="text-3xl">{info.icon}</span>
        {info.label}
      </h2>
      <p className="text-sm text-muted-foreground mb-4 ml-11">{info.labelEn}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((s) => (
          <div key={s.title} className={`rounded-xl border p-4 ${s.color}`}>
            <div className="flex items-center gap-2 font-bold mb-1 text-foreground">
              {s.icon}
              {s.title}
            </div>
            <p className="text-xs text-muted-foreground mb-2">{s.titleEn}</p>
            <p className="text-sm leading-relaxed text-foreground/80">{s.content}</p>
            <p className="text-xs leading-relaxed text-muted-foreground mt-1">{s.contentEn}</p>
          </div>
        ))}
      </div>

      {/* Fraction Types Visual Example */}
      {info.id === 'fraction-types' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 分数の種類の例 / Examples of Fraction Types
          </p>
          <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Proper Fraction */}
              <div className="bg-background rounded-lg p-3 border border-border text-center">
                <p className="text-lg font-bold text-kid-blue mb-2">3/5</p>
                <p className="text-sm font-medium text-foreground">真分数 / Proper</p>
                <p className="text-xs text-muted-foreground">分子(3) &lt; 分母(5)</p>
                <p className="text-xs text-muted-foreground">1より小さい</p>
              </div>
              {/* Improper Fraction */}
              <div className="bg-background rounded-lg p-3 border border-border text-center">
                <p className="text-lg font-bold text-kid-purple mb-2">7/5</p>
                <p className="text-sm font-medium text-foreground">仮分数 / Improper</p>
                <p className="text-xs text-muted-foreground">分子(7) ≧ 分母(5)</p>
                <p className="text-xs text-muted-foreground">1以上</p>
              </div>
              {/* Mixed Number */}
              <div className="bg-background rounded-lg p-3 border border-border text-center">
                <p className="text-lg font-bold text-kid-green mb-2">1と2/5</p>
                <p className="text-sm font-medium text-foreground">帯分数 / Mixed</p>
                <p className="text-xs text-muted-foreground">整数 + 分数</p>
                <p className="text-xs text-muted-foreground">1 + 2/5</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Converting Fractions Visual Example */}
      {info.id === 'converting-fractions' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 分数の変換の例 / Converting Fractions Example
          </p>
          <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-bold text-center text-foreground mb-4">
                仮分数 → 帯分数 / Improper → Mixed
              </p>
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-kid-purple">7/5</p>
                    <p className="text-xs text-muted-foreground">仮分数</p>
                  </div>
                  <span className="text-2xl">→</span>
                  <div className="text-center">
                    <p className="text-sm text-foreground">7 ÷ 5 = 1 あまり 2</p>
                    <p className="text-xs text-muted-foreground">7 ÷ 5 = 1 remainder 2</p>
                  </div>
                </div>
                <div className="w-full h-px bg-border"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-kid-green">1と2/5</p>
                  <p className="text-xs text-muted-foreground">帯分数 / Mixed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Adding Fractions Visual Example */}
      {info.id === 'adding-fractions' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 分数のたし算の例 / Adding Fractions Example
          </p>
          <div className="bg-kid-green/10 rounded-xl p-4 border border-kid-green/30">
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-bold text-center text-foreground mb-4">
                分母が同じとき / When denominators are the same
              </p>
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-kid-blue">2/7</span>
                  <span className="text-xl">+</span>
                  <span className="text-xl font-bold text-kid-blue">3/7</span>
                  <span className="text-xl">=</span>
                  <span className="text-xl font-bold text-kid-green">?</span>
                </div>
                <div className="bg-kid-yellow/20 rounded-lg p-3 border border-kid-yellow/40 w-full">
                  <p className="text-sm text-center text-foreground">
                    <span className="font-bold">分母はそのまま</span> / Denominator stays same
                  </p>
                  <p className="text-sm text-center text-foreground">
                    <span className="font-bold">分子だけたし算</span> / Add numerators only
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-kid-green">5/7</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  (2 + 3 = 5, 分母は7のまま / 2 + 3 = 5, denominator stays 7)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtracting Fractions Visual Example */}
      {info.id === 'subtracting-fractions' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 分数のひき算の例 / Subtracting Fractions Example
          </p>
          <div className="bg-kid-yellow/10 rounded-xl p-4 border border-kid-yellow/30">
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-bold text-center text-foreground mb-4">
                くり下げと約分の例 / Borrowing & Simplifying Example
              </p>
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-kid-blue">2と3/10</span>
                  <span className="text-xl">-</span>
                  <span className="text-xl font-bold text-kid-blue">7/10</span>
                  <span className="text-xl">=</span>
                  <span className="text-xl font-bold text-kid-green">?</span>
                </div>
                <div className="bg-kid-purple/20 rounded-lg p-3 border border-kid-purple/40 w-full">
                  <p className="text-sm font-bold text-center text-foreground mb-2">
                    Step 1: 整数をくずす / Break down the whole
                  </p>
                  <p className="text-center text-foreground">
                    2と3/10 = 23/10 → 23/10 - 7/10 = <span className="font-bold text-kid-purple">16/10</span>
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    1 = 10/10 だから、2 = 20/10 / Because 1 = 10/10, so 2 = 20/10
                  </p>
                </div>
                <div className="bg-kid-green/20 rounded-lg p-3 border border-kid-green/40 w-full">
                  <p className="text-sm font-bold text-center text-foreground mb-2">
                    Step 2: 約分する / Simplify the fraction
                  </p>
                  <p className="text-xs text-center text-muted-foreground mb-2">
                    16/10 は大きすぎる！約分しよう / 16/10 is too big! Let's simplify.
                  </p>

                  <div className="bg-white rounded-lg p-2 mb-2">
                    <p className="text-xs font-bold text-center text-foreground mb-1">
                      約分のコツ / Simplification Tips:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center">
                        <span className="font-bold text-kid-purple">2</span> で割れる / Divisible by <span className="font-bold text-kid-purple">2</span>
                        <br />
                        <span className="text-muted-foreground">偶数（0,2,4,6,8）/ Even (ends in 0,2,4,6,8)</span>
                      </div>
                      <div className="text-center">
                        <span className="font-bold text-kid-purple">3</span> で割れる / Divisible by <span className="font-bold text-kid-purple">3</span>
                        <br />
                        <span className="text-muted-foreground">各桁の和が3で割れる / Sum of digits divisible by 3</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-foreground">
                    16 と 10 は<span className="font-bold text-kid-green">偶数</span> → <span className="text-kid-green font-bold">2</span> で割る
                  </p>
                  <p className="text-xs text-center text-muted-foreground mb-2">
                    16 and 10 are <span className="font-bold">even</span> → divide by <span className="font-bold">2</span>
                  </p>
                  <p className="text-center text-foreground">
                    16 <span className="text-kid-green font-bold">÷ 2</span> = <span className="text-kid-green font-bold">8</span>
                  </p>
                  <p className="text-center text-foreground">
                    10 <span className="text-kid-green font-bold">÷ 2</span> = <span className="text-kid-green font-bold">5</span>
                  </p>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    8 は奇数、5 も奇数 → これ以上約分できない！
                  </p>
                  <p className="text-xs text-center text-muted-foreground">
                    8 and 5 are odd → can't simplify more!
                  </p>

                  <div className="mt-2 pt-2 border-t border-kid-green/30">
                    <p className="text-xs text-center text-foreground">
                      <span className="font-bold">例：21/12 の場合 / Example: 21/12</span>
                    </p>
                    <p className="text-xs text-center text-muted-foreground">
                      2+1=3, 1+2=3 → <span className="text-kid-purple font-bold">3</span> で割れる！ / Divisible by <span className="font-bold">3</span>!
                    </p>
                    <p className="text-xs text-center text-foreground">
                      21 ÷ 3 = 7, 12 ÷ 3 = 4 → <span className="font-bold">7/4</span>
                    </p>
                  </div>
                </div>
                <div className="bg-kid-yellow/20 rounded-lg p-2 border border-kid-yellow/40">
                  <p className="text-lg text-center text-foreground">
                    = <span className="font-bold text-kid-green">8/5</span>（または 1と3/5）
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    Final answer: simplified fraction 8/5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FractionsExplanationCard;
