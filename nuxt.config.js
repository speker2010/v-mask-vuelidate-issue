export default {
	target: 'static',
	router: {
		base: process.env.MODE === 'gh'? '/v-mask-vuelidate-issue/': ''
	},
	server: {
		host: '0.0.0.0'
	},
	plugins: [
		'~/plugins/v-mask.js',
		'~/plugins/vuelidate.js',
	]
}
