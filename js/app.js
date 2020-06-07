var app = (function(){
	return {
		data: {
			dd: 1,
		},
		el: {
			body: null,
			contentBlock: null,
			headerOuter: null,
			menuPlace: null,
			titlePlace: null,
			mainBlock: null,
			menuBlock: null,
			popup: {
			}
		},
		init: function() {
			this.el.body = document.body;
			router.init();
			// editor.init();
			main.init();
		}
	}
})();
app.init();