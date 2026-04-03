const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'dev@mnemox.ai',
    href: 'mailto:dev@mnemox.ai',
  },
  {
    label: 'GitHub',
    value: 'github.com/zychenpeng',
    href: 'https://github.com/zychenpeng',
  },
  {
    label: 'Location',
    value: '台灣',
    href: null,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container-optimus">
        <p className="section-label mb-6">聯絡</p>
        <h2 className="text-section-title mb-4">開始合作</h2>
        <p className="text-body-muted mb-16 max-w-xl">
          有產品想法？需要技術夥伴？讓我們聊聊。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Form */}
          <form className="flex flex-col gap-6" onSubmit={undefined}>
            <input
              type="text"
              name="name"
              placeholder="你的名字"
              className="w-full bg-transparent text-base text-gray-950 py-3 border-b border-gray-200 outline-none transition-colors focus:border-gray-900 placeholder:text-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="電子郵件"
              className="w-full bg-transparent text-base text-gray-950 py-3 border-b border-gray-200 outline-none transition-colors focus:border-gray-900 placeholder:text-gray-400"
            />
            <textarea
              name="message"
              placeholder="想聊什麼？"
              rows={4}
              className="w-full bg-transparent text-base text-gray-950 py-3 border-b border-gray-200 outline-none transition-colors focus:border-gray-900 placeholder:text-gray-400 resize-none"
            />
            <div>
              <button type="submit" className="btn-optimus-primary">
                送出訊息
              </button>
            </div>
          </form>

          {/* Contact info */}
          <div className="flex flex-col gap-6 md:pt-2">
            <h3 className="text-base font-semibold text-gray-950">
              聯絡資訊
            </h3>
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-base text-gray-950 hover:text-gray-600 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-base text-gray-950">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
