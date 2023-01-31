<template>
    <div class="flex flex-col items-center space-y-3 mt-4">
        <h1 class="font-semibold text-xl">Usuarios con acceso al sistema</h1>
        <button class="btn-primary" @click="inscripcionModal.toggleModal">Añadir usuario</button>
        <div ref="tableContainerRef">
            <table>
                <thead>
                    <tr class="bg-gray-400">
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Cedula</th>
                        <th>Cargo</th>
                        <th>Opciones</th>                   
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd:bg-gray-300 even:bg-gray-400" v-for="usuario of usuarios">
                        <td>{{usuario.id}}</td>
                        <td>{{usuario.usuario}}</td>
                        <td>{{ usuario.cedula }}</td>
                        <td> {{ usuario.isAdmin ? 'Administrador' : 'Cajero' }} </td>
                        <td class="flex flex-col space-y-2">
                            <button class="btn-primary" @click="()=>startCambiarClave(usuario.id)">Cambiar clave</button>
                            <button class="btn-primary">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <Modal
        v-if="inscripcionModal.isOpen.value"
        title="Crear usuario"       
        :is-closing="inscripcionModal.isClosing.value"
        @on-close="inscripcionModal.toggleModal"
    >
        <UsuarioForm @on-close="inscripcionModal.toggleModal()" @on-success="()=>{inscripcionModal.toggleModal(); getUsuarios()}"/>
    </Modal>
    <Modal
        v-if="cambioClaveModal.isOpen.value"
        title="Cambiar clave al usuario"
        :is-closing="cambioClaveModal.isClosing.value"
        @on-close="cambioClaveModal.toggleModal"
    >
        <UsuarioCambiarClave :user-id="id" @close="cambioClaveModal.toggleModal()"/>
    </Modal>
</template>

<script lang="ts" setup>

    import { ref, onMounted } from 'vue';
    import Modal from '../components/Modal.vue';
    import UsuarioCambiarClave from '../components/UsuarioCambiarClave.vue';
    import UsuarioForm from '../components/UsuarioForm.vue';
    import { useModal } from '../composables/useModal';
    import { Usuario } from '../interfaces/usuarios';
    import { userService } from '../services/user.service';

    const usuarios = ref<Usuario[]>([])
    const cargando = ref(true)
    const tableContainerRef = ref()

    const id = ref(0)

    const startCambiarClave = (userId: number) => {
        id.value = userId
        cambioClaveModal.toggleModal()
    }

    const inscripcionModal = useModal()
    const cambioClaveModal = useModal()
    const eliminarModal = useModal()

    const getUsuarios = () => {
        cargando.value = true
        userService.getAll()
        .then(data=>{
            cargando.value = false
            usuarios.value = data
        })
    }

    onMounted(getUsuarios)

</script>