
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { userService } from '../services/user.service'
import CenterBox from '../components/CenterBox.vue';
import FormInput from '../components/FormInput.vue';
import { clienteService } from '../services/client.service';
import { distribucionService } from '../services/distribucion.service';
import { useRouter } from 'vue-router';

    const isAdmin = ref(false)
    const didCheckClientData = ref(false)
    const doesClientExist = ref(false)

    const router = useRouter()

    const defForm = {
        cliente:{
            id:undefined,
            nombre:'',
            apellido:'',
            cedula:'',
        },
        placa:'',
        modelo:'',
        litraje:'0',
    }

    const form = ref({
        ...defForm
    })

    const onSubmit = (ev:Event)=>{
        ev.preventDefault()
        if(validateForm()){
            distribucionService.registrar({
                ...form.value,
                cliente:{
                    ...form.value.cliente,
                    cedula:+form.value.cliente.cedula
                },
                litraje:+form.value.litraje
            })
            .then(didSucceed=>{
                if(didSucceed){
                    form.value = {...defForm,cliente:{...defForm.cliente,cedula:''}}
                    didCheckClientData.value=false
                    doesClientExist.value = false
                }
                //TODO: HANDLE ERROR
            })
        } else {

        }
    }

    const checkIfUserIsAdmin = ()=>{
        userService.checkAuthUser()
        .then(user=>{
            isAdmin.value = user.data!.isAdmin
        })
    }

    const validateForm = () : boolean => {
        const condition = (
            !form.value.cliente.nombre || !form.value.cliente.apellido ||
            !form.value.cliente.cedula || isNaN(+form.value.cliente.cedula) ||
            !form.value.litraje || isNaN(+form.value.litraje) ||
            !form.value.modelo || !form.value.placa
        )
        return !condition
    }

    const getClientData = () => {
        didCheckClientData.value=false
        doesClientExist.value = false
        if(form.value.cliente.cedula === '' || isNaN(+form.value.cliente.cedula)) return
        clienteService.getOne(+form.value.cliente.cedula)
        .then(cliente=>{
            didCheckClientData.value=true
            form.value.cliente = {...defForm.cliente}
            if(!cliente.data) return
            form.value.cliente = {...cliente.data as any}
            doesClientExist.value = true
        })
    }

    const logOut = () => {
        userService.logout()
        .then(()=>router.replace('/login'))
    }

    onMounted(()=>checkIfUserIsAdmin())

</script>

<template>
    <CenterBox>
        <form @submit="onSubmit" class="grid grid-cols-2 gap-4 p-4 border border-gray-2 rounded-lg shadow-gray-500 shadow-md ">
            <h1 class="col-span-2 w-full flex flex-row justify-center text-lg font-semibold">Control de Distribución de Gasolina</h1>
            <span class="col-span-2 w-full flex flex-row justify-center text-lg">Registrar litraje</span>
            <fieldset class="rounded-xl border-t-2 border-l-2 border-gray-600 col-span-2 w-full grid grid-cols-2 gap-4">
                <legend class="px-4 text-lg">Datos de distribucion</legend>
                <FormInput @on-focus-out="getClientData" v-model="form.cliente.cedula" input-name="cedula" input-type="number" label-text="Cedula del cliente"/>
                <FormInput v-model="form.placa" input-name="placa" label-text="Placa"/>
                <FormInput v-model="form.modelo" input-name="modelo" label-text="Modelo del vehiculo"/>
                <FormInput v-model="form.litraje" input-name="litraje" input-type="number" label-text="Litros distribuidos"/>
            </fieldset>
            <fieldset v-if="didCheckClientData" class="rounded-xl border-t-2 border-l-2 border-gray-600 col-span-2 w-full grid grid-cols-2 gap-4">
                <legend class="px-4 text-lg">Datos del cliente</legend>
                <FormInput :input-disabled="doesClientExist" v-model="form.cliente.nombre" input-name="nombre" label-text="Nombre"/>
                <FormInput :input-disabled="doesClientExist" v-model="form.cliente.apellido" input-name="apellido" label-text="Apellido"/>
            </fieldset>
            <div class="col-span-2 flex flex-row justify-center space-x-4 w-full">
                <button class="shadow-md shadow-gray-500 transition-all duration-100 bg-blue-500 p-2 rounded text-white hover:bg-blue-600 active:bg-blue-400 active:scale-95" type="submit">Registrar</button>
                <button @click="router.push('/reportes')" v-if="isAdmin" class="shadow-md shadow-gray-500 transition-all duration-100 bg-blue-500 p-2 rounded text-white hover:bg-blue-600 active:bg-blue-400 active:scale-95" type="button">Ir a reportes</button>
                <button @click="router.push('/usuarios')" v-if="isAdmin" class="shadow-md shadow-gray-500 transition-all duration-100 bg-blue-500 p-2 rounded text-white hover:bg-blue-600 active:bg-blue-400 active:scale-95" type="button">Ir a usuarios</button>
                <button @click="logOut" v-if="isAdmin" class="shadow-md shadow-gray-500 transition-all duration-100 bg-blue-500 p-2 rounded text-white hover:bg-blue-600 active:bg-blue-400 active:scale-95" type="button">Cerrar sesión</button>
            </div>
        </form>
    </CenterBox>
</template>
