var app = (function(){
	return {
		defaults: {
			space: {
				seats: 15,
				rows: 35,
			},
			seatCurveRadiusMultiplier: 0,
		},
		schema: {
			sectors: {},
			activeGroup: {
				group: null,
				value: '',
			},
			action: {
				name: '',
				data: '',
			},
		},
		data: {
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
			main.init();
		}
	}
})();
app.init();
