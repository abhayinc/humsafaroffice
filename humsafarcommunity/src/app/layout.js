import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
    title: {
        default: 'Humsafar Community | Tours & Travels | Himachal & Uttarakhand Experts',
        template: '%s | Humsafar Community'
    },
    description: 'Explore the world with Humsafar Community (Humsafar Tours and Travels). We specialize in premium tour packages for Himachal Pradesh, Uttarakhand, all over India, and International destinations. Join our community of travelers today.',
    keywords: [
        'Humsafar Community',
        'Humsafar Tours and Travels',
        'Travel Agency India',
        'Himachal Tour Packages',
        'Uttarakhand Tour Packages',
        'Char Dham Yatra',
        'Manali Trip',
        'International Honeymoon Packages',
        'Domestic Travel India',
        'Group Trips India',
        'Budget Travel Packages'
    ],
    openGraph: {
        title: 'Humsafar Community | Best Tours & Travels in India',
        description: 'Specializing in Himachal, Uttarakhand, and International tours. Experience the joy of travel with Humsafar Community.',
        url: 'https://www.humsafarcommunity.com', // Replace with your actual domain
        siteName: 'Humsafar Community',
        images: [
            {
                url: 'https://www.humsafarcommunity.com/og-image.jpg', // Make sure to add this image to your public folder
                width: 1200,
                height: 630,
                alt: 'Humsafar Community Travel Group in Mountains',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Humsafar Community - Travel the World',
        description: 'Expert tour packages for Himachal, Uttarakhand, and International destinations.',
        // creator: '@yourtwitterhandle',
    },
    alternates: {
        canonical: 'https://www.humsafarcommunity.com',
    },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
