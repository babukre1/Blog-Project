import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import { useEffect } from "react";

const CreatePostEditor = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-semibold mt-2",
          levels: [2],
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input p-4",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      const currentContent = editor.getHTML();
      if (currentContent !== description) {
        editor.commands.setContent(description, false); // Prevent focus loss
      }
    }
  }, [description, editor]);

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] ">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default CreatePostEditor;
