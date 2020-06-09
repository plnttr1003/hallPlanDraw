var main = (function(){
	return {
		init: function() {
			this.render();
			this.initPopup();
			this.initUploader();
			this.loadSavedSchemes();
		},
		addHeaderSchemeButton: null,
		addSchemeButton: null,
		render: function() {
			app.el.body.innerHTML = '';
			app.el.headerOuter = ui.uiView({className: 'header_outer'});
			app.el.mainBlock = ui.uiView({className: 'main_block'});

			app.el.body.appendChild(app.el.headerOuter);
			app.el.body.appendChild(app.el.mainBlock);

			app.el.contentBlock = ui.uiView({className: 'content_block'});
			app.el.menuBlock = ui.uiView({className: 'menu_block'});

			app.el.mainBlock.appendChild(app.el.contentBlock);
			app.el.mainBlock.appendChild(app.el.menuBlock);

			this.addSchemeButton = ui.uiButton({
				action: () => {
					app.el.contentBlock.innerHTML =
						`<svg
							version="1.1" 
							xmlns="http://www.w3.org/2000/svg" 
							xmlns:xlink="http://www.w3.org/1999/xlink" 
							x="0px" y="0px"
							viewBox="0 0 10000 10000" 
							style="enable-background:new 0 0 10000 10000;" 
							xml:space="preserve">
						</svg>`;
					app.el.svg = app.el.contentBlock.querySelector('svg');
					editor.init()
				},
				className: 'add_button',
				text: 'Новая схема'
			});

			this.addHeaderImportButton = ui.uiButton({
				action: this.openPopup,
				className: 'import_button',
				text: ''
			});

			app.el.contentBlock.appendChild(this.addSchemeButton);
			app.el.headerOuter.appendChild(this.addHeaderImportButton);
		},
		openPopup: function() {
			app.el.body.appendChild(app.el.popup);
			console.log('popup', app.el.popup);
		},
		initPopup: function() {
			app.el.popup = ui.uiPopup({
				className: 'import_popup',
				text: 'Импорт схемы'
			});
			console.log('app.el.popup::', app.el.popup);
		},
		initUploader: function() {
			console.log('uploader ready');
		},
		loadSavedSchemes: function() {
			console.log('ready to load schemes');
		}
	}
})();
