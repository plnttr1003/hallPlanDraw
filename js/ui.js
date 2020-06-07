var uiView = {
	el: null,
	params: {},
	template: function(params) {
		return '';
	},
	name: 'uiView',
	init: function(params, template) {
		return uiView.render(params, 'view_block', template || uiView.template)
	},
	render: function(params, uiClassName, template, fn) {
		uiView.params = params;
		uiView.el = document.createElement('div');
		uiView.el.classList.add(uiClassName, this.params.className)
		uiView.el.innerHTML = template(params);
		if (fn) {
			fn()};
		console.log(`name::${this.name}`, uiView.el, this);
		return uiView.el;
	}
}

/////////////////////////////////

var uiButton = {
	template: function(params) {
		return `
			<div class="ico_block"></div>
			<div class="text_block">${params.text}</div>
		`
	},
	name: 'uiButton',
	init: (params, template) => {
		return uiButton.render(params, 'button_block', template || uiButton.template, uiButton.afterRender)
	},
	afterRender: function() {
		uiButton.el.addEventListener('click', uiButton.params.action);
	},
	__proto__: uiView
}

var uiPopup = {
	template: function(params) {
		return `
			<div class="popup_container">
				<div class="popup_title">${params.text}</div>
				<textarea></textarea>
				<div class="popup_button_place"></div>
			</div>
		`
	},
	name: 'uiPopup',
	init: (params, template) => {
		return uiPopup.render(params, 'popup_overlay', template || uiPopup.template, uiPopup.afterRender)
	},
	afterRender: function() {
		uiButton.el.addEventListener('click', uiButton.params.action);
	},
	__proto__: uiView
}

/////////////////////////////////

var ui = (function(){
	return {
		uiView: uiView.init,
		uiButton: uiButton.init,
		uiPopup: uiPopup.init
	}
})();