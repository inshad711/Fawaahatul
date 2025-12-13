import type { Metadata } from 'next'
import './globals.css'
import HeaderWrapper from '@/components/Wrappers/HeaderWrapper'
import { Toaster } from 'react-hot-toast'
import ReduxProvider from '@/components/Wrappers/ReduxProvider'
import BottomTabs from '@/components/BottomTabs/BottomTabs'
import NextTopLoader from 'nextjs-toploader'
import FooterWrapper from '@/components/Footer/FooterWrapper'
import ValidateUser from '@/components/Wrappers/ValidateUser'
import AOS from '@/utils/AOS'
import Script from 'next/script'
import { Inter, Assistant } from 'next/font/google'
import { Bounce, ToastContainer } from 'react-toastify'
import { globalService } from '@/services/globalService'
import ColorPallete from '@/components/ColorPalette/ColorPalette'
import GoogleTranslate from '@/components/GoogleTranslate/GoogleTranslate'
import FloatingWhatsapp from '@/components/Wrappers/FloatingWhatsapp'
import { defaultMetadata } from '@/lib/defaultMetadata'
import { Settings } from 'lucide-react'
import Notificationbar from '@/components/ui/Notificationbar'
import NotificationPopup from '@/components/ui/NotificationPopup'
import Footer from '@/components/Footer/Footer'
import FooterMain from '@/components/OtherSections/FooterMain'

const assistant = Assistant({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  openGraph: {
    siteName: defaultMetadata.siteName,
    title: defaultMetadata.ogtitle,
    description: defaultMetadata.ogdescription,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    type: 'website',
    images: [
      {
        url: defaultMetadata.ogimage,
        width: 1200,
        height: 630,
        alt: defaultMetadata.title
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultMetadata.ogtitle,
    description: defaultMetadata.ogdescription,
    images: [defaultMetadata.ogimage]
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`
  }
}

const fetchGlobalSettingss = async () => {
  try {
    const response = await globalService.fetchGlobalSettings()
    console.log(response)
    return response.data
  } catch (error) {
    return []
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const globalSettings = await fetchGlobalSettingss()
  console.log(globalSettings, 'Global Settings', process.env.API_KEY)

  return (
    <html lang='en'>
      <head>
        {globalSettings?.envData?.GOOGLE_SITE_VERIFICATION && (
          <meta
            name='google-site-verification'
            content={`${globalSettings?.envData?.GOOGLE_SITE_VERIFICATION}`}
          />
        )}
        {globalSettings?.envData?.GOOGLE_ANALYTICS && (
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${globalSettings?.envData?.GOOGLE_ANALYTICS}`}
          ></Script>
        )}

        {globalSettings?.envData?.GOOGLE_ANALYTICS && (
          <Script id='google-analytics'>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${globalSettings?.envData?.GOOGLE_ANALYTICS}');
          `}
          </Script>
        )}
        {globalSettings?.envData?.GOOGLE_TAG_MANAGER && (
          <Script
            id='gtm-script'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${globalSettings?.envData?.GOOGLE_TAG_MANAGER}');
          `
            }}
          />
        )}
      </head>
      <body className={`antialiased ${assistant.className}  pb-[65px] lg:pb-0`}>
        {globalSettings?.envData?.GOOGLE_TAG_MANAGER && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${globalSettings?.envData?.GOOGLE_TAG_MANAGER}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
        )}
        {/* <Notificationbar /> */}
        <ColorPallete colorPallete={globalSettings?.colorPalette} />
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition={Bounce}
          toastClassName='custom-toast'
        />
        <NextTopLoader color={'gray'} showSpinner={false} />
        <ReduxProvider>
          <AOS />
          {/*           <div className="h-screen w-full text-white flex flex-col gap-3 items-center justify-center bg-black">
            <Settings size={75} strokeWidth={1} />
            <h2 className="text-3xl text-center w-full font-semibold tracking-wider">
              WEBSITE UNDER MAINTENANCE
            </h2>
            <p className="text-sm font-light tracking-wides">
              Sorry for the inconvenience will be back soon
            </p>
          </div> */}
          <ValidateUser globalSettings={globalSettings} />
          <Toaster />
          <HeaderWrapper
            logoSettings={globalSettings?.logoSettings}
            headerMenu={globalSettings?.headerMenu}
          />
          {children}
          <FooterMain />
          {/* <FooterWrapper
            logoSettings={globalSettings?.logoSettings}
            headerMenu={globalSettings?.headerMenu}
          /> */}
          <BottomTabs headerMenu={globalSettings?.headerMenu} />
          <FloatingWhatsapp />
          {/* <NotificationPopup /> */}
        </ReduxProvider>
      </body>
    </html>
  )
}
