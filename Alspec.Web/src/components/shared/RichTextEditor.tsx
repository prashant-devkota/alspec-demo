import { forwardRef } from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css';

export type RichTextEditorRef = ReactQuill

const RichTextEditor = forwardRef<RichTextEditorRef>(
    (props, ref) => {
        return (
            <div className="rich-text-editor">
                <ReactQuill ref={ref} {...props} />
            </div>
        )
    }
)

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
