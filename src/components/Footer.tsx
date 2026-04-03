const PRODUCT_LINKS = [
  { label: 'AI 全端開發', href: '#products' },
  { label: '方法論', href: '#methodology' },
  { label: '技術棧', href: '#' },
]

const COMPANY_LINKS = [
  { label: '團隊', href: '#team' },
  { label: '招募', href: '#careers' },
  { label: '聯絡', href: '#contact' },
]

const LEGAL_LINKS = [
  { label: '隱私政策', href: '#' },
  { label: '服務條款', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="container-optimus py-16">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-semibold text-gray-950 block mb-3">
              SCI
            </span>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              AI 驅動的軟體開發公司，從概念到產品的全程技術夥伴。
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-medium tracking-wider text-gray-400 uppercase mb-4">
              產品
            </h4>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-gray-950 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium tracking-wider text-gray-400 uppercase mb-4">
              公司
            </h4>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-gray-950 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-medium tracking-wider text-gray-400 uppercase mb-4">
              法律
            </h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-gray-950 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            &copy; 2026 原始碼智慧股份有限公司
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
