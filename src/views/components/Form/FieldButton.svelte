<script lang="ts">
    import { setIcon } from "obsidian";
    import { ButtonConfig } from "src/core/button/ButtonDefinition";
    import { type FieldValue } from "src/store/formEngine";
    import { onMount } from "svelte";
    import { Writable } from "svelte/store";

    export let button: ButtonConfig;
    export let value: Writable<FieldValue>;

    let buttonElement: HTMLButtonElement;

    onMount(() => {
        if (button.icon && buttonElement) {
            setIcon(buttonElement, button.icon);
        }
    });

    function handleClick(event: MouseEvent) {
        event.preventDefault();
        const result = button.onClick();
        value.set(result);
    }
</script>

<button
    type="button"
    class="field-button"
    on:click={handleClick}
    bind:this={buttonElement}
>
    {#if button.text}
        <span class="field-button-text">{button.text}</span>
    {/if}
</button>

<style>
    .field-button {
        margin-left: 0.5rem;
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--background-modifier-border);
        background-color: var(--interactive-normal);
        color: var(--text-normal);
        border-radius: var(--radius-s);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
    }
    .field-button:hover {
        background-color: var(--interactive-hover);
    }
    .field-button:active {
        background-color: var(--interactive-active);
    }
    .field-button-text {
        white-space: nowrap;
    }
</style>
