var editor = (function(){
	return {
		init: function() {
			this.scrollToStart();
			this.addButtons();
		},
		drawCoordsArray: {
			x: [], y: []
		},
		dragDraw: function() {
			let clicked = false;

			if (app.schema.activeGroup.group) {
				app.el.contentBlock.addEventListener('click', (event) => {
					clicked = !clicked;
					app.schema.action = app.schema.action.name === 'draw'
						?  {
							name: '',
							data: '',
						}
						: {
							name: 'draw',
							data: {
								drawingPlaces: [],
								count: {
									row: 0,
									seat: 0,
								}
							},
						};

					if (clicked && app.schema.action.name === 'draw') {
						const {offsetX, offsetY} = event;

						editor.drawCoordsArray.x[0] = offsetX;
						editor.drawCoordsArray.y[0] = offsetY;
					} else {
						app.el.uiRectSelect.updateParams({
							display: 'none'
						});
						app.schema.action.data.drawingPlaces = [];
					}


				});
				app.el.contentBlock.addEventListener('mousemove', (event) => {
					if (clicked && app.schema.action.name === 'draw') {
						editor.getCoords(event);
					}
				});
			}
		},
		getCoords: function(event) {
			const { offsetX, offsetY } = event;

			this.drawCoordsArray.x[1] = offsetX;
			this.drawCoordsArray.y[1] = offsetY;
			this.drawSelectRect(places.drawCircles);
		},
		drawSelectRect: function(callBackFn) {
			if (!app.el.uiRectSelect) {
				app.el.uiRectSelect = ui.uiRectSelect;
				app.el.contentBlock.appendChild(app.el.uiRectSelect.init({
					className: 'active_rect',
				}));
			}

			const {x, y} = this.drawCoordsArray;
			const left = Math.min(...x);
			const right = Math.max(...x);
			const top = Math.min(...y);
			const bottom = Math.max(...y);
			const width = right - left;
			const height = bottom - top;

			app.el.uiRectSelect.updateParams({
				top,
				left,
				height,
				width,
				display: 'block',
			});

			callBackFn({
				left,
				top,
				width,
				height,
			})
		},
		createSector: function(value) {
			if (!app.schema.sectors[value]) {
				app.schema.sectors[value] = {
					group: document.createElementNS('http://www.w3.org/2000/svg', 'g'),
					selectSectorButton: document.createElement('div'),
					seats: {},
				};

				const { group, selectSectorButton } = app.schema.sectors[value];

				selectSectorButton.innerText = value;
				selectSectorButton.addEventListener('click', () => {
					editor.selectSector(value)
				});

				group.setAttribute('data-name', value);
				app.el.svg.appendChild(group);
				app.el.menuBlock.appendChild(selectSectorButton);
			}
		},
		selectSector: function(value) {
			if (document.querySelector('.selected_layer')) {
				document.querySelector('.selected_layer').classList.remove('selected_layer');
			}
			app.schema.activeGroup = {
				group: app.schema.sectors[value].group,
				value,
			};
			app.schema.sectors[value].selectSectorButton.classList.add('selected_layer');
		},
		addButtons: function() {
			this.drawSchemeButton = ui.uiButton({
				action: this.dragDraw,
				className: 'import_button',
				text: 'Места'
			});
			this.curveSectorButton = ui.uiButton({
				action: places.curveSector,
				className: 'import_button',
				text: 'Кривая'
			});
			this.addSectorButton = ui.uiInput({
				action: editor.createSector,
				inputType: 'text',
				className: 'import_button',
				text: 'Добавить сектор'
			});

			app.el.menuBlock.appendChild(this.addSectorButton);
			app.el.menuBlock.appendChild(this.curveSectorButton);
			app.el.menuBlock.appendChild(this.drawSchemeButton);
		},
		scrollToStart: function () {
			app.el.contentBlock.scrollLeft = 5000;
			app.el.contentBlock.scrollTop = 5000;
		},
	}
})();
