import Vue from 'vue'
// I'm using https://date-fns.org/ for date manipulations
import { format } from 'date-fns';
import { nl, fr } from 'date-fns/locale'




Vue.filter('formatDate', (date, style, lang) => {
	console.log(date, style, lang)
	if(date == null) return '';
	let locale = nl
	if(lang ==='nl') {
	  locale = nl
	} else {
	  locale = fr
	}
	return format(new Date(date), style, {locale: locale} );
})

Vue.filter('orderBy', (list, orderBy) => {
	if(orderBy === 'date') {
		// TODO: I'm using new Date here, but makes more sense to make them dates on retrieval from db (i think?)
		return list.sort(function(a,b){return new Date(a.date) - new Date(b.date)});	
		
	}
	
	

	
	
})