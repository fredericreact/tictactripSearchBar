import Photo from '../../assets/img/photo.jpg'
import classes from './Banner.module.css'
const Banner = () => {
    return (
        <div className={classes.banner}>
        <img src={Photo} className={classes.picture}/>
        </div>
    )
}

export default Banner