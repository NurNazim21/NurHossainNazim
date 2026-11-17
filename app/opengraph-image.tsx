import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const dynamic = 'force-static';

export const alt = `${profile.name} — AI & Machine Learning Engineer Portfolio`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0E0E0C',
          color: '#F4F3EE',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
            color: '#9C9A91',
            borderBottom: '1px solid rgba(244, 243, 238, 0.14)',
            paddingBottom: 24,
          }}
        >
          <span>{profile.coordinates} · Dhaka, Bangladesh</span>
          <span style={{ color: '#F04438' }}>AI · ML · Data Science</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 78, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 30, color: '#9C9A91', maxWidth: 920, lineHeight: 1.35 }}>
            Final-year B.Sc. CSE at United International University — Multimodal RAG, CNNs, and
            Echocardiography ML Research.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <svg width="1056" height="64" viewBox="0 0 1056 64" fill="none">
            <path
              d="M0 36 H340 L356 26 L372 36 H392 L404 46 L420 6 L438 58 L452 24 L468 36 H488 L504 20 L520 36 H1056"
              stroke="#F04438"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 18,
              color: '#9C9A91',
            }}
          >
            <span>github.com/NurNazim21</span>
            <span>linkedin.com/in/nur-hossain-nazim</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
