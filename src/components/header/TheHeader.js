import template from './TheHeader.template.js';
import VueRouter from '@vue-router';

const { RouterLink } = VueRouter

export default {
    name: 'TheHeader',
    components: { RouterLink },
    template
}