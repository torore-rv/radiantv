import "@/styles/globals.css";

import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import HomeLayout from "@/components/HomeLayout";

export default function App({ Component, pageProps: { session, ...pageProps }  }: AppProps<{session: Session}>) {
    return (
        <SessionProvider session={session}>
            <Header />
            <Nav />
            <HomeLayout>
                <Component {...pageProps} />
            </HomeLayout>
        </SessionProvider>
    );
}