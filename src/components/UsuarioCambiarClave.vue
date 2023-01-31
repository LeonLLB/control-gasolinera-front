<template>
    <div>
        <span class="m-4">Contraseña generada : {{ password }}</span>
        <div class="mt-4 flex flex-row space-x-4">
            <button class="btn-primary" type="button" @click="regenerar">Regenar contraseña</button>
            <button class="btn-primary" type="button" @click="submit">Cambiar clave</button>
            <button class="btn-danger" type="button" @click="emit('close')">Cancelar</button>
        </div>
    </div>
</template>

<script lang="ts" setup>

    import { ref } from 'vue';
import { notiflix } from '../services/notiflix.service';
    import { userService } from '../services/user.service';
    import { genPassword } from '../utils/genPassword';

    const password= ref(genPassword(5))

    const regenerar = ()=>password.value=genPassword(5)

    const submit = ()=>{
        userService.changePassword(password.value,userId!)
        .then(res=>{
            if(res.message){
                notiflix.toast.failure(res.message)
                return
            }
            notiflix.toast.success('Clave cambiada con exito!')
            emit('close')
        })
    }

    const {userId} = defineProps({
        userId: Number
    })

    const emit = defineEmits(['close'])

</script>