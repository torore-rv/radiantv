import { Pool } from 'pg';

// PostgreSQL 연결 풀 생성
const pool = new Pool({
    user: process.env.DB_USER,     // PostgreSQL 사용자 이름
    host: process.env.DB_HOST,     // PostgreSQL 서버 주소
    database: process.env.DB_NAME, // 데이터베이스 이름
    password: process.env.DB_PASSWORD, // 비밀번호
    port: process.env.DB_PORT || 5432,  // PostgreSQL 포트
});

export default pool;