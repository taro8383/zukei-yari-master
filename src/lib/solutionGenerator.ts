import { SolutionData, SolutionStep } from '@/components/SolutionModal';

// Interface for question data (matches existing question structure)
interface Question {
  id?: number;
  text: string;
  textEn: string;
  answer: number | string;
  unit?: string;
  explanation?: string;
  explanationEn?: string;
  topic?: string;
  subTopic?: string;
}

/**
 * Generate step-by-step solution for a multiplication problem
 * Example: 24 × 5 = ?
 * Steps: Break into 20×5 and 4×5, then add
 */
function generateMultiplicationSolution(question: Question, factors: number[]): SolutionStep[] {
  const [a, b] = factors;
  const tens = Math.floor(a / 10) * 10;
  const ones = a % 10;

  const steps: SolutionStep[] = [];

  // Step 1: Break into parts
  if (tens > 0 && ones > 0) {
    steps.push({
      stepNumber: 1,
      titleJa: '10のくらいと1のくらいにわける',
      titleEn: 'Break into tens and ones',
      explanationJa: `${a} を ${tens} と ${ones} にわけます`,
      explanationEn: `Break ${a} into ${tens} and ${ones}`,
      highlight: `${tens} + ${ones}`,
      visual: 'breakdown',
    });

    // Step 2: Multiply tens
    const tensProduct = tens * b;
    steps.push({
      stepNumber: 2,
      titleJa: '10のくらいをかける',
      titleEn: 'Multiply the tens',
      explanationJa: `${tens} × ${b} = ${tensProduct}`,
      explanationEn: `${tens} × ${b} = ${tensProduct}`,
      calculation: `${tens} × ${b} = ${tensProduct}`,
      visual: 'multiplication',
    });

    // Step 3: Multiply ones
    const onesProduct = ones * b;
    steps.push({
      stepNumber: 3,
      titleJa: '1のくらいをかける',
      titleEn: 'Multiply the ones',
      explanationJa: `${ones} × ${b} = ${onesProduct}`,
      explanationEn: `${ones} × ${b} = ${onesProduct}`,
      calculation: `${ones} × ${b} = ${onesProduct}`,
      visual: 'multiplication',
    });

    // Step 4: Add together
    const sum = tensProduct + onesProduct;
    steps.push({
      stepNumber: 4,
      titleJa: 'たして答えを出す',
      titleEn: 'Add to get the answer',
      explanationJa: `${tensProduct} + ${onesProduct} = ${sum}`,
      explanationEn: `${tensProduct} + ${onesProduct} = ${sum}`,
      calculation: `${tensProduct} + ${onesProduct} = ${sum}`,
      visual: 'addition',
    });
  } else {
    // Simple multiplication
    steps.push({
      stepNumber: 1,
      titleJa: 'かけ算をする',
      titleEn: 'Multiply',
      explanationJa: `${a} × ${b} = ${question.answer}`,
      explanationEn: `${a} × ${b} = ${question.answer}`,
      calculation: `${a} × ${b} = ${question.answer}`,
      visual: 'multiplication',
    });
  }

  return steps;
}

/**
 * Generate step-by-step solution for a division problem
 */
function generateDivisionSolution(question: Question, dividend: number, divisor: number): SolutionStep[] {
  const steps: SolutionStep[] = [];
  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  // Step 1: Set up the division
  steps.push({
    stepNumber: 1,
    titleJa: 'わり算のしきをたてる',
    titleEn: 'Set up the division',
    explanationJa: `${dividend} ÷ ${divisor} のけいさんをします`,
    explanationEn: `Calculate ${dividend} ÷ ${divisor}`,
    calculation: `${dividend} ÷ ${divisor}`,
    visual: 'division',
  });

  // Step 2: Find the quotient
  steps.push({
    stepNumber: 2,
    titleJa: 'しょうをもとめる',
    titleEn: 'Find the quotient',
    explanationJa: `${divisor} × ${quotient} = ${divisor * quotient} なので、しょうは ${quotient} です`,
    explanationEn: `${divisor} × ${quotient} = ${divisor * quotient}, so the quotient is ${quotient}`,
    calculation: `${divisor} × ${quotient} = ${divisor * quotient}`,
    visual: 'multiplication',
  });

  // Step 3: Find remainder if any
  if (remainder > 0) {
    steps.push({
      stepNumber: 3,
      titleJa: 'あまりをもとめる',
      titleEn: 'Find the remainder',
      explanationJa: `${dividend} - ${divisor * quotient} = ${remainder} があまりです`,
      explanationEn: `${dividend} - ${divisor * quotient} = ${remainder} is the remainder`,
      calculation: `${dividend} - ${divisor * quotient} = ${remainder}`,
      visual: 'addition',
    });
  }

  return steps;
}

/**
 * Generate step-by-step solution for area calculation
 */
function generateAreaSolution(question: Question, length: number, width: number): SolutionStep[] {
  const steps: SolutionStep[] = [];

  // Step 1: Identify formula
  steps.push({
    stepNumber: 1,
    titleJa: 'もんだいをよんでしきをきめる',
    titleEn: 'Read the problem and identify the formula',
    explanationJa: '長方形の面積 = たて × よこ',
    explanationEn: 'Rectangle area = length × width',
    calculation: '面積 = たて × よこ',
    visual: 'formula',
  });

  // Step 2: Substitute values
  steps.push({
    stepNumber: 2,
    titleJa: 'すうじをしきにあてはめる',
    titleEn: 'Substitute the numbers',
    explanationJa: `たて ${length}cm、よこ ${width}cm をしきにいれます`,
    explanationEn: `Substitute length ${length}cm and width ${width}cm`,
    calculation: `${length} × ${width}`,
    visual: 'formula',
  });

  // Step 3: Calculate
  const area = length * width;
  steps.push({
    stepNumber: 3,
    titleJa: 'かけ算をする',
    titleEn: 'Multiply',
    explanationJa: `${length} × ${width} = ${area}`,
    explanationEn: `${length} × ${width} = ${area}`,
    calculation: `${length} × ${width} = ${area}`,
    visual: 'multiplication',
  });

  return steps;
}

/**
 * Generate step-by-step solution for perimeter calculation
 */
function generatePerimeterSolution(question: Question, length: number, width: number): SolutionStep[] {
  const steps: SolutionStep[] = [];
  const perimeter = 2 * (length + width);

  // Step 1: Identify formula
  steps.push({
    stepNumber: 1,
    titleJa: 'しきをおぼえる',
    titleEn: 'Remember the formula',
    explanationJa: '長方形の周りの長さ = (たて + よこ) × 2',
    explanationEn: 'Rectangle perimeter = (length + width) × 2',
    calculation: '周りの長さ = (たて + よこ) × 2',
    visual: 'formula',
  });

  // Step 2: Substitute
  steps.push({
    stepNumber: 2,
    titleJa: 'すうじをしきにいれる',
    titleEn: 'Substitute values',
    explanationJa: `(${length} + ${width}) × 2`,
    explanationEn: `(${length} + ${width}) × 2`,
    calculation: `(${length} + ${width}) × 2`,
    visual: 'formula',
  });

  // Step 3: Calculate inside parentheses
  const sum = length + width;
  steps.push({
    stepNumber: 3,
    titleJa: '( )の中をけいさんする',
    titleEn: 'Calculate inside parentheses',
    explanationJa: `${length} + ${width} = ${sum}`,
    explanationEn: `${length} + ${width} = ${sum}`,
    calculation: `${length} + ${width} = ${sum}`,
    visual: 'addition',
  });

  // Step 4: Final multiplication
  steps.push({
    stepNumber: 4,
    titleJa: 'かけ算をする',
    titleEn: 'Multiply',
    explanationJa: `${sum} × 2 = ${perimeter}`,
    explanationEn: `${sum} × 2 = ${perimeter}`,
    calculation: `${sum} × 2 = ${perimeter}`,
    visual: 'multiplication',
  });

  return steps;
}

/**
 * Generate step-by-step solution for angle calculation
 */
function generateAngleSolution(question: Question, knownAngles: number[], totalAngle: number = 180): SolutionStep[] {
  const steps: SolutionStep[] = [];
  const knownSum = knownAngles.reduce((a, b) => a + b, 0);
  const answer = totalAngle - knownSum;

  // Step 1: Identify the rule
  steps.push({
    stepNumber: 1,
    titleJa: 'かくのきまりをおぼえる',
    titleEn: 'Remember the angle rule',
    explanationJa: `三角形の内角の和は ${totalAngle}° です`,
    explanationEn: `The sum of angles in a triangle is ${totalAngle}°`,
    calculation: `∠A + ∠B + ∠C = ${totalAngle}°`,
    visual: 'geometry',
  });

  // Step 2: Add known angles
  if (knownAngles.length > 1) {
    const knownStr = knownAngles.join('° + ');
    steps.push({
      stepNumber: 2,
      titleJa: 'わかっているかくをたす',
      titleEn: 'Add the known angles',
      explanationJa: `わかっているかくをたします: ${knownStr}°`,
      explanationEn: `Add the known angles: ${knownStr}°`,
      calculation: `${knownStr}° = ${knownSum}°`,
      visual: 'addition',
    });
  }

  // Step 3: Subtract from total
  steps.push({
    stepNumber: 3,
    titleJa: `${totalAngle}° からひく`,
    titleEn: `Subtract from ${totalAngle}°`,
    explanationJa: `${totalAngle}° - ${knownSum}° = ${answer}°`,
    explanationEn: `${totalAngle}° - ${knownSum}° = ${answer}°`,
    calculation: `${totalAngle} - ${knownSum} = ${answer}`,
    visual: 'addition',
  });

  return steps;
}

/**
 * Generate step-by-step solution for decimal operations
 */
function generateDecimalSolution(question: Question, operation: 'add' | 'subtract' | 'multiply', numbers: number[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  if (operation === 'add' || operation === 'subtract') {
    const [a, b] = numbers;
    const result = operation === 'add' ? a + b : a - b;
    const opSymbol = operation === 'add' ? '+' : '-';
    const opNameJa = operation === 'add' ? 'たし算' : 'ひき算';
    const opNameEn = operation === 'add' ? 'Addition' : 'Subtraction';

    // Step 1: Align decimals
    steps.push({
      stepNumber: 1,
      titleJa: '小数点をそろえる',
      titleEn: 'Align the decimal points',
      explanationJa: 'たてぞろえをして、小数点のばしょをそろえます',
      explanationEn: 'Write vertically with decimal points aligned',
      calculation: `  ${a}\n${opSymbol} ${b}`,
      visual: 'formula',
    });

    // Step 2: Calculate
    steps.push({
      stepNumber: 2,
      titleJa: `${opNameJa}をする`,
      titleEn: `Perform ${opNameEn}`,
      explanationJa: `いつもの${opNameJa}とおなじようにけいさんします`,
      explanationEn: `Calculate as usual with ${opNameEn.toLowerCase()}`,
      calculation: `${a} ${opSymbol} ${b} = ${result}`,
      visual: 'addition',
    });

    // Step 3: Place decimal
    steps.push({
      stepNumber: 3,
      titleJa: '答えに小数点をうつ',
      titleEn: 'Place the decimal point',
      explanationJa: '答えにも小数点をうちます',
      explanationEn: 'Place the decimal point in the answer',
      calculation: `= ${result}`,
      visual: 'formula',
    });
  }

  return steps;
}

/**
 * Generate step-by-step solution for fraction operations
 */
function generateFractionSolution(question: Question, operation: string, fractions: { num: number; den: number }[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  if (fractions.length === 2) {
    const [f1, f2] = fractions;

    // Step 1: Find common denominator
    const lcd = f1.den * f2.den;
    steps.push({
      stepNumber: 1,
      titleJa: 'おなじ分母にそろえる',
      titleEn: 'Find a common denominator',
      explanationJa: `分母を ${f1.den} × ${f2.den} = ${lcd} にそろえます`,
      explanationEn: `Make both denominators ${f1.den} × ${f2.den} = ${lcd}`,
      calculation: `${f1.den} × ${f2.den} = ${lcd}`,
      visual: 'multiplication',
    });

    // Step 2: Convert fractions
    const newNum1 = f1.num * f2.den;
    const newNum2 = f2.num * f1.den;
    steps.push({
      stepNumber: 2,
      titleJa: '分母にあわせて分子をかける',
      titleEn: 'Adjust numerators',
      explanationJa: `分子もおなじ数をかけます`,
      explanationEn: `Multiply numerators by the same amount`,
      calculation: `${f1.num}/${f1.den} = ${newNum1}/${lcd}, ${f2.num}/${f2.den} = ${newNum2}/${lcd}`,
      visual: 'formula',
    });

    // Step 3: Add/Subtract
    const resultNum = newNum1 + newNum2;
    steps.push({
      stepNumber: 3,
      titleJa: '分子をたす',
      titleEn: 'Add the numerators',
      explanationJa: `${newNum1} + ${newNum2} = ${resultNum} なので、答えは ${resultNum}/${lcd}`,
      explanationEn: `${newNum1} + ${newNum2} = ${resultNum}, so the answer is ${resultNum}/${lcd}`,
      calculation: `${newNum1}/${lcd} + ${newNum2}/${lcd} = ${resultNum}/${lcd}`,
      visual: 'addition',
    });
  }

  return steps;
}

/**
 * Generate step-by-step solution for unit conversion
 */
function generateUnitConversionSolution(question: Question, value: number, fromUnit: string, toUnit: string, conversionFactor: number): SolutionStep[] {
  const steps: SolutionStep[] = [];
  const result = value * conversionFactor;

  // Step 1: Identify conversion
  steps.push({
    stepNumber: 1,
    titleJa: '単位の関係をおぼえる',
    titleEn: 'Remember the unit relationship',
    explanationJa: `1${toUnit} = ${conversionFactor}${fromUnit} です`,
    explanationEn: `1 ${toUnit} = ${conversionFactor} ${fromUnit}`,
    calculation: `1 ${toUnit} = ${conversionFactor} ${fromUnit}`,
    visual: 'formula',
  });

  // Step 2: Multiply or divide
  const operation = conversionFactor > 1 ? '÷' : '×';
  const operationDescJa = conversionFactor > 1 ? 'わる' : 'かける';
  const operationDescEn = conversionFactor > 1 ? 'divide' : 'multiply';

  steps.push({
    stepNumber: 2,
    titleJa: `単位の数で${operationDescJa}`,
    titleEn: `${operationDescEn} by the conversion factor`,
    explanationJa: `${value} ${operation} ${conversionFactor} = ${result}`,
    explanationEn: `${value} ${operation} ${conversionFactor} = ${result}`,
    calculation: `${value} ${operation} ${conversionFactor} = ${result}`,
    visual: operation === '÷' ? 'division' : 'multiplication',
  });

  return steps;
}

/**
 * Generate step-by-step solution for line graph reading
 */
function generateLineGraphSolution(question: Question, numbers: number[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  // Step 1: Identify what to find
  steps.push({
    stepNumber: 1,
    titleJa: 'グラフをよくみる',
    titleEn: 'Look at the graph carefully',
    explanationJa: '横軸（左右）と縦軸（上下）の目盛りを確認します',
    explanationEn: 'Check the horizontal (x) and vertical (y) axis scales',
    calculation: 'グラフ読み取り',
    visual: 'formula',
  });

  // Step 2: Find the point
  if (numbers.length > 0) {
    const targetValue = numbers[0];
    steps.push({
      stepNumber: 2,
      titleJa: 'ほしい点を見つける',
      titleEn: 'Find the target point',
      explanationJa: `${targetValue} に対応する点の高さを見ます`,
      explanationEn: `Look at the height of the point corresponding to ${targetValue}`,
      calculation: `x = ${targetValue}`,
      visual: 'formula',
    });
  }

  // Step 3: Read the value
  steps.push({
    stepNumber: 3,
    titleJa: '値を読み取る',
    titleEn: 'Read the value',
    explanationJa: `縦軸の目盛りに合わせて値を読み取ります`,
    explanationEn: `Read the value according to the vertical axis scale`,
    calculation: `y = ${question.answer}`,
    visual: 'formula',
  });

  return steps;
}

/**
 * Generate step-by-step solution for slope/rate of change
 */
function generateSlopeSolution(question: Question, numbers: number[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  if (numbers.length >= 4) {
    const [x1, y1, x2, y2] = numbers;
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Step 1: Identify the formula
    steps.push({
      stepNumber: 1,
      titleJa: '変化の割合の公式',
      titleEn: 'Rate of change formula',
      explanationJa: '変化の割合 = 変化後 - 変化前',
      explanationEn: 'Rate of change = After - Before',
      calculation: '変化 = 後 - 前',
      visual: 'formula',
    });

    // Step 2: Calculate change in x
    steps.push({
      stepNumber: 2,
      titleJa: '横の変化を求める',
      titleEn: 'Find horizontal change',
      explanationJa: `${x2} - ${x1} = ${deltaX}`,
      explanationEn: `${x2} - ${x1} = ${deltaX}`,
      calculation: `${x2} - ${x1} = ${deltaX}`,
      visual: 'addition',
    });

    // Step 3: Calculate change in y
    steps.push({
      stepNumber: 3,
      titleJa: '縦の変化を求める',
      titleEn: 'Find vertical change',
      explanationJa: `${y2} - ${y1} = ${deltaY}`,
      explanationEn: `${y2} - ${y1} = ${deltaY}`,
      calculation: `${y2} - ${y1} = ${deltaY}`,
      visual: 'addition',
    });
  }

  return steps;
}

/**
 * Generate step-by-step solution for investigating changes (tables)
 */
function generateTablePatternSolution(question: Question, numbers: number[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  // Step 1: Look at the pattern
  steps.push({
    stepNumber: 1,
    titleJa: '表の法則を探す',
    titleEn: 'Find the table pattern',
    explanationJa: '〇が1増えるとき、△がどう変わるか調べます',
    explanationEn: 'Check how △ changes when 〇 increases by 1',
    calculation: 'きまりを探す',
    visual: 'formula',
  });

  // Step 2: Calculate the rule
  if (numbers.length >= 2) {
    const xChange = numbers[1] - numbers[0];
    steps.push({
      stepNumber: 2,
      titleJa: '変化を計算する',
      titleEn: 'Calculate the change',
      explanationJa: `1増えると、△は ${xChange} 増える`,
      explanationEn: `When 〇 increases by 1, △ increases by ${xChange}`,
      calculation: `${numbers[1]} - ${numbers[0]} = ${xChange}`,
      visual: 'addition',
    });

    // Step 3: Apply to find answer
    if (numbers.length >= 3) {
      const targetX = numbers[numbers.length - 1];
      steps.push({
        stepNumber: 3,
        titleJa: '式に当てはめる',
        titleEn: 'Apply to the formula',
        explanationJa: `△ = 〇 × ${xChange} の式を使います`,
        explanationEn: `Use the formula: △ = 〇 × ${xChange}`,
        calculation: `${targetX} × ${xChange} = ${question.answer}`,
        visual: 'multiplication',
      });
    }
  }

  return steps;
}

/**
 * Generate step-by-step solution for ratio problems
 */
function generateRatioSolution(question: Question, numbers: number[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  if (numbers.length >= 2) {
    const [a, b] = numbers;
    const gcd = calculateGCD(a, b);
    const simplifiedA = a / gcd;
    const simplifiedB = b / gcd;

    // Step 1: Identify the ratio
    steps.push({
      stepNumber: 1,
      titleJa: '比を確認する',
      titleEn: 'Identify the ratio',
      explanationJa: `${a} と ${b} の比を求めます`,
      explanationEn: `Find the ratio of ${a} to ${b}`,
      calculation: `${a} : ${b}`,
      visual: 'formula',
    });

    // Step 2: Find GCD
    steps.push({
      stepNumber: 2,
      titleJa: '最大公約数を探す',
      titleEn: 'Find the greatest common divisor',
      explanationJa: `${a} と ${b} の最大公約数は ${gcd} です`,
      explanationEn: `The GCD of ${a} and ${b} is ${gcd}`,
      calculation: `GCD(${a}, ${b}) = ${gcd}`,
      visual: 'formula',
    });

    // Step 3: Simplify
    steps.push({
      stepNumber: 3,
      titleJa: '約分する',
      titleEn: 'Simplify the ratio',
      explanationJa: `両方を ${gcd} で割ります`,
      explanationEn: `Divide both by ${gcd}`,
      calculation: `${a}÷${gcd} : ${b}÷${gcd} = ${simplifiedA}:${simplifiedB}`,
      visual: 'division',
    });
  }

  return steps;
}

/**
 * Calculate GCD for ratio simplification
 */
function calculateGCD(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Generate step-by-step solution for "finding compared value" ratio problems
 */
function generateFindingComparedSolution(question: Question, numbers: number[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  if (numbers.length >= 2) {
    const [base, ratio] = numbers;
    const compared = (base * ratio) / (numbers[2] || 1);

    // Step 1: Identify given values
    steps.push({
      stepNumber: 1,
      titleJa: 'もとにする量と比を確認',
      titleEn: 'Identify base and ratio',
      explanationJa: `もとにする量（Base）= ${base}、比 = ${ratio}`,
      explanationEn: `Base = ${base}, Ratio = ${ratio}`,
      calculation: `くらべる量 = もとにする量 × 比`,
      visual: 'formula',
    });

    // Step 2: Multiply
    steps.push({
      stepNumber: 2,
      titleJa: 'かけ算をする',
      titleEn: 'Multiply',
      explanationJa: `${base} × ${ratio} = ${question.answer}`,
      explanationEn: `${base} × ${ratio} = ${question.answer}`,
      calculation: `${base} × ${ratio} = ${question.answer}`,
      visual: 'multiplication',
    });
  }

  return steps;
}

/**
 * Generate step-by-step solution for percentage/accuracy rate
 */
function generatePercentageSolution(question: Question, numbers: number[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  if (numbers.length >= 2) {
    const [part, total] = numbers;
    const percentage = Math.round((part / total) * 100);

    // Step 1: Identify formula
    steps.push({
      stepNumber: 1,
      titleJa: '公式をおぼえる',
      titleEn: 'Remember the formula',
      explanationJa: '割合（％）= 部分 ÷ 全体 × 100',
      explanationEn: 'Percentage = Part ÷ Total × 100',
      calculation: '％ = 部分 ÷ 全体 × 100',
      visual: 'formula',
    });

    // Step 2: Divide
    const decimal = part / total;
    steps.push({
      stepNumber: 2,
      titleJa: 'わり算をする',
      titleEn: 'Divide',
      explanationJa: `${part} ÷ ${total} = ${decimal}`,
      explanationEn: `${part} ÷ ${total} = ${decimal}`,
      calculation: `${part} ÷ ${total} = ${decimal}`,
      visual: 'division',
    });

    // Step 3: Convert to percentage
    steps.push({
      stepNumber: 3,
      titleJa: 'パーセントに直す',
      titleEn: 'Convert to percentage',
      explanationJa: `${decimal} × 100 = ${percentage}%`,
      explanationEn: `${decimal} × 100 = ${percentage}%`,
      calculation: `${decimal} × 100 = ${percentage}%`,
      visual: 'multiplication',
    });
  }

  return steps;
}

/**
 * Generate step-by-step solution for large number place value
 */
function generatePlaceValueSolution(question: Question, number: number): SolutionStep[] {
  const steps: SolutionStep[] = [];
  const numStr = number.toString();

  // Step 1: Identify digits
  steps.push({
    stepNumber: 1,
    titleJa: '位を確認する',
    titleEn: 'Identify place values',
    explanationJa: `${number} の各桁の位を見ます`,
    explanationEn: `Look at each digit position of ${number}`,
    calculation: numStr.split('').join(' | '),
    visual: 'breakdown',
  });

  // Step 2: Read by place value
  const places = ['一', '十', '百', '千', '万', '十万', '百万', '千万', '億'];
  const reversed = numStr.split('').reverse();
  const breakdown = reversed.map((digit, i) => `${digit}${places[i]}`).reverse().join(' + ');

  steps.push({
    stepNumber: 2,
    titleJa: '位ごとに読む',
    titleEn: 'Read by place',
    explanationJa: 'それぞれの位の値を読みます',
    explanationEn: 'Read the value of each place',
    calculation: breakdown,
    visual: 'breakdown',
  });

  return steps;
}

/**
 * Generate step-by-step solution for rounding
 */
function generateRoundingSolution(question: Question, number: number, place: number): SolutionStep[] {
  const steps: SolutionStep[] = [];
  const factor = Math.pow(10, place);
  const rounded = Math.round(number / factor) * factor;

  // Step 1: Identify rounding place
  steps.push({
    stepNumber: 1,
    titleJa: '丸める位を確認',
    titleEn: 'Identify rounding place',
    explanationJa: `${place + 1}桁目（${factor}の位）で丸めます`,
    explanationEn: `Round at the ${factor}'s place`,
    calculation: `${number} → ${factor}の位で丸める`,
    visual: 'formula',
  });

  // Step 2: Look at next digit
  const nextDigit = Math.floor(number / (factor / 10)) % 10;
  steps.push({
    stepNumber: 2,
    titleJa: '次の位の数を見る',
    titleEn: 'Look at next digit',
    explanationJa: `${nextDigit} を見ます（5以上で繰り上げ）`,
    explanationEn: `Look at ${nextDigit} (round up if 5 or more)`,
    calculation: `次の位 = ${nextDigit}`,
    visual: 'formula',
  });

  // Step 3: Round
  const roundUp = nextDigit >= 5;
  steps.push({
    stepNumber: 3,
    titleJa: roundUp ? '繰り上げる' : '切り捨てる',
    titleEn: roundUp ? 'Round up' : 'Round down',
    explanationJa: roundUp ? `${nextDigit} は5以上なので繰り上げ` : `${nextDigit} は5未満なので切り捨て`,
    explanationEn: roundUp ? `${nextDigit} is 5 or more, so round up` : `${nextDigit} is less than 5, so round down`,
    calculation: `≈ ${rounded}`,
    visual: 'formula',
  });

  return steps;
}

/**
 * Generate step-by-step solution for order of operations
 */
function generateOrderOfOperationsSolution(question: Question, expression: string, numbers: number[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  // Step 1: Remember PEMDAS
  steps.push({
    stepNumber: 1,
    titleJa: '計算の順序をおぼえる',
    titleEn: 'Remember order of operations',
    explanationJa: '（ ）→ × ÷ → ＋ − の順で計算',
    explanationEn: 'Parentheses → Multiply/Divide → Add/Subtract',
    calculation: '順序: ( ) → ×÷ → +−',
    visual: 'formula',
  });

  // Step 2: Parentheses first (if any)
  if (expression.includes('(')) {
    steps.push({
      stepNumber: 2,
      titleJa: '( )の中を先に計算',
      titleEn: 'Calculate inside parentheses first',
      explanationJa: 'かっこの中を先に計算します',
      explanationEn: 'Calculate inside parentheses first',
      calculation: '( )内を計算',
      visual: 'formula',
    });
  }

  // Step 3: Multiply/Divide
  if (expression.includes('×') || expression.includes('÷')) {
    steps.push({
      stepNumber: steps.length + 1,
      titleJa: '× ÷ を計算',
      titleEn: 'Multiply and Divide',
      explanationJa: 'かけ算とわり算を左から計算',
      explanationEn: 'Multiply and divide from left to right',
      calculation: '× ÷ の計算',
      visual: 'multiplication',
    });
  }

  // Step 4: Add/Subtract
  steps.push({
    stepNumber: steps.length + 1,
    titleJa: '＋ − を計算',
    titleEn: 'Add and Subtract',
    explanationJa: 'たし算とひき算を左から計算',
    explanationEn: 'Add and subtract from left to right',
    calculation: `= ${question.answer}`,
    visual: 'addition',
  });

  return steps;
}

/**
 * Generate step-by-step solution for counting diagonals
 */
function generateDiagonalsSolution(question: Question, sides: number): SolutionStep[] {
  const steps: SolutionStep[] = [];
  // Formula: n(n-3)/2
  const diagonals = (sides * (sides - 3)) / 2;

  // Step 1: Identify formula
  steps.push({
    stepNumber: 1,
    titleJa: '対角線の公式',
    titleEn: 'Diagonal formula',
    explanationJa: '対角線の数 = n × (n - 3) ÷ 2',
    explanationEn: 'Number of diagonals = n × (n - 3) ÷ 2',
    calculation: 'n(n-3)÷2',
    visual: 'formula',
  });

  // Step 2: Substitute
  steps.push({
    stepNumber: 2,
    titleJa: 'nの値を入れる',
    titleEn: 'Substitute n',
    explanationJa: `${sides} × (${sides} - 3) ÷ 2`,
    explanationEn: `${sides} × (${sides} - 3) ÷ 2`,
    calculation: `${sides} × ${sides - 3} ÷ 2`,
    visual: 'formula',
  });

  // Step 3: Calculate
  const product = sides * (sides - 3);
  steps.push({
    stepNumber: 3,
    titleJa: '計算する',
    titleEn: 'Calculate',
    explanationJa: `${sides} × ${sides - 3} = ${product}、${product} ÷ 2 = ${diagonals}`,
    explanationEn: `${sides} × ${sides - 3} = ${product}, ${product} ÷ 2 = ${diagonals}`,
    calculation: `${product} ÷ 2 = ${diagonals}`,
    visual: 'division',
  });

  return steps;
}

/**
 * Generate step-by-step solution for composite shapes
 */
function generateCompositeShapeSolution(question: Question, numbers: number[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  // Step 1: Divide the shape
  steps.push({
    stepNumber: 1,
    titleJa: '図形をわける',
    titleEn: 'Divide the shape',
    explanationJa: '複合図形を基本図形に分けます',
    explanationEn: 'Divide the composite shape into basic shapes',
    calculation: '分割',
    visual: 'geometry',
  });

  // Step 2: Calculate each part
  if (numbers.length >= 4) {
    const area1 = numbers[0] * numbers[1];
    const area2 = numbers[2] * numbers[3];

    steps.push({
      stepNumber: 2,
      titleJa: '各部分の面積を求める',
      titleEn: 'Find area of each part',
      explanationJa: `① ${numbers[0]} × ${numbers[1]} = ${area1}、② ${numbers[2]} × ${numbers[3]} = ${area2}`,
      explanationEn: `Part 1: ${numbers[0]} × ${numbers[1]} = ${area1}, Part 2: ${numbers[2]} × ${numbers[3]} = ${area2}`,
      calculation: `${area1} と ${area2}`,
      visual: 'multiplication',
    });

    // Step 3: Add or subtract
    const total = area1 + area2;
    steps.push({
      stepNumber: 3,
      titleJa: 'たすまたはひく',
      titleEn: 'Add or subtract',
      explanationJa: `${area1} + ${area2} = ${total}`,
      explanationEn: `${area1} + ${area2} = ${total}`,
      calculation: `${area1} + ${area2} = ${total}`,
      visual: 'addition',
    });
  }

  return steps;
}

/**
 * Generate step-by-step solution for "difference vs multiple" problems
 */
function generateDifferenceMultipleSolution(question: Question, numbers: number[]): SolutionStep[] {
  const steps: SolutionStep[] = [];

  if (numbers.length >= 2) {
    const [a, b] = numbers;
    const diff = Math.abs(a - b);
    const multiple = a > b ? a / b : b / a;

    // Step 1: Identify what to find
    const isDifference = question.text.includes('差') || question.textEn.toLowerCase().includes('difference');

    steps.push({
      stepNumber: 1,
      titleJa: '求めるものを確認',
      titleEn: 'Identify what to find',
      explanationJa: isDifference ? '差（どれだけ違うか）を求めます' : '何倍かを求めます',
      explanationEn: isDifference ? 'Find the difference (how much they differ)' : 'Find how many times',
      calculation: isDifference ? '差 = 大きい方 - 小さい方' : '倍 = 大きい方 ÷ 小さい方',
      visual: 'formula',
    });

    // Step 2: Calculate
    if (isDifference) {
      steps.push({
        stepNumber: 2,
        titleJa: '差を計算',
        titleEn: 'Calculate difference',
        explanationJa: `${Math.max(a, b)} - ${Math.min(a, b)} = ${diff}`,
        explanationEn: `${Math.max(a, b)} - ${Math.min(a, b)} = ${diff}`,
        calculation: `${Math.max(a, b)} - ${Math.min(a, b)} = ${diff}`,
        visual: 'addition',
      });
    } else {
      steps.push({
        stepNumber: 2,
        titleJa: '倍を計算',
        titleEn: 'Calculate multiple',
        explanationJa: `${Math.max(a, b)} ÷ ${Math.min(a, b)} = ${multiple}`,
        explanationEn: `${Math.max(a, b)} ÷ ${Math.min(a, b)} = ${multiple}`,
        calculation: `${Math.max(a, b)} ÷ ${Math.min(a, b)} = ${multiple}`,
        visual: 'division',
      });
    }
  }

  return steps;
}

/**
 * Parse a question and generate appropriate step-by-step solution
 */
export function generateSolution(question: Question): SolutionData {
  const text = question.text;
  const textEn = question.textEn;
  const answer = question.answer;
  const unit = question.unit || '';

  // Extract numbers from the question text
  const numbers = text.match(/\d+/g)?.map(Number) || [];

  let steps: SolutionStep[] = [];
  let tipJa = '';
  let tipEn = '';

  // Determine question type and generate appropriate solution
  const topic = question.topic || '';
  const subTopic = question.subTopic || '';

  // Multiplication patterns (e.g., "24 × 5 = ?")
  if (text.includes('×') || text.toLowerCase().includes('times') || text.includes('倍') || text.includes('ばい')) {
    if (numbers.length >= 2) {
      steps = generateMultiplicationSolution(question, [numbers[0], numbers[1]]);
      tipJa = 'くばり算を使うと、大きな数のかけ算もかんたんになります';
      tipEn = 'Using the distributive property makes multiplying large numbers easier';
    }
  }
  // Division patterns
  else if (text.includes('÷') || text.includes('÷') || text.toLowerCase().includes('divide') || text.includes('わり算')) {
    if (numbers.length >= 2) {
      steps = generateDivisionSolution(question, numbers[0], numbers[1]);
      tipJa = 'わり算では、かけ算のきろくを使って答えをチェックしましょう';
      tipEn = 'Use multiplication facts to check your division answers';
    }
  }
  // Area calculation
  else if (text.includes('面積') || text.toLowerCase().includes('area') || subTopic?.includes('area')) {
    if (numbers.length >= 2) {
      steps = generateAreaSolution(question, numbers[0], numbers[1]);
      tipJa = '面積を求めるときは、たてとよこをかけます';
      tipEn = 'To find area, multiply length by width';
    }
  }
  // Perimeter calculation
  else if (text.includes('周り') || text.includes('周の長') || text.toLowerCase().includes('perimeter')) {
    if (numbers.length >= 2) {
      steps = generatePerimeterSolution(question, numbers[0], numbers[1]);
      tipJa = '周りの長さは、(たて+よこ)×2 で求めます';
      tipEn = 'Perimeter = (length + width) × 2';
    }
  }
  // Angle calculation
  else if (text.includes('角') || text.toLowerCase().includes('angle') || subTopic?.includes('angle')) {
    // Look for "□°" pattern for unknown angle
    const knownAngles = numbers.filter((n, i) => i < numbers.length - 1 || !text.includes('?'));
    steps = generateAngleSolution(question, knownAngles);
    tipJa = '三角形の内角の和は180°、四角形の内角の和は360°です';
    tipEn = 'Sum of angles in a triangle is 180°, in a quadrilateral is 360°';
  }
  // Decimal operations
  else if (text.includes('.') || subTopic?.includes('decimal')) {
    const operation = text.includes('＋') || text.includes('+') ? 'add' :
                      text.includes('－') || text.includes('-') ? 'subtract' : 'multiply';
    if (numbers.length >= 2) {
      steps = generateDecimalSolution(question, operation, [numbers[0], numbers[1]]);
      tipJa = '小数の計算では、小数点の位置をよくみましょう';
      tipEn = 'When calculating with decimals, pay attention to decimal placement';
    }
  }
  // Fraction operations
  else if (text.includes('/') || text.includes('分の') || subTopic?.includes('fraction')) {
    // Extract fractions like 1/2, 3/4
    const fractionMatches = text.match(/(\d+)\/(\d+)/g);
    if (fractionMatches && fractionMatches.length >= 2) {
      const fractions = fractionMatches.slice(0, 2).map(f => {
        const [num, den] = f.split('/').map(Number);
        return { num, den };
      });
      steps = generateFractionSolution(question, 'add', fractions);
      tipJa = '分数のたし算では、まず分母をおなじにします';
      tipEn = 'When adding fractions, first make the denominators the same';
    }
  }
  // Unit conversion
  else if (subTopic?.includes('unit') || text.includes('cm') || text.includes('m') || text.includes('km')) {
    if (numbers.length >= 1) {
      // Detect conversion type
      let factor = 1;
      let fromUnit = '';
      let toUnit = '';

      if (text.includes('km') && text.includes('m')) {
        factor = 1000;
        fromUnit = text.includes('km') && text.indexOf('km') < text.indexOf('m') ? 'm' : 'km';
        toUnit = fromUnit === 'm' ? 'km' : 'm';
      } else if (text.includes('cm') && text.includes('m')) {
        factor = 100;
        fromUnit = text.includes('cm') && text.indexOf('cm') < text.indexOf('m') ? 'm' : 'cm';
        toUnit = fromUnit === 'm' ? 'cm' : 'm';
      }

      if (factor > 1) {
        steps = generateUnitConversionSolution(question, numbers[0], fromUnit, toUnit, factor);
        tipJa = '大きな単位から小さな単位には×、小さな単位から大きな単位には÷をします';
        tipEn = 'Multiply when going to smaller units, divide when going to larger units';
      }
    }
  }
  // Line graphs
  else if (text.includes('グラフ') || text.toLowerCase().includes('graph') || subTopic?.includes('graph')) {
    if (text.includes('変化') || text.toLowerCase().includes('change') || text.toLowerCase().includes('slope')) {
      steps = generateSlopeSolution(question, numbers);
      tipJa = '変化の割合 = (変化後 - 変化前) です';
      tipEn = 'Rate of change = (After - Before)';
    } else {
      steps = generateLineGraphSolution(question, numbers);
      tipJa = 'グラフを読むときは、横軸と縦軸の目盛りを確認しましょう';
      tipEn = 'When reading graphs, check the horizontal and vertical scales';
    }
  }
  // Investigating changes / Tables
  else if (text.includes('表') || text.includes('きまり') || text.includes('〇') || text.includes('△') || subTopic?.includes('table')) {
    steps = generateTablePatternSolution(question, numbers);
    tipJa = '表のきまりを見つけるときは、1増えるときの変化に注目します';
    tipEn = 'When finding table patterns, focus on the change when increasing by 1';
  }
  // Ratio problems
  else if (text.includes('比') || text.includes('：') || subTopic?.includes('ratio')) {
    if (text.includes('くらべる') || text.includes('compared') || text.includes('こたえ')) {
      steps = generateFindingComparedSolution(question, numbers);
      tipJa = 'くらべる量 = もとにする量 × 比 の公式を使います';
      tipEn = 'Use: Compared = Base × Ratio';
    } else {
      steps = generateRatioSolution(question, numbers);
      tipJa = '比を簡単にするには、最大公約数で割ります';
      tipEn = 'To simplify ratios, divide by the greatest common divisor';
    }
  }
  // Percentage / Accuracy rate
  else if (text.includes('％') || text.includes('パーセント') || text.includes('率') || subTopic?.includes('percent') || subTopic?.includes('accuracy')) {
    steps = generatePercentageSolution(question, numbers);
    tipJa = '％ = 部分 ÷ 全体 × 100 の公式を使います';
    tipEn = 'Use: % = Part ÷ Total × 100';
  }
  // Large numbers / Place value
  else if (text.includes('億') || text.includes('万') || text.includes('桁') || subTopic?.includes('large') || subTopic?.includes('place')) {
    if (numbers.length > 0) {
      steps = generatePlaceValueSolution(question, numbers[0]);
      tipJa = '4桁ごとに「万」「億」の区切りがあります';
      tipEn = 'Units change at every 4 digits: man, oku';
    }
  }
  // Rounding
  else if (text.includes('丸め') || text.includes('およそ') || text.toLowerCase().includes('round') || text.toLowerCase().includes('about')) {
    if (numbers.length > 0) {
      const place = text.includes('万') ? 4 : text.includes('千') ? 3 : text.includes('百') ? 2 : 1;
      steps = generateRoundingSolution(question, numbers[0], place);
      tipJa = '5以上は繰り上げ、4以下は切り捨てます';
      tipEn = '5 or more rounds up, 4 or less rounds down';
    }
  }
  // Order of operations
  else if (text.includes('計算') && (text.includes('（') || text.includes('(') || text.includes('＋') || text.includes('×'))) {
    steps = generateOrderOfOperationsSolution(question, text, numbers);
    tipJa = '計算の順序: ( ) → ×÷ → +− を守りましょう';
    tipEn = 'Follow order: Parentheses → Multiply/Divide → Add/Subtract';
  }
  // Diagonals
  else if (text.includes('対角線') || text.toLowerCase().includes('diagonal')) {
    if (numbers.length > 0) {
      steps = generateDiagonalsSolution(question, numbers[0]);
      tipJa = '対角線の数 = n×(n-3)÷2 の公式を使います';
      tipEn = 'Use formula: Diagonals = n×(n-3)÷2';
    }
  }
  // Composite shapes
  else if (text.includes('複合') || text.includes('組み合わせ') || text.toLowerCase().includes('composite') || subTopic?.includes('composite')) {
    steps = generateCompositeShapeSolution(question, numbers);
    tipJa = '複合図形は、基本図形に分けて考えます';
    tipEn = 'Divide composite shapes into basic shapes';
  }
  // Difference vs Multiple
  else if (text.includes('差') || text.includes('倍') || text.includes('どちら')) {
    steps = generateDifferenceMultipleSolution(question, numbers);
    tipJa = '差は「引き算」、倍は「割り算」で求めます';
    tipEn = 'Difference uses subtraction, multiple uses division';
  }

  // Fallback: Create generic steps from explanation if available
  if (steps.length === 0 && question.explanation) {
    steps = [{
      stepNumber: 1,
      titleJa: '計算をする',
      titleEn: 'Calculate',
      explanationJa: question.explanation,
      explanationEn: question.explanationEn || question.explanation,
      calculation: `${text} = ${answer}`,
      visual: 'formula',
    }];
    tipJa = 'よくあるミスは、計算の順序をまちがえることです';
    tipEn = 'Common mistakes happen when the order of operations is wrong';
  }

  // Final fallback if still no steps
  if (steps.length === 0) {
    steps = [{
      stepNumber: 1,
      titleJa: '答えを確認する',
      titleEn: 'Check the answer',
      explanationJa: `こたえは ${answer}${unit} です`,
      explanationEn: `The answer is ${answer}${unit}`,
      calculation: `= ${answer}${unit}`,
      visual: 'formula',
    }];
  }

  return {
    questionTextJa: text,
    questionTextEn: textEn,
    answer,
    unit,
    steps,
    tipJa,
    tipEn,
  };
}

/**
 * Generate a simple solution for basic arithmetic
 */
export function generateSimpleSolution(
  questionText: string,
  questionTextEn: string,
  answer: number | string,
  unit?: string,
  work?: string
): SolutionData {
  const steps: SolutionStep[] = [];

  if (work) {
    // Parse multi-step work
    const workLines = work.split('\n').filter(line => line.trim());
    workLines.forEach((line, index) => {
      const match = line.match(/(.+?)\s*=\s*(.+)/);
      if (match) {
        steps.push({
          stepNumber: index + 1,
          titleJa: `ステップ ${index + 1}`,
          titleEn: `Step ${index + 1}`,
          explanationJa: '計算を進めます',
          explanationEn: 'Continue calculating',
          calculation: `${match[1].trim()} = ${match[2].trim()}`,
          visual: index === 0 ? 'breakdown' : 'addition',
        });
      }
    });
  }

  // Add final answer step
  steps.push({
    stepNumber: steps.length + 1,
    titleJa: '答え',
    titleEn: 'Answer',
    explanationJa: `こたえは ${answer}${unit || ''} です`,
    explanationEn: `The answer is ${answer}${unit || ''}`,
    calculation: `= ${answer}${unit || ''}`,
    visual: 'formula',
  });

  return {
    questionTextJa: questionText,
    questionTextEn: questionTextEn,
    answer,
    unit,
    steps,
    tipJa: '計算はゆっくり、確実に進めましょう',
    tipEn: 'Take your time and work through calculations carefully',
  };
}

export default generateSolution;
