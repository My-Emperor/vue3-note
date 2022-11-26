export const demoMixin = {
    data(){
        return {
            num:10,
        }
    },
    created() {
        console.log("created mixin");
    },
    methods:{
        foo(){
            console.log("methods mixin foo()");
        }
    }

}