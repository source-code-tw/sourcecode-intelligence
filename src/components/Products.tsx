type Status = '已上線' | '運行中' | '已發布' | '開發中' | '規劃中';

interface Product {
  number: string;
  name: string;
  description: string;
  status: Status;
}

const MAIN_PRODUCTS: Product[] = [
  {
    number: '01',
    name: '社區管理 SaaS',
    description: '取代大樓秘書的智慧管理平台。住戶報修、公告推播、財務透明化，一個 App 搞定社區大小事。',
    status: '開發中',
  },
  {
    number: '02',
    name: '覓食 AI',
    description: 'LINE Bot 智慧美食推薦引擎。根據位置、偏好、天氣即時推薦，已上線服務真實用戶。',
    status: '已上線',
  },
  {
    number: '03',
    name: 'NG_Gold',
    description: 'XAUUSD 全自動量化交易系統。四策略並行、風控引擎、即時監控，7x24 不間斷運行。',
    status: '運行中',
  },
  {
    number: '04',
    name: 'idea-reality-mcp',
    description: '開源 Pre-build 驗證工具。在寫第一行 code 前，用 AI 掃描市場確認你的點子是否值得做。',
    status: '已發布',
  },
];

const OTHER_PRODUCTS = [
  '豪車配對 APP — 豪華車共乘媒合平台',
  'GuardianAI — 被動式人身安全偵測',
  '派遣管理後台 — 演唱會/人力派遣管理系統',
  'AI 金融研究工具 — 交易記憶與策略進化引擎',
];

const STATUS_DOT_COLOR: Record<Status, string> = {
  已上線: '#22c55e',
  運行中: '#22c55e',
  已發布: '#10b981',
  開發中: '#eab308',
  規劃中: '#a3a3a3',
};

export default function Products() {
  return (
    <section className="section-padding">
      <div className="container-optimus">
        {/* Section header */}
        <p className="section-label mb-6">產品</p>
        <h2 className="text-section-title mb-4">
          我們打造的產品
          <br />
          <span className="text-gray-400">從概念到上線</span>
        </h2>
        <p className="text-lg text-gray-500 leading-relaxed mb-12 max-w-xl">
          每一個都是真實運行的產品，不是 demo，不是 side project。
        </p>

        {/* Feature grid 2x2 */}
        <div className="feature-grid mb-16">
          {MAIN_PRODUCTS.map((product) => (
            <div key={product.number} className="feature-card">
              <span className="text-sm font-semibold text-gray-400 mb-6 block tabular-nums">
                {product.number}
              </span>
              <h3 className="text-xl font-semibold text-gray-950 mb-3">{product.name}</h3>
              <p className="text-base text-gray-500 leading-relaxed mb-4">
                {product.description}
              </p>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border border-gray-200"
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: STATUS_DOT_COLOR[product.status] }}
                />
                {product.status}
              </span>
            </div>
          ))}
        </div>

        {/* Other products list */}
        <div>
          <p className="text-sm font-medium text-gray-400 tracking-wider mb-4">
            OTHER PROJECTS
          </p>
          <ul className="space-y-2">
            {OTHER_PRODUCTS.map((item) => (
              <li key={item} className="text-base text-gray-500 leading-relaxed">
                <span className="text-gray-300 mr-2">--</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
