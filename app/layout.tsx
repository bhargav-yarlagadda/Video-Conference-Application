import {
  ClerkProvider,

} from '@clerk/nextjs'
import './globals.css'
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
    appearance={{
      layout: {
        socialButtonsVariant: "iconButton",
        logoImageUrl: "/icons/yoom-logo.svg",
      },
      variables: {
        colorText: "#fff",
        colorPrimary: "#0E78F9",
        colorBackground: "#1C1F2E",
        colorInputBackground: "#252A41",
        colorInputText: "#fff",
      },
    }}
    >
      <html lang="en">
        <body>

          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}