import { useCallback, useEffect, useRef, useState } from "react";
import "./index.scss";
import {
    IoIosAdd,
    IoIosArrowUp,
    IoIosCheckmark,
    IoIosPaw,
} from "react-icons/io";

type DropdownProps = {
    direction?: "ltr" | "rtl";
    listItems: {
        text: string;
        selected: boolean;
    }[];
    allowCreateNewItem: boolean;
    onSelectedItemsChanged?: (items: string[]) => void;
    onNewItemCreated?: (item: string) => void;
    defaultValue?: string;
    open?: boolean;
    floating?: boolean;
    size?: "small" | "medium" | "large";
};

export default function Dropdown(props: DropdownProps) {
    // State variables
    const [listItems, setListItems] = useState<{
        text: string;
        selected: boolean;
    }[]>(props.listItems);
    const [listItemsElems, setListItemsElems] = useState<JSX.Element[]>([]);
    const [value, setValue] = useState<string>(props.defaultValue ?? "");
    const [isOpen, setIsOpen] = useState<boolean>(props.open ?? false);

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownListRef = useRef<HTMLDivElement>(null);

    // Callback functions
    const changeSelectedItems = useCallback(
        (text: string, selected: boolean) => {
            // Update the list items
            const items = listItems.map((item) => {
                if (item.text === text)
                    return {
                        text,
                        selected,
                    };
                return item;
            });
            setListItems(items);

            // Call the onSelectedItemsChanged callback if provided
            if (props.onSelectedItemsChanged) {
                const selectedItems = items
                    .filter((item) => item.selected)
                    .map((item) => item.text);
                props.onSelectedItemsChanged(selectedItems);
            }
        },
        [listItems, props]
    );

    const addNewItem = useCallback(
        (text: string, options: { selectIfAlreadyExists: boolean }) => {
            if (props.allowCreateNewItem && text !== "") {
                if (listItems.find((item) => item.text === text) !== undefined) {
                    if (options.selectIfAlreadyExists === false) return;
                    changeSelectedItems(text, true);
                    return;
                }

                // Add the new item to the list
                const newListItems = [
                    ...listItems,
                    {
                        text,
                        selected: true,
                    },
                ];
                setListItems(newListItems);

                // Call the onNewItemCreated callback if provided
                props.onNewItemCreated?.(text);

                // Call the onSelectedItemsChanged callback if provided
                const selectedItems = newListItems
                    .filter((item) => item.selected)
                    .map((item) => item.text);
                props.onSelectedItemsChanged?.(selectedItems);

                // Clear the input value
                setValue("");
            }
        },
        [changeSelectedItems, listItems, props]
    );

    // Element Generators
    const generateItemsElems = useCallback(
        (
            listItems: { text: string; selected: boolean }[],
            options: { newItemText: string }
        ) => {
            const items = listItems.map((item) => {
                return (
                    <li
                        className={`dropdown-item ${
                            item.selected === true ? "selected" : ""
                        }`}
                        onClick={() => changeSelectedItems(item.text, !item.selected)}
                    >
                        <div className={`dropdown-item-title`}>{item.text}</div>
                        <IoIosCheckmark
                            size={30}
                            style={{
                                display: item.selected === true ? "block" : "none",
                            }}
                        />
                    </li>
                );
            });

            // Add the "Add" item if allowed and a new item text is provided
            if (
                props.allowCreateNewItem &&
                options.newItemText &&
                options.newItemText !== ""
            ) {
                items.push(
                    <li
                        className="dropdown-item new-item"
                        onClick={() =>
                            addNewItem(options.newItemText, {
                                selectIfAlreadyExists: false,
                            })
                        }
                    >
                        <div className="dropdown-item-title">{`Add "${options.newItemText}"`}</div>
                        <IoIosAdd size={30} />
                    </li>
                );
            }

            // Add a message if there are no items
            if (items.length === 0)
                items.push(
                    <li className="dropdown-item empty">
                        My doggo ate the items! <IoIosPaw size={30} />
                    </li>
                );

            setListItemsElems(items);
        },
        [addNewItem, changeSelectedItems, props.allowCreateNewItem]
    );

    useEffect(() => {
        // Generate the list item elements
        generateItemsElems(listItems, { newItemText: "" });
    }, [generateItemsElems, listItems]);

    const toggleDropdown = (open: boolean) => {
        setIsOpen(open);
        // Scroll to the list
        setTimeout(() => {
            scrollToItems();
        }, 300);
    };

    const scrollToItems = () => {
        if (dropdownListRef?.current) {
            dropdownListRef?.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "start",
            });
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        // Add event listener for outside click
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const generateInputPlaceholder = (
        items: { text: string; selected: boolean }[]
    ) => {
        let selectedItems = items.filter((item) => item.selected);
        if (selectedItems.length === 0) {
            return "Select...";
        }
        if (selectedItems.length === 1) {
            return selectedItems[0].text;
        }
        return `${selectedItems.length} items selected`;
    };

    const handleInputChange = (text: string) => {
        setValue(text);
        if (text.length > 0) {
            let matchedItems = listItems.filter((item) =>
                item.text.toLowerCase().includes(text.toLowerCase())
            );
            let exactMatch = listItems.find(
                (item) => item.text.toLowerCase() === text.toLowerCase()
            );
            generateItemsElems(matchedItems, {
                newItemText: exactMatch !== undefined ? "" : text,
            });
        }
        if (text.length === 0) {
            generateItemsElems(listItems, { newItemText: "" });
        }
    };

    return (
        <div
            ref={dropdownRef}
            className={`dropdown ${props.size ?? "medium"}-size`}
            style={{
                direction: props.direction ?? "ltr",
            }}
        >
            <div className="dropdown-button" onFocus={() => toggleDropdown(true)}>
                <input
                    ref={inputRef}
                    value={value}
                    type="text"
                    className="dropdown-input"
                    placeholder={generateInputPlaceholder(listItems)}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addNewItem(value, {
                                selectIfAlreadyExists: true,
                            });
                        } else if (e.key === "Escape") {
                            setIsOpen(false);
                        } else if (e.key === "Tab") {
                            toggleDropdown(false);
                        }
                    }}
                />
                <IoIosArrowUp
                    className={`dropdown-icon ${isOpen === true ? "open" : "closed"}`}
                    onClick={() => toggleDropdown(!isOpen)}
                />
            </div>
            <div
                ref={dropdownListRef}
                className={`dropdown-list-container ${
                    isOpen ? "open" : "closed"
                } ${props.floating === true || props.floating === undefined ? "floating" : ""}`}
            >
                <ul className="dropdown-list">{listItemsElems}</ul>
            </div>
        </div>
    );
}
