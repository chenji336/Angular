describe('Directive Test',function(){
	var mockScope;
	var compileService;

	beforeEach(angular.mock.module('exampleApp'));

	beforeEach(angular.mock.inject(function($rootScope,$compile){
		mockScope=$rootScope.$new();
		compileService=$compile;
		mockScope.data=[
			{
				name:'Apples',category:'Fruit',price:1.20,expiry:10
			},{
				name:'Bananas',category:'Fruit',price:2.42,expiry:7
			},{
				name:'Pears',category:'Fruit',price:2.02,expiry:6
			},{
				name:'Tuna',category:'Fish',price:20.45,expiry:3
			},{
				name:'Salmon',category:'Fish',price:17.93,expiry:2
			},{
				name:'Trout',category:'Fish',price:12.93,expiry:4
			},{
				name:'Beer',category:'Drinks',price:2.89,expiry:365
			},{
				name:'Wine',category:'Drinks',price:8.99,expiry:365
			},{
				name:'Whiskey',category:'Drinks',price:4512312.9991,expiry:365
			}
		];
	}));

	it('Generates list elements',function(){
		var compileFn=compileService('<div unordered-list="data"></div>');
		var elem=compileFn(mockScope);

		expect(elem.children('ul').length).toEqual(1);
		expect(elem.find('li').length).toEqual(3);
		expect(elem.find('li').eq(0).text()).toEqual('Apples');
	});
});