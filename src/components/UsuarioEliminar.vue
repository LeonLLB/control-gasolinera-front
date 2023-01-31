<template>
    <div>
        
        <span class="m-4 text-red-600">Esta seguro de querer eliminar este usuario?</span>
        
        <div class="mt-4 flex flex-row w-full justify-end space-x-4">
            <button class="btn-danger" @click="submit">Eliminar usuario</button>
            <button class="btn-primary" type="button" @click="emit('onClose')">Cancelar</button>
        </div>
    </div>
</template>

<script lang="ts" setup>

    import { userService } from '../services/user.service';

    const {userId} = defineProps({
        userId: Number
    })
    
    const submit = ()=>{       
        userService.delete(userId!)
        .then((res)=>{
            if(res.message){
                //TODO: handle error
                return
            }
            emit('onSuccess')
        })
    }

    const emit = defineEmits(['onSuccess','onClose'])

</script>