
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import CenterBox from '../components/CenterBox.vue';
import FormInput from '../components/FormInput.vue';
import { userService } from '../services/user.service';

const router = useRouter()

const form = {
    cedula: '',
    clave: ''
}

const onSubmit = (e: Event ) => {
    e.preventDefault()
    if(!form.cedula || isNaN(+form.cedula) || !form.clave){
        //TODO: HANDLE ERROR
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
                <button class="shadow-md shadow-gray-500 transition-all duration-100 bg-blue-500 p-2 rounded text-white hover:bg-blue-600 active:bg-blue-400 active:scale-95" type="submit">Iniciar sesion</button>
            </div>
        </form>
    </CenterBox>
</template>