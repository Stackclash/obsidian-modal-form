# Button Support for Modal Form Fields

This feature adds optional button support to modal form fields, allowing you to define custom behavior (like random value generation) that populates the field when the button is clicked.

## Overview

Buttons can be added to value-based field types (text, textarea, select, number, date, etc.) to provide quick actions that populate the field value. Common use cases include:
- Random value generation (dice rolls, name generators)
- Date/time helpers (set to today, now, etc.)
- Value transformations or calculations
- Pre-configured options

## Usage

### Basic Example

```typescript
import { FormDefinition } from "obsidian-modal-form";

const formDefinition: FormDefinition = {
    title: "Character Creator",
    name: "character-form",
    version: "1",
    fields: [
        {
            name: "character_name",
            label: "Character Name",
            description: "Click the dice to generate a random name",
            input: { type: "text", hidden: false },
            button: {
                text: "Roll",
                icon: "dice",
                onClick: () => {
                    const names = ["Aragorn", "Gandalf", "Frodo", "Legolas"];
                    return names[Math.floor(Math.random() * names.length)]!;
                }
            }
        }
    ]
};
```

## Button Configuration

### ButtonConfig Interface

```typescript
interface ButtonConfig {
    /**
     * Optional text to display on the button
     */
    text?: string;
    
    /**
     * Optional Obsidian icon name to render on the button
     * See: https://lucide.dev for available icons
     */
    icon?: string;
    
    /**
     * Function executed when button is clicked
     * Must return a string that will be used to populate the field value
     */
    onClick: () => string;
}
```

### Properties

- **`text`** (optional): Text label displayed on the button. If omitted, only the icon will show.
- **`icon`** (optional): Obsidian icon name (from Lucide icon set). If omitted, only text will show.
- **`onClick`** (required): Function that returns a string to populate the field. This function is executed when the button is clicked.

### Field Types Supporting Buttons

Buttons can be added to any value-based field type:
- `text` - Text input fields
- `textarea` - Multi-line text areas
- `number` - Number input fields
- `date` - Date picker fields
- `time` - Time picker fields
- `datetime` - Date/time picker fields
- `email` - Email input fields
- `tel` - Phone number fields
- `select` - Dropdown/select fields
- `slider` - Slider fields (returns stringified number)

## Examples

### Text Button Only
```typescript
button: {
    text: "Generate",
    onClick: () => "Generated Value"
}
```

### Icon Button Only
```typescript
button: {
    icon: "dice",
    onClick: () => "Random Value"
}
```

### Text + Icon Button
```typescript
button: {
    text: "Roll",
    icon: "dice",
    onClick: () => {
        return Math.floor(Math.random() * 20 + 1).toString();
    }
}
```

### Date Helper
```typescript
button: {
    text: "Today",
    onClick: () => {
        return new Date().toISOString().split("T")[0]!;
    }
}
```

### Select Field with Random Option
```typescript
{
    name: "class",
    label: "Character Class",
    input: {
        type: "select",
        source: "fixed",
        options: [
            { value: "warrior", label: "Warrior" },
            { value: "mage", label: "Mage" },
            { value: "rogue", label: "Rogue" }
        ]
    },
    button: {
        icon: "wand",
        onClick: () => {
            const classes = ["warrior", "mage", "rogue"];
            return classes[Math.floor(Math.random() * classes.length)]!;
        }
    }
}
```

## Opening a Form with Buttons

Buttons can only be used in programmatically created forms (not in forms saved to settings, since functions cannot be serialized).

```typescript
// Using the API
const modalFormAPI = app.plugins.plugins["modal-form"].api;
const result = await modalFormAPI.openModalForm(formDefinition);
```

## Testing the Feature

A complete example form is available for testing:

```typescript
const result = await modalFormAPI.buttonExampleForm();
```

This example demonstrates:
- Text input with random name generation
- Select field with random class selection
- Textarea with backstory generation
- Number field with dice roll (3d6)
- Date field with "Today" helper

## Important Notes

1. **Form Submission**: Buttons do not submit the form. They only populate the field value.
2. **Return Type**: The `onClick` function must return a string. For number fields, convert to string using `.toString()`.
3. **Persistence**: Buttons are runtime-only and cannot be saved in form definitions stored in settings.
4. **Icons**: Use icon names from the Lucide icon set (same as Obsidian's built-in icons).
5. **Error Handling**: Ensure your `onClick` function always returns a valid string to avoid type errors.

## Backward Compatibility

Fields without buttons continue to work exactly as before. The button property is completely optional and has no impact on existing form definitions or saved forms.
