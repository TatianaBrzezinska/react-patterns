import {
  createContext,
  RefObject,
  use,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./example.module.css";

type Command = "bold" | "italic" | "underline" | "strikethrough";

export function WysiwygExample() {
  const [content, setContent] = useState(
    `<div>Some text</div><div><strong>Some bold text</strong></div>`
  );
  const wysiwyg = useWysiwyg();
  return (
    <div style={{ maxWidth: "640px", margin: "2rem auto" }}>
      <Wysiwyg initialContent={content} onChange={setContent} />
      <button onClick={() => wysiwyg.setHTML("")}>Rest</button>
      <button onClick={() => wysiwyg.setHTML("hello")}>Set hello</button>
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

type WysiwygMethods = {
  getHTML: () => string;
  setHTML: (html: string) => void;
};

const WysiwygContext = createContext<RefObject<WysiwygMethods> | null>(null);

export function WysiwygProvider({ children }: { children: React.ReactNode }) {
  return (
    <WysiwygContext.Provider
      value={useRef<WysiwygMethods>({
        getHTML: () => "",
        setHTML: () => {},
      })}
    >
      {children}
    </WysiwygContext.Provider>
  );
}

export function useWysiwyg() {
  const methodsRef = use(WysiwygContext);
  if (!methodsRef) {
    throw new Error("useWysiwyg must be used within a WysiwygProvider");
  }
  return {
    setHTML: (html: string) => methodsRef.current.setHTML(html),
    getHTML: () => methodsRef.current.getHTML(),
  };
}

export function Wysiwyg({
  initialContent,
  onChange,
}: {
  initialContent: string;
  onChange: (content: string) => void;
}) {
  const methodsRef = use(WysiwygContext);

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

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const ref = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      el.innerHTML = initialContent;
    }
    editorRef.current = el;
  }, []);

  useImperativeHandle(
    methodsRef,
    () => ({
      getHTML: () => editorRef.current?.innerHTML || "",
      setHTML: (html: string) => {
        if (editorRef.current) {
          editorRef.current.innerHTML = html;
          onChange(html);
        }
      },
    }),
    []
  );

  return (
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
        ref={ref}
        className={styles.content}
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
      />
    </div>
  );
}
