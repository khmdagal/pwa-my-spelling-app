import clasess from '../css/HomePage.module.css'

const HomePage = () => {


    return (
        <div className={clasess.container}>
            <h1>Spelling Practice Web Application</h1>
            <p>Welcome to our Spelling Practice Web Application – an interactive platform designed to help children confidently master their statutory spelling lists. This tool makes spelling practice both effective and enjoyable, encouraging skill development in a fun, engaging setting.</p>
            <p><strong>For Teachers:</strong> The application provides flexibility for educators to create tailored spelling sessions suited to their pupils' needs. Teachers can set up repeated practice with specific point targets assigned by school administrators. The built-in competitive element helps keep pupils motivated while reinforcing accurate spelling through structured repetition.</p>
            <p><strong>For Pupils:</strong> Pupils can practise spellings within set timeframes, track their progress, and work towards clearly defined goals. This consistent practice builds confidence, promotes a sense of achievement, and helps embed correct spellings through both conscious effort and regular exposure.</p>
            <span><strong>Key Features</strong></span>

            <ul>
                <li><strong>Tailored Practice:</strong> Teachers can customise sessions using words from statutory lists and beyond, adapting to class.</li>
                <li><strong>Progress Monitoring:</strong> Pupils can see their development, making learning more transparent, rewarding and fun.</li>
                <li><strong>Motivational Challenges:</strong> Competitive point-based goals add excitement to practice sessions.</li>
                <li><strong>Flexible Scheduling:</strong> Pupils can practise anytime within the allowed timeframe, fitting around their routine.</li>
            </ul>
            <p>This web application bridges the gap between learning and enjoyment, making spelling practice a positive and productive experience. Let’s make spelling exciting for every pupil!</p>
        </div>
    )
}
export default HomePage