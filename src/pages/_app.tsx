// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import Nav from "@/components/Nav";
// import Header from "@/components/Header";
// import NameChange from "@/components/NameChange";
// import Search from "@/components/Search";
//
// export default function App({ Component, pageProps }: AppProps) {
//   return (
//       <div>
//         <Header />
//         <Nav />  {/* 모든 페이지 상단에 Nav 추가 */}
//         <Component {...pageProps} />
//       </div>
//   );
// }

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { HomeLayout } from "@/components/HomeLayout";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Header />
            <Nav />
            <HomeLayout>
                <Component {...pageProps} />
            </HomeLayout>
        </div>
    );
}