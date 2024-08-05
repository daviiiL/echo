import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar.jsx";
import "./styles.scss";
import { useEffect } from "react";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

export default function ArticleEditor({
  setBody, //state setter for article form body state
  initialContent,
  fillerLoaded,
}) {
  const editor = useEditor({
    //tiptap react hook
    extensions,
    onUpdate: ({ editor }) => {
      //this handles on change for editor text box
      setBody(editor.getHTML());
    },
  });

  useEffect(() => {
    //prepopulating data
    if (initialContent && editor.isEmpty) {
      editor.commands.setContent(initialContent.current);
    }
  }, [initialContent, fillerLoaded, editor]);

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}
