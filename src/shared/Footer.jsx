import React from 'react';

const footerLinks = [
    {
        category: 'Support',
        links: [
            { text: 'Help Center', url: 'https://rail-yatra-support.vercel.app' },
            { text: 'Get help with a safety issue', url: 'https://rail-yatra-support.vercel.app' },
            { text: 'RailYatra Cover', url: 'https://rail-yatra-support.vercel.app' },
            { text: 'Supporting people with disabilities', url: 'https://rail-yatra-support.vercel.app' },
            { text: 'Cancellation options', url: 'https://rail-yatra-support.vercel.app' },
            { text: 'Our Covid-19 response', url: 'https://covid19-rail-yatra.netlify.app' },
            { text: 'Report a neighborhood concern', url: 'https://rail-yatra-support.vercel.app' },
        ]
    },
    {
        category: 'Community',
        links: [
            { text: 'RailYatra.org: Disaster relief housing', url: 'https://rail-yatra-support.vercel.app' },
            { text: 'Combating discrimination', url: 'https://rail-yatra-support.vercel.app' },
        ]
    },
    {
        category: 'Hosting',
        links: [
            { text: 'Host your home on RailYatra', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
            { text: 'RailYatra Cover for Hosts', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
            { text: 'Explore hosting resources', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
            { text: 'Visit our community forum', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
            { text: 'How to host responsibly', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
            { text: 'RailYatra friendly apartments', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
        ]
    },
    {
        category: 'RailYatra',
        links: [
            { text: 'Newsroom', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
            { text: 'RailYatra Cover for Hosts', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
            { text: 'Explore hosting resources', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
            { text: 'Visit our community forum', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
            { text: 'How to host responsibly', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
            { text: 'RailYatra friendly apartments', url: 'https://rail-yatra-hosting.vercel.app/host/homes' },
        ]
    },
];

const socialIcons = [
    { name: 'Facebook', url: 'https://www.facebook.com', icon: 'facebookIcon.svg' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sk-mirajul-islam-876438261/', icon: 'linkedinIcon.svg' },
];

const Footer = () => {
    return (
        <footer className="py-12 font-poppins bg-[#f7f7f7] border-t border-[#dddddd] text-sm text-[#222222] relative bottom-0 z-[20]">
            <section className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-between max-w-screen-2xl mx-auto px-10">
                {footerLinks.map((section, index) => (
                    <div key={index} className="flex flex-col gap-4 opacity-80">
                        <h6 className="font-semibold">{section.category}</h6>
                        {section.links.map((link, idx) => (
                            <a key={idx} href={link.url}>
                                <p>{link.text}</p>
                            </a>
                        ))}
                    </div>
                ))}
            </section>
            <hr className="bg-[#f7f7f7] mt-10 mb-6" />
            <section className="flex flex-row flex-wrap justify-between gap-10 px-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-row gap-5 min-w-[120px] items-center">
                    <p>© 2024 Journey Cuisine, Inc.</p>
                    <span className="p-3">·</span>
                    <p>Terms</p>
                    <span className="p-3">·</span>
                    <p>Privacy</p>
                    <span className="p-3">·</span>
                    <p>Your Privacy Choices</p>
                </div>
                <div className="flex flex-row gap-5 min-w-[120px] items-center">
                    <p>English (US)</p>
                    {socialIcons.map((icon, idx) => (
                        <a key={idx} href={icon.url}>
                            <img src={icon.icon} alt={icon.name} className="w-6" />
                        </a>
                    ))}
                </div>
            </section>
        </footer>
    );
};

export default Footer;
