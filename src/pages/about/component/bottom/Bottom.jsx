import React, { useEffect, useMemo, useState } from 'react'
import './Bottom.css'

function Bottom() {
    const data = [
        {
            path: '/about/icon.png',
            h3: 'Operating All over the World',
            p: 'Shabdd Technologies serves clients globally, providing tailored IT solutions that drive success across diverse industries.'
        },
        {
            path: '/about/icon2.png',
            h3: 'Trusted by agile Company',
            p: 'Shabdd Technologies is the go-to partner for agile businesses seeking innovative IT solutions that enhance flexibility and drive growth.'
        }
    ]

    const progress = useMemo(() => [
        {
            label: 'Social Media Branding',
            value: '98%',
            width: '98',
        },
        {
            label: 'Secure & Success Rate',
            value: '92%',
            width: '92',
        },
    ], [])

    const [percents, setPercents] = useState(progress.map(() => 0))

    useEffect(() => {
        const targets = progress.map((p) => parseInt(p.width, 10) || 0)

        // staggered reveal: set each percentage after a short delay so CSS transitions run
        const timers = targets.map((t, i) =>
            setTimeout(() => {
                setPercents((prev) => {
                    const next = [...prev]
                    next[i] = t
                    return next
                })
            }, 350 + i * 180)
        )

        return () => timers.forEach((id) => clearTimeout(id))
    }, [progress])

    return (
        <section className="about-container-bottom">
            <div className="about-bottom-inner">
                <div className="about-container-bottom-item">
                    {data.map((item, index) => (
                        <article className="about-bottom-card" key={index}>
                            <img src={item.path} alt="" />
                            <h3>{item.h3}</h3>
                            <p>{item.p}</p>
                        </article>
                    ))}
                </div>

                <div className="about-bottom-content">
                    <h1>
                        Empowering <span>Your Social Media</span> Presence
                    </h1>
                    <p>Shabdd Technologies provides strategic solutions that amplify your brand's voice and engage your audience effectively.</p>

                    <div className="about-bottom-progress-list">
                        {progress.map((item, idx) => (
                            <div className="about-bottom-progress" key={item.label}>
                                <div className="about-bottom-progress-top">
                                    <strong>{item.label}</strong>
                                    <span>{percents[idx]}%</span>
                                </div>
                                <div className="about-bottom-progress-track">
                                    <span style={{ '--progress-width': `${percents[idx]}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Bottom
