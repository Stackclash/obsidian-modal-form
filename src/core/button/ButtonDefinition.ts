/**
 * Button configuration for form fields
 * Allows fields to have an optional button that executes custom logic
 * and populates the field value with the result
 */
export interface ButtonConfig {
    /**
     * Optional text to display on the button
     */
    text?: string;
    /**
     * Optional Obsidian icon name to render on the button
     */
    icon?: string;
    /**
     * Function executed when button is clicked
     * Must return a string that will be used to populate the field value
     */
    onClick: () => string;
}
