import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import messages from '../assets/js/zh_CN';
Validator.updateDictionary({
    zh_CN: {
        messages
    }
});
const config = {
    errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
};
Vue.use(VeeValidate,config);