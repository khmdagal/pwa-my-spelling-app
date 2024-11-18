import ClipLoader from "react-spinners/ClipLoader";
function Spinner() {
    return (
        <div className="sweet-loading green">
            <ClipLoader color="#367b" size={70} speedMultiplier={0.6} />
        </div>
    );
}

export default Spinner;