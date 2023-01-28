<template>
    <div class="m-4 flex flex-col justify-start">
        <label :for="inputName">{{ labelText }} :</label>
        <input
            class="
                border-x-2 border-t-2 border-b-4
                p-2 rounded
                duration-300 outline-none
                border-gray-600 focus:border-blue-400
                disabled:border-gray-400
                disabled:text-gray-600
                "
            :type="inputType || 'text'"
            :id="inputName"
            :name="inputName"
            :value="modelValue"
            :required="inputRequired || false"
            :disabled="inputDisabled || false"
            @focusout="emit('onFocusOut',($event.target as any).value)"
            @change="emit('update:modelValue',($event.target as any).value)"
        >
    </div>
</template>

<script lang="ts" setup>

    const emit = defineEmits(['update:modelValue','onFocusOut'])

    const {labelText,modelValue,inputType,inputName} = defineProps({
        modelValue: String,
        inputType: String,
        labelText: String,
        inputName: String,
        inputRequired:Boolean,
        inputDisabled:Boolean
    })

</script>