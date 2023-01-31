<template>
    <div class="modal-container">
        <div 
            @click="close"
            :class="`modal-background ${isClosing ? 'opacity-0 bg-transparent closingModal': 'opacity-50 bg-gray-900 openingModal' }`" />
        <div :class="`modal-body-container ${ isClosing ? 'opacity-0' : 'opacity-100 openingModalBody' }`">
            <div class="flex flex-row justify-between items-center border-b-2 border-gray-400 pb-2">
                <h2 class="text-xl font-bold">{{title}}</h2>
                <button :click="close" class="bg-red-400 items-center flex justify-center rounded-xl h-8 w-8">
                    <span class="w-6 h-6">
                        X
                    </span>
                </button>
            </div>
            <div class="modal-body">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isClosing = ref(false)

const close = () => {
    isClosing.value = true;
    setTimeout(() => {
        isClosing.value = false;
        emit('onClose')
    }, 200);
}

const props = defineProps({
    title: String,
})

const emit = defineEmits(['onClose'])

</script>