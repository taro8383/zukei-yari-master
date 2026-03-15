import { Lightbulb, BookOpen, Rocket, Star } from 'lucide-react';

interface AreaExplanationCardProps {
  info: {
    id?: string;
    icon: string;
    label: string;
    labelEn: string;
    goal: string;
    goalEn: string;
    method: string;
    methodEn: string;
    realLife: string;
    realLifeEn: string;
    benefit: string;
    benefitEn: string;
  };
}

const AreaExplanationCard = ({ info }: AreaExplanationCardProps) => {
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

      {/* Calculating Area Visual Example */}
      {info.id === 'calculating-area' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 面積の計算の例 / Area Calculation Example
          </p>
          <div className="bg-kid-blue/10 rounded-xl p-4 border border-kid-blue/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rectangle Example */}
              <div className="bg-background rounded-lg p-3 border border-border">
                <p className="text-sm font-bold text-center text-foreground mb-3">
                  長方形 / Rectangle
                </p>
                <svg width="200" height="150" className="mx-auto">
                  {/* Rectangle */}
                  <rect x="20" y="20" width="160" height="100" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2" />
                  {/* Width label */}
                  <text x="100" y="140" textAnchor="middle" fontSize="14" fill="#374151">8 cm</text>
                  {/* Height label */}
                  <text x="10" y="75" textAnchor="middle" fontSize="14" fill="#374151">5 cm</text>
                  {/* Grid lines */}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`v-${i}`} x1={20 + i * 20} y1="20" x2={20 + i * 20} y2="120" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4" />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={`h-${i}`} x1="20" y1={20 + i * 20} x2="180" y2={20 + i * 20} stroke="#93c5fd" strokeWidth="1" strokeDasharray="4" />
                  ))}
                </svg>
                <div className="mt-2 text-center">
                  <p className="text-sm text-foreground">たて 5cm × よこ 8cm</p>
                  <p className="text-xs text-muted-foreground">Height 5cm × Width 8cm</p>
                  <p className="text-lg font-bold text-kid-green mt-1">= 40 cm²</p>
                </div>
              </div>

              {/* Square Example */}
              <div className="bg-background rounded-lg p-3 border border-border">
                <p className="text-sm font-bold text-center text-foreground mb-3">
                  正方形 / Square
                </p>
                <svg width="150" height="150" className="mx-auto">
                  {/* Square */}
                  <rect x="25" y="25" width="100" height="100" fill="#a78bfa" stroke="#8b5cf6" strokeWidth="2" />
                  {/* Side label */}
                  <text x="75" y="145" textAnchor="middle" fontSize="14" fill="#374151">6 cm</text>
                  <text x="15" y="80" textAnchor="middle" fontSize="14" fill="#374151">6 cm</text>
                  {/* Grid lines */}
                  {Array.from({ length: 7 }).map((_, i) => (
                    <line key={`v-${i}`} x1={25 + i * 16.67} y1="25" x2={25 + i * 16.67} y2="125" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="4" />
                  ))}
                  {Array.from({ length: 7 }).map((_, i) => (
                    <line key={`h-${i}`} x1="25" y1={25 + i * 16.67} x2="125" y2={25 + i * 16.67} stroke="#c4b5fd" strokeWidth="1" strokeDasharray="4" />
                  ))}
                </svg>
                <div className="mt-2 text-center">
                  <p className="text-sm text-foreground">一辺 6cm × 6cm</p>
                  <p className="text-xs text-muted-foreground">Side 6cm × 6cm</p>
                  <p className="text-lg font-bold text-kid-green mt-1">= 36 cm²</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Large Area Units Visual Example */}
      {info.id === 'large-area-units' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 大きな面積の単位 / Large Area Units
          </p>
          <div className="bg-kid-green/10 rounded-xl p-4 border border-kid-green/30">
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-bold text-center text-foreground mb-4">
                単位の関係 / Unit Relationships
              </p>

              {/* Unit hierarchy visualization */}
              <div className="flex flex-col items-center gap-2">
                {/* m² */}
                <div className="w-full max-w-xs">
                  <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-blue-700">1 m²</p>
                    <p className="text-xs text-blue-600">平方メートル / Square meter</p>
                    <p className="text-xs text-muted-foreground"> Tatami about 0.5 mats</p>
                  </div>
                  <div className="text-center text-2xl">↓ ×100</div>
                </div>

                {/* a (are) */}
                <div className="w-full max-w-sm">
                  <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-green-700">1 a (アール) = 100 m²</p>
                    <p className="text-xs text-green-600">Are</p>
                    <p className="text-xs text-muted-foreground">School classroom about 2 rooms</p>
                  </div>
                  <div className="text-center text-2xl">↓ ×100</div>
                </div>

                {/* ha (hectare) */}
                <div className="w-full max-w-md">
                  <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-yellow-700">1 ha (ヘクタール) = 100 a = 10,000 m²</p>
                    <p className="text-xs text-yellow-600">Hectare</p>
                    <p className="text-xs text-muted-foreground">Tokyo Dome about 2.1 times</p>
                  </div>
                  <div className="text-center text-2xl">↓ ×100</div>
                </div>

                {/* km² */}
                <div className="w-full">
                  <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-purple-700">1 km² = 100 ha = 1,000,000 m²</p>
                    <p className="text-xs text-purple-600">Square kilometer</p>
                    <p className="text-xs text-muted-foreground">About 20 Tokyo Domes</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-kid-yellow/20 rounded-lg p-3 border border-kid-yellow/40">
                <p className="text-sm font-bold text-center text-foreground">
                  💡 覚え方 / Memory Tip
                </p>
                <p className="text-center text-foreground">
                  <span className="font-bold text-kid-purple">100倍</span>ずつ大きくなる！
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  Each step is <span className="font-bold">×100</span> larger!
                </p>
                <p className="text-center text-foreground mt-1">
                  m² → a → ha → km²
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Choosing Units Visual Example */}
      {info.id === 'choosing-units' && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center font-bold text-foreground mb-4">
            📖 ぴったりな単位の選び方 / How to Choose the Right Unit
          </p>
          <div className="bg-kid-purple/10 rounded-xl p-4 border border-kid-purple/30">
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-bold text-center text-foreground mb-4">
                ものの大きさと単位 / Object Size and Units
              </p>

              <div className="space-y-3">
                {/* cm² - Small items */}
                <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
                  <div className="w-16 h-16 bg-blue-200 rounded flex items-center justify-center text-2xl">✏️</div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">cm²（平方センチメートル）</p>
                    <p className="text-xs text-muted-foreground">Square centimeters</p>
                    <p className="text-sm text-foreground">消しゴム、ポストカード、スマホ画面</p>
                    <p className="text-xs text-muted-foreground">Eraser, postcard, smartphone screen</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">📱</div>
                </div>

                {/* m² - Rooms */}
                <div className="flex items-center gap-3 bg-green-50 rounded-lg p-3">
                  <div className="w-16 h-16 bg-green-200 rounded flex items-center justify-center text-2xl">🏠</div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">m²（平方メートル）</p>
                    <p className="text-xs text-muted-foreground">Square meters</p>
                    <p className="text-sm text-foreground">部屋の床、マット、絨毯</p>
                    <p className="text-xs text-muted-foreground">Room floor, mat, carpet</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">🛏️</div>
                </div>

                {/* a - School grounds */}
                <div className="flex items-center gap-3 bg-yellow-50 rounded-lg p-3">
                  <div className="w-16 h-16 bg-yellow-200 rounded flex items-center justify-center text-2xl">🏫</div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">a（アール）</p>
                    <p className="text-xs text-muted-foreground">Ares</p>
                    <p className="text-sm text-foreground">学校のグラウンド、サッカー場</p>
                    <p className="text-xs text-muted-foreground">School ground, soccer field</p>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">⚽</div>
                </div>

                {/* ha - Farms */}
                <div className="flex items-center gap-3 bg-orange-50 rounded-lg p-3">
                  <div className="w-16 h-16 bg-orange-200 rounded flex items-center justify-center text-2xl">🌾</div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">ha（ヘクタール）</p>
                    <p className="text-xs text-muted-foreground">Hectares</p>
                    <p className="text-sm text-foreground">農場、大きな公園、東京ドーム</p>
                    <p className="text-xs text-muted-foreground">Farm, large park, Tokyo Dome</p>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">🏟️</div>
                </div>

                {/* km² - Cities/Countries */}
                <div className="flex items-center gap-3 bg-purple-50 rounded-lg p-3">
                  <div className="w-16 h-16 bg-purple-200 rounded flex items-center justify-center text-2xl">🗾</div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">km²（平方キロメートル）</p>
                    <p className="text-xs text-muted-foreground">Square kilometers</p>
                    <p className="text-sm text-foreground">町、県、国、海の広さ</p>
                    <p className="text-xs text-muted-foreground">City, prefecture, country, ocean</p>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">🌊</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Composite Shapes Visual Example */}
      {info.id === 'composite-shapes' && (
        <>
          {/* C-Shape Example */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center font-bold text-foreground mb-4">
              📖 Cの字の形の面積 / Area of C-Shapes
            </p>
            <div className="bg-kid-orange/10 rounded-xl p-4 border border-kid-orange/30">
              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-sm font-bold text-center text-foreground mb-4">
                  大きい形から切り取った部分を引く / Subtract the cutout from the large shape
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* C-Shape Diagram */}
                  <div>
                    <p className="text-sm font-bold text-center text-kid-blue mb-2">
                      Cの字の形 / C-Shape
                    </p>
                    <svg width="220" height="180" className="mx-auto border rounded-lg bg-white">
                      {/* C-shape: outer rect with right-side cutout */}
                      {/* Outer rectangle */}
                      <rect x="30" y="30" width="160" height="120" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" />
                      {/* Actual C-shape (filled) */}
                      <path
                        d="M 30 30 L 190 30 L 190 60 L 110 60 L 110 120 L 190 120 L 190 150 L 30 150 Z"
                        fill="#60a5fa"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      {/* Cutout area (white) */}
                      <rect x="110" y="60" width="80" height="60" fill="white" stroke="#ef4444" strokeWidth="2" />

                      {/* Dimension labels */}
                      <text x="110" y="20" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">8cm</text>
                      <text x="20" y="90" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">9cm</text>
                      <text x="150" y="95" textAnchor="middle" fontSize="12" fill="#ef4444">切り取る</text>
                      <text x="150" y="108" textAnchor="middle" fontSize="10" fill="#ef4444">Cut out</text>
                    </svg>
                    <div className="mt-2 text-center text-sm">
                      <p className="text-foreground">大きい長方形: 8 × 9 = <span className="font-bold text-gray-600">72 cm²</span></p>
                      <p className="text-foreground">切り取る部分: 4 × 4 = <span className="font-bold text-red-500">16 cm²</span></p>
                      <p className="text-foreground">答え: 72 - 16 = <span className="font-bold text-kid-green">56 cm²</span></p>
                    </div>
                  </div>

                  {/* Method Explanation */}
                  <div className="flex flex-col justify-center">
                    <div className="bg-kid-yellow/20 rounded-lg p-4 border border-kid-yellow/40">
                      <p className="text-sm font-bold text-center text-foreground mb-3">
                        💡 計算のしかた / How to Calculate
                      </p>
                      <ol className="space-y-2 text-sm text-foreground">
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-kid-blue">1.</span>
                          <span>まず大きい長方形の面積を出す<br/><span className="text-xs text-muted-foreground">First, find the area of the large rectangle</span></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-kid-purple">2.</span>
                          <span>次に切り取った部分の面積を出す<br/><span className="text-xs text-muted-foreground">Next, find the area of the cutout part</span></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold text-kid-green">3.</span>
                          <span>大きい方から小さい方を引く！<br/><span className="text-xs text-muted-foreground">Subtract the smaller from the larger!</span></span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* L-Shape Example */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center font-bold text-foreground mb-4">
              📖 L字の形の面積 / Area of L-Shapes
            </p>
            <div className="bg-kid-yellow/10 rounded-xl p-4 border border-kid-yellow/30">
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm font-bold text-center text-foreground mb-4">
                2つの方法で計算 / Calculate in 2 Ways
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Method 1: Split and Add */}
                <div>
                  <p className="text-sm font-bold text-center text-kid-blue mb-2">
                    方法1：分けてたし算 / Method 1: Split and Add
                  </p>
                  <svg width="220" height="220" className="mx-auto border rounded-lg bg-white">
                    {/* L-shape visualization */}
                    {/* Rectangle A (left/vertical part) */}
                    <rect x="20" y="20" width="80" height="180" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2" />
                    {/* Rectangle B (bottom/right part) */}
                    <rect x="100" y="140" width="100" height="60" fill="#a78bfa" stroke="#8b5cf6" strokeWidth="2" />

                    {/* Dimension labels - show actual rectangle dimensions */}
                    {/* Rectangle A width */}
                    <text x="60" y="15" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">4cm</text>
                    {/* Rectangle A height */}
                    <text x="10" y="110" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">9cm</text>
                    {/* Rectangle B width */}
                    <text x="150" y="215" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">5cm</text>
                    {/* Rectangle B height */}
                    <text x="210" y="170" textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">3cm</text>

                    {/* Rectangle labels */}
                    <text x="60" y="110" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">A</text>
                    <text x="150" y="170" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">B</text>
                  </svg>
                  <div className="mt-2 text-center text-sm">
                    <p className="text-foreground">A: 4 × 9 = <span className="font-bold text-kid-blue">36 cm²</span></p>
                    <p className="text-foreground">B: 5 × 3 = <span className="font-bold text-kid-blue">15 cm²</span></p>
                    <p className="text-foreground">合計: 36 + 15 = <span className="font-bold text-kid-green">51 cm²</span></p>
                  </div>
                </div>

                {/* Method 2: Subtract */}
                <div>
                  <p className="text-sm font-bold text-center text-kid-purple mb-2">
                    方法2：大きい形から引く / Method 2: Subtract
                  </p>
                  <svg width="220" height="220" className="mx-auto border rounded-lg bg-white">
                    {/* Outer rectangle (dashed) */}
                    <rect x="20" y="20" width="180" height="180" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" />
                    {/* Cutout */}
                    <rect x="100" y="20" width="100" height="120" fill="white" stroke="#ef4444" strokeWidth="2" />

                    {/* Labels */}
                    <text x="110" y="15" textAnchor="middle" fontSize="12" fill="#374151">5cm</text>
                    <text x="200" y="15" textAnchor="middle" fontSize="12" fill="#374151">4cm</text>
                    <text x="15" y="110" textAnchor="middle" fontSize="12" fill="#374151">9cm</text>
                    <text x="15" y="200" textAnchor="middle" fontSize="12" fill="#374151">9cm</text>
                    <text x="150" y="85" textAnchor="middle" fontSize="14" fill="#ef4444" fontWeight="bold">切り取る</text>
                    <text x="150" y="100" textAnchor="middle" fontSize="10" fill="#ef4444">Cut out</text>
                  </svg>
                  <div className="mt-2 text-center text-sm">
                    <p className="text-foreground">大きい形: 9 × 9 = <span className="font-bold text-gray-600">81 cm²</span></p>
                    <p className="text-foreground">切り取る: 5 × 6 = <span className="font-bold text-red-500">30 cm²</span></p>
                    <p className="text-foreground">答え: 81 - 30 = <span className="font-bold text-kid-green">51 cm²</span></p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-kid-green/20 rounded-lg p-3 border border-kid-green/40">
                <p className="text-sm font-bold text-center text-foreground">
                  ✅ 2つの方法で答えが同じ！
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  Both methods give the same answer!
                </p>
              </div>
            </div>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AreaExplanationCard;
