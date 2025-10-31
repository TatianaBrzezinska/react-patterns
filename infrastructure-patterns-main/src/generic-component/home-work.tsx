/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState } from "react";
import styles from "./home-work.module.css";

/** TODO
 * Задание 1.
 *
 * Уберите any из типизации функции DataList.
 * В конечном результате всё должно быть строго типизировано, и подсказки редактора должны быть корректны.
 *
 * Задание 2.
 * Уберите any из типизации функции ArrayFormField.
 * В конечном результате всё должно быть строго типизировано, и подсказки редактора должны быть корректны.
 *
 */

function DataList({
  items,
  renderItem,
  keyExtractor,
}: {
  items: any[];
  renderItem: (item: any) => ReactNode;
  keyExtractor: (item: any) => string | number;
}) {
  return (
    <ul className={styles.dataList}>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

/** TODO Remove any */
function ArrayFormField({
  value,
  onChange,
  renderItem,
  createNewItem,
  validate,
  maxItems = Infinity,
  minItems = 0,
}: {
  value: any[];
  onChange: (value: any[]) => void;
  renderItem: (
    item: any,
    onItemChange: (updatedItem: any) => void
  ) => ReactNode;
  createNewItem: () => any;
  validate?: (items: any[]) => string | null;
  maxItems?: number;
  minItems?: number;
}) {
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = () => {
    if (value.length >= maxItems) {
      setError(`Maximum ${maxItems} items allowed`);
      return;
    }
    const newItem = createNewItem();
    const newValue = [...value, newItem];

    const validationError = validate?.(newValue);
    if (validationError) {
      setError(validationError);
    } else {
      setError(null);
    }
    onChange(newValue);
  };

  const handleRemoveItem = (index: number) => {
    if (value.length <= minItems) {
      setError(`Minimum ${minItems} items required`);
      return;
    }
    const newValue = value.filter((_, i) => i !== index);

    const validationError = validate?.(newValue);
    if (validationError) {
      setError(validationError);
    } else {
      setError(null);
    }

    onChange(newValue);
  };

  const handleItemChange = (index: number, updatedItem: any) => {
    const newValue = [...value];
    newValue[index] = updatedItem;

    const validationError = validate?.(newValue);
    if (validationError) {
      setError(validationError);
    } else {
      setError(null);
    }

    onChange(newValue);
  };

  return (
    <div className={styles.arrayFormField}>
      <div className={styles.arrayItems}>
        {value.map((item, index) => (
          <div key={index} className={styles.arrayItem}>
            {renderItem(item, (updatedItem) =>
              handleItemChange(index, updatedItem)
            )}
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {value.length < maxItems && (
        <button
          type="button"
          onClick={handleAddItem}
          className={styles.addButton}
        >
          Add Item
        </button>
      )}
    </div>
  );
}

// Examples
export function GenericComponentHomeWork() {
  return (
    <div>
      <DataListExample />
      <ArrayFormFieldExample />
    </div>
  );
}

// Example usage
function DataListExample() {
  const users = [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
  ];

  return (
    <div className={styles.container}>
      <section>
        <h2>DataList Example</h2>
        <DataList
          items={users}
          keyExtractor={(user) => user.id}
          renderItem={(user) => (
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
          )}
        />
      </section>
    </div>
  );
}

// Example usage
function ArrayFormFieldExample() {
  interface Contact {
    name: string;
    email: string;
    phone?: string;
  }

  const [contacts, setContacts] = useState<Contact[]>([
    { name: "John Doe", email: "john@example.com" },
  ]);

  const validateContacts = (items: Contact[]) => {
    const hasInvalidEmail = items.some(
      (contact) => !contact.email.includes("@")
    );
    if (hasInvalidEmail) return "All contacts must have valid email addresses";
    return null;
  };

  return (
    <div className={styles.container}>
      <section>
        <h2>Contact List</h2>
        <ArrayFormField
          value={contacts}
          onChange={setContacts}
          createNewItem={() => ({ name: "", email: "", phone: "" })}
          validate={validateContacts}
          maxItems={5}
          minItems={1}
          renderItem={(contact, onChange) => (
            <div className={styles.contactForm}>
              <div className={styles.formRow}>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) =>
                    onChange({ ...contact, name: e.target.value })
                  }
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    onChange({ ...contact, email: e.target.value })
                  }
                  placeholder="Email"
                />
                <input
                  type="tel"
                  value={contact.phone || ""}
                  onChange={(e) =>
                    onChange({ ...contact, phone: e.target.value })
                  }
                  placeholder="Phone (optional)"
                />
              </div>
            </div>
          )}
        />
      </section>
    </div>
  );
}
