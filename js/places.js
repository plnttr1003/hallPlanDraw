var places = (function(){
	return {
		init: function() {
		},
		drawCircle: function(x, y, {row, seat}) {
			const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

			circle.setAttribute('cx', x);
			circle.setAttribute('cy', y);
			circle.setAttribute('r', 10);
			circle.setAttribute('style','fill: #000; stroke: transparent');

			return circle;
		},
		drawCircles: function ({left, top, width, height}) {
			const rowCounts = Math.round(height / 35);
			const seatCounts = Math.round(width / 35);
			const value = app.schema.activeGroup.value;

			for (let i = 0; i < rowCounts; i++) {
				for (let k = 0; k < seatCounts; k++) {
					if (app.schema.action.data.drawingPlaces.indexOf(i + '_' + k) === -1) {
						const place = places.drawCircle(left + (35 * k),  top + (35 * i), {row: i, seat: k});

						app.schema.activeGroup.group.appendChild(place);
						app.schema.action.data.drawingPlaces.push(i + '_' + k);

						if (!app.schema.sectors[value].seats[i]) {
							app.schema.sectors[value].seats[i] = {}
						}

						if (!app.schema.sectors[value].seats[i][k]) {
							app.schema.sectors[value].seats[i][k] = {}
						}

						app.schema.sectors[value].seats[i][k] = {
							seat: place,
							id: i + '_' + k,
						}
					}
				}
			}

			app.schema.sectors[value].size = {
				rowCounts,
				seatCounts,
			}
		},
		curveSector: function () {
			if (app.schema.sectors[app.schema.activeGroup.value]) {
				const sector = app.schema.sectors[app.schema.activeGroup.value];
				const { rowCounts, seatCounts } = sector.size;
				const { space, seatCurveRadiusMultiplier } = app.defaults;
				console.log(sector.size);
				seatCurveRadius = 90;
				console.log(rowCounts);

				for (var j = 0; j < rowCounts; j++) {
					const currentSeatCurveRadius = seatCurveRadiusMultiplier + space.rows * j + seatCurveRadius;
					const beta = Math.asin(space.seats / currentSeatCurveRadius);

					for (var i = 0; i < seatCounts; i++) {
						const alpha = beta * (i - seatCounts / 2) + beta / 2;

						if (sector.seats[j] && sector.seats[j][i]) {
							const circle = sector.seats[j][i].seat;

							console.log('CIRCLE::', circle);

							const x0 = parseFloat(circle.getAttribute('cx'));
							const y0 = parseFloat(circle.getAttribute('cy'));

							console.log(x0);
							console.log(currentSeatCurveRadius * Math.sin(alpha));
							console.log(currentSeatCurveRadius * Math.sin(alpha) + x0);
							const x = currentSeatCurveRadius * Math.sin(alpha) + x0;
							const y = currentSeatCurveRadius * Math.cos(alpha) + y0 - currentSeatCurveRadius + space.rows * j;

							circle.setAttribute('cx', x);
							circle.setAttribute('cy', y);
						}
					}
				}
			}

		}
	}
})();
