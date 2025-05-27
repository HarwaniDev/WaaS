import React from 'react';

// SVGs for tokens
const SolanaSVG = () => (
    <svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="solana-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FFA3" />
                <stop offset="1" stopColor="#DC1FFF" />
            </linearGradient>
        </defs>
        <rect width="48" height="48" rx="24" fill="#141414" />
        <rect x="10" y="14" width="28" height="4" rx="2" fill="url(#solana-gradient)" />
        <rect x="10" y="22" width="28" height="4" rx="2" fill="url(#solana-gradient)" />
        <rect x="10" y="30" width="28" height="4" rx="2" fill="url(#solana-gradient)" />
    </svg>
);

const USDTSVG = () => (
    <svg width="80" height="80" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
        <circle cx="16" cy="16" r="16" fill="#26A17B" />
        <path
            fill="#FFF"
            d="M17.922 17.383c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042 0 0 0 .001 0 .003-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657zm0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117z"
        />
    </svg>
);

const USDCSVG = () => (
    <svg width="80" height="80" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
        <circle cx="16" cy="16" r="14.5" fill="#42A5F5" />
        <path fill="#455A64" d="M16,31C7.73,31,1,24.27,1,16S7.73,1,16,1s15,6.73,15,15S24.27,31,16,31z M16,2C8.28,2,2,8.28,2,16s6.28,14,14,14s14-6.28,14-14S23.72,2,16,2z" />
        <path fill="#FFFFFF" d="M17.22,21.5h-2.44c-1.53,0-2.78-1.25-2.78-2.78V18.5c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5v0.22c0,0.98,0.8,1.78,1.78,1.78h2.44c0.98,0,1.78-0.8,1.78-1.78c0-0.79-0.53-1.49-1.29-1.71l-3.69-1.05C12.83,15.61,12,14.51,12,13.28c0-1.53,1.25-2.78,2.78-2.78h2.44c1.53,0,2.78,1.25,2.78,2.78v0.22c0,0.28-0.22,0.5-0.5,0.5S19,13.78,19,13.5v-0.22c0-0.98-0.8-1.78-1.78-1.78h-2.44c-0.98,0-1.78,0.8-1.78,1.78c0,0.79,0.53,1.49,1.29,1.71l3.69,1.05c1.19,0.34,2.02,1.44,2.02,2.67C20,20.25,18.75,21.5,17.22,21.5z" />
        <path fill="#FFFFFF" d="M16,23.5c-0.28,0-0.5-0.22-0.5-0.5v-2c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5v2C16.5,23.28,16.28,23.5,16,23.5z" />
        <path fill="#FFFFFF" d="M16,11.5c-0.28,0-0.5-0.22-0.5-0.5V9c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5v2C16.5,11.28,16.28,11.5,16,11.5z" />
        <path fill="#FFFFFF" d="M12.5,26.39c-0.06,0-0.11-0.01-0.17-0.03C7.95,24.81,5,20.64,5,16s2.95-8.81,7.33-10.36c0.26-0.09,0.54,0.04,0.64,0.3c0.09,0.26-0.04,0.55-0.3,0.64C8.68,7.99,6,11.78,6,16s2.68,8.01,6.67,9.42c0.26,0.09,0.4,0.38,0.3,0.64C12.9,26.26,12.71,26.39,12.5,26.39z" />
        <path fill="#FFFFFF" d="M19.5,26.39c-0.21,0-0.4-0.13-0.47-0.33c-0.09-0.26,0.04-0.55,0.3-0.64C23.32,24.01,26,20.22,26,16s-2.68-8.01-6.67-9.42c-0.26-0.09-0.4-0.38-0.3-0.64c0.09-0.26,0.38-0.4,0.64-0.3C24.05,7.19,27,11.36,27,16s-2.95,8.81-7.33,10.36C19.61,26.38,19.56,26.39,19.5,26.39z" />
    </svg>

);

const JupiterSVG = () => (
    <svg width="80" height="80" version="1.1" id="katman_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 800 800" xmlSpace="preserve">
        <defs>
            <style type="text/css">
                {`
                    .st0{fill:#141726;}
                    .st1{fill:url(#SVGID_1_);}
                    .st2{fill:url(#SVGID_2_);}
                    .st3{fill:url(#SVGID_3_);}
                    .st4{fill:url(#SVGID_4_);}
                    .st5{fill:url(#SVGID_5_);}
                    .st6{fill:url(#SVGID_6_);}
                `}
            </style>
        </defs>
        <circle className="st0" cx="400" cy="400" r="400" />
        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="574.9257" y1="665.8727" x2="248.5257" y2="142.3127" gradientTransform="matrix(1 0 0 -1 0 800)">
            <stop offset="0.16" style={{ stopColor: '#C6F462' }} />
            <stop offset="0.89" style={{ stopColor: '#33D9FF' }} />
        </linearGradient>
        <path className="st1" d="M536,568.9c-66.8-108.5-166.4-170-289.4-195.6c-43.5-9-87.2-8.9-129.4,7.7c-28.9,11.4-33.3,23.4-19.7,53.7
	c92.4-21.9,178.4-1.5,258.9,45c81.1,46.9,141.6,112.2,169.1,205c38.6-11.8,43.6-18.3,34.3-54.2C554.3,609.4,547.4,587.4,536,568.9
	L536,568.9z"/>
        <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="572.5896" y1="667.3303" x2="246.1996" y2="143.7703" gradientTransform="matrix(1 0 0 -1 0 800)">
            <stop offset="0.16" style={{ stopColor: '#C6F462' }} />
            <stop offset="0.89" style={{ stopColor: '#33D9FF' }} />
        </linearGradient>
        <path className="st2" d="M609.1,480.6c-85.8-125-207.3-194.9-355.8-218.3c-39.3-6.2-79.4-4.5-116.2,14.3c-17.6,9-33.2,20.5-37.4,44.9
	c115.8-31.9,219.7-3.7,317.5,53c98.3,57,175.1,133.5,205,251.1c20.8-18.4,24.5-41,19.1-62C633.9,534.8,625.5,504.5,609.1,480.6
	L609.1,480.6z"/>
        <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="577.0148" y1="664.5671" x2="250.6247" y2="141.0071" gradientTransform="matrix(1 0 0 -1 0 800)">
            <stop offset="0.16" style={{ stopColor: '#C6F462' }} />
            <stop offset="0.89" style={{ stopColor: '#33D9FF' }} />
        </linearGradient>
        <path className="st3" d="M105,488.6c7.3,16.2,12.1,34.5,23,47.6c5.5,6.7,22.2,4.1,33.8,5.7c1.8,0.2,3.6,0.5,5.4,0.7
	c102.9,15.3,184.1,65.1,242.1,152c3.4,5.1,8.9,12.7,13.4,12.7c17.4-0.1,34.9-2.8,52.5-4.5C449,557.5,232.8,438.3,105,488.6
	L105,488.6z"/>
        <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="569.0272" y1="669.5518" x2="242.6272" y2="145.9917" gradientTransform="matrix(1 0 0 -1 0 800)">
            <stop offset="0.16" style={{ stopColor: '#C6F462' }} />
            <stop offset="0.89" style={{ stopColor: '#33D9FF' }} />
        </linearGradient>
        <path className="st4" d="M656.6,366.7C599.9,287.4,521.7,234.6,432.9,197c-61.5-26.1-125.2-41.8-192.8-33.7
	c-23.4,2.8-45.3,9.5-63.4,24.7c230.9,5.8,404.6,105.8,524,303.3c0.2-13.1,2.2-27.7-2.6-39.5C686.1,422.5,674.7,392,656.6,366.7z"/>
        <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="571.6973" y1="667.8917" x2="245.2973" y2="144.3317" gradientTransform="matrix(1 0 0 -1 0 800)">
            <stop offset="0.16" style={{ stopColor: '#C6F462' }} />
            <stop offset="0.89" style={{ stopColor: '#33D9FF' }} />
        </linearGradient>
        <path className="st5" d="M709.8,325.3c-47-178.9-238-265-379.2-221.4C482.7,133.9,607.5,206.4,709.8,325.3z" />
        <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="579.0382" y1="663.3111" x2="252.6482" y2="139.7511" gradientTransform="matrix(1 0 0 -1 0 800)">
            <stop offset="0.16" style={{ stopColor: '#C6F462' }} />
            <stop offset="0.89" style={{ stopColor: '#33D9FF' }} />
        </linearGradient>
        <path className="st6" d="M155.4,583.9c54.6,69.3,124,109.7,213,122.8C334.4,643.2,214.6,574.5,155.4,583.9L155.4,583.9z" />
    </svg>
);

const RaydiumSVG = () => (
    <svg width="80" height="80" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        viewBox="0 0 32 36.9" xmlSpace="preserve">
        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="32.95" y1="26.3048" x2="-0.9788" y2="12.7367" gradientTransform="matrix(1 0 0 -1 0 38)">
            <stop offset="0" style={{ stopColor: '#C200FB' }} />
            <stop offset="0.4897" style={{ stopColor: '#3772FF' }} />
            <stop offset="1" style={{ stopColor: '#5AC4BE' }} />
        </linearGradient>
        <path className="st0" d="M30.3,13.9v12.9L16,35L1.7,26.7V10.2L16,1.9l11,6.4l1.7-1L16,0L0,9.2v18.5l16,9.2l16-9.2V12.9L30.3,13.9z" />
        <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="32.2949" y1="27.9428" x2="-1.6339" y2="14.3747" gradientTransform="matrix(1 0 0 -1 0 38)">
            <stop offset="0" style={{ stopColor: '#C200FB' }} />
            <stop offset="0.4897" style={{ stopColor: '#3772FF' }} />
            <stop offset="1" style={{ stopColor: '#5AC4BE' }} />
        </linearGradient>
        <path className="st1" d="M12,26.8H9.6v-8h8c0.8,0,1.5-0.3,2-0.9c0.5-0.5,0.8-1.3,0.8-2c0-0.4-0.1-0.7-0.2-1.1c-0.1-0.3-0.4-0.7-0.6-0.9
    c-0.3-0.3-0.6-0.5-0.9-0.6S18,13,17.6,13h-8v-2.4h8c1.4,0,2.7,0.6,3.7,1.6c1,1,1.6,2.3,1.6,3.7c0,1.1-0.3,2.1-0.9,3
    c-0.6,0.8-1.4,1.5-2.3,1.9c-0.9,0.3-1.9,0.4-2.9,0.4H12V26.8z"/>
        <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="35.6876" y1="19.4591" x2="1.7588" y2="5.891" gradientTransform="matrix(1 0 0 -1 0 38)">
            <stop offset="0" style={{ stopColor: '#C200FB' }} />
            <stop offset="0.4897" style={{ stopColor: '#3772FF' }} />
            <stop offset="1" style={{ stopColor: '#5AC4BE' }} />
        </linearGradient>
        <path className="st2" d="M22.8,26.6H20l-2.2-3.8c0.9-0.1,1.7-0.2,2.5-0.5L22.8,26.6z" />
        <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="32.0678" y1="28.5037" x2="-1.861" y2="14.9356" gradientTransform="matrix(1 0 0 -1 0 38)">
            <stop offset="0" style={{ stopColor: '#C200FB' }} />
            <stop offset="0.4897" style={{ stopColor: '#3772FF' }} />
            <stop offset="1" style={{ stopColor: '#5AC4BE' }} />
        </linearGradient>
        <path className="st3" d="M28.7,11.2l1.7,0.9l1.7-0.9V9.2l-1.7-1l-1.7,1V11.2z" />
    </svg>
)

const BackgroundDecorations = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Left Side Stickers */}
            <div className="absolute top-24 left-0 opacity-30 animate-float -translate-x-1/6">
                <SolanaSVG />
            </div>
            <div className="absolute top-1/2 left-0 opacity-30 animate-float -translate-x-1/24" style={{ animationDelay: '1s' }}>
                <USDTSVG />
            </div>
            <div className="absolute bottom-24 left-0 opacity-30 animate-float -translate-x-1/12" style={{ animationDelay: '2s' }}>
                <JupiterSVG />
            </div>

            {/* Right Side Stickers */}
            <div className="absolute top-32 right-0 opacity-30 animate-float translate-x-1/6">
                <USDCSVG />
            </div>
            <div className="absolute bottom-1/3 right-0 opacity-30 animate-float translate-x-1/8" style={{ animationDelay: '2s' }}>
                <RaydiumSVG />
            </div>
            <div className="absolute bottom-10 right-0 opacity-30 animate-float translate-x-1/12" style={{ animationDelay: '1s' }}>
                <SolanaSVG />
            </div>
        </div>
    );
};

export default BackgroundDecorations; 