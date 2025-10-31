import styles from "./example.module.css";
import { useEffect, useRef, useState, KeyboardEvent } from "react";

const options = ["Option 1" as const, "Option 2" as const, "Option 3"];

const posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

export function GenericComponentExample() {
  const [value1, setValue1] = useState<(typeof options)[number]>(options[0]);
  const [value2, setValue2] = useState(posts[0].id);
  const [value3, setValue3] = useState(users[0]);

  return (
    <div style={{ padding: "20px" }}>
      <SharedSelect options={options} value={value1} onChange={setValue1} />
      <SharedSelect
        options={users}
        getLabel={(user) => user.name}
        value={value3}
        onChange={setValue3}
      />
      <SharedSelect
        options={posts}
        getValue={(post) => post.id}
        getLabel={(post) => post.title}
        value={value2}
        onChange={setValue2}
      />
    </div>
  );
}

function SharedSelect<T extends string | number>(props: {
  options: T[];
  onChange?: (value: T) => void;
  value?: T;
}): React.ReactElement;
function SharedSelect<T>(props: {
  options: T[];
  getLabel: (value: T) => string | number;
  onChange?: (value: T) => void;
  value?: T;
}): React.ReactElement;
function SharedSelect<T, V>(props: {
  options: T[];
  getValue: (value: T) => V;
  getLabel: (value: T) => string | number;
  onChange?: (value: V) => void;
  value?: V;
}): React.ReactElement;
function SharedSelect({
  options,
  getValue = (value) => value,
  getLabel = (value) => String(value),
  onChange,
  value,
}: {
  options: unknown[];
  getValue?: (value: unknown) => unknown;
  getLabel?: (value: unknown) => string | number;
  onChange?: (value: unknown) => void;
  value?: unknown;
}): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    String(getLabel(option)).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLabel = value
    ? getLabel(options.find((opt) => getValue(opt) === value)!)
    : "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          if (filteredOptions[highlightedIndex]) {
            onChange?.(getValue(filteredOptions[highlightedIndex]));
            setIsOpen(false);
            setSearchTerm("");
          }
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        break;
    }
  };

  return (
    <div
      className={styles.selectContainer}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`${styles.selectTrigger} ${isOpen ? styles.open : ""}`}
        role="combobox"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        aria-controls="listbox"
        aria-owns="listbox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={0}
      >
        {selectedLabel || "Select an option"}
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <input
            ref={searchInputRef}
            type="text"
            className={styles.search}
            placeholder="Search..."
            autoFocus
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setHighlightedIndex(0);
            }}
          />
          <ul className={styles.optionsList} role="listbox">
            {filteredOptions.map((option, index) => (
              <li
                key={String(getValue(option))}
                className={`${styles.option} ${
                  getValue(option) === value ? styles.selected : ""
                } ${index === highlightedIndex ? styles.highlighted : ""}`}
                onClick={() => {
                  onChange?.(getValue(option));
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={getValue(option) === value}
              >
                {getLabel(option)}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className={styles.noResults}>No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
