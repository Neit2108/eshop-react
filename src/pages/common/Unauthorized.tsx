import { useEffect, useState } from "react"
import { ArrowRight, Home, Shield } from "lucide-react"
import { Link } from "react-router-dom"

export default function UnauthorizedPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950 flex items-center justify-center px-4 py-12">
      {/* Refined background with subtle gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-950/30 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-100 dark:bg-indigo-950/30 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        {/* Animated lock icon badge */}
        <div
          className={`flex justify-center transform transition-all duration-700 ease-out ${
            isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-2xl" />
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full animate-pulse" />
              <div className="relative w-28 h-28 bg-gradient-to-br from-blue-50 dark:from-blue-950/50 to-indigo-50 dark:to-indigo-950/50 rounded-full flex items-center justify-center shadow-xl border border-blue-100 dark:border-blue-900/50">
                <Shield className="w-14 h-14 text-blue-600 dark:text-blue-400" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>

        {/* Error code section */}
        <div
          className={`space-y-3 transform transition-all duration-700 delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-block">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-widest uppercase px-4 py-2 bg-blue-100 dark:bg-blue-950/50 rounded-full">
              Không có quyền truy cập
            </span>
          </div>
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
            401
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-balance">
            Không có quyền truy cập
          </h2>
        </div>

        {/* Description text */}
        <p
          className={`text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto transform transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Rất tiếc, bạn không có quyền truy cập vào tài nguyên này. Thông tin xác thực của bạn có thể đã hết hạn hoặc không đủ. Vui lòng đăng nhập hoặc liên hệ bộ phận hỗ trợ để được trợ giúp.
        </p>

        {/* Action buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 transform transition-all duration-700 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 group"
          >
            <Home className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            <span>Trở về trang chủ</span>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-600 dark:hover:border-blue-400 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-300 group"
          >
            <span>Đăng nhập</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Support link */}
        <div
          className={`pt-4 transform transition-all duration-700 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Vẫn gặp sự cố?{" "}
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline-offset-2 hover:underline transition-colors">
              Liên hệ hỗ trợ
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}
