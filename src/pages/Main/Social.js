import './Social.css';

import { ReactComponent as LinkIcon } from '../../assets/icons/link.svg';
function Social() {
    // get social data from server - TODO
    // const socialData = await fetchSocialData();

    // mockup social data
    const socialData = [
        {
            title: 'LinkedIn',
            url: 'https://linkedin.com'
        },
        {
            title: 'Github',
            url: 'https://github.com'
        },
        {
            title: 'X',
            url: 'https://x.com'
        },
    ]

    const socialComponents = socialData.map(social => {
        return <SocialComponent socialComponentInstance={social} />
    });

    return (
        <div className="social">
            <div className='social-title'>Social</div>
            <div className="social-content">
                {socialComponents}
            </div>
        </div>
    )
}

function SocialComponent({ socialComponentInstance }) {
    return (
        <a className='social-button' href={socialComponentInstance.url} target="_blank" rel="noopener noreferrer">
            <span>{socialComponentInstance.title}</span>
            <LinkIcon></LinkIcon>
        </a>
    );
}

export default Social;