// import React from 'react'



// const AboutPage = () => {
//     return (
//         <div>AboutPage</div>
//     )
// }

// export default AboutPage


import AnimatedService from "@/components/OtherSections/AnimatedService"
import CTA from "@/components/OtherSections/CTA"
import LuxuryFeatures from "@/components/OtherSections/LuxuryFeatures"
import ParallaxHeroSection from "@/components/OtherSections/ParallaxHeroSection"
import TextSection from "@/components/OtherSections/TextSection"

const AboutPage = () => {
    return (
        <div className='primaryBg'>

            <div>
                <TextSection />
            </div>


            <div>
                <ParallaxHeroSection />
            </div>

            <div>
                <LuxuryFeatures />
            </div>

            <div>
                <AnimatedService />
            </div>


            <div>
                <CTA />
            </div>


        </div>
    )
}

export default AboutPage