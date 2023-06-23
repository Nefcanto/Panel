import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import CourseHierarchies from './Categories'
import CourseMenuItem from '../Common/CourseMenuItem'
import Courses from './Course/List'
import CourseTags from './Tags'
import Instructors from './Instructor/List'
import ViewCourse from './Course/View'

const CoursesRoutes = [
    {
        path: '/courses',
        component: Courses
    },
    {
        path: "/courseCategories",
        component: CourseHierarchies
    },
    {
        path: "/courseTags",
        component: CourseTags
    },
    {
        path: "/instructors",
        component: Instructors
    },
    {
        path: "/viewCourse",
        component: ViewCourse
    }
]

const CoursesMenu = [
    CourseMenuItem,
    {
        title: 'Instructors',
        icon: SupervisedUserCircleIcon,
        path: '/instructors'
    }
]

export { CoursesMenu }
export { CoursesRoutes }
