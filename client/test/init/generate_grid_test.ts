import assert from 'assert';
import sinon from 'sinon';

import generateHexGrid from '../../src/init/generate_grid';

describe('generateHexGrid', ()=> {
	it('Count of each item.', ()=> {
		let classListStub = {
			add: ()=>{},
			remove: ()=>{},
		};
		let domStub :any = {
			setAttribute: ()=>{},
			setAttributeNS: ()=>{},
			appendChild: ()=>{},
			classList: classListStub,
			parent: {
				appendChild: ()=>{},
			},
		};
		let documentStub = {
			createElementNS: ()=> { return domStub; },
			createElement: ()=> { return domStub; },
		};

		let actual = generateHexGrid(documentStub as any, domStub);
		let hexCount = countIfExists(actual.hex);
		let siteCount = countIfExists(actual.site);
		let roadCount = actual.road.length;

		assert.equal(hexCount, (3+4)*2+5);
		assert.equal(siteCount, (7+9+11)*2);
		assert.equal(roadCount, (6+8+10 + 4+5)*2+6);
	});

	function countIfExists<T>(dList :T[][]) {
		let ret = 0;
		for (let list of dList) {
			for (let item of list) {
				if (item) ret ++;
			}
		}
		return ret;
	}
});
