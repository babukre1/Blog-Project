import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import { Bold, Heading2, Italic } from "lucide-react";
type Props = {
  editor: Editor | null;
};
const Toolbar = ({ editor }: Props) => {
  if (!editor) return null;
  return (
    <div className="border border-input bg-transparent rounded-br-sm">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("semibold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default Toolbar;
