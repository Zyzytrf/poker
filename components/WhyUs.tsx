import React from 'react';
import { FEATURES } from '../constants';
import { Feature } from '../types';

interface FeatureCardProps {
    feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
    return (
        <div className="text-center p-6">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-gray mb-6 mx-auto">
                {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
        </div>
    );
};


const WhyUs: React.FC = () => {
    return (
        <section className="py-20 bg-brand-gray/90 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-white">Các Tính Năng Vượt Trội</h2>
                    <p className="mt-2 text-lg text-gray-400">Tại sao giới tinh hoa chọn DUBAI79.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((feature) => (
                        <FeatureCard key={feature.title} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;