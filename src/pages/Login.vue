
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import CenterBox from '../components/CenterBox.vue';
import FormInput from '../components/FormInput.vue';
import { notiflix } from '../services/notiflix.service';
import { userService } from '../services/user.service';

const router = useRouter()

const form = {
    cedula: '',
    clave: ''
}

const onSubmit = (e: Event ) => {
    e.preventDefault()
    if(!form.cedula || isNaN(+form.cedula) || !form.clave){
        notiflix.toast.failure('Los datos no son validos')
        return
    }
    userService.login(+form.cedula,form.clave)
    .then(didLogin=>{
        if(didLogin){
            router.push('/distribucion')
        }
    })
}

</script>

<template>
    <CenterBox>
        <form @submit="onSubmit" class="p-4 border border-gray-2 rounded-lg shadow-gray-500 shadow-md ">
            <h1 class="text-lg font-semibold">Control de Distribución de Gasolina</h1>
            <span class="w-full flex flex-row justify-center text-lg">Iniciar sesión</span>
            <FormInput inputRequired v-model="form.cedula" input-name="cedula" input-type="number" label-text="Cedula"/>
            <FormInput inputRequired v-model="form.clave" input-name="clave" input-type="password" label-text="Contraseña"/>
            <div class="flex flex-row justify-center w-full">
                <button class="btn-primary" type="submit">Iniciar sesion</button>
            </div>
        </form>
    </CenterBox>
</template>