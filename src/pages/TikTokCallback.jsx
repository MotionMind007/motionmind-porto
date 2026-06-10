import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'

export default function TikTokCallback() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('loading') // loading | success | error
  const [message, setMessage] = useState('')

  useEffect(() => {
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    if (error) {
      setStatus('error')
      setMessage(errorDescription || error || 'Authorization was denied or failed.')
      return
    }

    if (code) {
      setStatus('success')
      setMessage('TikTok account connected successfully. You can close this page.')
    } else {
      setStatus('error')
      setMessage('No authorization code received. Please try again.')
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-dark-100 flex items-center justify-center px-6">
      <div className="glass-strong rounded-2xl p-10 w-full max-w-sm text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png?v=2" alt="MotionMind" className="h-10 w-auto" />
        </div>

        {/* Status icon */}
        <div className="flex justify-center mb-5">
          {status === 'loading' && (
            <Loader2 size={48} className="text-brand-blue animate-spin" />
          )}
          {status === 'success' && (
            <CheckCircle2 size={48} className="text-brand-green" />
          )}
          {status === 'error' && (
            <XCircle size={48} className="text-red-400" />
          )}
        </div>

        {/* Title */}
        <h1 className="font-heading font-bold text-xl mb-2">
          {status === 'loading' && 'Connecting...'}
          {status === 'success' && 'Connected!'}
          {status === 'error' && 'Connection Failed'}
        </h1>

        {/* Message */}
        <p className="font-mono text-xs text-slate-500 leading-relaxed mb-6">
          {status === 'loading' && 'Processing TikTok authorization...'}
          {(status === 'success' || status === 'error') && message}
        </p>

        {/* Auth code display (for success) */}
        {status === 'success' && searchParams.get('code') && (
          <div className="glass rounded-lg p-3 mb-6">
            <div className="font-mono text-[9px] text-slate-600 uppercase tracking-wider mb-1">Authorization Code</div>
            <div className="font-mono text-[10px] text-slate-400 break-all select-all">
              {searchParams.get('code')}
            </div>
          </div>
        )}

        {/* Action */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-brand-blue to-brand-purple text-white font-heading font-bold text-xs hover:shadow-lg hover:shadow-brand-blue/30 transition-all"
        >
          Back to MotionMind
        </Link>
      </div>
    </div>
  )
}
