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
		uiView.el.classList.add(uiClassName, this.params.className);
		uiView.el.innerHTML = template(params);
		if (fn) {
			fn()};
		console.log(`name::${this.name}`, uiView.el, this);
		return uiView.el;
	}
};

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
};

var uiInput = {
	template: function(params) {
		return `
			<input type="${params.inputType}">
			<div class="text_block">${params.text}</div>
		`
	},
	name: 'uiInput',
	init: (params, template) => {
		return uiInput.render(params, 'button_block', template || uiInput.template, uiInput.afterRender)
	},
	afterRender: function() {
		const inputEl = uiInput.el.querySelector('input');
		const inputButton = uiInput.el.querySelector('.text_block');

		inputButton.addEventListener('click', () => {
			console.log(uiInput.params);
			if (inputEl.value) {
				uiInput.params.action(inputEl.value)
			}
		});
	},
	render: function(params, uiClassName, template, fn) {
		uiInput.params = params;
		uiInput.el = document.createElement('div');
		uiInput.el.classList.add(uiClassName, this.params.className);
		uiInput.el.innerHTML = template(params);
		if (fn) {
			fn()};
		console.log(`name::${this.name}`, uiInput.el, this);
		return uiInput.el;
	}
};

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
};

var uiRectSelect = {
	createAreaEl: null,
	template: function(params) {
		return `
			<div class="create_area"></div>
			<div class="create_coords"></div>
		`
	},
	name: 'uiRectSelect',
	init: (params, template) => {
		return uiRectSelect.render(params, 'rect_area', template || uiRectSelect.template, uiRectSelect.afterRender)
	},
	afterRender: function() {
		uiButton.el.addEventListener('click', uiButton.params.action);
	},
	updateParams: function({display, top, left, width, height}) {
		if (!uiRectSelect.createAreaEl) {
			uiRectSelect.createAreaEl = document.querySelector('.rect_area');
		}

		uiRectSelect.createAreaEl.setAttribute('style', `display: ${display}; top: ${top || 0}px; left: ${left || 0}px; height: ${height || 0}px; width: ${width || 0}px;`)
		console.log('update params');
	},
	__proto__: uiView
};

/////////////////////////////////

var ui = (function(){
	return {
		uiView: uiView.init,
		uiButton: uiButton.init,
		uiInput: uiInput.init,
		uiPopup: uiPopup.init,
		uiRectSelect
	}
})();
