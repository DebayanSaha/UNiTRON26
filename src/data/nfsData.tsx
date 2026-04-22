import React from 'react';

export interface NFSTile {
    id: string | number;
    cols: string;
    rows: string;
    images: string[];
    label: string;
    icon?: React.ReactNode;
    value: string;
    unit?: string;
}

export const gridTiles: NFSTile[] = [
    {
        id: 1,
        label: 'FAVORITE EVENT',
        value: 'UNITRON 2025',
        cols: 'col-span-4 md:col-span-2',
        rows: 'row-span-2 md:row-span-2',
        icon: '🏆',
        images: [
            '/images/event-1.jpg',
            '/images/event-2.jpg',
            '/images/event-3.jpg',
            '/images/event-4.jpg'
        ]
    },
    {
        id: 2,
        label: 'Domain',
        value: 'Non-Tech',
        cols: 'col-span-2 md:col-span-2',
        rows: 'row-span-1 md:row-span-1',
        icon: '⏱️',
        images: [
            '/memories/NT1.webp',
            '/memories/NT2.webp',
            '/memories/NT3.webp'
        ]
    },
    {
        id: 3,
        label: 'TOP SPEED',
        value: '146',
        unit: 'MPH',
        cols: 'col-span-1 md:col-span-1',
        rows: 'row-span-1 md:row-span-1',
        icon: '🏎️',
        images: [
            '/images/speed-1.jpg',
            '/images/speed-2.jpg',
            '/images/speed-3.jpg',
            '/images/speed-4.jpg'
        ]
    },
    {
        id: 4,
        label: 'BANK EARNED',
        value: '$2,000',
        cols: 'col-span-1 md:col-span-1',
        rows: 'row-span-1 md:row-span-1',
        icon: '💰',
        images: [
            '/images/bank-1.jpg',
            '/images/bank-2.jpg',
            '/images/bank-3.jpg',
            '/images/bank-4.jpg'
        ]
    },
    {
        id: 5,
        label: 'TOTAL LIKES',
        value: '4,500',
        cols: 'col-span-2 md:col-span-1',
        rows: 'row-span-1 md:row-span-2',
        icon: '👍',
        images: [
            '/images/likes-1.jpg',
            '/images/likes-2.jpg',
            '/images/likes-3.jpg',
            '/images/likes-4.jpg'
        ]
    },
    {
        id: 6,
        label: 'US',
        value: 'THE TEAM',
        cols: 'col-span-2 md:col-span-1',
        rows: 'row-span-1 md:row-span-1',
        icon: '🔧',
        images: [
            '/memories/Team1.webp',
            '/memories/Team2.webp',
            '/memories/Team3.webp'
        ]
    },
    {
        id: 7,
        label: 'Domain',
        value: 'Coding',
        cols: 'col-span-2 md:col-span-2',
        rows: 'row-span-1 md:row-span-1',
        icon: '🌙',
        images: [
            '/memories/Coding1.JPG',
            '/memories/Coding2.JPG',
            '/memories/Coding3.JPG'
        ]
    },
    {
        id: 8,
        label: 'Domain',
        value: 'Gaming',
        cols: 'col-span-2 md:col-span-2',
        rows: 'row-span-1 md:row-span-1',
        icon: '🎮',
        images: [
            '/memories/Gaming1.webp',
            '/memories/Gaming2.webp',
            '/memories/Gaming3.webp'
        ]
    },
    {
        id: 9,
        label: 'Domain',
        value: 'Tech',
        cols: 'col-span-4 md:col-span-3',
        rows: 'row-span-1 md:row-span-1',
        icon: '🔥',
        images: [
            '/memories/Tech1.webp',
            '/memories/Tech2.webp',
            '/memories/Tech3.webp',
            '/memories/Tech4.webp',
            '/memories/Tech5.webp',
        ]
    }
];
