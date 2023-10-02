<script>
import { defineComponent, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CallService from '@/service/CallService';

export default defineComponent({
    setup() {
        const toast = useToast();
        const callService = new CallService();

        const flagCall = ref(false);
        const loading = ref(false);
        const contact = ref({
            to: '',
            msg: ''
        });

        const startCall = async () => {
            loading.value = true;

            if (contact.value.to != '' && contact.value.msg != '') {
                callService.postCall(contact.value).then(function (data) {
                    flagCall.value = data ? true : false;
                    showToast();
                });
            }
            else {
                toast.add({ severity: 'warn', summary: 'Form tidak Lengkap', detail: 'Harap Lengkapi Form!', life: 3000 });
            }

            loading.value = false
        };

        const showToast = () => {
            toast.add({ severity: flagCall.value ? 'success' : 'warn', summary: flagCall.value ? 'Service Available' : 'Service Unavailable', detail: flagCall.value ? 'Panggilan berhasil dimulai' : 'Service sedang sibuk, harap coba lagi nanti', life: 3000 });
        };

        return {
            startCall,
            contact,
            loading
        }
    }
});
</script>

<template>
    <Toast />
    <div class="grid">
        <!--begin:Form-->
        <div class="col-12">
            <div class="card">
                <h5>Dashboard Voice Call</h5>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <h5 class="flex justify-content-center">Mulai Panggilan</h5>
                <div class="p-fluid">
                    <InputText type="text" class="my-1" placeholder="Kontak Tujuan (+628123456789)"
                        v-tooltip="'Masukkan kontak Tujuan'" v-model="contact.to" />

                    <Textarea class="my-1" placeholder="Isi Pesan" v-tooltip="'Masukkan pesan yang ingin anda sampaikan'"
                        rows="4" v-model="contact.msg" />

                    <Button type="button" class="p-button p-button-success mt-2" label="Send Voice-call"
                        v-tooltip="'Click to send voice-call'" v-on:click="startCall()" />
                </div>
            </div>
        </div>
        <!--end:Form-->
    </div>
</template>
