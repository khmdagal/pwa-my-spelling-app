import clasess from '../css/HomePage.module.css'

const HomePage = () => {


    return (
        <div className={clasess.container}>
    <h1>Spelling Practice Web Application</h1>
    <p>An interactive platform designed to help children master their spelling lists with confidence. It makes practice effective, engaging, and enjoyable.</p>

    <p><strong>For Teachers:</strong> Create tailored spelling sessions to suit pupils’ needs, with repeated practice and clear point targets. A built-in competitive element helps maintain motivation while reinforcing accurate spelling.</p>

    <p><strong>For Pupils:</strong> Practise within set timeframes, track progress, and work towards clear goals. Regular practice builds confidence and helps embed correct spelling.</p>

    <span><strong>Key Features</strong></span>

    <ul>
        <li><b>Tailored Practice:</b> Customise sessions using a wide range of words.</li>
        <li><b>Progress Monitoring:</b> Track development and make learning visible and rewarding.</li>
        <li><b>Motivational Challenges:</b> Point-based goals add excitement.</li>
        <li><b>Flexible Scheduling:</b> Practise anytime within the allowed timeframe.</li>
    </ul>

    <p>A simple, engaging way to make spelling practice both effective and enjoyable.</p>
</div>
    )
}
export default HomePage