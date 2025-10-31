import { useEffect, useRef, useState } from "react";
import styles from "./example.module.css";

type Command = "bold" | "italic" | "underline" | "strikethrough";

export function WysiwygExample() {
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: Command) => {
    document.execCommand(command, false);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const isCommandActive = (command: Command): boolean => {
    return document.queryCommandState(command);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  return (
    <div style={{ maxWidth: "640px", margin: "2rem auto" }}>
      <div className={styles.editor}>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={`${styles.button}`}
            onClick={() => execCommand("bold")}
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            className={`${styles.button}`}
            onClick={() => execCommand("italic")}
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            className={`${styles.button}`}
            onClick={() => execCommand("underline")}
            title="Underline"
          >
            U
          </button>
          <button
            type="button"
            className={`${styles.button} ${
              isCommandActive("strikethrough") ? styles.active : ""
            }`}
            onClick={() => execCommand("strikethrough")}
            title="Strikethrough"
          >
            S
          </button>
        </div>
        <div
          ref={editorRef}
          className={styles.content}
          contentEditable
          onInput={handleInput}
          suppressContentEditableWarning
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h3>HTML Output:</h3>
        <pre
          style={{
            padding: "1rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {content}
        </pre>
      </div>
    </div>
  );
}
