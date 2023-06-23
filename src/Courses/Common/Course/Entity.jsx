import {
    useEffect,
    useState,
} from 'react'
import { get } from 'App'
import { useMessage } from 'Hooks'
import { Progress } from 'Panel'
import CourseTitle from './CourseTitle'

const Course = ({ guid }) => {

    const [course, setCourse] = useState({})
    const [progress, setProgress] = useState(true)
    const { error } = useMessage()

    useEffect(() => {
        get(`/course/getByGuid?guid=${guid}`)
            .then(data => {
                setProgress(false)
                setCourse(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }, [])

    return progress
        ?
        <Progress />
        :
        <div className="flex gap-2">
            <img
                src={course?.relatedItems?.imageUrl}
                className="w-24 h-36 md:w-48 md:aspect-square object-cover rounded-md"
            />
            {CourseTitle(course)}

        </div>
}

export default Course
