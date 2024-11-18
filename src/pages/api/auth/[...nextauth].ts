import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import pool from '@lib/db'; // DB 연결 가져오기
import { NextAuthOptions } from 'next-auth';
import { Session, User } from 'next-auth';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET, // 필수 추가
    debug: true, // 디버깅 활성화
    callbacks: {
        async signIn({ user }) {
            try {
                // 구글 로그인 후 얻은 이메일로 DB에서 사용자 확인
                const res = await pool.query('SELECT id FROM member WHERE id = $1', [user.email]);

                // 이메일이 DB에 존재하면 로그인 허용, 없으면 로그인 실패
                if (res.rows.length > 0) {
                    return true; // 로그인 성공
                } else {
                    return false; // 로그인 실패
                }
            } catch (error) {
                console.error('Error during signIn callback:', error);
                return false; // DB 오류 발생 시 로그인 실패
            }
        },
        async session({ session, user }: { session: Session; user: User }) {
            // session.user가 존재하는지 먼저 확인
            if (session?.user) {
                // 세션에 사용자 이메일 추가
                session.user.email = user.email;
            }
            return session;
        }
    }
};

export default NextAuth(authOptions);
