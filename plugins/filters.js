import Vue from 'vue'
import { format } from 'date-fns';
import { nl, fr } from 'date-fns/locale'

Vue.filter('formatDate', (date, style, lang) => {
	if(date == null) return '';
	let locale = nl
	if(lang ==='nl') {
	  locale = nl
	} else {
	  locale = fr
	}
	return format(new Date(date), style, {locale: locale} );
})



