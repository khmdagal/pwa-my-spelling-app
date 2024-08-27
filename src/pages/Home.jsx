import { useNavigate} from 'react-router-dom'
import Button from '../component/Button';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1> Home Page</h1>
           <Button backgroundColor={'green'} color={'white'} label={'Login'} onClick={()=> navigate('/login')} />
            <p>...........intro page</p>
        </div>
    )
}
export default HomePage