import CodeIcon from '@mui/icons-material/Code'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import app from 'App'
import MarkButton from './MarkButton'
import BlockButton from './BlockButton'
import ImageButton from './ImageButton'
import AddComponentButton from './AddComponentButton'
import GenerateData from './GenerateData'
import TableSelector from './TableSelector'
import TableContextMenu from './TableContextMenu'
import Toolbar from './Toolbar'
import isBlockActive from './IsBlockActive'
import LinkButton from './LinkButton'

const ComplexToolbar = ({ editor }) => {
    return <Toolbar>
        <MarkButton
            format="bold"
            icon={FormatBoldIcon}
            title="Make it bold"
        // text='Make it bold'
        />
        <MarkButton
            format="italic"
            icon={FormatItalicIcon}
            title="make it italic"
        />
        <MarkButton
            format="underline"
            icon={FormatUnderlinedIcon}
            title="add underLine"
        />
        <MarkButton
            format="strikethrough"
            icon={FormatStrikethroughIcon}
            title="add strikethrough"
        />
        <MarkButton
            format="code"
            icon={CodeIcon}
            title="code"
        />
        <BlockButton
            format="heading-one"
            icon={LooksOneIcon}
            title="h-1"
        />
        <BlockButton
            format="heading-two"
            icon={LooksTwoIcon}
            title="h-2"
        />
        <BlockButton
            format="heading-three"
            icon={Looks3Icon}
            title="h-3"
        />
        <BlockButton
            format="heading-four"
            icon={Looks4Icon}
            title="h-4"
        />
        <BlockButton
            format="block-quote"
            icon={FormatQuoteIcon}
            title="block-qoute"
        />
        <BlockButton
            format="numbered-list"
            icon={FormatListNumberedIcon}
            title="numbered list"
        />
        <BlockButton
            format="bulleted-list"
            icon={FormatListBulletedIcon}
            title="bulleted list"
        />
        <ImageButton
            format="image"
            icon={InsertPhotoIcon}
            title="add image"
        />
        <LinkButton
            active={isBlockActive(editor, 'link')}
            editor={editor}
            title="add link"
        />
        <AddComponentButton
            title="add component"
        />
        {
            app.isDevOrSuperAdmin()
            &&
            <GenerateData
                title="Generate sample content"
            />}
        <TableSelector editor={editor} />
        <TableContextMenu editor={editor} />
    </Toolbar>
}

export default ComplexToolbar
