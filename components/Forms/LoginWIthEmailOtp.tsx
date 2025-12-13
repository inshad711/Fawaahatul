'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { generateCartPayload } from '@/lib/utils'
import Cookies from 'js-cookie'
import { Loader } from 'lucide-react'
import { authService } from '@/services/authService'

const LoginWithEmailOtp = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(60)
  const { globalSetting } = useSelector(
    (state: RootState) => state.globalSetting
  )

  let guestCartData = []
  if (typeof localStorage !== 'undefined') {
    guestCartData = JSON.parse(localStorage.getItem('guestCart') || '[]')
  }

  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }
    setOtpSent(true)
    toast.success('OTP sent.')
    setTimer(60)
    await authService.sendOtp(email)
  }

  const handleChangeOtp = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData
      .getData('Text')
      .replace(/\D/g, '')
      ?.slice(0, 6)
    if (pasteData.length === 6) {
      const splitData = pasteData.split('')
      setOtp(splitData)
      setTimeout(() => inputsRef.current[5]?.focus(), 0)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const fullOtp = otp.join('')
    if (!/^\d{6}$/.test(fullOtp)) {
      toast.error('Please enter a valid 6-digit OTP.')
      return
    }

    try {
      const cartPayload = generateCartPayload(guestCartData)

      const response = await authService.verifyOtp(email, fullOtp, cartPayload)

      if (response.success) {
        Cookies.remove(process.env.AUTH_TOKEN!)
        Cookies.set(process.env.AUTH_TOKEN!, response.token, {
          expires: 1,
          sameSite: 'None',
          secure: true
        })
        toast.success('Logged In!')
        localStorage.removeItem('guestCart')
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)
      }
    } catch (error) {
      toast.error('Invalid OTP.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [otpSent, timer])

  const handleResend = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (timer > 0) return

    const res = await authService.sendOtp(email)
    toast.success('OTP resent.')
    setOtp(['', '', '', '', '', ''])
    inputsRef.current[0]?.focus()
    setTimer(60)
  }

  return (
    <div className='flex items-center px-5 justify-center py-5'>
      <div className='bg-white w-[100%] md:w-[350px] shadow-lg overflow-hidden'>
        <div className='w-full'>
          <Image
            src='/assets/loginimage.webp'
            alt='Login Visual'
            width={800}
            height={250}
            className='h-auto w-full object-cover'
          />
        </div>

        {otpSent ? (
          <div className='p-6 space-y-5'>
            <div className='block gap-4 flex-col items-center justify-center'>
              <Image
                src={`${process.env.BACKEND}/upload/WebsiteLogos/${globalSetting?.logoSettings?.logoPath}`}
                className='hidden lg:block w-20 h-auto object-contain'
                alt={`${globalSetting?.logoSettings?.altText}` || 'Logo'}
                height={100}
                width={200}
              />
            </div>
            <div className='space-y-1'>
              <h2 className='text-lg font-medium'>Verify with OTP</h2>
              <p className='text-xs text-gray-700 font-light tracking-wide'>
                Sent to {email}{' '}
              </p>
            </div>

            <form
              className='space-y-5'
              onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
            >
              <div className='flex gap-1.5'>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el: any) => (inputsRef.current[index] = el)}
                    type='text'
                    inputMode='numeric'
                    maxLength={1}
                    value={digit}
                    disabled={loading}
                    onChange={e => handleChangeOtp(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className='w-8 h-8 rounded-sm border border-gray-400 text-center text-sm focus:outline-none'
                  />
                ))}
              </div>

              <div>
                <button
                  onClick={handleResend}
                  className={`text-templateText text-xs underline font-medium uppercase ${
                    timer > 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={timer > 0}
                >
                  {timer > 0 ? `Resend in ${timer}` : 'RESEND OTP'}
                </button>
              </div>

              <div className='space-y-1'>
                <button
                  type='submit'
                  className='text-sm flex items-center justify-center gap-2 bg-templatePrimary rounded-sm w-full p-3 text-templatePrimaryText tracking-wide'
                >
                  {loading && <Loader size={18} className='animate-spin' />}
                  VERIFY OTP
                </button>
                <p
                  onClick={() => setOtpSent(false)}
                  className='underline text-xs cursor-pointer underline-offset-2 !text-templateText'
                >
                  change email
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className='p-6 space-y-4'>
            <div className='block gap-4 h-10 flex-col items-center justify-center'>
              {globalSetting && (
                <Image
                  src={`${process.env.BACKEND}/upload/WebsiteLogos/${globalSetting?.logoSettings?.logoPath}`}
                  className='hidden lg:block w-20 h-auto object-contain'
                  alt={`${globalSetting?.logoSettings?.altText}` || 'Logo'}
                  height={100}
                  width={200}
                />
              )}
            </div>
            <h2 className='text-lg font-medium'>Login or Signup</h2>

            <form
              className='space-y-4'
              onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
            >
              <div>
                <input
                  required
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={email}
                  disabled={otpSent}
                  onChange={e => setEmail(e.target.value)}
                  className='border rounded-sm text-sm placeholder:text-sm focus:outline-none border-templateText w-full px-3 py-2 disabled:bg-gray-100'
                />
              </div>

              <div className='flex items-center gap-1.5'>
                <input
                  required
                  type='checkbox'
                  name='agreement'
                  id='agreement'
                />
                <label
                  htmlFor='agreement'
                  className='text-xs text-templateText tracking-[0.025em]'
                >
                  I agree to the{' '}
                  <a
                    target='_blank'
                    href={'/pages/privacy-policy'}
                    className='underline underline-offset-2'
                  >
                    Terms of Use
                  </a>{' '}
                  &{' '}
                  <a
                    target='_blank'
                    href={'/pages/terms-of-service'}
                    className='underline underline-offset-2'
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              <div>
                <button
                  type='submit'
                  className='text-sm flex items-center justify-center gap-2 rounded-sm bg-templatePrimary w-full p-3 text-templatePrimaryText tracking-wide'
                >
                  CONTINUE
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginWithEmailOtp
