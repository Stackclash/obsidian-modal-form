import type { FormDefinition } from "./core/formDefinition";

/**
 * Example form demonstrating button support on various field types
 * This example shows how to use the button configuration to add
 * custom behavior like random value generation
 */
export const buttonExampleFormDefinition: FormDefinition = {
    title: "Button Example Form",
    name: "button-example-form",
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
                onClick: (): string => {
                    const names = [
                        "Aragorn",
                        "Gandalf",
                        "Frodo",
                        "Legolas",
                        "Gimli",
                        "Boromir",
                        "Samwise",
                        "Elrond",
                        "Galadriel",
                    ];
                    return names[Math.floor(Math.random() * names.length)]!;
                },
            },
        },
        {
            name: "character_class",
            label: "Character Class",
            description: "Select a class or roll for a random one",
            input: {
                type: "select",
                source: "fixed",
                options: [
                    { value: "warrior", label: "Warrior" },
                    { value: "mage", label: "Mage" },
                    { value: "rogue", label: "Rogue" },
                    { value: "cleric", label: "Cleric" },
                    { value: "ranger", label: "Ranger" },
                ],
            },
            button: {
                icon: "wand",
                onClick: () => {
                    const classes = ["warrior", "mage", "rogue", "cleric", "ranger"];
                    return classes[Math.floor(Math.random() * classes.length)] || "warrior";
                },
            },
        },
        {
            name: "character_backstory",
            label: "Backstory",
            description: "Write a backstory or generate one",
            input: { type: "textarea", hidden: false },
            button: {
                text: "Generate",
                onClick: (): string => {
                    const backstories = [
                        "Born in a small village, destined for greatness.",
                        "Orphaned at a young age, seeks revenge against dark forces.",
                        "Former nobility, now wandering the lands seeking redemption.",
                        "Raised by druids in the forest, protector of nature.",
                        "Street urchin turned hero, fighting for the downtrodden.",
                    ];
                    return backstories[Math.floor(Math.random() * backstories.length)]!;
                },
            },
        },
        {
            name: "stat_roll",
            label: "Stat Roll",
            description: "Roll for a random stat value (3-18)",
            input: { type: "number", hidden: false },
            button: {
                text: "Roll 3d6",
                icon: "dice",
                onClick: () => {
                    const roll =
                        Math.floor(Math.random() * 6) +
                        1 +
                        Math.floor(Math.random() * 6) +
                        1 +
                        Math.floor(Math.random() * 6) +
                        1;
                    return roll.toString();
                },
            },
        },
        {
            name: "quest_date",
            label: "Quest Date",
            description: "Select a date or use today",
            input: { type: "date", hidden: false },
            button: {
                text: "Today",
                onClick: (): string => {
                    const today = new Date();
                    return today.toISOString().split("T")[0]!;
                },
            },
        },
    ],
};
