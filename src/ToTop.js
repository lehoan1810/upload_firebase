import Button from '@material-ui/core/Button';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const ToTop = () => {
    
    const scrollTop = () =>{
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    }

    return (
        <Button onClick={scrollTop} 
            style={{position: 'fixed', 
            bottom: '5vh', 
            right: '10vw',
            background: '#f44336',
            borderRadius: '1000px'}}>
            <KeyboardArrowUpIcon/>
        </Button>
    )
}

export default ToTop;