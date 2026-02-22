import React from 'react';
import { Star } from 'lucide-react';

export function Stat({ num, label, gold }) {
    return (
        <div className="ap-stat" style={{ paddingRight: 32, marginRight: 32, borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="ap-stat-num" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: 'white', display: 'flex', alignItems: 'center', gap: 6 }}>
                {num} {gold && <Star className="gold" size={20} fill="#FFB347" color="#FFB347" />}
            </div>
            <div className="ap-stat-lbl" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>
                {label}
            </div>
        </div>
    );
}

export function PortfolioItem({ img, meta }) {
    return (
        <div className="ap-portfolio-item">
            <img src={img} alt="Portfolio" />
            <div className="ap-portfolio-overlay">
                <div className="ap-portfolio-meta">
                    {meta}
                </div>
            </div>
        </div>
    );
}

export function ServiceRow({ name, sub, price, priceSub }) {
    return (
        <div className="ap-service-row">
            <div>
                <div className="ap-service-name">{name}</div>
                <div className="ap-service-sub">{sub}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div className="ap-service-price">{price}</div>
                <div className="ap-service-price-sub">{priceSub}</div>
            </div>
        </div>
    );
}

export function ReviewCard({ name, date, rating, text, initials }) {
    return (
        <div className="ap-review-card">
            <div className="ap-review-head">
                <div className="ap-reviewer-info">
                    <div className="ap-reviewer-avatar">{initials}</div>
                    <div>
                        <div className="ap-reviewer-name">{name}</div>
                        <div className="ap-reviewer-date">{date}</div>
                    </div>
                </div>
                <div className="ap-review-stars">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < rating ? "#FF5C1A" : "transparent"} color={i < rating ? "#FF5C1A" : "#eee"} />
                    ))}
                </div>
            </div>
            <p className="ap-review-text">"{text}"</p>
        </div>
    );
}
