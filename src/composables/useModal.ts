import { ref } from "vue"


export const useModal = () => {
    const isOpen = ref(false)
    const isClosing = ref(false)
    
    const toggleModal = ()=>{
        if (isOpen.value) {
            isClosing.value = true;
            setTimeout(() => {
                isOpen.value = false;
                isClosing.value = false;
            }, 200);
        } else {
            isOpen.value = true;
        }
    }

    return {isOpen,isClosing,toggleModal}
}