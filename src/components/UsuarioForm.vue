<template>
    <form @submit="onSubmit">
        <FormInput v-model="form.usuario" input-required input-name="usuario" label-text="Usuario"/>
        <FormInput v-model="form.cedula" input-required input-name="cedula" label-text="Cedula"/>
        <span class="m-4">Contraseña generada : {{ form.password }}</span>
        <div class="mt-4 flex flex-row space-x-4">
            <button class="btn-primary" type="button" @click="regenerar">Regenar contraseña</button>
            <button class="btn-primary" type="submit">Registrar usuario</button>
            <button class="btn-danger" type="button" @click="emit('onClose')">Cancelar</button>
        </div>
    </form>
</template>

<script lang="ts" setup>

    import { ref } from 'vue';
import { notiflix } from '../services/notiflix.service';
    import { userService } from '../services/user.service';
    import { genPassword } from '../utils/genPassword';
    import FormInput from './FormInput.vue';

    const form = ref({
        usuario:'',
        cedula:'',
        password:genPassword(5),
    })

    const regenerar = ()=>form.value={...form.value,password:genPassword(5)}

    const onSubmit = (ev: Event)=>{
        ev.preventDefault()

        if(
            !form.value.usuario || !form.value.cedula || isNaN(+form.value.cedula)
        ){
           notiflix.toast.failure('Datos no validos')
           return
        }

        userService.create({...form.value,cedula:+form.value.cedula})
        .then((res)=>{
            if(res.message){
                notiflix.toast.failure(res.message)
                return
            }
            notiflix.toast.success('Usuario registrado con exito')
            emit('onSuccess')
        })
    }

    const emit = defineEmits(['onSuccess','onClose'])

</script>